
const _ = require('lodash');


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
			"source" : "osm",
			"source_id" : ff.id,
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

	//example https://tourism.opendatahub.bz.it/api/Accommodation?language=en&poitype=447&active=true&fields=Id,AccoDetail.en.Name,Latitude,Longitude&pagesize=10&searchfilter=resort
	'accommodations': function(odhdata) {
		return _.map(odhdata.Items, (item)=> {
			
			//console.log('ACC', item['AccoDetail.en.Name'], item['Latitude'],item['Longitude'])

			return createHit({
				id:   item['Id'],
				text: item['AccoDetail.en.Name'],
				lat:  parseFloat(item['Latitude']),
				lon:  parseFloat(item['Longitude']),
			});
		})
	},
	
	//example: http://tourism.opendatahub.bz.it/api/Poi?language=en&poitype=447&active=true&fields=Id,Detail.en.Title,GpsInfo&pagesize=20&searchfilter=der
	'pois': function(odhdata) {
		return _.map(odhdata.Items, (item)=> {
			
			//console.log('POI', item['Detail.en.Title'], item)

			return createHit({
				id:   item['Id'],
				text: item['Detail.en.Title'],
				lat:  parseFloat(item['GpsInfo'][0]['Latitude']),
				lon:  parseFloat(item['GpsInfo'][0]['Longitude']),
			});
		})
	},

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

	}
};
