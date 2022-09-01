const express = require('express');
const https = require('https');
const _ = require('lodash');
const cors = require('cors');

const GeoJSON = require('geojson');

const pkg = require('./package.json')
    , version = pkg.version
    , serviceName = `service ${pkg.name} v${version}`
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

if (config.envId == 'dev') {
    app.set('json spaces', 2);
}

const codes = require('./signs/codes.json');

const mapCodes = {};

codes.forEach(item => {
    item.img = `images/${item.code}.png`;
    mapCodes[item.code] = item;
});



var lastUpdate = Math.trunc((new Date()).getTime() / 1000 ),
    stationsReceived;

const stations = [];

console.log(`Starting ${serviceName}...`);

console.log("Config:\n", config);

if(!config.endpoints || _.isEmpty(config.endpoints)) {
    console.error('Config endpoints not defined!');
    return;
}

//TODO up to here MOVE in LIB module

function getData() {
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    getStations();
    //console.log('POLLING',stationsReceived)
}
getData();
setInterval(getData, config.polling_interval * 1000);

function formatData() {
    if(stationsReceived && stations.length === 0) {
        for(let i = 0; i < stationsReceived.length; i++){
            let station = stationsReceived[i];
            if(station.sactive && station.scoordinate && station.smetadata) {

                const type = `${station.smetadata.pmv_type}`;

                const img = mapCodes[type] ? mapCodes[type].img : '';
                //TODO default code
                //
                const title = mapCodes[type] ? mapCodes[type].title : '';

                stations.push({
                    station_id: station.scode,
                    name: station.sname,
                    lat: station.scoordinate.y,
                    lon: station.scoordinate.x,
                    origin: station.sorigin,
                    direction: Number(station.smetadata.direction_id),
                    //position: station.smetadata.position_m,
                    pmv_type: type,
                    title,
                    img
                })
            }
        }
    }
}

function getStations() {
    https.request(config.endpoints.stations, res => {
        var str = "";
        res.on('data', function (chunk) {
            str += chunk;
        }).on('end', function () {
            let tmp = JSON.parse(str);
            stationsReceived = tmp.data;
            formatData();
        });
    }).on('error', error => {
        console.error(error)
    }).end();
}

function getOneStation(scode=''){

    return new Promise((resolve, reject) => {

        if(scode==='') {
            reject(null)
            return
        }

        const reqOpts = Object.assign({}, config.endpoints.station, {
            path: _.template(config.endpoints.station.path)({scode})
        });

        https.request(reqOpts, res => {
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            }).on('end', function () {
                const tmp = JSON.parse(str);

                const opath = [
                    'VMS',
                    'stations',
                     scode,
                    'sdatatypes',
                    'esposizione',
                    'tmetadata'
                    ];
                _.set(tmp.data, opath, {});
                //remove unuseful big field

                resolve(tmp.data);
            });
        }).on('error', error => {
            reject(error)
        }).end();
    });
}

app.get('/vms/stations.json', cors(corsOptions), (req, res) => {

    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version,
        data: {
            stations
        }
    });
});

app.get('/vms/stations.geojson', cors(corsOptions), (req, res) => {

    const geo = GeoJSON.parse(stations, {
        Point: ['lat', 'lon']
    });

    res.json(geo);
});

//one station details
app.get('/vms/:scode/station.json', cors(corsOptions),  function (req, res) {

    const scode = req.params.scode;

    if (scode) {
        getOneStation(scode).then(data => {

            res.json({
                last_updated: lastUpdate,
                ttl: 0,
                version,
                data
            });
        });
    }
    else {
        res.status(400);
    }
});

app.use('/vms/images', express.static('signs/images'));

app.use('/vms/map.html', express.static('map.html'));

app.get('/vms/signs.json', cors(corsOptions),  function (req, res) {
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version,
        data: {
            signs: codes
        }
    });
});



app.get(['/','/vms'], async (req, res) => {
  res.send({
    status: 'OK',
    version
  });
});

app.listen(config.listen_port, function () {
    console.log( app._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
    console.log(`${serviceName} listening at http://localhost:${this.address().port}`);
});