/*
original: https://gist.github.com/stefanocudini/2e6675b145e8938e8967d4f036959c93
usage:
	cat config.template.yml | VAR1=test node envtmpl.js > config.valued.yml
*/
const fs = require('fs');

const dotenv = require('dotenv');

const ENV = process.env;

//const tmplReg = /\$\{(.+?)\}/g
const tmplReg = /\$\{([\w_\-]+)\}/g
//const tmplReg = /\{ *([\w_\-]+) *\}/g

//only for debugging
dotenv.config();

function tmpl(str, data) {

	return str.replace(tmplReg, function (str, key) {
		var value = data[key];

		if (value === undefined)
			value = "${"+key+"}";

		return value;
	});	
}

try {
    
    process.stdout.write( tmpl(fs.readFileSync(process.argv[2], "utf-8"), ENV) );

} catch (e) {
    console.log(e);
}
