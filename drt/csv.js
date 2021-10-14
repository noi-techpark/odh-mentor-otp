const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const createStop = async(stops) => {
  console.log(stops)
  const csvWriter = createCsvWriter({
    path: './stop.csv',
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

const createArea = async(stops) => {
  console.log(stops)
  const csvWriter = createCsvWriter({
    path: './area.csv',
    header: [
        {id: 'area_id', title: 'area_id'},
        {id: 'wkt', title: 'wkt'}
    ]
  });

 
  const records = [];
  const areas = {};

  for(const stop of stops){
    if(areas[`${stop.area}`] == null){
      areas[`${stop.area}`] = {
        id: `${stop.area}`,
        points: [[stop.position.longitude, stop.position.latitude]]
      }
    }else{
      areas[`${stop.area}`].points.push([
        stop.position.longitude, stop.position.latitude
      ])
    }
    records.push({
      stop_id: stop.stop.id,
      stop_name: stop.stop.name,
      stop_lat: stop.position.latitude,
      stop_lon: stop.position.longitude
    })
  }

 
  await csvWriter.writeRecords(records);
}

module.exports = {
  createStop,
  createArea
}

