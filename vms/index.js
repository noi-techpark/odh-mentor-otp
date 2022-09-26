
const GeoJSON = require('geojson');

const {app, version, config, polling, fetchData, listenLog, _, express, yaml} = require('../base');

var last_updated,
    stationsReceived,
    stations = [];

polling( lastUpdated => {
    last_updated = lastUpdated;

    fetchData(config.endpoints.stations).then(data => {
        filterMetadata(data);

        stationsReceived = data;
        console.log('stationsReceived',_.size(stationsReceived))
        formatData();
    });
});

const signs = require('./signs/codes.json');

const mapCodes = {};

signs.forEach(item => {
    if(item.code!='N' && item.code!='S')
        item.img = `images/${item.code}.png`;
    mapCodes[`${item.code}`] = item;
});

function filterMetadata(data,scode) {

    const opath = scode ? [
        'VMS',
        'stations',
         scode,
        'sdatatypes',
        'esposizione',
        'tmetadata'
        ] : 'tmetadata';

    if (_.isArray(data)) {
        for(let e of data) {
            _.set(e, opath, {});
        }
    }
    _.set(data, opath, {});
    //remove unuseful big field
    //console.log('FILTER',JSON.stringify(tmp,null,4))
    return data;
}

function formatData() {
    if(stationsReceived && stations.length === 0) {
        //console.log(stationsReceived)
        for(let i = 0; i < stationsReceived.length; i++){
            let station = stationsReceived[i];

            if(station.scoordinate) {

                const type = station.smetadata.pmv_type;
                const type_name = config.pmv_types[ station.smetadata.pmv_type ];

                const direction = config.directions_types[ station.smetadata.direction_id ] || '';

                let value = `${station.mvalue}`.trim();

                let text = value,
                    img = '';

                if (mapCodes[value]) {
                    text = mapCodes[value].title;
                    img = mapCodes[value].img;
                }

                if (value.indexOf('|')) {       //bilingual it|de
                    value = value.split('|')[0];
                }

                /*La policy A22 è quello di prevedere un carosello
                solo in Alto Adige dove la messaggistica è bilingue. Si propone di salvare in ogni caso il
                messaggio concatenato associato a tutte le pagine presenti, usando un carattere delimitatore
                tra una pagina e l’altra (es. “|”).
                */

                //console.log('STATION PUSH',station)

                stations.push({
                    station_id: station.scode,
                    name: station.sname,
                    lat: station.scoordinate.y,
                    lon: station.scoordinate.x,
                    origin: station.sorigin,
                    time: station.mvalidtime,
                    direction,
                    //position: station.smetadata.position_m,
                    type,
                    type_name,
                    text,
                    img
                })
            }
        }

        //normalize by coorindates
        //
        console.log('STATIONS',stations.length)
    }
}

function getOneStation(scode=''){

    return new Promise((resolve, reject) => {

        if(scode==='') {
            reject(null)
            return
        }

        const result = _.find(stationsReceived,{'scode':scode})

        //console.log(result)

        resolve(result);
    });
}

app.get('/vms/stations.json', (req, res) => {

    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            stations
        }
    });
});

app.get('/vms/stations.geojson', (req, res) => {

    const geo = GeoJSON.parse(stations, {
        Point: ['lat', 'lon']
    });

    res.json(geo);
});

//one station details
app.get('/vms/:scode/station.json',  function (req, res) {

    const scode = req.params.scode;

    if (scode) {
        getOneStation(scode).then(data => {

            res.json({
                last_updated,
                ttl: 0,
                version,
                data
            });
        });
    }
    else {
        res.status(400);
    }
});

app.use('/vms/images', express.static('signs/images'));

app.use('/vms/tests', express.static('tests'));

app.get('/vms/signs.json',  function (req, res) {
    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            signs
        }
    });
});

app.get(['/','/vms'], async (req, res) => {
  res.send({
    status: 'OK',
    version
  });
});

app.listen(config.listen_port, listenLog);
