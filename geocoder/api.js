
const heremap = require("heremap");

const config = require('./config');

module.exports = {
	'here': async(text) => {
		heremap.config({
		  app_id: config.endpoints.here.appId,
		  app_code: config.endpoints.here.appCode
		});

		//suedtirol bbox
		const latM = 46.749271,
			lngm = 11.475220,
			latm = 46.431232,
			lngM = 10.991821;
		//TODO use this:
		//      minLon: 10.470121
		// maxLon: 12.255011
		// minLat: 46.188280
		// maxLat: 47.088780
      
		return await heremap.geocode(text, {
			mapview: `${latM},${lngm};${latm},${lngM}`
		});
	}
}