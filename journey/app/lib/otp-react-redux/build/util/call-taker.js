"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchToQuery = searchToQuery;

var _api = require("../actions/api");

function placeToLatLonStr(place) {
  return `${place.lat.toFixed(6)},${place.lon.toFixed(6)}`;
}
/**
 * Utility to map an OTP MOD UI search object to a Call Taker datastore query
 * object.
 */


function searchToQuery(search, call, otpConfig) {
  // FIXME: how to handle realtime updates?
  const queryParams = (0, _api.getRoutingParams)(search.query, otpConfig, true);
  const {
    from,
    to
  } = search.query;
  return {
    queryParams: JSON.stringify(queryParams),
    fromPlace: from.name || placeToLatLonStr(from),
    toPlace: to.name || placeToLatLonStr(to),
    timeStamp: search.query.timestamp,
    call
  };
}

//# sourceMappingURL=call-taker.js