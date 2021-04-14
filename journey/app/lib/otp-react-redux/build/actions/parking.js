"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parkingLocationsQuery = parkingLocationsQuery;
exports.requestParkingLocationsResponse = exports.receivedParkingLocationsResponse = exports.receivedParkingLocationsError = void 0;

var _reduxActions = require("redux-actions");

if (typeof fetch === 'undefined') require('isomorphic-fetch');
const receivedParkingLocationsError = (0, _reduxActions.createAction)('PARKING_LOCATIONS_ERROR');
exports.receivedParkingLocationsError = receivedParkingLocationsError;
const receivedParkingLocationsResponse = (0, _reduxActions.createAction)('PARKING_LOCATIONS_RESPONSE');
exports.receivedParkingLocationsResponse = receivedParkingLocationsResponse;
const requestParkingLocationsResponse = (0, _reduxActions.createAction)('PARKING_LOCATIONS_REQUEST');
exports.requestParkingLocationsResponse = requestParkingLocationsResponse;

function parkingLocationsQuery(url) {
  return async function (dispatch, getState) {
    dispatch(requestParkingLocationsResponse());
    let json;

    try {
      const response = await fetch(url);

      if (response.status >= 400) {
        const error = new Error('Received error from server');
        error.response = response;
        throw error;
      }

      json = await response.json();
    } catch (err) {
      return dispatch(receivedParkingLocationsError(err));
    }

    dispatch(receivedParkingLocationsResponse(json));
  };
}

//# sourceMappingURL=parking.js