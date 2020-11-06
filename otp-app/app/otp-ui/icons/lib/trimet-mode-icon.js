"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _trimet = require("./trimet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Icons for all TriMet modes.
 * Any hail and rental modes managed by one or multiple companies
 * are optional (by default, the company logo will be displayed)
 * but can be overriden here using the pattern
 * <otp_mode>_<company_id> (e.g. 'car_hail_uber').
 * Furthermore, any hail or rental modes managed by a single company
 * are optional (by default, the company logo will be displayed)
 * but can be overriden here using the pattern
 * <otp_mode> (e.g. 'bicycle_rent').
 */
function TriMetModeIcon({
  mode,
  ...props
}) {
  if (!mode) return null;

  switch (mode.toLowerCase()) {
    case "bicycle":
      // case "bicycle_rent": // Commented means using the company logo instead.
      return /*#__PURE__*/_react.default.createElement(_trimet.Bicycle, props);

    case "bus":
      return /*#__PURE__*/_react.default.createElement(_trimet.Bus, props);

    case "car":
    case "car_park":
      return /*#__PURE__*/_react.default.createElement(_trimet.Car, props);

    case "ferry":
      return /*#__PURE__*/_react.default.createElement(_trimet.Ferry, props);

    case "gondola":
      return /*#__PURE__*/_react.default.createElement(_trimet.AerialTram, props);

    case "micromobility":
    case "micromobility_rent":
      return /*#__PURE__*/_react.default.createElement(_trimet.Micromobility, props);

    case "rail":
      return /*#__PURE__*/_react.default.createElement(_trimet.Wes, props);

    case "streetcar":
      return /*#__PURE__*/_react.default.createElement(_trimet.Streetcar, props);

    case "subway":
    case "tram":
      return /*#__PURE__*/_react.default.createElement(_trimet.Max, props);

    case "transit":
      return /*#__PURE__*/_react.default.createElement(_trimet.TriMet, props);

    case "walk":
      return /*#__PURE__*/_react.default.createElement(_trimet.Walk, props);

    default:
      return null;
  }
}

var _default = TriMetModeIcon;
exports.default = _default;