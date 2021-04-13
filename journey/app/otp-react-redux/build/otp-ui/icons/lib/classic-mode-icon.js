"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classic = require("./classic");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Icons for all classic OTP-react-redux modes.
 * Any hail and rental modes managed by one or multiple companies
 * are optional (by default, the company logo will be displayed)
 * but can be overriden here using the pattern
 * <otp_mode>_<company_id> (e.g. 'car_hail_uber').
 * Furthermore, any hail or rental modes managed by a single company
 * are optional (by default, the company logo will be displayed)
 * but can be overriden here using the pattern
 * <otp_mode> (e.g. 'bicycle_rent').
 */


function ClassicModeIcon({
  mode,
  ...props
}) {
  if (!mode) return null;

  switch (mode.toLowerCase()) {
    case "bicycle":
    case "bicycle_rent":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicBike, props);

    case "bus":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicBus, props);

    case "car":
    case "car_park":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicCar, props);

    case "ferry":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicFerry, props);

    case "gondola":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicGondola, props);

    case "micromobility":
    case "micromobility_rent":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicMicromobility, props);

    case "rail":
    case "subway":
    case "tram":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicTram, props);

    case "transit":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicBus, props);

    case "walk":
      return /*#__PURE__*/_react.default.createElement(_classic.ClassicWalk, props);

    default:
      return null;
  }
}

var _default = ClassicModeIcon;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=classic-mode-icon.js