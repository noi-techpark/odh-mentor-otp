"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classic = require("./classic");

var _standard = require("./standard");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Icons for all standard MOD-UI modes.
 * Any hail and rental modes managed by one or multiple companies
 * are optional (by default, the company logo will be displayed)
 * but can be overriden here using the pattern
 * <otp_mode>_<company_id> (e.g. 'car_hail_uber').
 * Furthermore, any hail or rental modes managed by a single company
 * are optional (by default, the company logo will be displayed)
 * but can be overriden here using the pattern
 * <otp_mode> (e.g. 'bicycle_rent').
 */


function StandardModeIcon({
  mode,
  ...props
}) {
  if (!mode) return null;

  switch (mode.toLowerCase()) {
    case "bicycle":
    case "bicycle_rent":
      return /*#__PURE__*/_react.default.createElement(_standard.StandardBike, props);

    case "bus":
      return /*#__PURE__*/_react.default.createElement(_standard.StandardBus, props);

    case "car":
    case "car_park":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicCar, props);

    case "ferry":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicFerry, props);

    case "gondola":
      return /*#__PURE__*/_react.default.createElement(_standard.StandardGondola, props);

    case "micromobility":
    case "micromobility_rent":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicMicromobility, props);

    case "rail":
    case "subway":
    case "tram":
      return /*#__PURE__*/_react.default.createElement(_standard.StandardTram, props);

    case "transit":
      return /*#__PURE__*/_react.default.createElement(_standard.StandardBus, props);

    case "walk":
      return /*#__PURE__*/_react.default.createElement(_standard.StandardWalk, props);

    default:
      return null;
  }
}

var _default = StandardModeIcon;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=standard-mode-icon.js