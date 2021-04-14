"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearLocation = clearLocation;
exports.onLocationSelected = onLocationSelected;
exports.setLocation = setLocation;
exports.setLocationToCurrent = setLocationToCurrent;
exports.switchLocations = switchLocations;
exports.setMapPopupLocationAndGeocode = setMapPopupLocationAndGeocode;
exports.setMapPopupLocation = exports.setElevationPoint = exports.setLegDiagram = exports.rememberStop = exports.forgetStop = exports.rememberPlace = exports.forgetPlace = void 0;

var _src = _interopRequireDefault(require("../otp-ui/core-utils/src"));

var _src2 = _interopRequireDefault(require("../otp-ui/geocoder/src"));

var _reduxActions = require("redux-actions");

var _api = require("./api");

var _form = require("./form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* SET_LOCATION action creator. Updates a from or to location in the store
 *
 * payload format: {
 *   type: 'from' or 'to'
 *   location: {
 *     name: (string),
 *     lat: (number)
 *     lat: (number)
 *   }
 */
// Private actions
const clearingLocation = (0, _reduxActions.createAction)('CLEAR_LOCATION');
const settingLocation = (0, _reduxActions.createAction)('SET_LOCATION'); // Public actions

const forgetPlace = (0, _reduxActions.createAction)('FORGET_PLACE');
exports.forgetPlace = forgetPlace;
const rememberPlace = (0, _reduxActions.createAction)('REMEMBER_PLACE');
exports.rememberPlace = rememberPlace;
const forgetStop = (0, _reduxActions.createAction)('FORGET_STOP');
exports.forgetStop = forgetStop;
const rememberStop = (0, _reduxActions.createAction)('REMEMBER_STOP');
exports.rememberStop = rememberStop;

function clearLocation(payload) {
  return function (dispatch, getState) {
    // Dispatch the clear location action and then clear the active search (so
    // that the map and narrative are not showing a search when one or both
    // locations are not defined).
    dispatch(clearingLocation(payload));
    dispatch((0, _form.clearActiveSearch)());
  };
}
/**
 * Handler for @opentripplanner/location-field onLocationSelected
 */


function onLocationSelected({
  locationType,
  location,
  resultType
}) {
  return function (dispatch, getState) {
    if (resultType === 'CURRENT_LOCATION') {
      dispatch(setLocationToCurrent({
        locationType
      }));
    } else {
      dispatch(setLocation({
        location,
        locationType
      }));
    }
  };
}

function setLocation(payload) {
  return function (dispatch, getState) {
    const otpState = getState().otp; // reverse geocode point location if requested

    if (payload.reverseGeocode) {
      (0, _src2.default)(otpState.config.geocoder).reverse({
        point: payload.location
      }).then(location => {
        dispatch(settingLocation({
          locationType: payload.locationType,
          location
        }));
      }).catch(err => {
        dispatch(settingLocation({
          locationType: payload.locationType,
          location: payload.location
        }));
        console.warn(err);
      });
    } else {
      // update the location in the store
      dispatch(settingLocation(payload));
    }
  };
}
/* payload is simply { type: 'from'|'to' }; location filled in automatically */


function setLocationToCurrent(payload) {
  return function (dispatch, getState) {
    const currentPosition = getState().otp.location.currentPosition;
    if (currentPosition.error || !currentPosition.coords) return;
    payload.location = {
      lat: currentPosition.coords.latitude,
      lon: currentPosition.coords.longitude,
      name: '(Posizione Corrente)',
      category: 'CURRENT_LOCATION'
    };
    dispatch(settingLocation(payload));
  };
}

function switchLocations() {
  return function (dispatch, getState) {
    const {
      from,
      to
    } = getState().otp.currentQuery; // First, reverse the locations.

    dispatch(settingLocation({
      locationType: 'from',
      location: to
    }));
    dispatch(settingLocation({
      locationType: 'to',
      location: from
    })); // Then kick off a routing query (if the query is invalid, search will abort).

    dispatch((0, _api.routingQuery)());
  };
}

const setLegDiagram = (0, _reduxActions.createAction)('SET_LEG_DIAGRAM');
exports.setLegDiagram = setLegDiagram;
const setElevationPoint = (0, _reduxActions.createAction)('SET_ELEVATION_POINT');
exports.setElevationPoint = setElevationPoint;
const setMapPopupLocation = (0, _reduxActions.createAction)('SET_MAP_POPUP_LOCATION');
exports.setMapPopupLocation = setMapPopupLocation;

function setMapPopupLocationAndGeocode(mapEvent) {
  const location = _src.default.map.constructLocation(mapEvent.latlng);

  return function (dispatch, getState) {
    dispatch(setMapPopupLocation({
      location
    }));
    (0, _src2.default)(getState().otp.config.geocoder).reverse({
      point: location
    }).then(location => {
      dispatch(setMapPopupLocation({
        location
      }));
    }).catch(err => {
      console.warn(err);
    });
  };
}

//# sourceMappingURL=map.js