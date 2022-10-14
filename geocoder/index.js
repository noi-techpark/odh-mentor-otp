
process.env.PELIAS_CONFIG = './pelias.json';//PATCH for pelias-api
const AddressParser = require('pelias-parser/parser/AddressParser');
const apiApp = require('pelias-api/app');

const {app, version, config, polling, fetchData, listenLog, _, express, yaml} = require('../base');

const {formatters, services, combineResults, textDistance, orderResult} = require('./utils')(config, _);

app.use(express.json());

app.locals.parser = { address: new AddressParser() }
//HACK from pelias-parser/server/...

//TODO manage parameter lang for any requests

app.get('/libpostal/parse', require('pelias-parser/server/routes/parse'))

app.get(/^\/placeholder(.*)$/, (req, res) => {
	res.json({});
});

app.get('/here', async(req, res) => {
	
	const response = await services.here(req.query.text);

	res.json(formatters.here(response));
})

//ElasticSearch proxy
app.post(/^\/pelias(.*)$/, (req, res)=> {

	//TODO HERE FILTER REVERSE GEOCODING

	let musts = _.get(req.body, "query.bool.must");
	
	if (!musts || musts.length===0) {
		res.json( formatters.elasticsearch([]) );
		return false;
	}
	//UN USEFUL let q_search = _.get(req.body, "query.bool.must[0].match['name.default'].query");
	let texts = [],
		lang;

	_.forEach(musts, (m, k) => {
		
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
			lang = l1 || l2 || config.default_lang;
		}
	});

	//let q = _.get(req.body, "query.bool.must[0].constant_score.filter.multi_match.query");
	//	let q2 = _.get(req.body, "query.bool.must[1].constant_score.filter.multi_match.query");

	let text = texts.join(' ');

	console.log('[geocoder] Pelias Search: "', text,'" lang:',lang);//JSON.stringify(req.body,null,2))

	//console.log('ELASTIC SEARCH: "'+text+'"')

	if(!_.isString(text) || text.length < Number(config.min_text_length)) {
		
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

const serverParser = app.listen(config.pelias_listen_port, () => {
	console.log('[geocoder-pelias-services] listening on %s', config.pelias_listen_port)
});

const serverApi = apiApp.listen( config.listen_port, listenLog);
