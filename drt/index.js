// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const {createGtfsFlex} = require('./csv');

const {app, version, config, polling, fetchData, listenLog, _, express, yaml} = require('../base');

const {getDataVehicle, getDataStop, getDataItineraries, generateProto} = require('./utils')(config, fetchData);

var last_updated = Math.trunc((new Date()).getTime() / 1000 );

app.get('/drt/vehicles.json', async function (req, res) {

    const vehicles = await getDataVehicle();

    last_updated = Math.trunc((new Date()).getTime() / 1000 );

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

    const stops = await getDataStop();

    last_updated = Math.trunc((new Date()).getTime() / 1000 );

    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            stops
        }
    });
});

app.get('/drt/itinerary.json', async function (req, res) {

    const itinerary = await getDataItineraries();

    last_updated = Math.trunc((new Date()).getTime() / 1000 );

    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            itinerary
        }
    });
});

app.get('/drt/all.json', async function (req, res) {

    const itinerary = await getDataItineraries();
    const vehicles = await getDataVehicle();
    const stops = await getDataStop();
    
    last_updated = Math.trunc((new Date()).getTime() / 1000 );

    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            itinerary,
            vehicles,
            stops
        }
    });
});

app.get('/drt/flex', async function (req, res) {

    const stops = await getDataStop();
    const buffer = await createGtfsFlex(stops);

    const filename = `${config.gtfsflex_filename}`.replace('%T',new Date().getTime())

    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': `attachment; filename=${filename}`
    });
    res.write(buffer);
    res.end();
});

app.get('/drt/vehicles.proto', async function (req, res) {

    const entities = await getDataVehicle();
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
