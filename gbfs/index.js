const express = require('express');
const https = require('https');
const _ = require('lodash');
const config = require('./config');

var app = express();

var lastUpdate = Math.trunc((new Date()).getTime() / 1000 ),
    stationsReceived,
    baysReceived,
    bikesReceived;

console.log("Start GBFS OpenData Hub...")

console.log("Config:\n", config);

if(!config.endpoints || _.isEmpty(config.endpoints)) {
    console.error('Config endpoints not defined!');
    return;
}

function getData(){
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    getStations();
    getBays();
    getBikes();
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

function getBikes(){
    const req = https.request(config.endpoints.bikes, res => {
            //console.log(`BIKES: statusCode: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                var bikes = tmp.data;
                bikesReceived = bikes;
            });
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

function getBays(){
    const req = https.request(config.endpoints.bays, res => {
            //console.log(`BAYS: statusCode: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                var bays = tmp.data;
                baysReceived = bays;
            });
        })

    req.on('error', error => {
        console.error("ERROR", error)
    })

    req.end()
}

app.get('/:context/gbfs.json', function (req, res) {
    let context = req.params.context;
    if(context != "bz" && context!="me"){
        res.status(500).send({ error: "wrong context" });
    }
    var url = req.protocol + '://' + req.get('host') + "/" + context;
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "2.0",
        data: {
            it: {
               feeds: [
                   {
                       name: "system_information",
                       url: url+"/system_information.json"
                   },
                   {
                       name: "station_information",
                       url: url+"/station_information.json"
                   },
                   {
                       name: "station_status",
                       url: url+"/station_status.json"
                   },
                   {
                       name: "free_bike_status",
                       url: url+"/free_bike_status.json"
                   },
                   {
                       name: "system_regions.json",
                       url: url+"/system_regions.json"
                   }
               ]
           }
       }
    });
});

app.get('/:context/system_regions.json', function (req, res) {
    let context = req.params.context;
    if(context != "bz" && context!="me"){
        res.status(500).send({ error: "wrong context" });
    }
    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: "2.0",
        data: {
            regions: [
                {
                    region_id: "BZ",
                    region_name: "Bolzano - Bozen"
                },
                {
                    region_id: "ME",
                    region_name: "Merano - Meran"
                }
            ]
        }
    });
});

app.get('/:context/system_information.json', function (req, res) {
    let context = req.params.context;
    if(context != "bz" && context!="me"){
        res.status(500).send({ error: "wrong context" });
    }
    var systemId = "odh_bikesharing";
    var systemName = "Bikesharing "
    if(context === "bz"){
        systemId += "_bz";
        systemName += " Bolzano";
    }
    if(context === "me"){
        systemId += "_me";
        systemName += " Merano";
    }

    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: "2.0",
        data: {
            system_id: systemId,
            language: "it",
            name: systemName,
            timezone: "Europe/Rome"
        }
    });
});

function toHex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }

app.get('/:context/station_information.json', function (req, res) {
    var stations = [];
    let context = req.params.context;
    if(context != "bz" && context!="me"){
        res.status(500).send({ error: "wrong context" });
    }

    if(context === "bz"){
        if(stationsReceived){
            for(var i = 0; i < stationsReceived.length; i++){
                var station = stationsReceived[i];
                if(station.sactive && station.savailable){
                    stations.push({
                        station_id: station.scode,
                        name: station.sname,
                        lat: station.scoordinate.y,
                        lon: station.scoordinate.x,
                        address: station.smetadata.address,
                        region_id: "BZ",
                        capacity: station.smetadata["total-bays"] || null
                    })
                }
            }
        }
    }

    if(context === "me"){
        //ADD MERAN STATIONS (Drop-off stations)
        if(bikesReceived){
            for(var k = 0; k < bikesReceived.length; k++){
                var bike = bikesReceived[k];
                if(!bike.pcode && bike.smetadata.location_name){
                    var obj = {
                        station_id: toHex(bike.smetadata.location_name),
                        name: bike.smetadata.location_parking_name || bike.smetadata.location_name,
                        lat: bike.smetadata.location_lat,
                        lon: bike.smetadata.location_lng,
                        address: bike.smetadata.location_street,
                        region_id: "ME"
                    };
                    var found = false;
                    for(var x = 0; x < stations.length; x++){
                        if(stations[x].station_id === obj.station_id){
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        stations.push(obj);
                    }
                }
            }
        }
    }



    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: "2.0",
        data: {
            stations: stations
        }
    });
});

