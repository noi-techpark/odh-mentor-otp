"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipcarLocationsQuery = zipcarLocationsQuery;
exports.requestZipcarLocationsResponse = exports.receivedZipcarLocationsResponse = exports.receivedZipcarLocationsError = void 0;

var _reduxActions = require("redux-actions");

if (typeof fetch === 'undefined') require('isomorphic-fetch');
const receivedZipcarLocationsError = (0, _reduxActions.createAction)('ZIPCAR_LOCATIONS_ERROR');
exports.receivedZipcarLocationsError = receivedZipcarLocationsError;
const receivedZipcarLocationsResponse = (0, _reduxActions.createAction)('ZIPCAR_LOCATIONS_RESPONSE');
exports.receivedZipcarLocationsResponse = receivedZipcarLocationsResponse;
const requestZipcarLocationsResponse = (0, _reduxActions.createAction)('ZIPCAR_LOCATIONS_REQUEST');
exports.requestZipcarLocationsResponse = requestZipcarLocationsResponse;

function zipcarLocationsQuery(url) {
  return async function (dispatch, getState) {
    dispatch(requestZipcarLocationsResponse());
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
      return dispatch(receivedZipcarLocationsError(err));
    }

    dispatch(receivedZipcarLocationsResponse(json));
  };
}

//# sourceMappingURL=zipcar.js