"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentPosition = getCurrentPosition;
exports.addLocationSearch = exports.receivedPositionResponse = exports.fetchingPosition = exports.receivedPositionError = void 0;

var _reduxActions = require("redux-actions");

var _map = require("./map");

const receivedPositionError = (0, _reduxActions.createAction)('POSITION_ERROR');
exports.receivedPositionError = receivedPositionError;
const fetchingPosition = (0, _reduxActions.createAction)('POSITION_FETCHING');
exports.fetchingPosition = fetchingPosition;
const receivedPositionResponse = (0, _reduxActions.createAction)('POSITION_RESPONSE');
exports.receivedPositionResponse = receivedPositionResponse;

function getCurrentPosition(setAsType = null, onSuccess) {
  return async function (dispatch, getState) {
    if (navigator.geolocation) {
      dispatch(fetchingPosition({
        type: setAsType
      }));
      navigator.geolocation.getCurrentPosition( // On success
      position => {
        if (position) {
          console.log('current loc', position, setAsType);
          dispatch(receivedPositionResponse({
            position
          }));

          if (setAsType) {
            console.log('setting location to current position');
            dispatch((0, _map.setLocationToCurrent)({
              locationType: setAsType
            }));
            onSuccess && onSuccess();
          }
        } else {
          dispatch(receivedPositionError({
            error: {
              message: 'Unknown error getting position'
            }
          }));
        }
      }, // On error
      error => {
        console.log('error getting current position', error);
        dispatch(receivedPositionError({
          error
        }));
      }, // Options
      {
        enableHighAccuracy: true
      });
    } else {
      console.log('current position not supported');
      dispatch(receivedPositionError({
        error: {
          message: 'Geolocation not supported by your browser'
        }
      }));
    }
  };
}

const addLocationSearch = (0, _reduxActions.createAction)('ADD_LOCATION_SEARCH');
exports.addLocationSearch = addLocationSearch;

//# sourceMappingURL=location.js