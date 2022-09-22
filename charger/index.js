
const https = require('https');

const {app, version, config, polling, listenLog, _, express, yaml} = require('../base');

var last_updated,
    stationsReceived,
    plugsReceived;

polling( lastUpdated => {
    last_updated = lastUpdated;
    getStations();
    getPlugs();
});

function getStations(){
    const req = https.request(config.endpoints.stations, res => {
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                stationsReceived = tmp.data;
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
                plugsReceived = tmp.data;
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

app.get('/charger/stations.json', function (req, res) {
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

                var plugs = [], plugsTypes = {};

                for(var j = 0; j < plugsReceived.length; j++){
                    var plug = plugsReceived[j];
                    if(station.scode === plug.pcode && plug.smetadata){
                        const plugType = (plug.smetadata.outlets && plug.smetadata.outlets.length > 0) ? plug.smetadata.outlets[0].outletTypeCode : plug.smetadata.outletTypeCode;

                        plugsTypes[ plugType ] = 1;

                        plugs.push({
                            plug_id: plug.scode,
                            name: plug.sname,
                            available: plug.mvalue === 1 ? true : false,
                            maxPower: (plug.smetadata.outlets && plug.smetadata.outlets.length > 0) ? plug.smetadata.outlets[0].maxPower : plug.smetadata.maxPower,
                            maxCurrent: (plug.smetadata.outlets && plug.smetadata.outlets.length > 0) ? plug.smetadata.outlets[0].maxCurrent : plug.smetadata.maxCurrent,
                            minCurrent: (plug.smetadata.outlets && plug.smetadata.outlets.length > 0) ? plug.smetadata.outlets[0].minCurrent : plug.smetadata.minCurrent,
                            outletTypeCode: plugType
                        });
                    }
                }

                chargeStations.push({
                    station_id: station.scode,
                    name: station.sname,
                    lat: station.scoordinate.y,
                    lon: station.scoordinate.x,
                    address: station.smetadata.address,
                    city: (station.smetadata.municipality || station.smetadata.city).toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' '),
                    accessType: station.smetadata.accessType,
                    capacity: station.smetadata.capacity || plugs.length,
                    free: plugs.filter(p => p.available).length,
                    provider: _.trim(station.smetadata.provider),
                    reservable: station.smetadata.reservable ? 'yes' : 'no',
                    state: station.smetadata.state,
                    plugsTypes: Object.keys(plugsTypes),
                    plugs: plugs
                });
            }
        }
    }
    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            stations: chargeStations
        }
    });
});

app.get('/charger/filters.yml', function (req, res) {
    const chargeStations = [];
    const chargeFilters = {};

    if(stationsReceived) {

        var plugsTypes = {};

        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];

            for(var j = 0; j < plugsReceived.length; j++){
                var plug = plugsReceived[j];
                if(station.scode === plug.pcode && plug.smetadata){
                    const plugType = (plug.smetadata.outlets && plug.smetadata.outlets.length > 0) ? plug.smetadata.outlets[0].outletTypeCode : plug.smetadata.outletTypeCode;

                    plugsTypes[ plugType ]= 1;
                }
            }

            chargeStations.push({
                provider: _.trim(station.smetadata.provider),
                //city: (station.smetadata.municipality || station.smetadata.city).toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' '),
                accessType: station.smetadata.accessType,
                reservable: station.smetadata.reservable ? 'yes' : 'no',
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

        chargeFilters['plugsTypes'] = {
            enabled: true,
            label: 'label_plugs_types',
            values: Object.keys(plugsTypes).map(plugType => {
                return {
                    value: plugType,
                    enabled: true
                }
            })
        }
    }

    const ymlText = yaml.dump({
        filters: chargeFilters
    })
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(ymlText);
});

app.get(['/','/charger'], async (req, res) => {
  res.send({
    status: 'OK',
    version
  });
});

app.listen(config.listen_port, listenLog);