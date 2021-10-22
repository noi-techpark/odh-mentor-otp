const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const circleToPolygon = require('./circle-polygon');
const {uuid} = require('uuidv4');
const { stringify } = require('wkt');
const tmp = require('tmp');
const zipdir = require('zip-dir');


const createStop = async(stops, path) => {
  const csvWriter = createCsvWriter({
    path: `${path}/stops.txt`,
    header: [
        {id: 'stop_id', title: 'stop_id'},
        {id: 'stop_name', title: 'stop_name'},
        {id: 'stop_lat', title: 'stop_lat'},
        {id: 'stop_lon', title: 'stop_lon'}
    ]
  });

 
  const records = [];

  for(const stop of stops){
    records.push({
      stop_id: stop.stop.id,
      stop_name: stop.stop.name,
      stop_lat: stop.position.latitude,
      stop_lon: stop.position.longitude
    })
  }

 
  await csvWriter.writeRecords(records);
}

const createArea = async(stops, path) => {
  const csvWriter = createCsvWriter({
    path: `${path}/location_groups.txt`,
    header: [
        {id: 'location_group_id', title: 'location_group_id'},
        {id: 'location_id', title: 'location_id'},
        {id: 'location_group_name', title: 'location_group_name'}
    ]
  });

 
  const records = [];
  const areas = {};
  

  for(const stop of stops){
    if(stop.area === 3 ){
      stop.area = 1
    }
    records.push({
      location_group_id: stop.area,
      location_id: stop.stop.id,
      location_group_name: `${stop.area}`
    })
  }
 
  await csvWriter.writeRecords(records);
}

const createRouteAndAgency = async(path) => {
  const csvWriter = createCsvWriter({
    path: `${path}/routes.txt`,
    header: [
      {id: 'agency_id', title: 'agency_id'},
      {id: 'route_id', title: 'route_id'},
      {id: 'route_short_name', title: 'route_short_name'},
      {id: 'route_long_name', title: 'route_long_name'},
      {id: 'route_type', title: 'route_type'},
      {id: 'route_color', title: 'route_color'},
      {id: 'route_text_color', title: 'route_text_color'}
    ]
  });
  const csvWriterAgency = createCsvWriter({
    path: `${path}/agency.txt`,
    header: [
      {id: 'agency_id', title: 'agency_id'},
      {id: 'agency_name', title: 'agency_name'},
      {id: 'agency_url', title: 'agency_url'},
      {id: 'agency_timezone', title: 'agency_timezone'},
      {id: 'agency_lang', title: 'agency_lang'},
      {id: 'agency_phone', title: 'agency_phone'},
    ]
  });
  const records = [];
  const recordsAgency = [];
  recordsAgency.push({
    agency_id: 'DRT',
    agency_name: 'Call Bus',
    agency_url: 'https://www.sasabz.it/callbus',
    agency_timezone: 'Europe/Rome',
    agency_lang: 'it',
    agency_phone: '+390471706633',
  });
  records.push({
    agency_id: 'DRT',
    route_id: 'DRT',
    route_short_name: 'DRT',
    route_long_name: 'Merano - Call Bus',
    route_type: '3',
    route_color: 'ffed00',
    route_text_color: '000000'
  });
  await csvWriter.writeRecords(records);
  await csvWriterAgency.writeRecords(recordsAgency);

}

