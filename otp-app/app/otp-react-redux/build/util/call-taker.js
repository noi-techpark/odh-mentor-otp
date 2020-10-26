"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchToQuery = searchToQuery;

require("core-js/modules/es6.function.name");

var _api = require("../actions/api");

function placeToLatLonStr(place) {
  return "".concat(place.lat.toFixed(6), ",").concat(place.lon.toFixed(6));
}
/**
 * Utility to map an OTP MOD UI search object to a Call Taker datastore query
 * object.
 */


function searchToQuery(search, call, otpConfig) {
  // FIXME: how to handle realtime updates?
  var queryParams = (0, _api.getRoutingParams)(search.query, otpConfig, true);
  var _search$query = search.query,
      from = _search$query.from,
      to = _search$query.to;
  return {
    queryParams: JSON.stringify(queryParams),
    fromPlace: from.name || placeToLatLonStr(from),
    toPlace: to.name || placeToLatLonStr(to),
    timeStamp: search.query.timestamp,
    call: call
  };
}

//# sourceMappingURL=call-taker.js