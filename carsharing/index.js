const express = require('express');
const https = require('https');
const _ = require('lodash');
const fs = require('fs');
const cors = require('cors');
const config = require('./config');
const yaml = require('js-yaml');

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

function getModelId(car) {
    const brand = _.trim(car.smetadata?.brand);
    return brand ? brand.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "").trim().replace(/ /g, "-") : 'unknown';
}

app.get('/carsharing/stations.json', cors(corsOptions), function (req, res) {
    var carStations = [];
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];
            if(station.sactive && station.scoordinate && station.smetadata){

                var carVehicles = [], carsModels = {};

                if(carReceived){
                    for(var j = 0; j < carReceived.length; j++){
                        var car = carReceived[j];
                        if(car.smetadata && car.pcoordinate && car.pcode === station.scode) {

                            const modelId = getModelId(car);

                            carsModels[ modelId ] = _.trim(car.smetadata?.brand);

                            carVehicles.push({
                                id: car.scode,
                                name: _.trim(car.smetadata?.brand),
                                model: modelId,
                                plate: car.smetadata.licensePlate,
                                geoCoordinate: {
                                    latitude: car.pcoordinate.y,
                                    longitude: car.pcoordinate.x,
                                },
                                freeForRental: car.sactive && car.savailable,
                                fuelType: "unknown",
                                address: car.pname
                            })
                        }
                    }
                }

                const groupVehicles = []
                    , groups = _.groupBy(carVehicles, 'model');

                for (const model in groups) {
                    let group = groups[model];
                    groupVehicles.push({
                        modelId: model,
                        modelName: group[0].name,
                        free: groups[model].filter(car => car.freeForRental).length,
                        count: groups[model].length
                    })
                }

                carStations.push({
                    station_id: station.scode,
                    name: station.sname,
                    lat: station.scoordinate.y,
                    lon: station.scoordinate.x,
                    free: station.smetadata.availableVehicles || 0,
                    type: 'carsharing-hub',
                    networks: ['SUEDTIROL'],

                    company: _.trim(station.smetadata.company.shortName),
                    bookahead: station.smetadata.bookahead ? 'yes' : 'no',

                    vehiclesModels: Object.keys(carsModels),
                    vehicles: carVehicles,

                    groupVehicles: _.reverse(_.sortBy(groupVehicles, 'free'))
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
            if(car.smetadata && car.pcoordinate){
                carVehicles.push({
                    id: car.scode,
                    name: car.sname,
                    model: getModelId(car),
                    plate: car.smetadata.licensePlate,
                    geoCoordinate: {
                        latitude: car.pcoordinate.y,
                        longitude: car.pcoordinate.x,
                    },
                    freeForRental: car.sactive && car.savailable,
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

app.get('/carsharing/filters.yml', cors(corsOptions), function (req, res) {
    const chargeStations = [];
    const chargeFilters = {};

    if(stationsReceived) {

        const carsModels = {};

        for(var j = 0; j < carReceived.length; j++){
            var car = carReceived[j];
            if(car.smetadata && car.pcoordinate) {

                const modelId = getModelId(car);

                carsModels[ modelId ] = _.trim(car.smetadata?.brand);
            }
        }

        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];

            chargeStations.push({
                company: _.trim(station.smetadata.company.shortName),
                bookahead: station.smetadata.bookahead ? 'yes' : 'no',
            });
        }

        for(let filterKey of Object.keys(chargeStations[0])) {

            const groups = _.groupBy(chargeStations, filterKey);

            chargeFilters[filterKey] = {
                enabled: true,
                label: `label_${filterKey.toLowerCase()}`,
                values: Object.keys(groups).map(key => {
                    return {
                        value: key,
                        enabled: true
                    }
                })
            }
        }

        chargeFilters['vehiclesModels'] = {
            enabled: true,
            label: 'label_vehicles_models',
            values: Object.entries(carsModels).map(carModel => {
                const [value, label] = carModel;
                return {
                    enabled: true,
                    value,
                    label
                }
            })
        }
    }

    const ymlText = yaml.dump({
        filters: chargeFilters
    });

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(ymlText);
});


app.listen(config.server.port, function () {
    console.log( app._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
    console.log(`listening at http://localhost:${config.server.port}`);
});
