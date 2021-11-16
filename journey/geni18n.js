/*

OTP CONFIG DOCS

http://docs.opentripplanner.org/en/dev-1.x/Configuration/#graph-build-configuration

original: https://gist.github.com/stefanocudini/2e6675b145e8938e8967d4f036959c93
usage:
	cat config.template.yml | VAR1=test node envtmpl.js > config.valued.yml
*/

//const defLang = require('./app/lib/i18n/default');
//TODO const defLang = require('./app/lib/i18n/default');

const fs = require('fs');

const basepath = `${__dirname}/app/lib/i18n/`;

//const defaultLang = require(`${__dirname}`)

/*const dotenv = require('dotenv');
//only for debugging
dotenv.config();*/

const LANG = process.argv[2] || 'newlang'
    , dstFile = `${basepath}${LANG}.js`;

const jstext = JSON.stringify(defLang);

/*if (!fs.existsSync(dstFile)) {
    fs.writeFileSync(dstFile, jstext);
}
else {
    console.warn(`Lang file ${dstFile} just exists!`);
}*/

console.log(jstext)
/*function geni18n(url) {
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url;
    }
    else {
    	let prot = 'http'+(ENV.API_PORT===443?'s':'');
		return prot+'://' + url;
    }
}

try {

    process.stdout.write( geni18n() );

} catch (e) {
    console.log(e);
}
*/