const express = require('express');
const https = require('https');
const _ = require('lodash');
const csv2json = require('csvtojson');
const config = require('./config');

var app = express();

var lastUpdate = Math.trunc((new Date()).getTime() / 1000 ),
    stationsReceived,
    baysReceived,
    bikesReceived;

console.log("Start GBFS OpenData Hub...")

console.log("Config:\n", config);

const GBFS_VERSION = "2.1";
let meranStations = [];

csv2json()
.fromFile("./bikestations_meran.csv")
.then((jsonObj)=>{
    meranStations= jsonObj;
})

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

app.get('/:context/:version/gbfs.json', function (req, res) {
    let context = req.params.context;

    if(!req.params.version){
        req.params.version = 1;
    }

    let version = +(req.params.version);


    if(version != 1 && version !=2.1 ){
        res.status(500).send({ error: "wrong version" });
        return;
    }

    if(context != "bz" && context!="me" && context != "papin"){
        res.status(500).send({ error: "wrong context" });
        return;
    }

    var protocol = req.protocol;
    var host = req.get("x-forwarded-host") || req.get('host');
    if(host.indexOf(":443") > -1){
        protocol = "https";
    }

    var url = protocol + '://' + host + "/" + context + "/"+version;
    var feeds = [
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
            name: "system_regions.json",
            url: url+"/system_regions.json"
        },
        {
            name: "system_hours.json",
            url: url+"/system_hours.json"
        }
    ];

    if(version >= 2.1 ){
        feeds.push({
            name: "gbfs_versions.json",
            url: url+"/gbfs_versions.json"
        });
        feeds.push({
            name: "vehicle_types.json",
            url: url+"/vehicle_types.json"
        });
    }

    if(context === 'me'){
        feeds.push({
            name: "free_bike_status",
            url: url+"/free_bike_status.json"
        });
    }
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: version >= 2.1 ? ""+version : undefined,
        data: {
            en: {
               feeds: feeds
           }
       }
    });
});

app.get('/:context/:version/gbfs_versions.json', function (req, res) {
    let context = req.params.context;
    if(!req.params.version){
        req.params.version = 1;
    }

    let version = +(req.params.version);


    if(version < 2.1 ){
        res.status(500).send({ error: "wrong version" });
        return;
    }
    if(context != "bz" && context!="me" && context != "papin"){
        res.status(500).send({ error: "wrong context" });
        return;
    }
    var url = req.protocol + '://' + (req.get("x-forwarded-host") || req.get('host')) + "/" + context;

    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: version >= 2.1 ? ""+version : undefined,
        data: {
            versions: [
                {
                version: "1.0",
                url:url+"/1/gbfs.json"
              },
              {
                version: "2.1",
                url:url+"/2.1/gbfs.json"
              }
            ]
        }
    });
});

app.get('/:context/:version/system_regions.json', function (req, res) {
    let context = req.params.context;
    if(!req.params.version){
        req.params.version = 1;
    }

    let version = +(req.params.version);


    if(version != 1 && version !=2.1 ){
        res.status(500).send({ error: "wrong version" });
        return;
    }
    if(context != "bz" && context!="me" && context != "papin"){
        res.status(500).send({ error: "wrong context" });
        return;
    }
    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: version >= 2.1 ? ""+version : undefined,
        data: {
            regions: [
                {
                    region_id: "BZ",
                    region_name: "Bolzano - Bozen"
                },
                {
                    region_id: "ME",
                    region_name: "Merano - Meran"
                },
                {
                    region_id: "PAPIN",
                    region_name: "Papin - Rent a bike"
                }
            ]
        }
    });
});

app.get('/:context/:version/vehicle_types.json', function (req, res) {
    let context = req.params.context;
    if(!req.params.version){
        req.params.version = 1;
    }

    let version = +(req.params.version);


    if(version < 2.1 ){
        res.status(500).send({ error: "wrong version" });
        return;
    }
    if(context != "bz" && context!="me" && context != "papin"){
        res.status(500).send({ error: "wrong context" });
        return;
    }
    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: version >= 2.1 ? ""+version : undefined,
        data: {
            vehicle_types: [
                {
                vehicle_type_id: "bike",
                form_factor: "bicycle",
                propulsion_type: "human",
                name: "Bicycle"
                },
                {
                vehicle_type_id: "e-bike",
                form_factor: "bicycle",
                propulsion_type: "electric_assist",
                name: "E-Bike",
                max_range_meters: 20000
                }
            ]
        }
    });
});

