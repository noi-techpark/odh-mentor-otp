const path = require('path');
const fs = require('fs');

const _ = require('lodash');
const yaml = require('js-yaml');

const CONFIGFILE = path.join(__dirname, 'config.yml');
const ENV = process.env;

function tmpl(str, data) {
	//const tmplReg = /\$\{(.+?)\}/g
	const tmplReg = /\$\{([\w_\-]+)\}/g
	//const tmplReg = /\{ *([\w_\-]+) *\}/g

	return str.replace(tmplReg, function (str, key) {
		var value = data[key];
		if (value === undefined)
			value = "${"+key+"}";
		return value;
	});
}


try {
	const configFile = fs.readFileSync(CONFIGFILE, 'utf8');

	const configEnv = tmpl(configFile, ENV);

	configYml = yaml.safeLoad(configEnv, {
		schema: yaml.JSON_SCHEMA,
		json: true
	});
}
catch (e) {
  console.log('Error: ',e.message);
  process.exit(1)
}

const defaultConfig = {
	server: {
		port: 8089,
		polling_interval: 10 //minutes
	},
	endpoints: {
		default: {
			port: 80,
			method: 'GET',
			headers: {
				'User-Agent': "OpenMove-Drt-Client"
			}
		}
	}
};



var configYml = _.defaultsDeep(configYml, defaultConfig)

//normalize defaults
configYml.endpoints = _.mapValues(configYml.endpoints, (c)=>{
	return _.defaults(c, configYml.endpoints.default);
});

delete configYml.endpoints.default;

module.exports = configYml;
