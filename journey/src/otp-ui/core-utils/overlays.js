
//TODO move here filter logic in overlay-charger/index.js
//
//
//
const intersected = (arA, arB) => {
	let ret = [arA, arB].reduce((a, b) => a.filter(c => b.includes(c)));
	return ret.length > 0;
}

const filterOverlayItem = (station, filters) => {

  let retValue = true;

  for (let filterProperty in filters) {
    if (filters[filterProperty] &&
        filters[filterProperty].enabled === true &&
        Array.isArray(filters[filterProperty].values)) {   //only enabled filters

      let enabledValues = filters[filterProperty].values.filter(val => {
        return val.enabled === true;
      }).map(val => val.value);

      /* let disabledValues = filters[filterProperty].values.filter(val => {
        return val.enabled === false;
      }).map(val => val.value); */

      if (station.hasOwnProperty(filterProperty)) {

        let stationValue = station[filterProperty];

        if (Array.isArray(stationValue)) {    //filter by array field
          retValue = intersected(enabledValues, stationValue)
        }
        else {
console.log('enabledValues',enabledValues)
          if(!enabledValues.includes( stationValue )) { //filter by field
            retValue = false;
          }
        }
      }

      if (retValue===false) break;
      //senza questo salta l'elaborazione del filtro precedente
    }
  }

  return retValue;
}

export function filterOverlay(stations, filters) {
	return stations.filter(station => {
		return filterOverlayItem(station, filters);
	});
}