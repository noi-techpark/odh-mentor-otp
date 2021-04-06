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
    stationsReceived,
    linkStationsReceived;

console.log("Start Traffic OpenData Hub...")

console.log("Config:\n", config);

if(!config.endpoints || _.isEmpty(config.endpoints)) {
    console.error('Config endpoints not defined!');
    return;
}

function getData(){
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    
    //TODO pass filter by bounding box
    getLinkStations();

    getStations();    
}
getData();
setInterval(getData, config.server.polling_interval * 60 * 1000);

function getLinkStations(){
    const req = https.request(config.endpoints.geometries, res => {
            //console.log(`TRAFFIC: statusCode: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                var geometries = tmp.data;
                linkStationsReceived = geometries;
            });
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}
function getStations(){
    const req = https.request(config.endpoints.stations, res => {
            console.log(`STATIONS: statusCode: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                var stations = tmp.data;
                stationsReceived = stations;
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
            var station = stationsReceived[i];
            if(station.sactive && station.scoordinate && station.smetadata){
                trafficStations.push({
                    station_id: station.scode,
                    name: station.sname,
                    lat: station.scoordinate.y,
                    lon: station.scoordinate.x,
                    address: station.smetadata.mainaddress,
                    city: station.smetadata.municipality,
                    capacity: station.smetadata.capacity || 0,
                    free: station.mvalue || 0
                })
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
                    link_id: link.scode,
                    name: link.sname,
                    lat: link.scoordinate.y,
                    lon: link.scoordinate.x,
                    address: link.smetadata.group,
                    city: link.smetadata.municipality,
                    free: link.mvalue === 1 ? false : true
                })
            }
        }
    }
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        data: {
            sensors: linkStations
       }
    });
});


var server = app.listen(config.server.port, function () {
   console.log("Listening on port ", config.server.port);
})
