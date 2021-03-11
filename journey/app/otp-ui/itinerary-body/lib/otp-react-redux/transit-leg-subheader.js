"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TransitLegSubheader;

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var Styled = _interopRequireWildcard(require("../styled"));

var _viewStopButton = _interopRequireDefault(require("./view-stop-button"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TransitLegSubheader({
  languageConfig,
  leg,
  onStopClick
}) {
  const {
    from
  } = leg;
  const buttonText = languageConfig.stopViewer || "Fermata";
  return /*#__PURE__*/_react.default.createElement(Styled.PlaceSubheader, null, /*#__PURE__*/_react.default.createElement("span", null, "Stop ID ", from.stopId.split(":")[1]), /*#__PURE__*/_react.default.createElement(_viewStopButton.default, {
    onStopClick: onStopClick,
    stopId: from.stopId,
    text: buttonText
  }));
}

TransitLegSubheader.propTypes = {
  languageConfig: _types.languageConfigType.isRequired,
  leg: _types.legType.isRequired,
  onStopClick: _propTypes.default.func.isRequired
};