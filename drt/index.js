
const {createGtfsFlex} = require('./csv')
    , axios = require('axios').default;

const {app, version, config, polling, fetchData, listenLog, _, express, yaml} = require('../base');

const {generateProto, generateEntitiesVehicle, generateEntitiesStop, generateEntitiesTrip} = require('./utils');

var last_updated = Math.trunc((new Date()).getTime() / 1000 );

async function getDataVehicle() {
    last_updated = Math.trunc((new Date()).getTime() / 1000 );
    return await getVehicle();
}

async function getDataStop() {
    last_updated = Math.trunc((new Date()).getTime() / 1000 );
    return await getStops();
}

async function getDataItineraries() {
    last_updated = Math.trunc((new Date()).getTime() / 1000 );
    return await getTrips();
}

async function getVehicle() {
/*    return await axios({
        method: config.endpoints.vehicles.method,
        url: `${config.endpoints.vehicles.port === 443 ? 'https' : 'http'}://${config.endpoints.vehicles.hostname}${config.endpoints.vehicles.path}`,
        responseType: 'json'        
    })*/
    return fetchData(config.endpoints.vehicles)
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

app.get('/drt/vehicles.json', async function (req, res) {

    const vehicles = generateEntitiesVehicle(await getDataVehicle());

    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            vehicles
        }
    });
});

app.get('/drt/stops.json', async function (req, res) {

    const {'data': stops} = await getDataStop();

    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            stops: generateEntitiesStop(stops)
        }
    });
});

app.get('/drt/itinerary.json', async function (req, res) {

    const {'data': itineraries} = await getDataItineraries();

    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            itinerary: generateEntitiesTrip(itineraries)
        }
    });
});

app.get('/drt/all.json', async function (req, res) {

    const vehicles = generateEntitiesVehicle(await getDataVehicle());

    const {'data': stops} = await getDataStop();
    const {'data': itineraries} = await getDataItineraries();
    
    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            vehicles,
            stops: generateEntitiesStop(stops),
            itinerary: generateEntitiesTrip(itineraries)
        }
    });
});

app.get('/drt/flex', async function (req, res) {

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

app.get('/drt/vehicles.proto', async function (req, res) {

    const entities = generateEntitiesVehicle(await getDataVehicle());
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

app.listen(config.listen_port, listenLog);

