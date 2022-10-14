
const {resolve} = require('path');
const {app, version, config, polling, fetchData, listenLog, _, express, yaml} = require(resolve(__dirname,'../base'));

const {formatters, services, combineResults, textDistance, orderResult} = require('./utils')(config, _);

process.env.PELIAS_CONFIG = __dirname+'/pelias.json';
//PATCH for pelias-api that require this file
const AddressParser = require('pelias-parser/parser/AddressParser');
const peliasParser = require('pelias-parser/server/routes/parse');
const peliasApiApp = require('pelias-api/app');

app.use(express.json());

app.locals.parser = { address: new AddressParser() };
//HACK for endpoint /v1/search?text=...

app.get('/libpostal/parse', peliasParser);
app.get(/^\/placeholder(.*)$/, (req, res) => { res.json({}); });
app.get(/^\/pip(.*)$/, (req, res) => { res.json({}); });

//ElasticSearch internal proxy
app.post(/^\/pelias(.*)$/, (req, res) => {

	const {text, lang} = formatters.elasticsearchRequest(req, res);

	if(!_.isString(text) || text.length < Number(config.min_text_length)) {

		res.json( formatters.elasticsearch([]) )
	}
	else {
		combineResults(text, lang, jsonres => {
			res.json(orderResult(text, jsonres));
		});
	}
});

//DEBUG http://localhost:8087/testSearch?text=hotel
//TODO rename in '/v1/autocomplete'
app.get('/testSearch', (req,res) => {
	
	console.log('[geocoder] /testSearch',req.query);

	let lang = req.query.lang || config.default_lang;
	
	if(!_.isEmpty(req.query.text)) {
		
		combineResults(req.query.text, lang, jsonres => {

			jsonres = orderResult(req.query.text, jsonres)

			res.json({
				rawResult: jsonres.hits.hits.map(hit => {
					return {
						name: hit._source.name.default,
						//layer: hit._source.layer,
						rank: textDistance(req.query.text, hit._source.name.default),
						loc: [hit._source.center_point.lat, hit._source.center_point.lon]
					}
				}),
				peliasResult: jsonres
			});
		});
	}
});

app.use('/tests', express.static('tests'));

//TODO
/*apiApp.get(['/',/geocoder'], async (req, res) => {
  res.send({
    status: 'OK',
    version
  });
});*/

const serverParser = app.listen(config.pelias_listen_port, function() {
		console.log('internal services paths', app._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
    console.log(`listening at http://localhost:${this.address().port}`);
});

const serverApi = peliasApiApp.listen( config.listen_port, function() {
		console.log('pelias Api paths', peliasApiApp._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
    console.log(`listening at http://localhost:${this.address().port}`);
});