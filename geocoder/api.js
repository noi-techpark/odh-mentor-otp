

const _ = require('lodash');

const heremap = require("heremap");
//https://github.com/devbab/heremap#hm_geocode

const config = require('./config');

module.exports = {
	'here': async(text = '', lang) => {

		if (!_.get(config,'endpoints.here.appId') || 
			!_.get(config,'endpoints.here.appCode') || 
			config.endpoints.here.appId === '${HERE_APPID}' || 
			config.endpoints.here.appCode === '${HERE_APPCODE}'
    	) {
			console.warn("[GEOCODER] error in Endpoint: 'here' api appId/appCode not found");
			return [];
		}

		heremap.config({
		  app_id: config.endpoints.here.appId,
		  app_code: config.endpoints.here.appCode
		});

		let bbox;
		if(config.endpoints.here.bbox) {
			const {maxLat, minLon, minLat, maxLon} = config.endpoints.here.boundary.rect
				, bbox = `${maxLat},${minLon};${minLat},${maxLon}`;
	/*boundary:
      rect:
        minLon: 10.470121
        maxLon: 12.255011
        minLat: 46.188280
        maxLat: 47.088780*/
			// TopLeft.Latitude,TopLeft.Longitude; BottomRight.Latitude,BottomRight.Longitude
		}
		
		//docs AUTOCOMPLETE https://developer.here.com/documentation/geocoder-autocomplete/dev_guide/topics/resource-suggest.html
		//docs GEOCODER https://developer.here.com/documentation/geocoder/dev_guide/topics/api-reference.html
		try {
			return await heremap.geocode(text, {
				//search: text,	//only AUTOCOMPLETE
				maxresults: Number(config.endpoints.here.size),
				country: 'ITA',
				//resultType: 'street',//only AUTCOMPLETE
				language: lang || config.server.default_lang,
				bbox: bbox,
				mapview: bbox
			});
		}catch(err) {
			return []
		}
	}
}