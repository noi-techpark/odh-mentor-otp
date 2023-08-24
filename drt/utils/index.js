// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const polyline = require('@mapbox/polyline');

const generateProto = require('./proto');

function generateEntitiesVehicle(data) {
    const entities = [];

    for (const item of data) {
        if (item.sactive === true) {

            let capacityMax = 0;
            let capacityUsed = 0;
            for (const [key, value] of Object.entries(item.smetadata.capacityMax)) {
                capacityMax += value
            }
            for (const [key, value] of Object.entries(item.smetadata.capacityUsed)) {
                capacityUsed += value
            }
            let occupancyStatus = 5; //FULL
            if (capacityMax > 0) {
                const percentage = 100 * capacityUsed / capacityMax;
                if (percentage === 0) {
                    occupancyStatus = 0;  //EMPTY
                } else if (percentage <= 50) {
                    occupancyStatus = 1;  //MANY_SEAT_AVAILABLE
                } else if (percentage < 100) {
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
                    timestamp: new Date(item.mvalidtime || 0).getTime() / 1000,
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
    }
    return entities;
}

function generateEntitiesStop(data) {
    const entities = [];

    let count = -1;

    for (const item of data) {
        if (item.sactive === true) {

            entities.push(
                {
                    position: {
                        latitude: item.scoordinate.y,
                        longitude: item.scoordinate.x
                    },
                    lat: item.scoordinate.y,
                    lon: item.scoordinate.x,
                    timestamp: new Date(item.mvalidtime || 0).getTime() / 1000,
                    stop: {
                        id: item.scode,
                        name: item.sname
                    },
                    area: item.smetadata.groups.length === 0 ? 0 : item.smetadata.groups[0].id,
                }
            );
            count -= 1;
        }
    }

    return entities;
}

function generateEntitiesTrip(data) {
    let all = [];
    for (const elem of data) {
        if (elem.sactive === true) {
            for (const step of elem.mvalue.itineraryRemaining) {
                if (step.type === 'ROUTE') {
                    all.push(polyline.encode(polyline.decode(step.routeEncoded, 6)));
                }
            }
        }
    }
    return all;
}

module.exports = (config, fetchData) => {

    return {
        generateProto,

        getDataVehicle: async () => {
            return generateEntitiesVehicle(await fetchData(config.endpoints.vehicles));
        },
        getDataStop: async () => {
            return generateEntitiesStop(await fetchData(config.endpoints.stops));
        },
        getDataItineraries: async () => {
            return generateEntitiesTrip(await fetchData(config.endpoints.trips));
        }
    }
}