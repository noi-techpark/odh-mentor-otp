
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
	return tmpl(prot+'://' + opt.hostname + opt.path, {
		text: text,
		size: opt.size,
		lang: lang || config.server.default_lang
	});
}


function combineResults(text, cb) {

	cb = cb || _.noop;

	var request = new ParallelRequest();
	//docs https://github.com/aalfiann/parallel-http-request

	var acco_url = makeUrl(config.endpoints.accommodations, text),
		pois_url = makeUrl(config.endpoints.pois, text);

	request
	.add({
		url: acco_url,
		method: config.endpoints.accommodations.method,
		headers: config.endpoints.accommodations.headers
	})
	.add({
		url: pois_url,
		method: config.endpoints.pois.method,
		headers: config.endpoints.pois.headers
	});



	console.log(`[GEOCODER] search: "${text}" remote requests...`);
	console.log(acco_url);
	console.log(pois_url);
	console.log('...');

	request.send((resp)=> {
		let acco_res = formatters.accommodations( resp[0].body );
		let pois_res = formatters.pois( resp[1].body );
		let result = formatters.elasticsearch( _.concat(acco_res, pois_res) )


		console.log(`[GEOCODER] search: "${text}" responses...`, result.hits.total.value);

		cb(result);

	});
}
