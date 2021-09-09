
const heremap = require("heremap");
//https://github.com/devbab/heremap#hm_geocode

const config = require('./config');

module.exports = {
	'here': async(text = '', lang) => {

		heremap.config({
		  app_id: config.endpoints.here.appId,
		  app_code: config.endpoints.here.appCode
		});

		let bbox;
		if(config.endpoints.here.bbox) {
			const {latM, lngm, latm, lngM} = config.endpoints.here.bbox;
			bbox = `${latM},${lngm};${latm},${lngM}`;
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