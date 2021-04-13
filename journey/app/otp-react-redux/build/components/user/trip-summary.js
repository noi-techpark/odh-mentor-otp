"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _src2 = require("../../otp-ui/icons/src");

var _react = _interopRequireDefault(require("react"));

var _itinerarySummary = _interopRequireDefault(require("../narrative/default/itinerary-summary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  formatDuration,
  formatTime
} = _src.default.time;

const TripSummary = ({
  monitoredTrip
}) => {
  const {
    itinerary
  } = monitoredTrip;
  const {
    duration,
    endTime,
    legs,
    startTime
  } = itinerary; // Assuming the monitored itinerary has at least one leg:
  // - get the 'from' location of the first leg,
  // - get the 'to' location of the last leg.

  const from = legs[0].from;
  const to = legs[legs.length - 1].to; // TODO: use the modern itinerary summary built for trip comparison.

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "From ", /*#__PURE__*/_react.default.createElement("b", null, from.name), " to ", /*#__PURE__*/_react.default.createElement("b", null, to.name)), /*#__PURE__*/_react.default.createElement("div", {
    className: `otp option default-itin active`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "title"
  }, "Itinerary"), ' ', /*#__PURE__*/_react.default.createElement("span", {
    className: "duration pull-right"
  }, formatDuration(duration)), ' ', /*#__PURE__*/_react.default.createElement("span", {
    className: "arrivalTime"
  }, formatTime(startTime), "\u2014", formatTime(endTime)), /*#__PURE__*/_react.default.createElement(_itinerarySummary.default, {
    itinerary: itinerary,
    LegIcon: _src2.ClassicLegIcon
  }))));
};

var _default = TripSummary;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trip-summary.js