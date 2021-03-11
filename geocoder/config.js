
const path = require('path');
const url = require('url');
const fs = require('fs');

const dotenv = require('dotenv');
const _ = require('lodash');
const yaml = require('js-yaml');

//TODO use for debug const dotenv = require('dotenv');
dotenv.config();

const CONFIGFILE = path.join(__dirname, 'config.yml');
const ENV = process.env;

function tmpl(str, data) {
	const tmplReg = /\$\{([\w_\-]+)\}/g

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
		port: 8088,
		default_lang: 'en',
		mintextlength: 3
	},
	endpoints: {
		default: {
			//hostname: 'localhost',
			port: 80,
			size: 10,
			method: 'GET',
			headers: {
				'User-Agent': "OpenMove-Geocoder-Client"
			}
		}
	}
};

var configYml = _.defaultsDeep(configYml, defaultConfig)

if(process.env.PORT)
	configYml.server.port = process.env.PORT;

//normalize defaults
configYml.endpoints = _.mapValues(configYml.endpoints, (c) => {
	
	let val = _.defaults(c, configYml.endpoints.default),
		u = url.parse(val.hostname);

	val.hostname = u.hostname || val.hostname;

	return val;
});

delete configYml.endpoints.default;

console.log(configYml)

module.exports = configYml;