const createSchedule = async(stops, path) => {
  await createRouteAndAgency(path);

  const csvWriter = createCsvWriter({
    path: `${path}/stop_times.txt`,
    header: [
      {id: 'trip_id', title: 'trip_id'},
      {id: 'stop_id', title: 'stop_id'},
      {id: 'stop_sequence', title: 'stop_sequence'},
      {id: 'arrival_time', title: 'arrival_time'},
      {id: 'departure_time', title: 'departure_time'},
      {id: 'start_pickup_dropoff_window', title: 'start_pickup_dropoff_window'},
      {id: 'end_pickup_dropoff_window', title: 'end_pickup_dropoff_window'},
      {id: 'pickup_type', title: 'pickup_type'},
      {id: 'drop_off_type', title: 'drop_off_type'}
    ]
  });

  const csvWriterTrip = createCsvWriter({
    path:  `${path}/trips.txt`,
    header: [
      {id: 'trip_id', title: 'trip_id'},
      {id: 'route_id', title: 'route_id'},
      {id: 'service_id', title: 'service_id'},
      {id: 'drt_max_travel_time',title: 'drt_avg_travel_time'},
      {id: 'drt_avg_travel_time', title: 'drt_avg_travel_time'},
      {id: 'drt_advance_book_min', title: 'drt_advance_book_min'}
    ]
  });

  const csvWriterCalendar = createCsvWriter({
    path:  `${path}/calendar.txt`,
    header: [
      {id: 'service_id', title: 'service_id'},
      {id: 'monday', title: 'monday'},
      {id: 'tuesday', title: 'tuesday'},
      {id: 'wednesday', title: 'wednesday'},
      {id: 'thursday', title: 'thursday'},
      {id: 'friday', title: 'friday'},
      {id: 'saturday', title: 'saturday'},
      {id: 'sunday', title: 'sunday'},
      {id: 'start_date', title: 'start_date'},
      {id: 'end_date', title: 'end_date'}
    ]
  });
  const records = [];
  const recordTrip = [];
  const recordService = [];

  recordService.push({
    service_id: "mon-fri",
    monday: 1,
    tuesday: 1,
    wednesday: 1,
    thursday: 1,
    friday: 1,
    saturday: 0,
    sunday: 0,
    start_date: 20211001,
    end_date: 20231001
  });
  recordService.push({
    service_id: "sat",
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 1,
    sunday: 0,
    start_date: 20211001,
    end_date: 20231001
  })

  const hours = [
    {'mon-fri' : ['08:00:00','12:00:00'], 'sat': ['08:00:00','12:00:00']},
    {'mon-fri' : ['16:00:00', '19:00:00'], 'sat': ['16:00:00', '22:00:00']}    
  ];
  
  for(const service of recordService){
    const serviceId = service.service_id;
    for(const hour of hours){
      const trips = [uuid(), uuid(), uuid()];
      createTripTime(trips[0], '1', '2', hour[`${serviceId}`][0], hour[`${serviceId}`][1], records);
      createTripTime(trips[1], '2', '2', hour[`${serviceId}`][0], hour[`${serviceId}`][1], records);
      createTripTime(trips[2], '2', '1', hour[`${serviceId}`][0], hour[`${serviceId}`][1], records);
      for(const trip of trips){
        recordTrip.push({
          trip_id: trip,
          route_id: 'DRT',
          service_id: serviceId,
          drt_advance_book_min: 30,
          drt_max_travel_time: 20,
          drt_avg_travel_time: 10
        });
      }
    }
    
  }
 
  
  await csvWriter.writeRecords(records);
  await csvWriterTrip.writeRecords(recordTrip);
  await csvWriterCalendar.writeRecords(recordService);

}

function createTripTime(tripId, start,end, startTime, endTime, records){
  
  if(start === '2' && end === '2'){
    records.push({
      trip_id: tripId,
      stop_id: start,
      stop_sequence: 0,
      arrival_time: '',
      departure_time: '',
      start_pickup_dropoff_window: startTime,
      end_pickup_dropoff_window: endTime,
      pickup_type: 2,
      drop_off_type: 2
    });
  
    records.push({
      trip_id: tripId,
      stop_id: start,
      stop_sequence: 1,
      arrival_time: '',
      departure_time: '',
      start_pickup_dropoff_window: startTime,
      end_pickup_dropoff_window: endTime,
      pickup_type: 2,
      drop_off_type: 2
    });
  }

  if(start === '1' && end === '2'){
    records.push({
      trip_id: tripId,
      stop_id: start,
      stop_sequence: 0,
      arrival_time: '',
      departure_time: '',
      start_pickup_dropoff_window: startTime,
      end_pickup_dropoff_window: endTime,
      pickup_type: 2,
      drop_off_type: 1
    });
  
    records.push({
      trip_id: tripId,
      stop_id: start,
      stop_sequence: 1,
      arrival_time: '',
      departure_time: '',
      start_pickup_dropoff_window: startTime,
      end_pickup_dropoff_window: endTime,
      pickup_type: 2,
      drop_off_type: 2
    });
  }

  if(start === '2' && end === '1'){
    records.push({
      trip_id: tripId,
      stop_id: start,
      stop_sequence: 0,
      arrival_time: '',
      departure_time: '',
      start_pickup_dropoff_window: startTime,
      end_pickup_dropoff_window: endTime,
      pickup_type: 2,
      drop_off_type: 2
    });
  
    records.push({
      trip_id: tripId,
      stop_id: start,
      stop_sequence: 1,
      arrival_time: '',
      departure_time: '',
      start_pickup_dropoff_window: startTime,
      end_pickup_dropoff_window: endTime,
      pickup_type: 1,
      drop_off_type: 2
    });
  }
  
}



module.exports = {
  createStop,
  createArea,
  createSchedule,
  createGtfsFlex : async(mStops) => {
    const tmpobj = tmp.dirSync({
      unsafeCleanup: true
    });
    await createStop(mStops, tmpobj.name);
    await createArea(mStops, tmpobj.name);
    await createSchedule(mStops, tmpobj.name);
    const buffer = await zipdir(tmpobj.name);
    tmpobj.removeCallback();
    return buffer;
  }
}

