const express = require('express');
const https = require('https');
const _ = require('lodash');
const cors = require('cors')
const config = require('./config');

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
                        val: stations[key]["sdatatypes"]["Bluetooth Elapsed time (test)"]
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
            var station = stationsReceived[i].val;
            if(station["tmeasurements"]){
                trafficStations.push({
                    station_id: stationsReceived[i]['id'],
                    station_value: station['tmeasurements']

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

app.get('/traffic/linkstations.geojson', cors(corsOptions), function (req, res) {
    var linkStations = [];
    if(linkStationsReceived) {
        for(var i = 0; i < linkStationsReceived.length; i++){
            var link = linkStationsReceived[i];
            if(link.sactive && link.scoordinate && link.smetadata){
                linkStations.push({
                    type: "Feature",
                    id: link.ecode,     //identify station
                    geometry: link.egeometry
                });
            }
        }
    }
    res.json({
        version: "1.0",
        ttl: 0,        
        last_updated: lastUpdate,    
        "type": "FeatureCollection",
        "features": linkStations      
    });
});


var server = app.listen(config.server.port, function () {
   console.log("Listening on port ", config.server.port);
})
