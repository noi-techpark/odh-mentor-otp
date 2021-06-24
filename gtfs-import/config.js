
const path = require('path');
const url = require('url');
const fs = require('fs');

const dotenv = require('dotenv');
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

module.exports = configYml;
