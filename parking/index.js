const express = require('express');
const https = require('https');
const _ = require('lodash');
const config = require('./config');

var app = express();

var lastUpdate = Math.trunc((new Date()).getTime() / 1000 ),
    stationsReceived,
    sensorsReceived;

console.log("Start Parking OpenData Hub...")

console.log("Config:\n", config);

if(!config.endpoints || _.isEmpty(config.endpoints)) {
    console.error('Config endpoints not defined!');
    return;
}

function getData(){
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    getStations();
    getSensors();
}
getData();
setInterval(getData, config.server.polling_interval * 60 * 1000);

function getStations(){
    const req = https.request(config.endpoints.stations, res => {
            //console.log(`STATIONS: statusCode: ${res.statusCode}`)
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

function getSensors(){
    const req = https.request(config.endpoints.sensors, res => {
            //console.log(`BIKES: statusCode: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                var sensors = tmp.data;
                sensorsReceived = sensors;
            });
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

app.get('/parking/stations.json', function (req, res) {
    var parkingStations = [];
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];
            if(station.sactive && station.scoordinate && station.smetadata){
                parkingStations.push({
                    station_id: station.scode,
                    name: station.sname,
                    lat: station.scoordinate.y,
                    lon: station.scoordinate.x,
                    address: station.smetadata.mainaddress,
                    city: station.smetadata.municipality,
                    capacity: station.smetadata.capacity || 0,
                    free: station.smetadata.availability || 0
                })
            }
        }
    }
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        data: {
            stations: parkingStations
       }
    });
});

app.get('/parking/sensors.json', function (req, res) {
    var parkingSensors = [];
    if(sensorsReceived){
        for(var i = 0; i < sensorsReceived.length; i++){
            var sensor = sensorsReceived[i];
            if(sensor.sactive && sensor.scoordinate && sensor.smetadata){
                parkingSensors.push({
                    sensor_id: sensor.scode,
                    name: sensor.sname,
                    lat: sensor.scoordinate.y,
                    lon: sensor.scoordinate.x,
                    address: sensor.smetadata.group,
                    city: sensor.smetadata.municipality,
                    capacity: sensor.smetadata.capacity || 0,
                    free: sensor.smetadata.availability || 0
                })
            }
        }
    }
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        data: {
            sensors: parkingSensors
       }
    });
});


var server = app.listen(config.server.port, function () {
   console.log("Listening on port ", config.server.port);
})
