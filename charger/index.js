const express = require('express');
const https = require('https');
const _ = require('lodash');
const config = require('./config');

var app = express();

var lastUpdate = Math.trunc((new Date()).getTime() / 1000 ),
    stationsReceived,
    plugsReceived;

console.log("Start Charger OpenData Hub...")

console.log("Config:\n", config);

if(!config.endpoints || _.isEmpty(config.endpoints)) {
    console.error('Config endpoints not defined!');
    return;
}

function getData(){
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    getStations();
    getPlugs();
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

function getPlugs(){
    const req = https.request(config.endpoints.plugs, res => {
            //console.log(`BIKES: statusCode: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                var plugs = tmp.data;
                plugsReceived = plugs;
            });
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

app.get('/charger/stations.json', function (req, res) {
    var chargeStations = [];
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];
            if(station.sactive && station.scoordinate && station.smetadata){
                var plugs = [];
                for(var j = 0; j < plugsReceived.length; j++){
                    var plug = plugsReceived[j];
                    if(station.scode === plug.pcode && plug.smetadata){
                        plugs.push({
                            plug_id: plug.scode,
                            name: plug.sname,
                            available: plug.mvalue === 1 ? true : false,
                            maxPower: (plug.smetadata.outlets && plug.smetadata.outlets.length > 0) ? plug.smetadata.outlets[0].maxPower : plug.smetadata.maxPower,
                            maxCurrent: (plug.smetadata.outlets && plug.smetadata.outlets.length > 0) ? plug.smetadata.outlets[0].maxCurrent : plug.smetadata.maxCurrent,
                            minCurrent: (plug.smetadata.outlets && plug.smetadata.outlets.length > 0) ? plug.smetadata.outlets[0].minCurrent : plug.smetadata.minCurrent,
                            outletTypeCode: (plug.smetadata.outlets && plug.smetadata.outlets.length > 0) ? plug.smetadata.outlets[0].outletTypeCode : plug.smetadata.outletTypeCode,
                        });
                    }
                }

                chargeStations.push({
                    station_id: station.scode,
                    name: station.sname,
                    lat: station.scoordinate.y,
                    lon: station.scoordinate.x,
                    provider: station.smetadata.provider,
                    address: station.smetadata.address,
                    city: (station.smetadata.municipality || station.smetadata.city).toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' '),
                    accessType: station.smetadata.accessType,
                    capacity: station.smetadata.capacity || plugs.length,
                    reservable: station.smetadata.reservable,
                    state: station.smetadata.state,
                    plugs: plugs
                });
            }
        }
    }
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        data: {
            stations: chargeStations
       }
    });
});

var server = app.listen(config.server.port, function () {
   console.log("Listening on port ", config.server.port);
})
