
const fs = require('fs');

const ENV = process.env,
	infile = process.argv[2];

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
	const configFile = fs.readFileSync(infile, 'utf8');
	
	const configEnv = tmpl(configFile, ENV);

	console.log(configEnv);
}
catch (e) {
	console.log('Error: ',e.message);
	process.exit(1);
}