
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const ParallelRequest = require('parallel-http-request');

process.env.PELIAS_CONFIG='./pelias.json';

const apiApp = require('pelias-api/app');
const AddressParser = require('pelias-parser/parser/AddressParser');

const config = require('./config');
const formatters = require('./formatters');

const PORT_SERVICES = 8087;
//same port in pelias.json

const servicesApp = express();

//TODO manage parameter lang for any requests
//
//TODO add support to param lang un endpoints urls 
// 
/*apiApp.use(function (req, res, next) {
	console.log('MIDDLE:', req.method, req.originalUrl);
	next();
});*/

servicesApp.use(bodyParser.json());
servicesApp.locals.parser = { address: new AddressParser() }
//HACK from pelias-parser/server/...

servicesApp.get('/libpostal/parse', require('pelias-parser/server/routes/parse'))

servicesApp.get(/^\/placeholder(.*)$/,  (req, res)=> {

	res.json({})
})


//ElasticSearch proxy
servicesApp.post(/^\/pelias(.*)$/, (req, res)=> {
	
	//console.log('ELASTIC REQUEST', JSON.stringify(req.body,null,4))
	
	let q_search = _.get(req.body, "query.bool.must[0].match['name.default'].query");
	let q_autocomplete = _.get(req.body, "query.bool.must[0].constant_score.filter.multi_match.query");

	let text = q_search || q_autocomplete;
	
	if(!_.isString(text) || text.length < config.server.mintextlength) {
		
		res.json( formatters.elasticsearch([]) )
	}
	else {
		combineResults(text, jsonres => {
			
			res.json(jsonres);

		});
	}
});

//useful 
servicesApp.get('/testSearch', (req,res) => {
	
	console.log('/testSearch',req.query)
	
	if(!_.isEmpty(req.query.text))
	combineResults(req.query.text, jsonres => {
		res.json(jsonres);
	});
});

const serverParser = servicesApp.listen(PORT_SERVICES, () => {
	console.log('[GEOCODER-SERVICES] listening on %s:%s', PORT_SERVICES)
	process.on('SIGTERM', () => {
		console.error('[GEOCODER-SERVICES] closing...')
		serverParser.close();
	});
});

const serverApi = apiApp.listen( config.server.port, () => {
	console.log('[GEOCODER] listening on %s:%s', config.server.port)
	process.on('SIGTERM', () => {
		console.error('[GEOCODER] closing...')
		serverApi.close();
	});
});

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
	let port = (opt.port!=80 && opt.port!=443)? (':'+opt.port) : '';
	return tmpl(prot+'://' + opt.hostname + port + opt.path, {
		text: text,
		size: opt.size,
		lang: lang || config.server.default_lang
	});
}


function combineResults(text, cb) {

	cb = cb || _.noop;

	//docs https://github.com/aalfiann/parallel-http-request
	var request = new ParallelRequest();

	_.forOwn(config.endpoints, (eOpt, eKey) => {
		request.add({
			url: makeUrl(eOpt, text),
			method: eOpt.method,
			headers: eOpt.headers
		})
	});

	console.log(`[GEOCODER] search: "${text}" parallel remote requests...`);

	request.send((resp)=> {
		
		let results = [], i = 0;

		_.forOwn(config.endpoints, (eOpt, eKey) => {
			
			if(_.isFunction(formatters[eKey])) {
				
				let eRes = formatters[eKey]( resp[i++].body )

				results.push(eRes);
			}
		});

		/*old code results.push( formatters.opentripplanner(resp[0].body) );
		results.push( formatters.accommodations(resp[1].body) );
		results.push( formatters.pois(resp[2].body) );*/
		
		let result = formatters.elasticsearch( _.flatten(results) );

		console.log(`[GEOCODER] search: "${text}" responses...`, result.hits.total.value);

		cb(result);

	});
}
