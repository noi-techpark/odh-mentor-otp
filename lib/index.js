
const _ = require('lodash');
const cors = require('cors');
const circleToPolygon = require('./circle-polygon');

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
        };
    },

    getService: () => {

        const pkg = require('./package.json');

        return {
            version: pkg.version,
            serviceName: `service ${pkg.name} v${version}`
        };
    }
};