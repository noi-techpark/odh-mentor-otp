"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DefaultStopMarker;

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DefaultStopMarker({
  leafletPath,
  radius,
  stop
}) {
  return /*#__PURE__*/_react.default.createElement(_reactLeaflet.CircleMarker
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  , _extends({}, leafletPath, {
    center: [stop.lat, stop.lon],
    key: stop.id,
    radius: radius
  }), /*#__PURE__*/_react.default.createElement(_reactLeaflet.Popup, null, /*#__PURE__*/_react.default.createElement("div", null, stop.name)));
}

DefaultStopMarker.propTypes = {
  leafletPath: _types.leafletPathType,
  radius: _propTypes.default.number,
  stop: _types.stopLayerStopType.isRequired
};
DefaultStopMarker.defaultProps = {
  leafletPath: {
    color: "#000",
    fillColor: "cyan",
    fillOpacity: 1,
    weight: 3
  },
  radius: 9
};