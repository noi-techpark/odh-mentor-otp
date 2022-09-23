const https = require('https')
    , linkStationsConfig = require('./linkstation-config');

const {app, version, config, polling, fetchData, listenLog, _, express, yaml} = require('../base');

var last_updated,
    stationsReceived,
    linkStationsReceived;

polling( lastUpdated => {
    last_updated = lastUpdated;
    getStations();
    getLinkGeometries();
});

function getLinkGeometries() {
    const req = https.request(config.endpoints.geometries, res => {
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                linkStationsReceived = tmp.data;
            });
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

function getStations() {
    const req = https.request(config.endpoints.stations, res => {
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);

                let stations = tmp['data']['LinkStation']['stations'];
                stationsReceived = Object.keys(stations).map(key => {
                    return {
                        id: key,
                        values: stations[key]['sdatatypes']['Bluetooth Elapsed time (test)']['tmeasurements']
                    }
                });
            });
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

function getLinkStationLevel(linkId, value, mPeriod) {
    //return level of traffic from 0(not measured) to 3
    //TODO periods is only 600 now
    const vals = linkStationsConfig[ linkId ] || [];

    for (let level = 0; level < vals.length; level++) {

        const [period, minval, maxval] = vals[ level ];

        if (period != mPeriod) continue;
        //TODO check if this makes sense

        if (value >= minval && value <= maxval ) {
            return level + 1;
        }
    }
    return 0;
}

app.get('/traffic/stations.json',  function (req, res) {
    var stations = [];
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            if(stationsReceived[i].values){
                stations.push({
                    station_id: stationsReceived[i]['id'],
                    station_value: stationsReceived[i].values[0]['mvalue']

                    //TODO filter mvalue properties
                });
            }
        }
    }
    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            stations
        }
    }); 
});

app.get('/traffic/linkstations.json', async function (req, res) {
//source: https://mobility.api.opendatahub.bz.it/v2/tree/LinkStation/*/latest?limit=-1&distinct=true&select=tmeasurements&where=sactive.eq.true,or(and(tname.eq.%22Bluetooth%20Elapsed%20time%20%5C(test%5C)%22))

    console.log('[traffic] request /traffic/linkstations.json')
    var linkstations = [];
    const stationsById = {};

    const mPeriod = Number(config.endpoints.stations.linkStationPeriod);
    //TODO can be picked from get params

    if(stationsReceived) {
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];
            if(station.values) {
                const vals = station.values.filter(val => val.mperiod===mPeriod)
                    , val = vals[0]?.mvalue || null;
                stationsById[ stationsReceived[i]['id'] ] = val;
            }
        }
    }

    if(linkStationsReceived) {
        for(var i = 0; i < linkStationsReceived.length; i++){
            var link = linkStationsReceived[i];

            if(link.ecode && link.egeometry) {

                const value = stationsById[link.ecode] || null;

                //geojson
                linkstations.push({
                    type: "Feature",
                    id: link.ecode,     //identify station
                    geometry: link.egeometry,
                    properties: {
                        period: mPeriod,
                        value,
                        level: getLinkStationLevel(link.ecode, value, mPeriod)
                    }
                });
            }
        }
    }

    linkstations = _.sortBy(linkstations, feature => {
        return feature.properties.level
    });

    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            linkstations
        }
    });
});

app.get(['/','/traffic'], async (req, res) => {
  res.send({
    status: 'OK',
    version
  });
});

app.listen(config.listen_port, listenLog);
