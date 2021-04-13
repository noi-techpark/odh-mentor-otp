"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const SvgStopstation = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M195 0C87.3 0 0 87.3 0 195s87.3 195 195 195 195-87.3 195-195S302.7 0 195 0zm123.7 318.7c-27.8 27.8-63.2 45-101.5 49.9V66.3l4.5-22.4h-29.3l4.5 22.4V370H195c-46.7 0-90.7-18.2-123.7-51.3C38.2 285.6 20 241.7 20 195s18.2-90.7 51.3-123.7C104.4 38.2 148.3 20 195 20s90.7 18.2 123.7 51.3c33.1 33.1 51.3 77 51.3 123.7s-18.2 90.7-51.3 123.7z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M70.8 202.3c0 51.3 41.6 92.9 92.9 92.9 8.6 0 16.9-1.2 24.8-3.4v-179c-7.9-2.2-16.2-3.4-24.8-3.4-51.3 0-92.9 41.6-92.9 92.9zM225.6 66.9V229c40.3-5.1 71.4-39.4 71.4-81.1 0-41.6-31.2-75.9-71.4-81z"
}));

var _default = SvgStopstation;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=StopStation.js