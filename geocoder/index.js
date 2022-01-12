
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
_.str = require("underscore.string");

const wdlevenshtein = require('weighted-damerau-levenshtein');

const ParallelRequest = require('parallel-http-request');

process.env.PELIAS_CONFIG='./pelias.json';

const apiApp = require('pelias-api/app');
const AddressParser = require('pelias-parser/parser/AddressParser');

const config = require('./config');
const formatters = require('./formatters');

const api = require('./api');

const PORT_SERVICES = 8087;
//same port in pelias.json

const servicesApp = express();

//TODO manage parameter lang for any requests
//
//TODO add support to param lang un endpoints urls 
// 
/*apiApp.use((req, res, next) => {
	console.log('[GEOCODER] request:', req.method, req.originalUrl);
	next();
});*/

servicesApp.use(bodyParser.json());
servicesApp.locals.parser = { address: new AddressParser() }
//HACK from pelias-parser/server/...

servicesApp.get('/libpostal/parse', require('pelias-parser/server/routes/parse'))

servicesApp.get(/^\/placeholder(.*)$/,  (req, res)=> {

	res.json({})
});

servicesApp.get('/here', async(req, res) => {
	
	const response = await api.here(req.query.text);

	console.log('HERE api request', req.query.text, JSON.stringify(response,null,4))
	//res.json(response);
	res.json(formatters.here(response));
})


//ElasticSearch proxy
servicesApp.post(/^\/pelias(.*)$/, (req, res)=> {
	
	//console.clear();
	//console.log('ELASTIC REQUEST', JSON.stringify(req.body, null, 4))
	
	//
	//TODO HERE FILTER REVERSE GEOCODING
	//

	let musts = _.get(req.body, "query.bool.must");
	
	if (!musts || musts.length===0) {
		res.json( formatters.elasticsearch([]) );
		return false;
	}
	//UN USEFUL let q_search = _.get(req.body, "query.bool.must[0].match['name.default'].query");
	let texts = [],
		lang;

	_.forEach(musts, function(m, k) {
		
		//texts search
		let q1 = _.get(m, "constant_score.filter.multi_match.query");
		let q2 = _.get(m, "multi_match.query");
		texts.push(q1 || q2);

		if(!lang) {
			//word
			let ll = _.get(m, "constant_score.filter.multi_match.fields")
				, l1;
			if(_.isArray(ll)) {
				l1 = ll.pop();
				l1 = l1.split('.').pop();
			}
			//phrase
			let ll2 = _.get(m, "multi_match.fields")
				, l2;
			if(_.isArray(ll2)) {
				l2 = ll2.pop();
				l2 = l2.split('.').pop();
			}
			lang = l1 || l2 || config.server.default_lang;
		}
	});

	//let q = _.get(req.body, "query.bool.must[0].constant_score.filter.multi_match.query");
	//	let q2 = _.get(req.body, "query.bool.must[1].constant_score.filter.multi_match.query");

	let text = texts.join(' ');

	console.log('[GEOCODER] Pelias Search: "', text,'" lang:',lang);//JSON.stringify(req.body,null,2))

	//console.log('ELASTIC SEARCH: "'+text+'"')

	if(!_.isString(text) || text.length < config.server.mintextlength) {
		
		res.json( formatters.elasticsearch([]) )
	}
	else {
		combineResults(text, lang, jsonres => {
			
			jsonres = orderResult(text, jsonres)

			res.json(jsonres);

		});
	}
});

//DEBUG http://localhost:8087/testSearch?text=hotel
servicesApp.get('/testSearch', (req,res) => {
	
	console.log('[GEOCODER] /testSearch',req.query);

	let lang = req.query.lang || config.server.default_lang;
	
	if(!_.isEmpty(req.query.text)) {
		
		combineResults(req.query.text, lang, jsonres => {

			jsonres = orderResult(req.query.text, jsonres)

			res.json({
				rawResult: jsonres.hits.hits.map(hit => {
					return {
						name: hit._source.name.default,
						layer: hit._source.layer,
						rank: wdlevenshtein(req.query.text, hit._source.name.default)
					}
				}),
				peliasResult: jsonres
			});
		});
	}
});

const serverParser = servicesApp.listen(PORT_SERVICES, () => {
	//console.log('[GEOCODER-SERVICES] listening on %s:%s', PORT_SERVICES)
	process.on('SIGTERM', () => {
		console.error('[GEOCODER-SERVICES] closing...')
		serverParser.close();
	});
});

const serverApi = apiApp.listen( config.server.port, () => {
    console.log( apiApp._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
	console.log(`[GEOCODER] listening on ${config.server.port}`)
	process.on('SIGTERM', () => {
		console.error('[GEOCODER] closing...')
		serverApi.close();
	});
});

function orderResult(text, res) {
	res.hits.hits = _.sortBy(res.hits.hits, hit => {
		//console.log(hit)
		//return _.str.levenshtein(text, hit._source.name.default)
		return wdlevenshtein(text, hit._source.name.default)
	});
	return res;
}

function tmpl(str, data) {
	const tmplReg = /\{\{([\w_\-]+)\}\}/g
	return str.replace(tmplReg, function (str, key) {
		let value = data[key];
		if (value === undefined)
			value = '';
		return value;
	}); 
}

function makeUrl(opt, text, lang) {
	let prot = 'http'+(opt.port===443?'s':'');
	let host = prot+'://' + opt.hostname;
	let port = (opt.port!=80 && opt.port!=443)? (':'+opt.port) : '';
	let url = tmpl(host + port + opt.path, {
		text: encodeURI(text),
		//text: text,
		size: opt.size,
		lang: lang || config.server.default_lang
	});
	return url;
}


function combineResults(text, lang, cb) {

	cb = cb || _.noop;

	lang = lang || config.server.default_lang

	//docs https://github.com/aalfiann/parallel-http-request
	var request = new ParallelRequest();

	_.forOwn(config.endpoints, (eOpt, eKey) => {

		if(eKey==='here') return;

		request.add({
			id: eKey,	//not required by ParallelRequest
			url: makeUrl(eOpt, text, lang),
			method: eOpt.method,
			headers: eOpt.headers
		});
	});

	var requests = request.getCollection();

	console.log(`[GEOCODER] search: "${text}" parallel remote requests...`);

	request.send( resp => {

		let results = [], i = 0;

		requests.forEach( req => {

			//console.log('[GEOCODER] request',req.url)
			
			if(_.isFunction(formatters[ req.id ])) {

				let response = resp[i++].body;
				
				let eRes = formatters[ req.id ]( response, lang );
			
				console.log(`[GEOCODER] response Endpoint: '${req.id}' results`, _.size(eRes));

				results.push(eRes);
			}
		});

		results = _.flatten(results);

		if (config.endpoints.here) {
			(async (cbb, poiResults) => {		//prepend here results
				const hereResponse = await api.here(text, lang);
				const hereResults = formatters.here(hereResponse);

				console.log(`[GEOCODER] response Endpoint: 'HERE' results`, _.size(hereResults));
				//console.log(JSON.stringify(_.get(hereResponse,'body.Response.View[0].Result'),null,4));

				//add here first
				const returnResults = hereResults.concat(poiResults);

				cbb( formatters.elasticsearch(returnResults) );

			})(cb, results);
		}
		else {
			cb(formatters.elasticsearch(results));
		}
	});
}
