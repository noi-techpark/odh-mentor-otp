const express = require('express');
const https = require('https');
const _ = require('lodash');
const cors = require('cors')
const config = require('./config');
const yaml = require('js-yaml');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

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

function isInBbox(bb, p){
    //ix, iy are the bottom left coordinates
    //ax, ay are the top right coordinates
    if(!bb){
        return true;
    }
    if( bb.ix <= p.x && p.x <= bb.ax && bb.iy <= p.y && p.y <= bb.ay ) {
     return true;
    }
    return false;
}

app.get('/charger/stations.json', cors(corsOptions), function (req, res) {
    var chargeStations = [];
    let bbox = null;
    if(req.query && req.query.bbox){

        let mbbox = req.query.bbox.split(",");
        if(mbbox.length === 4){
            bbox = {
                ix: mbbox[0],
                iy: mbbox[1],
                ax: mbbox[2],
                ay: mbbox[3]
            }
        }else{
            res.status(403).send("bbox parameter not valid.");
            return;
        }
    }

    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];
            if(station.sactive && station.scoordinate && station.smetadata && isInBbox(bbox, station.scoordinate)){
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
                    free: plugs.filter(p => p.available).length,
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

app.get('/charger/filters.yaml', cors(corsOptions), function (req, res) {
    const chargeStations = [];
    const chargeFilters = {};

    if(stationsReceived) {
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];

            chargeStations.push({
                provider: station.smetadata.provider,
                //city: (station.smetadata.municipality || station.smetadata.city).toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' '),
                accessType: station.smetadata.accessType,
                reservable: station.smetadata.reservable,
                state: station.smetadata.state
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
    }

    const ymlText = yaml.dump({
        filters: chargeFilters
    })

    res.end(ymlText);
});

app.listen(config.server.port, function () {
    console.log( app._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
    console.log(`listening at http://localhost:${config.server.port}`);
});
