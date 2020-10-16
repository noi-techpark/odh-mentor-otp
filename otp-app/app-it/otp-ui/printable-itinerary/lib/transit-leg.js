"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TransitLeg;

var _time = require("@opentripplanner/core-utils/lib/time");

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TransitLeg({
  leg,
  LegIcon,
  interlineFollows,
  timeOptions
}) {
  // Handle case of transit leg interlined w/ previous
  if (leg.interlineWithPreviousLeg) {
    return /*#__PURE__*/_react.default.createElement(Styled.CollapsedTop, null, /*#__PURE__*/_react.default.createElement(Styled.LegBody, null, /*#__PURE__*/_react.default.createElement(Styled.LegHeader, null, "Continues as", " ", /*#__PURE__*/_react.default.createElement("b", null, leg.routeShortName, " ", leg.routeLongName), " ", "verso ", /*#__PURE__*/_react.default.createElement("b", null, leg.to.name)), /*#__PURE__*/_react.default.createElement(Styled.LegDetails, null, /*#__PURE__*/_react.default.createElement(Styled.LegDetail, null, "Scendi a ", /*#__PURE__*/_react.default.createElement("b", null, leg.to.name), " alle", " ", (0, _time.formatTime)(leg.endTime, timeOptions)))));
  }

  return /*#__PURE__*/_react.default.createElement(Styled.Leg, null, /*#__PURE__*/_react.default.createElement(Styled.ModeIcon, null, /*#__PURE__*/_react.default.createElement(LegIcon, {
    leg: leg
})), /*#__PURE__*/_react.default.createElement(Styled.LegBody, null, /*#__PURE__*/_react.default.createElement(Styled.LegHeader, null, /*#__PURE__*/_react.default.createElement("b", null, leg.routeShortName, " ", leg.routeLongName), " ", "verso ", /*#__PURE__*/_react.default.createElement("b", null, leg.to.name)), /*#__PURE__*/_react.default.createElement(Styled.LegDetails, null, /*#__PURE__*/_react.default.createElement(Styled.LegDetail, null, "Sali a ", /*#__PURE__*/_react.default.createElement("b", null, leg.from.name), " alle", " ", (0, _time.formatTime)(leg.startTime, timeOptions)), /*#__PURE__*/_react.default.createElement(Styled.LegDetail, null, interlineFollows ? /*#__PURE__*/_react.default.createElement("span", null, "Resta a bordo a ", /*#__PURE__*/_react.default.createElement("b", null, leg.to.name)) : /*#__PURE__*/_react.default.createElement("span", null, "Scendi a ", /*#__PURE__*/_react.default.createElement("b", null, leg.to.name), " alle", " ", (0, _time.formatTime)(leg.endTime, timeOptions))))));
}

TransitLeg.propTypes = {
  interlineFollows: _propTypes.default.bool,
  leg: _types.legType.isRequired,
  LegIcon: _propTypes.default.elementType.isRequired,
  timeOptions: _types.timeOptionsType
};
TransitLeg.defaultProps = {
  interlineFollows: false,
  timeOptions: null
};