app.get('/:context/:version/system_information.json', function (req, res) {
    let context = req.params.context;
    if(!req.params.version){
        req.params.version = 1;
    }

    let version = +(req.params.version);


    if(version != 1 && version !=2.1 ){
        res.status(500).send({ error: "wrong version" });
        return;
    }
    if(context != "bz" && context!="me" && context != "papin"){
        res.status(500).send({ error: "wrong context" });
        return;
    }
    var systemId = "odh_bikesharing";
    var systemName = "Bikesharing ";
    var url = "";
    var androidUri = undefined;
    var iosUri = undefined;
    var hasApp = false;
    if(context === "bz"){
        systemId += "_bz";
        systemName += " Bolzano";
        if(config.uri && config.uri.bozen){
            androidUri = config.uri.bozen.android;
            iosUri = config.uri.bozen.ios;
    	    url = config.uri.bozen.web;
        }

    }
    if(context === "me"){
        systemId += "_me";
        systemName += " Merano";
        if(config.uri && config.uri.meran){
            androidUri = config.uri.meran.android;
            iosUri = config.uri.meran.ios;
            url = config.uri.meran.web;
        }
    }

    if(context === "papin"){
        systemId += "_papin";
        systemName += " Papin";
        if(config.uri && config.uri.papin){
            androidUri = config.uri.papin.android;
            iosUri = config.uri.papin.ios;
            url = config.uri.papin.web;
        }
    }

    if(androidUri || iosUri){
        hasApp = true;
    }

    var obj = {
        last_updated: lastUpdate,
        ttl: 0,
        version: version >= 2.1 ? ""+version : undefined,
        data: {
            system_id: systemId,
            language: "it",
            name: systemName,
            timezone: "Europe/Rome",
            url: url,
            purchase_url: url
        }
    }

    if(hasApp) {
         obj.data.rental_apps = {};
        if(androidUri){
            obj.data.rental_apps.android = {store_uri: androidUri};
        }

        if(iosUri){
            obj.data.rental_apps.ios = {store_uri: iosUri};
        }
    }

    res.json(obj);
});

function toHex(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    return result;
  }

app.get('/:context/:version/station_information.json', function (req, res) {
    var stations = [];
    let context = req.params.context;
    if(!req.params.version){
        req.params.version = 1;
    }

    let version = +(req.params.version);


    if(version != 1 && version !=2.1 ){
        res.status(500).send({ error: "wrong version" });
        return;
    }
    if(context != "bz" && context!="me" && context != "papin"){
        res.status(500).send({ error: "wrong context" });
        return;
    }

    if(context === "bz"){
        if(stationsReceived){
            for(var i = 0; i < stationsReceived.length; i++){
                var station = stationsReceived[i];
                if(station.sorigin === "BIKE_SHARING_BOLZANO" && station.sactive && station.savailable && station.scoordinate && station.smetadata){
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

    if(context === "papin"){
        if(stationsReceived){
            for(var i = 0; i < stationsReceived.length; i++){
                var station = stationsReceived[i];
                if(station.sorigin === "BIKE_SHARING_PAPIN" && station.sactive && station.savailable && station.scoordinate && station.smetadata){
                    var openingHours = null;
                    if(station.smetadata.startHour && station.smetadata.startHour != "" &&
                        station.smetadata.endHour && station.smetadata.endHour != ""
                    ){
                        if(station.smetadata.lunchBreakStart && station.smetadata.lunchBreakStart != "" &&
                            station.smetadata.lunchBreakEnd && station.smetadata.lunchBreakEnd != ""
                        ){
                            openingHours = "Mo-Su "+station.smetadata.startHour+"-"+station.smetadata.lunchBreakStart;
                            openingHours += ", Mo-Su "+station.smetadata.lunchBreakEnd+"-"+station.smetadata.endHour

                        }else{
                            openingHours = "Mo-Su "+station.smetadata.startHour+"-"+station.smetadata.endHour;
                        }

                    }
                    stations.push({
                        station_id: station.scode.replace("BIKE_SHARING_PAPIN:", ""),
                        name: station.sname,
                        lat: station.scoordinate.y,
                        lon: station.scoordinate.x,
                        region_id: "PAPIN",
                        station_opening_hours: openingHours
                    })
                }
            }
        }
    }



    if(context === "me"){
        //ADD MERAN STATIONS (Drop-off stations)
        for(var k = 0; k < meranStations.length; k++){
		    var station = meranStations[k];
            var obj = {
                station_id: station.id,
                name: station.name.replace(/_/, "/"),
                lat: parseFloat(station.lat),
                lon: parseFloat(station.lng),
                address: station.full_address,
                region_id: "ME",
	            is_virtual_station: true,
    			station_area: {
    				type: "Polygon",
    				coordinates: station.polygon.split(", ").map(item => {
    					return item.replace(/(\(|\))/g, '').split(",").map(elem => {return parseFloat(elem);});
    				})
    			}
            };
            stations.push(obj);
        }
    }



    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: version >= 2.1 ? ""+version : undefined,
        data: {
            stations: stations
        }
    });
});

app.get('/:context/:version/station_status.json', function (req, res) {
    let context = req.params.context;
    if(!req.params.version){
        req.params.version = 1;
    }

    let version = +(req.params.version);


    if(version != 1 && version !=2.1 ){
        res.status(500).send({ error: "wrong version" });
        return;
    }
    if(context != "bz" && context!="me" && context != "papin"){
        res.status(500).send({ error: "wrong context" });
        return;
    }
    var stations = [];

    if(context === "bz"){
        if(stationsReceived){
            for(var i = 0; i < stationsReceived.length; i++){
                var station = stationsReceived[i];
                if(station.sactive && station.savailable && station.sorigin === "BIKE_SHARING_BOLZANO"){
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
                            var bikeAvailableStandard = 0;
                            var bikeAvailableElectric = 0;
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
                                                    if(bike.smetadata && bike.smetadata.electric){
                                                        bikeAvailableElectric++;
                                                    }else{
                                                        bikeAvailableStandard++;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            obj.num_docks_available = dockAvailable;
                            obj.num_bikes_available = bikeAvailable;
                            obj.num_docks_disabled = dockDisabled;
                            // obj.vehicle_docks_available = [{
                            //     vehicle_type_ids: ["bike", "e-bike"],
                            //     count: dockAvailable
                            // }];
                            obj.vehicle_types_available = [{
                                vehicle_type_ids: ["bike"],
                                count: bikeAvailableStandard
                            },
                            {
                                vehicle_type_ids: ["e-bike"],
                                count: bikeAvailableElectric
                            }

                            ]
                        }
                    }
                    if(obj.num_bikes_available >= 0 ){
                        stations.push(obj)
                    }
                }

            }
        }
    }

    if(context === "papin"){
        if(stationsReceived){
            for(var i = 0; i < stationsReceived.length; i++){
                var station = stationsReceived[i];
                if(station.sactive && station.savailable && station.sorigin === "BIKE_SHARING_PAPIN"){
                    var obj = {
                        station_id: station.scode.replace("BIKE_SHARING_PAPIN:", ""),
                        is_renting: true,
                        is_installed: true,
                        is_returning: true,
                        num_docks_available: 100,
                        num_bikes_available: 100,
                        last_reported: lastUpdate
                    };
                    stations.push(obj);
                }

            }
        }
    }

    if(context === "me"){
        //ADD MERAN STATIONS (Drop-off stations)
        for(var k = 0; k < meranStations.length; k++){
            var station = meranStations[k];
            var obj = {
                station_id: station.id,
                num_bikes_available: 0,
                is_renting: false,
                is_returning: true,
                num_docks_available: 1000,
                last_reported: lastUpdate
            };
            stations.push(obj);
        }
    }

    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: version >= 2.1 ? ""+version : undefined,
        data: {
            stations: stations
        }
    });
});

