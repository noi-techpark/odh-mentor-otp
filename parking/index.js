const express = require('express');
const https = require('https');
const _ = require('lodash');
const circleToPolygon = require('./circle-polygon');

const {app, version, config, polling, listenLog} = require('../base');

var last_updated,
    stationsReceived,
    sensorsReceived;

polling( lastUpdated => {
    last_updated = lastUpdated;
    getStations();
    getSensors();
});

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

function getSensors(){
    const req = https.request(config.endpoints.sensors, res => {
            //console.log(`BIKES: statusCode: ${res.statusCode}`)
            var str = "";
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                let tmp = JSON.parse(str);
                var sensors = _.uniqBy(tmp.data,'scode');
                //PATCH remove duplicates
                sensorsReceived = sensors
            });
        })

    req.on('error', error => {
        console.error(error)
    })

    req.end()
}

app.get('/parking/stations.json',  function (req, res) {
    var parkingStations = [];
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];
            if(station.sactive && station.scoordinate && station.smetadata){
                parkingStations.push({
                    station_id: station.scode,
                    name: station.sname,
                    lat: station.scoordinate.y,
                    lon: station.scoordinate.x,
                    address: station.smetadata.mainaddress,
                    city: station.smetadata.municipality,
                    capacity: station.smetadata.capacity || 0,
                    free: station.mvalue || 0
                })
            }
        }
    }
    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            stations: parkingStations
        }
    });
});

app.get('/parking/park-ride.json',  function (req, res) {
    var parkingStations = [];
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];
            if(station.sactive && station.scoordinate && station.smetadata) {

                parkingStations.push({
                    id: station.scode,
                    name: station.sname,
                    status: "ACTIVE",
                    capacity: station.smetadata.capacity || 0,
                    free: station.mvalue || 0,
                    geometry: circleToPolygon(
                        [station.scoordinate.x, station.scoordinate.y],
                        Number(config.geometryCircleRadius),
                        {}
                    )
                })
            }
        }
    }
    res.json({
        results: parkingStations
    });
});

app.get('/parking/sensors.json', function (req, res) {
    var parkingSensors = [];
    if(sensorsReceived){
        for(var i = 0; i < sensorsReceived.length; i++){
            var sensor = sensorsReceived[i];
            if(sensor.sactive && sensor.scoordinate && sensor.smetadata){
                parkingSensors.push({
                    sensor_id: sensor.scode,
                    name: sensor.sname,
                    lat: sensor.scoordinate.y,
                    lon: sensor.scoordinate.x,
                    address: sensor.smetadata.group,
                    city: sensor.smetadata.municipality,
                    free: sensor.mvalue === 1 ? false : true
                })
            }
        }
    }
    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            sensors: parkingSensors
        }
    });
});

app.get('/parking/all.json', function (req, res) {
    var parkingStationsAll = [];
    if(stationsReceived){
        for(var i = 0; i < stationsReceived.length; i++){
            var station = stationsReceived[i];
            if(station.sactive && station.scoordinate && station.smetadata){
                parkingStationsAll.push({
                    type: 'station',
                    station_id: station.scode,
                    name: station.sname,
                    lat: station.scoordinate.y,
                    lon: station.scoordinate.x,
                    address: station.smetadata.mainaddress,
                    city: station.smetadata.municipality,
                    capacity: station.smetadata.capacity || 0,
                    free: station.mvalue || 0
                });
            }
        }
    }
    var parkingSensorsAll = [];
    if(sensorsReceived){
        for(var i = 0; i < sensorsReceived.length; i++){
            var sensor = sensorsReceived[i];
            if(sensor.sactive && sensor.scoordinate && sensor.smetadata){
                parkingSensorsAll.push({
                    type: 'sensor',
                    station_id: sensor.scode+'-'+Math.random(),                    
                    group_name: sensor.smetadata.group,
                    group_id: _.snakeCase(sensor.smetadata.group),
                    name: sensor.sname,
                    lat: sensor.scoordinate.y,
                    lon: sensor.scoordinate.x,
                    address: sensor.smetadata.group,
                    city: sensor.smetadata.municipality,
                    free: sensor.mvalue === 1 ? false : true
                });
            }
        }
    }

    let parkingSensors = [];
    let sensorGroups = [];

    if (config.returnGroupSensors) {
        const MIN_GROUP_SENSORS = Number(config.minGroupSensors) || 4;
        const parkingSensorsGroups = _.chain(parkingSensorsAll)
            .groupBy('group_id')
            .value();
        for (const groupId in parkingSensorsGroups) {
            let group = parkingSensorsGroups[groupId];

            if(group.length < MIN_GROUP_SENSORS) {
                sensorGroups.push({
                        type: 'sensorGroup',
                        station_id: groupId,
                        name: group[0].group_name,
                        group_name: group[0].group_name,
                        lat: group[0].lat,
                        lon: group[0].lon,
                        capacity: group.length,
                        sensors: group
                    })
            }
            else {
                for(const sensor of group) {
                    parkingSensors.push(sensor);
                }
            }
        }
    }
    else {
        parkingSensors = parkingSensorsAll;
    }

    res.json({
        last_updated,
        ttl: 0,
        version,
        data: {
            stations: _.concat(
                parkingStationsAll,
                parkingSensors,
                sensorGroups
            )
        }
    });
});

app.get(['/','/parking'], async (req, res) => {
  res.send({
    status: 'OK',
    version
  });
});

app.listen(config.listen_port, listenLog);
