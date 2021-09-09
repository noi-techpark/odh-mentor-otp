
const _ = require('lodash');

const config = require('./config');

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
				"lon" : parseFloat(ff.lon),
				"lat" : parseFloat(ff.lat)
			},
			"source" : ff.source,
			"source_id" : 'osm'+ff.id,
			"layer" : ff.layer,
			"parent" : {
				"country" : [ "Italy" ],
				"country_id" : [ "85633253" ],
				"country_a" : [ "ITA" ],
				"macroregion" : [ "Trentino-Alto Adige/South Tyrol" ],
				"macroregion_id" : [ "404227499" ],
				"macroregion_a" : [ null ],
				"region" : [ "" ],
				"region_id" : [ "85685271" ],
				"region_a" : [ "BZ" ],
				"localadmin" : [ "" ],
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
  'here': function(data, lang) {

		lang = lang || config.server.default_lang;

  	const items = _.get(data,'body.Response.View[0].Result');

		return _.compact(_.map(items, (item)=> {

			let lat = _.get(item,"Location.DisplayPosition.Latitude"),
				lon = _.get(item,"Location.DisplayPosition.Longitude"),
				a = _.get(item,"Location.Address"),
				text = _.compact([a.Street, a.HouseNumber, a.City]).join(', ');

			if (lat && lon) {
				return createHit({
					id: _.get(item,'Location.LocationId'),
					text: text,
					lat: lat,
					lon: lon,
					source: 'here',
					layer: config.endpoints.here.layer
				});
			}
		}));
  },

	'opentripplanner': function(data, lang) {

		lang = lang || config.server.default_lang;

		//hack to limit otp geocode results
		let datal = _.slice(data, 0, config.endpoints.opentripplanner.size);

		return _.compact(_.map(datal, (item,k)=> {

			let lat = _.get(item,"lat"),
				lon = _.get(item,"lng"),
				text = _.get(item,"description");

			if (lat && lon) {
				return createHit({
					id:   item['id'],
					text: text,
					lat: lat,
					lon: lon,
					source: 'opentripplanner',
					layer: config.endpoints.opentripplanner.layer
				});
			}
		}));
	},

	//example https://tourism.opendatahub.bz.it/api/Accommodation?language=en&poitype=447&active=true&fields=Id,AccoDetail.en.Name,Latitude,Longitude&pagesize=10&searchfilter=resort
	'accommodations': function(data, lang) {
		lang = lang || config.server.default_lang;

		return _.compact(_.map(data.Items, (item)=> {

			let lat = _.get(item,"Latitude"),
				lon = _.get(item,"Longitude"),
				text = _.get(item,"AccoDetail."+lang+".Name");

			if (lat && lon) {
				return createHit({
					id:   item['Id'],
					text: text,
					lat: lat,
					lon: lon,
					source: 'accommodations',
					layer: config.endpoints.accommodations.layer
				});
			}
		}));
	},
	
	//example: http://tourism.opendatahub.bz.it/api/Poi?language=en&poitype=447&active=true&fields=Id,Detail.en.Title,GpsInfo&pagesize=20&searchfilter=der
	'pois': function(data, lang) {
		lang = lang || config.server.default_lang;

		return _.compact(_.map(data.Items, (item)=> {

			let lat = _.get(item,"GpsInfo[0].Latitude"),
				lon = _.get(item,"GpsInfo[0].Longitude"),
				text = _.get(item,"Detail."+lang+".Title");

			if (lat && lon) {
				return createHit({
					id:   item['Id'],
					text: text,
					lat: lat,
					lon: lon,
					source: 'pois',
					layer: config.endpoints.pois.layer
				});
			}
		}));
	},

	//example: http://tourism.opendatahub.bz.it/api/ODHActivityPoi?language=en&poitype=447&active=true&fields=Id,Detail.en.Title,GpsInfo&pagesize=20&searchfilter=magic
	'ODHActivityPoi': function(data, lang) {
		lang = lang || config.server.default_lang;
		
		return _.compact(_.map(data.Items, (item)=> {

			let lat = _.get(item,"GpsInfo[0].Latitude"),
				lon = _.get(item,"GpsInfo[0].Longitude"),
				text = _.get(item,"Detail."+lang+".Title");
			
			if (lat && lon) {
				return createHit({
					id:   item['Id'],
					text: text,
					lat: lat,
					lon: lon,
					source: 'ODHActivityPoi',
					layer: config.endpoints.ODHActivityPoi.layer
				});
			}
		}));
	}
};
