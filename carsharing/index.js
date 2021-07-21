const express = require('express');
const https = require('https');
const _ = require('lodash');
const fs = require('fs');
const cors = require('cors');
const config = require('./config');

var app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

var lastUpdate = Math.trunc((new Date()).getTime() / 1000 ),
    stationsReceived,
    carReceived;

console.log("Start Carsharing OpenData Hub...")

console.log("Config:\n", config);

if(!config.endpoints || _.isEmpty(config.endpoints)) {
    console.error('Config endpoints not defined!');
    return;
}

function getData(){
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    getStations();
    getCars();
}
getData();
setInterval(getData, config.server.polling_interval * 1000);

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

function getCars(){
    const req = https.request(config.endpoints.cars, res => {
            //console.log(`BIKES: statusCode: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                var cars = tmp.data;
                carReceived = cars;
            });
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

app.get('/carsharing/stations.json', cors(corsOptions), function (req, res) {
    var carStations = [];
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];
            if(station.sactive && station.scoordinate && station.smetadata){
                var carVehicles = [];
                if(carReceived){
                    for(var j = 0; j < carReceived.length; j++){
                        var car = carReceived[j];
                        if(car.sactive && car.smetadata && car.pcoordinate && car.pcode === station.scode){
                            carVehicles.push({
                                id: car.scode,
                                name: car.sname,
                                model: car.sname ? car.sname.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").replace(/ /g, "-") : 'unknown',
                                plate: car.smetadata.licensePlate,
                                geoCoordinate: {
                                    latitude: car.pcoordinate.y,
                                    longitude: car.pcoordinate.x,
                                },
                                freeForRental: car.savailable,
                                fuelType: "unknown",
                                address: car.pname
                            })
                        }
                    }
                }
                carStations.push({
                    station_id: station.scode,
                    name: station.sname,
                    lat: station.scoordinate.y,
                    lon: station.scoordinate.x,
                    free: station.smetadata.availableVehicles || 0,
                    type: 'carsharing-hub',
                    networks: ['SUEDTIROL'],
                    vehicles: carVehicles
                })
            }
        }
    }
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        stations: carStations
    });
});


app.get('/carsharing/vehicles.json', function (req, res) {
    var carVehicles = [];
    if(carReceived){
        for(var i = 0; i < carReceived.length; i++){
            var car = carReceived[i];
            if(car.sactive && car.smetadata && car.pcoordinate){
                carVehicles.push({
                    id: car.scode,
                    name: car.sname,
                    plate: car.smetadata.licensePlate,
                    geoCoordinate: {
                        latitude: car.pcoordinate.y,
                        longitude: car.pcoordinate.x,
                    },
                    freeForRental: car.savailable,
                    fuelType: "unknown",
                    address: car.pname
                })
            }
        }
    }
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        vehicles: carVehicles
    });
});

app.get('/carsharing/regions.json', function (req, res) {
    let rawdata = fs.readFileSync('region.geojson');
    let region = JSON.parse(rawdata);
    res.json(region);
});


var server = app.listen(config.server.port, function () {
   console.log("Listening on port ", config.server.port);
})
