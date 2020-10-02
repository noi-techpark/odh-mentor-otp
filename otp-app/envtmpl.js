/*
original: https://gist.github.com/stefanocudini/2e6675b145e8938e8967d4f036959c93
usage:
	cat config.template.yml | VAR1=test node envtmpl.js > config.valued.yml
*/
const fs = require('fs');

//const tmplReg = /\$\{(.+?)\}/g
const tmplReg = /\$\{([\w_\-]+)\}/g
//const tmplReg = /\{ *([\w_\-]+) *\}/g


function tmpl(str, data, double) {

	return str.replace(tmplReg, function (str, key) {
		var value = data[key];

		if (value === undefined)
			value = "${"+key+"}";

		return value;
	});	
}

try {
    
    process.stdout.write( tmpl(fs.readFileSync(0, "utf-8"), process.env) );

} catch (e) {
    console.log(e);
}
