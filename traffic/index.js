const express = require('express')
    , https = require('https')
    , _ = require('lodash')
    , cors = require('cors')
    , config = require('./config');

//https://raw.githubusercontent.com/noi-techpark/it.bz.opendatahub.analytics/master/src/main/webapp/linkstation-config.json
//
const linkStationsConfig = require('./linkstation-config.json');

function linkStationGetColor(id, value) {
    const color = null;

/* 'terme_est->terme_ovest': [
    [ '#00ff00', 'Bluetooth Elapsed time (test)', 600, 0, 150 ],
    [ '#ffff00', 'Bluetooth Elapsed time (test)', 600, 151, 350 ],
    [ '#ff0000', 'Bluetooth Elapsed time (test)', 600, 351, 999999 ]
  ],
  'terme_ovest->liberta-corse': [
    [ '#00ff00', 'Bluetooth Elapsed time (test)', 600, 0, 100 ],
    [ '#ffff00', 'Bluetooth Elapsed time (test)', 600, 101, 200 ],
    [ '#ff0000', 'Bluetooth Elapsed time (test)', 600, 201, 999999 ]
  ],
*/
    const vals = linkStationsConfig[id] || [];

    for (let val of vals) {

        const [color,,period,minval,maxval] = val;

        if(value >= minval && value <= maxval ) {
            return color;
        }
    }

    return color;
}
//
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var app = express();

var lastUpdate = Math.trunc((new Date()).getTime() / 1000 ),
    linkStationsReceived,
    stationsReceived;

console.log("Start Traffic OpenData Hub...")

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
setInterval(getData, config.server.polling_interval * 60 * 1000);

function getLinkGeometries() {
    const req = https.request(config.endpoints.geometries, res => {
            console.log(`TRAFFIC geometries: statusCode: ${res.statusCode}`)
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
            console.log(`TRAFFIC stations: statusCode: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                let stations = tmp["data"]["LinkStation"]["stations"];
                stationsReceived = Object.keys(stations).map(key => {
                    return {
                        id: key,
                        values: stations[key]["sdatatypes"]["Bluetooth Elapsed time (test)"]['tmeasurements']
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
    var trafficStations = [];
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            if(stationsReceived[i].values){
                trafficStations.push({
                    station_id: stationsReceived[i]['id'],
                    station_value: stationsReceived[i].values[0]['mvalue']//600 period

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
            stations: trafficStations
        }
    }); 
});
/*
app.get('/traffic/linkstations.geojson', cors(corsOptions), function (req, res) {
    var linkStations = [];
    if(linkStationsReceived) {
        for(var i = 0; i < linkStationsReceived.length; i++){
            var link = linkStationsReceived[i];
            //console.log('LINK',link)
            if(link.ecode && link.egeometry) {
                linkStations.push({
                    type: "Feature",
                    id: link.ecode,     //identify station
                    geometry: link.egeometry,
                });
            }
        }
    }
    res.json({
        version: "1.0",
        ttl: 0,        
        last_updated: lastUpdate,
        //TODO maybe use format {data:{...}}
        "type": "FeatureCollection",
        "features": linkStations
    });
});*/

app.get('/traffic/all.json', cors(corsOptions), async function (req, res) {

    const stations = [];
    const stationsById = {};
//https://mobility.api.opendatahub.bz.it/v2/tree/LinkStation/*/latest?limit=-1&distinct=true&select=tmeasurements&where=sactive.eq.true,or(and(tname.eq.%22Bluetooth%20Elapsed%20time%20%5C(test%5C)%22))
/*
    values: [
    {
        mperiod: 600,
        mtransactiontime: "2020-01-09 02:14:42.322+0000",
        mvalidtime: "2021-11-25 14:55:00.000+0000",
        mvalue: 119,
    },
    {
        mperiod: 900,
        mtransactiontime: "2019-10-12 18:27:28.973+0000",
        mvalidtime: "2021-11-25 14:52:30.000+0000",
        mvalue: 119,
    },
    {
        mperiod: 3600,
        mtransactiontime: "2020-01-18 21:54:13.328+0000",
        mvalidtime: "2021-11-25 14:30:00.000+0000",
        mvalue: 184,
    },
],*/
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i].val;
            if(station["tmeasurements"]) {

                const value600 = station['tmeasurements']
                    .filter(val => val.mperiod===600)[0]['mvalue'] || undefined;


                const value = Number(value600);
                stationsById[ stationsReceived[i]['id'] ] = value
            }
        }
    }

    var linkStations = [];
    if(linkStationsReceived) {
        for(var i = 0; i < linkStationsReceived.length; i++){
            var link = linkStationsReceived[i];

            if(link.ecode && link.egeometry) {
                linkStations.push({
                    type: "Feature",
                    id: link.ecode,     //identify station
                    //geometry: link.egeometry,
                    properties: {
                        value: stationsById[link.ecode] || null
                        //TODO station_value
                    }
                });
            }
        }
    }
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        data: {
            //stations,
            linkStations
        }
    });
});

app.listen(config.server.port, function () {
    console.log( app._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
    console.log(`listening at http://localhost:${config.server.port}`);
});
