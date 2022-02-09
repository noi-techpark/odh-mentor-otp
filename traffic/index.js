const express = require('express')
    , https = require('https')
    , _ = require('lodash')
    , cors = require('cors')
    , linkStationsConfig = require('./linkstation-config');

const pkg = require('./package.json')
    , serviceName = `service ${pkg.name} v${pkg.version}`
    , dotenv = require('dotenv').config()
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

var app = express();

var lastUpdate = Math.trunc((new Date()).getTime() / 1000 ),
    linkStationsReceived,
    stationsReceived;

console.log(`Starting ${serviceName}...`);

console.log("Config:\n", config);

if(!config.endpoints || _.isEmpty(config.endpoints)) {
    console.error('Config endpoints not defined!');
    return;
}

function getData() {
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    //TODO pass filter by bounding box
    getLinkGeometries();
    getStations();
}
getData();
setInterval(getData, config.polling_interval * 1000);


function getLinkStationLevel(linkId, value, mPeriod) {
    //return level of traffic from 0(not measured) to 3
    //TODO periods is only 600 now
    const vals = linkStationsConfig[ linkId ] || [];

    for (let level = 0; level < vals.length; level++) {

        const [period, minval, maxval] = vals[ level ];

        if (period != mPeriod) continue;
        //TODO check if this makes sense

        if (value >= minval && value <= maxval ) {
            return level + 1;
        }
    }
    return 0;
}

function getLinkGeometries() {
    const req = https.request(config.endpoints.geometries, res => {
            console.log(`TRAFFIC getLinkGeometries, response: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                linkStationsReceived = tmp.data;
            });
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

function getStations() {
    const req = https.request(config.endpoints.stations, res => {
            console.log(`TRAFFIC getStations, response: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);

                let stations = tmp['data']['LinkStation']['stations'];
                stationsReceived = Object.keys(stations).map(key => {
                    return {
                        id: key,
                        values: stations[key]['sdatatypes']['Bluetooth Elapsed time (test)']['tmeasurements']
                    }
                });
            });
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

app.get('/traffic/stations.json', cors(corsOptions),  function (req, res) {
    var stations = [];
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            if(stationsReceived[i].values){
                stations.push({
                    station_id: stationsReceived[i]['id'],
                    station_value: stationsReceived[i].values[0]['mvalue']

                    //TODO filter mvalue properties
                });
            }
        }
    }
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        data: {
            stations
        }
    }); 
});

app.get('/traffic/linkstations.json', cors(corsOptions), async function (req, res) {
//source: https://mobility.api.opendatahub.bz.it/v2/tree/LinkStation/*/latest?limit=-1&distinct=true&select=tmeasurements&where=sactive.eq.true,or(and(tname.eq.%22Bluetooth%20Elapsed%20time%20%5C(test%5C)%22))

    console.log('[traffic] request /traffic/linkstations.json')
    var linkstations = [];
    const stationsById = {};

    const mPeriod = Number(config.endpoints.stations.linkStationPeriod);
    //TODO can be picked from get params

    if(stationsReceived) {
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];
            if(station.values) {
                const vals = station.values.filter(val => val.mperiod===mPeriod)
                    , val = vals[0]?.mvalue || null;
                stationsById[ stationsReceived[i]['id'] ] = val;
            }
        }
    }

    if(linkStationsReceived) {
        for(var i = 0; i < linkStationsReceived.length; i++){
            var link = linkStationsReceived[i];

            if(link.ecode && link.egeometry) {

                const value = stationsById[link.ecode] || null;

                //geojson
                linkstations.push({
                    type: "Feature",
                    id: link.ecode,     //identify station
                    geometry: link.egeometry,
                    properties: {
                        period: mPeriod,
                        value,
                        level: getLinkStationLevel(link.ecode, value, mPeriod)
                    }
                });
            }
        }
    }

    linkstations = _.sortBy(linkstations, feature => {
        return feature.properties.level
    });

    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        data: {
            linkstations
        }
    });
});

app.listen(config.listen_port, function () {
    console.log( app._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
    console.log(`${serviceName} listening at http://localhost:${config.listen_port}`);
});