app.get('/:context/station_status.json', function (req, res) {
    let context = req.params.context;
    if(context != "bz" && context!="me"){
        res.status(500).send({ error: "wrong context" });
    }
    var stations = [];

    if(context === "bz"){
        if(stationsReceived){
            for(var i = 0; i < stationsReceived.length; i++){
                var station = stationsReceived[i];
                if(station.sactive && station.savailable){
                    var obj = {
                        station_id: station.scode,
                        is_renting: true,
                        is_installed: true,
                        is_returning: true,
                        num_docks_available: 0,
                        last_reported: lastUpdate
                    };

                    if(station.smetadata.bikes){
                        obj.num_bikes_available = station.smetadata.bikes["number-available"];
                    }else{
                        if(baysReceived){
                            var dockAvailable = 0;
                            var dockDisabled = 0;
                            var bikeAvailable = 0;
                            dockAvailable = station.smetadata["total-bays"];
                            for(var j = 0; j < baysReceived.length; j++){
                                var bay = baysReceived[j];
                                if(baysReceived[j].pcode === station.scode){
                                    if(!bay.savailable){
                                        dockDisabled++;
                                        dockAvailable--;
                                    }
                                    if(bikesReceived){
                                        for(var k = 0; k < bikesReceived.length; k++){
                                            var bike = bikesReceived[k];
                                            if(bike.pcode === bay.scode){
                                                if(bike.savailable){
                                                    bikeAvailable++;
                                                    dockAvailable--;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            obj.num_docks_available = dockAvailable;
                            obj.num_bikes_available = bikeAvailable;
                            obj.num_docks_disabled = dockDisabled;
                        }
                    }
                    if(obj.num_bikes_available >= 0 ){
                        stations.push(obj)
                    }
                }

            }
        }
    }

    if(context === "me"){
        //ADD MERAN STATIONS (Drop-off stations)
        if(bikesReceived){
            for(var k = 0; k < bikesReceived.length; k++){
                var bike = bikesReceived[k];
                if(!bike.pcode && bike.smetadata.location_name){
                    var obj = {
                        station_id: toHex(bike.smetadata.location_name),
                        num_bikes_available: 0,
                        is_renting: false,
                        is_returning: true,
                        num_docks_available: 1000,
                        last_reported: lastUpdate
                    };
                    var found = false;
                    for(var x = 0; x < stations.length; x++){
                        if(stations[x].station_id === obj.station_id){
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        stations.push(obj);
                    }
                }
            }
        }
    }

    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: "2.0",
        data: {
            stations: stations
        }
    });
});

app.get('/:context/free_bike_status.json', function (req, res) {
    let context = req.params.context;
    if(context != "bz" && context!="me"){
        res.status(500).send({ error: "wrong context" });
    }
    var bikes = [];
    if(context === "me"){
        if(bikesReceived){
            for(var i = 0; i < bikesReceived.length; i++){
                var bike = bikesReceived[i];
                if(!bike.pcode && bike.savailable && bike.sactive){
                    bikes.push({
                        bike_id: bike.scode,
                        lat: bike.scoordinate.y,
                        lon: bike.scoordinate.x,
                        is_reserved: bike.smetadata["future-availability"] == 0,
                        is_disabled: bike.smetadata["in-maintenance"] == 1
                    });
                }
            }
        }
    }

    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: "2.0",
        data: {
            bikes: bikes
        }
    });
});


var server = app.listen(config.server.port, function () {
   console.log("Listening on port ", config.server.port);
})
