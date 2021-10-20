const express = require('express')
, axios = require('axios').default
, _ = require('lodash')
, cors = require('cors')
, protobuf = require("protobufjs")
, polyline = require('@mapbox/polyline')
, {createGtfsFlex} = require('./csv')
, config = require('./config');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var app = express();

var lastUpdate = Math.trunc((new Date()).getTime() / 1000 );

console.log("Start DRT OpenData Hub...")

console.log("Config:\n", config);

if(!config.endpoints || _.isEmpty(config.endpoints)) {
    console.error('Config endpoints not defined!');
    return;
}

async function generateProto(vehicles){
    const root = await protobuf.load("gtfs-realtime.proto");
    const GtfsRT = root.lookupType("transit_realtime.FeedMessage");
    const payload = {
        header: {
            gtfsRealtimeVersion: "2.0",
            incrementality: 0,
            timestamp: Math.trunc((new Date()).getTime() / 1000)
        },
        entity: []
    };
    for (const vehicle of vehicles) {
        payload.entity.push({
            vehicle, id: vehicle.vehicle.id
        });
    }
    // Create a new message
    var message = GtfsRT.create(payload); // or use .fromObject if conversion is necessary
    // Encode a message to an Uint8Array (browser) or Buffer (node)
    const buffer = GtfsRT.encode(message).finish();
    return buffer;
};

async function getData(){
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    return await getVehicle();
}

async function getDataStop(){
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    return await getStops();
}

//setInterval(getData, config.server.polling_interval * 1000);

async function getVehicle(){
    return await axios({
        method: config.endpoints.vehicle.method,
        url: `${config.endpoints.vehicle.port === 443 ? 'https' : 'http'}://${config.endpoints.vehicle.hostname}${config.endpoints.vehicle.path}`,
        responseType: 'json'        
    })
}

async function getStops(){
    return await axios({
        method: config.endpoints.stops.method,
        url: `${config.endpoints.stops.port === 443 ? 'https' : 'http'}://${config.endpoints.stops.hostname}${config.endpoints.stops.path}`,
        responseType: 'json'        
    })
}

function generateEntities(vehicle){
    const entities = [];

    for (const item of vehicle.data) {
        let capacityMax = 0;
        let capacityUsed = 0;
        for (const [key, value] of Object.entries(item.smetadata.capacityMax)) {
            capacityMax += value
        }
        for (const [key, value] of Object.entries(item.smetadata.capacityUsed)) {
            capacityUsed += value
        }
        let occupancyStatus = 5; //FULL
        if(capacityMax > 0){
            const percentage = 100 * capacityUsed / capacityMax;
            if(percentage === 0){ 
                occupancyStatus = 0;  //EMPTY
            } else if ( percentage <= 50){
                occupancyStatus = 1;  //MANY_SEAT_AVAILABLE
            } else if ( percentage < 100){
                occupancyStatus = 2; //FEW_SEAT_AVAILABLE
            } 
        }
        
        entities.push(
            {
                position: {
                    latitude: item.scoordinate.y,
                    longitude: item.scoordinate.x
                },
                timestamp: new Date(item.mvalidtime || 0).getTime()/1000,
                vehicle: {
                    id: item.sname,
                    label: item.smetadata.type.name
                },
                occupancyStatus
           }
        );
    }
    return entities;
}

function generateEntitiesStop(stops){
    const entities = [];

    for (const item of stops.data) {
        entities.push(
            {
                position: {
                    latitude: item.scoordinate.y,
                    longitude: item.scoordinate.x
                },
                timestamp: new Date(item.mvalidtime || 0).getTime()/1000,
                stop: {
                    id: item.scode,
                    name: item.sname
                },
                area: item.smetadata.groups[0].id
           }
        );
    }
    
    return entities;
}

app.get('/drt/vehicles.json', cors(corsOptions), async function (req, res) {

    const {'data': vehicle} = await getData();

    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        data: {
            vehicles: generateEntities(vehicle)
        }
    });
});

app.get('/drt/stops.json', cors(corsOptions), async function (req, res) {

    const {'data': stops} = await getDataStop();

    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        data: {
            stops: generateEntitiesStop(stops)
        }
    });
});

app.get('/drt/all.json', cors(corsOptions), async function (req, res) {

    const {'data': vehicle} = await getData();
    const {'data': stops} = await getDataStop();

    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version: "1.0",
        data: {
            vehicles: generateEntities(vehicle),
            stops: generateEntitiesStop(stops)
        }
    });
});

app.get('/drt/flex', cors(corsOptions), async function (req, res) {

    const {'data': stops} = await getDataStop();

    const mStops = generateEntitiesStop(stops);
    const buffer = await createGtfsFlex(mStops);
    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': `attachment; filename=${config.server.filename}-${new Date().getTime()}.zip`
    });
    res.write(buffer);
    res.end();
});

app.get('/drt/vehicles.proto', cors(corsOptions), async function (req, res) {

    const {'data': vehicle} = await getData();

    const entities = generateEntities(vehicle);
    const buffer = await generateProto(entities);

    res.writeHead(200, {'Content-Type': 'application/protobuf'});
    res.write(buffer);
    res.end();
});

app.listen(config.server.port, function () {
    console.log( app._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
    console.log(`listening at http://localhost:${config.server.port}`);
});
