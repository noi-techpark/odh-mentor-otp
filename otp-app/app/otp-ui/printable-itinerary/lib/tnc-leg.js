"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TNCLeg;

var _types = require("@opentripplanner/core-utils/lib/types");

var _time = require("@opentripplanner/core-utils/lib/time");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TNCLeg({
  leg,
  LegIcon
}) {
  const {
    tncData
  } = leg;
  if (!tncData) return null;
  return /*#__PURE__*/_react.default.createElement(Styled.Leg, null, /*#__PURE__*/_react.default.createElement(Styled.ModeIcon, null, /*#__PURE__*/_react.default.createElement(LegIcon, {
    leg: leg
  })), /*#__PURE__*/_react.default.createElement(Styled.LegBody, null, /*#__PURE__*/_react.default.createElement(Styled.LegHeader, null, /*#__PURE__*/_react.default.createElement("b", null, "Take ", tncData.displayName), " $_to_$ ", /*#__PURE__*/_react.default.createElement("b", null, leg.to.name)), /*#__PURE__*/_react.default.createElement(Styled.LegDetails, null, /*#__PURE__*/_react.default.createElement(Styled.LegDetail, null, "Estimated wait time for pickup:", " ", /*#__PURE__*/_react.default.createElement("b", null, (0, _time.formatDuration)(tncData.estimatedArrival))), /*#__PURE__*/_react.default.createElement(Styled.LegDetail, null, "Estimated travel time: ", /*#__PURE__*/_react.default.createElement("b", null, (0, _time.formatDuration)(leg.duration)), " (does not account for traffic)"))));
}

TNCLeg.propTypes = {
  leg: _types.legType.isRequired,
  LegIcon: _propTypes.default.elementType.isRequired
};