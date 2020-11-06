"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TransitLegSummary;

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _time = require("@opentripplanner/core-utils/lib/time");

var Styled = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is a clickable component that summarizes the leg (travel time, stops
 * passed). On click it will expand and show the list of intermediate stops.
 */
function TransitLegSummary({
  leg,
  onClick,
  stopsExpanded
}) {
  return /*#__PURE__*/_react.default.createElement(Styled.TransitLegSummary, {
    onClick: onClick
  }, leg.duration && /*#__PURE__*/_react.default.createElement("span", null, "$_travel_for_$ ", (0, _time.formatDuration)(leg.duration)), leg.intermediateStops && /*#__PURE__*/_react.default.createElement("span", null, " / ", leg.intermediateStops.length + 1, " $_stops_$ ", /*#__PURE__*/_react.default.createElement(Styled.CaretToggle, {
    expanded: stopsExpanded
  })));
}

TransitLegSummary.propTypes = {
  leg: _types.legType.isRequired,
  onClick: _propTypes.default.func.isRequired,
  stopsExpanded: _propTypes.default.bool.isRequired
};