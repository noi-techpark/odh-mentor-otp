const express = require('express')
, axios = require('axios').default
, _ = require('lodash')
, cors = require('cors')
, protobuf = require("protobufjs")
, polyline = require('@mapbox/polyline')
, {createGtfsFlex} = require('./csv');

const pkg = require('./package.json')
    , version = pkg.version
    , serviceName = `service ${pkg.name} v${version}`
    , dotenv = require('dotenv').config()
    , config = require('@stefcud/configyml');

//normalize endpoints default
config.endpoints = _.mapValues(config.endpoints, conf => {
    return _.defaults(conf, config.endpoints.default);
});
delete config.endpoints.default;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var app = express();

var lastUpdate = Math.trunc((new Date()).getTime() / 1000 );

console.log(`Starting ${serviceName}...`);

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
            vehicle,
            id: vehicle.vehicle.id
        });
    }
    // Create a new message
    var message = GtfsRT.create(payload); // or use .fromObject if conversion is necessary
    // Encode a message to an Uint8Array (browser) or Buffer (node)
    const buffer = GtfsRT.encode(message).finish();
    return buffer;
};

async function getDataVehicle() {
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    return await getVehicle();
}

async function getDataStop() {
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    return await getStops();
}

async function getDataItineraries() {
    lastUpdate = Math.trunc((new Date()).getTime() / 1000 );
    return await getTrips();
}

async function getVehicle() {
    return await axios({
        method: config.endpoints.vehicles.method,
        url: `${config.endpoints.vehicles.port === 443 ? 'https' : 'http'}://${config.endpoints.vehicles.hostname}${config.endpoints.vehicles.path}`,
        responseType: 'json'        
    })
}

async function getStops() {
    return await axios({
        method: config.endpoints.stops.method,
        url: `${config.endpoints.stops.port === 443 ? 'https' : 'http'}://${config.endpoints.stops.hostname}${config.endpoints.stops.path}`,
        responseType: 'json'        
    })
}

async function getTrips() {
    return await axios({
        method: config.endpoints.trips.method,
        url: `${config.endpoints.trips.port === 443 ? 'https' : 'http'}://${config.endpoints.trips.hostname}${config.endpoints.trips.path}`,
        responseType: 'json'        
    })
}

function generateEntitiesVehicle(vehicle) {
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
                lat: item.scoordinate.y,
                lon: item.scoordinate.x,
                timestamp: new Date(item.mvalidtime || 0).getTime()/1000,
                vehicle: {
                    id: item.sname,
                    name: item.smetadata.type.name,
                    label: item.smetadata.type.name
                },
                capacity: capacityMax,
                free: capacityMax - capacityUsed,
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
                lat: item.scoordinate.y,
                lon: item.scoordinate.x,
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

function generateEntitiesTrip(itineraries){
    let all = [];
    for(const elem of itineraries.data){
        
        if(elem.sactive === true){

            for(const step of elem.mvalue.itineraryRemaining){
                if(step.type === 'ROUTE'){
                    const p = polyline.decode(step.routeEncoded, 6);
                    
                    all = all.concat(p);

                }
            }
            
        }
    }
    
    return polyline.encode(all)
}

app.get('/drt/vehicles.json', cors(corsOptions), async function (req, res) {

    const {'data': vehicle} = await getDataVehicle();

    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version,
        data: {
            vehicles: generateEntitiesVehicle(vehicle)
        }
    });
});

app.get('/drt/stops.json', cors(corsOptions), async function (req, res) {

    const {'data': stops} = await getDataStop();

    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version,
        data: {
            stops: generateEntitiesStop(stops)
        }
    });
});

app.get('/drt/itinerary.json', cors(corsOptions), async function (req, res) {

    const {'data': itineraries} = await getDataItineraries();
    
   
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version,
        data: {
            itinerary: generateEntitiesTrip(itineraries)
        }
    });
});

app.get('/drt/all.json', cors(corsOptions), async function (req, res) {

    const {'data': vehicle} = await getDataVehicle();
    const {'data': stops} = await getDataStop();
    const {'data': itineraries} = await getDataItineraries();
    
    res.json({
        last_updated: lastUpdate,
        ttl: 0,
        version,
        data: {
            vehicles: generateEntitiesVehicle(vehicle),
            stops: generateEntitiesStop(stops),
            itinerary: generateEntitiesTrip(itineraries)
        }
    });
});

app.get('/drt/flex', cors(corsOptions), async function (req, res) {

    const {'data': stops} = await getDataStop();

    const mStops = generateEntitiesStop(stops);
    const buffer = await createGtfsFlex(mStops);

    const filename = `${config.gtfsflex_filename}`.replace('%T',new Date().getTime())

    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': `attachment; filename=${filename}`
    });
    res.write(buffer);
    res.end();
});

app.get('/drt/vehicles.proto', cors(corsOptions), async function (req, res) {

    const {'data': vehicle} = await getDataVehicle();

    const entities = generateEntitiesVehicle(vehicle);
    const buffer = await generateProto(entities);

    res.writeHead(200, {'Content-Type': 'application/protobuf'});
    res.write(buffer);
    res.end();
});

app.get(['/','/drt'], async (req, res) => {
  res.send({
    status: 'OK',
    version
  });
});

app.listen(config.listen_port, function () {
    console.log( app._router.stack.filter(r => r.route).map(r => `${Object.keys(r.route.methods)[0]} ${r.route.path}`) );
    console.log(`${serviceName} listening at http://localhost:${config.listen_port}`);
});
