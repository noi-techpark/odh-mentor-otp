"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccessLegSummary;

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _types = require("@opentripplanner/core-utils/lib/types");

var _humanizeDistance = require("@opentripplanner/humanize-distance");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Styled = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AccessLegSummary({
  config,
  leg,
  LegIcon,
  onSummaryClick,
  showLegIcon
}) {
  return /*#__PURE__*/_react.default.createElement(Styled.LegClickable, {
    onClick: onSummaryClick
  }, showLegIcon && /*#__PURE__*/_react.default.createElement(Styled.LegIconContainer, null, /*#__PURE__*/_react.default.createElement(LegIcon, {
    leg: leg
  })), /*#__PURE__*/_react.default.createElement(Styled.LegDescription, null, (0, _itinerary.getLegModeLabel)(leg), " ", leg.distance > 0 && /*#__PURE__*/_react.default.createElement("span", null, " ", (0, _humanizeDistance.humanizeDistanceString)(leg.distance)), ` $_to_$ ${(0, _itinerary.getPlaceName)(leg.to, config.companies)}`));
}

AccessLegSummary.propTypes = {
  config: _types.configType.isRequired,
  leg: _types.legType.isRequired,
  LegIcon: _propTypes.default.elementType.isRequired,
  onSummaryClick: _propTypes.default.func.isRequired,
  showLegIcon: _propTypes.default.bool.isRequired
};