app.get('/:context/:version/free_bike_status.json', function (req, res) {
    let context = req.params.context;
    if(!req.params.version){
        req.params.version = 1;
    }

    let version = +(req.params.version);


    if(version != 1 && version !=2.1 ){
        res.status(500).send({ error: "wrong version" });
        return;
    }
    if(context != "bz" && context!="me" && context != "papin"){
        res.status(500).send({ error: "wrong context" });
        return;
    }
    var bikes = [];
    if(context === "me"){
        if(bikesReceived){
            for(var i = 0; i < bikesReceived.length; i++){
                var bike = bikesReceived[i];
                if(!bike.pcode && bike.sactive){
                    var station = meranStations.find((elem) => elem.name === bike.smetadata.location_parking_name);
                    bikes.push({
                        bike_id: bike.scode,
                        lat: bike.scoordinate.y,
                        lon: bike.scoordinate.x,
                        is_reserved: bike.smetadata["future-availability"] == 0,
                        is_disabled: bike.smetadata["in-maintenance"] == 1,
                        vehicle_type_id: "bike",
                        station_id: station ? station.id: null
                    });
                }
            }
        }
    }

    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: version >= 2.1 ? ""+version : undefined,
        data: {
            bikes: bikes
        }
    });
});

app.get('/:context/:version/system_hours.json', function (req, res) {
    let context = req.params.context;
    if(!req.params.version){
        req.params.version = 1;
    }

    let version = +(req.params.version);


    if(version != 1 && version !=2.1 ){
        res.status(500).send({ error: "wrong version" });
        return;
    }
    if(context != "bz" && context!="me" && context != "papin"){
        res.status(500).send({ error: "wrong context" });
        return;
    }
    var rental_hours = [];
    if(context === "me" || context === "bz"){
        rental_hours.push({
            user_types: [ "member", "nonmember" ],
            days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
            start_time: "00:00:00",
            end_time: "23:59:59"
        });
    }

    res.json(
    {
        last_updated: lastUpdate,
        ttl: 0,
        version: version >= 2.1 ? ""+version : undefined,
        data: {
            rental_hours: rental_hours
        }
    });
});

app.listen(config.server.port, function () {
    console.log(`listening at http://localhost:${config.server.port}`);
});

