"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.name");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _icons = require("@opentripplanner/icons");

var _react = _interopRequireDefault(require("react"));

var _itinerarySummary = _interopRequireDefault(require("../narrative/default/itinerary-summary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _coreUtils$time = _coreUtils.default.time,
    formatDuration = _coreUtils$time.formatDuration,
    formatTime = _coreUtils$time.formatTime;

var TripSummary = function TripSummary(_ref) {
  var monitoredTrip = _ref.monitoredTrip;
  var itinerary = monitoredTrip.itinerary;
  var duration = itinerary.duration,
      endTime = itinerary.endTime,
      legs = itinerary.legs,
      startTime = itinerary.startTime; // Assuming the monitored itinerary has at least one leg:
  // - get the 'from' location of the first leg,
  // - get the 'to' location of the last leg.

  var from = legs[0].from;
  var to = legs[legs.length - 1].to; // TODO: use the modern itinerary summary built for trip comparison.

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "From ", /*#__PURE__*/_react.default.createElement("b", null, from.name), " to ", /*#__PURE__*/_react.default.createElement("b", null, to.name)), /*#__PURE__*/_react.default.createElement("div", {
    className: "otp option default-itin active"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "title"
  }, "Itinerario"), ' ', /*#__PURE__*/_react.default.createElement("span", {
    className: "duration pull-right"
  }, formatDuration(duration)), ' ', /*#__PURE__*/_react.default.createElement("span", {
    className: "arrivalTime"
  }, formatTime(startTime), "\u2014", formatTime(endTime)), /*#__PURE__*/_react.default.createElement(_itinerarySummary.default, {
    itinerary: itinerary,
    LegIcon: _icons.ClassicLegIcon
  }))));
};

var _default = TripSummary;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trip-summary.js