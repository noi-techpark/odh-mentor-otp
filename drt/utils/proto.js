
const protobuf = require('protobufjs');

module.exports = async vehicles => {
    const root = await protobuf.load(__dirname+'/gtfs-realtime.proto');
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

    return GtfsRT.encode(message).finish();
}