
const heremap = require("heremap");
//https://github.com/devbab/heremap#hm_geocode

const config = require('./config');

module.exports = {
	'here': async(text, lang) => {
		heremap.config({
		  app_id: config.endpoints.here.appId,
		  app_code: config.endpoints.here.appCode
		});

		//suedtirol bbox
		const latM = 46.749271,
			  lngm = 10.991821,
			  latm = 46.431232,
			  lngM = 11.475220;
      	//docs AUTOCOMPLETE https://developer.here.com/documentation/geocoder-autocomplete/dev_guide/topics/resource-suggest.html
		//docs GEOCODER https://developer.here.com/documentation/geocoder/dev_guide/topics/api-reference.html

		return await heremap.geocode(text, {
			//search: text,	//AUTOCOMPLETE
			maxresults: 20,
			country: 'ITA',
			//resultType: 'street',//AUTCOMPLETE
			language: lang || config.server.default_lang,
			bbox: `${latM},${lngm};${latm},${lngM}`,
			mapview: `${latM},${lngm};${latm},${lngM}`,
			//prox: map center
			/* //bbox/mapview=
				TopLeft.Latitude,
				TopLeft.Longitude;
				BottomRight.Latitude,
				BottomRight.Longitude */
		});
	}
}