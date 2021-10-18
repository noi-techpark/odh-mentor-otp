/*

OTP CONFIG DOCS

http://docs.opentripplanner.org/en/dev-1.x/Configuration/#graph-build-configuration

original: https://gist.github.com/stefanocudini/2e6675b145e8938e8967d4f036959c93
usage:
	cat config.template.yml | VAR1=test node envtmpl.js > config.valued.yml
*/
const fs = require('fs');
const url = require('url');

const dotenv = require('dotenv');
//only for debugging
dotenv.config();

const inputFile = process.argv[2];

const ENV = process.env;

function addHttp(url) {
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url;
    }
    else {
    	let prot = 'http'+(ENV.API_PORT===443?'s':'');
		return prot+'://' + url;
    }
}

function stripComments(ymltext) {

	const lines = ymltext.split(/\r?\n/).map(line => {
		const trim = line.trim();
		return trim[0]!=='#' ? line : '';
	}).filter(line => {
		return line;
	});

	return lines.join('\n')+'\n';
}

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

	ENV.API_HOST = addHttp(ENV.API_HOST);

    //process.stdout.write( tmpl(fs.readFileSync(inputFile, "utf-8"), ENV) );

    process.stdout.write( stripComments(tmpl(fs.readFileSync(inputFile, "utf-8"), ENV)) );

} catch (e) {
    console.log(e);
}
