
const _ = require('lodash');
const cors = require('cors');

const dotenv = require('dotenv').config()
    , config = require('@stefcud/configyml');

//normalize endpoints default
config.endpoints = _.mapValues(config.endpoints, conf => {
    return _.defaults(conf, config.endpoints.default);
});
delete config.endpoints.default;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


module.exports = {

    getConfig: () => {
        return {
            cors: corsOptions
        };
    },

    getService: () => {

        const pkg = require('./package.json');

        return {
            version: pkg.version,
            serviceName: `service ${pkg.name} v${version}`
        };
    },

/*    onInit: app => {
        console.log(`Starting ${serviceName}...`);
        console.log("Config:\n", config);
    },*/

    goListen: app => {

app.listen(config.listen_port, onListen(app) );
        const {name, version} = require('./package.json');
        const serviceName = `service ${name} v${version}`;
        return () => {
            console.log( app._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
            console.log(`${serviceName} listening at http://localhost:${this.address().port}`);
        }
    }
};