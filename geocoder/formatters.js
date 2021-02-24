
const _ = require('lodash');

const config = require('./config');

const lang = config.server.default_lang || 'en';

//an elasticsearch hit result
//in Pelias 'venue' is a Point Of Interest
//
function createHit(ff) {
	return {
		"_index" : "pelias",
		"_type" : "_doc",
		"_id" : 'osm:venue:'+ff.id,
		"_score" : 1.0,
		"_source" : {
			"name" : {
				"default" : ff.text
			},
			"center_point" : {
				"lon" : ff.lon,
				"lat" : ff.lat
			},
			"source" : ff.source,
			"source_id" : 'osm'+ff.id,
			"layer" : "venue",
			"parent" : {
				"country" : [ "Italy" ],
				"country_id" : [ "85633253" ],
				"country_a" : [ "ITA" ],
				"macroregion" : [ "Trentino-Alto Adige/South Tyrol" ],
				"macroregion_id" : [ "404227499" ],
				"macroregion_a" : [ null ],
				"region" : [ "Bolzano" ],
				"region_id" : [ "85685271" ],
				"region_a" : [ "BZ" ],
				"localadmin" : [ "Bolzano" ],
				"localadmin_id" : [ "404473063" ],
				"localadmin_a" : [ null ]
			}
		}
	};
}

module.exports = {

	'elasticsearch': function(hits) {

		return {
			"took" : 1,
			"timed_out" : false,
			"_shards" : {
				"total" : 1,
				"successful" : 1,
				"skipped" : 0,
				"failed" : 0
			},
			"hits" : {
				"total" : {
					"value" : hits.length,
					"relation" : "eq"
				},
				"max_score" : 1.0,
				"hits" : hits
			}
		};

	},

/*
  ##check in file config.yml for fields mapping
  ##(there must be a property with the same name as the endpoint key)
*/

	'opentripplanner': function(data) {

		//hack to limit otp geocode results
		let datal = _.slice(data, 0, config.endpoints.opentripplanner.size);

		return _.map(datal, (item,k)=> {
			return createHit({
				id:   item['id'],
				text: item['description'],
				lat:  item['lat'],
				lon:  item['lng'],
				//source used in func createHit()
				source: 'opentripplanner',
			});
		});
	},

	//example https://tourism.opendatahub.bz.it/api/Accommodation?language=en&poitype=447&active=true&fields=Id,AccoDetail.en.Name,Latitude,Longitude&pagesize=10&searchfilter=resort
	'accommodations': function(data) {
		return _.map(data.Items, (item)=> {
			return createHit({
				id:   item['Id'],
				text: item['AccoDetail.'+lang+'.Name'],
				lat:  parseFloat(item['Latitude']),
				lon:  parseFloat(item['Longitude']),
				//source used in func createHit()
				source: 'ODH_accommodations',
			});
		})
	},
	
	//example: http://tourism.opendatahub.bz.it/api/Poi?language=en&poitype=447&active=true&fields=Id,Detail.en.Title,GpsInfo&pagesize=20&searchfilter=der
	'pois': function(data) {
		return _.map(data.Items, (item)=> {
			return createHit({
				id:   item['Id'],
				text: item['Detail.'+lang+'.Title'],
				lat:  parseFloat(item['GpsInfo'][0]['Latitude']),
				lon:  parseFloat(item['GpsInfo'][0]['Longitude']),
				//source used in func createHit()
				source: 'ODH_pois',			
			});
		})
	},

	//example: http://tourism.opendatahub.bz.it/api/ODHActivityPoi?language=en&poitype=447&active=true&fields=Id,Detail.en.Title,GpsInfo&pagesize=20&searchfilter=magic
	'ODHActivityPoi': function(data) {
		return _.map(data.Items, (item)=> {

			let lat = _.get(item,"GpsInfo[0].Latitude"),
				lon = _.get(item,"GpsInfo[0].Longitude");
			
			if(lat && lon) {
				return createHit({
					id:   item['Id'],
					text: item['Detail.'+lang+'.Title'],
					lat:  parseFloat(lat),
					lon:  parseFloat(item['GpsInfo'][0]['Longitude']),
					//source used in func createHit()
					source: 'ODH_ODHActivityPoi',
				});
			}
		})
	}
};
