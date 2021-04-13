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

const SvgBikeparking = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M195 20c46.7 0 90.7 18.2 123.7 51.3 33.1 33.1 51.3 77 51.3 123.7s-18.2 90.7-51.3 123.7c-33.1 33.1-77 51.3-123.7 51.3s-90.7-18.2-123.7-51.3C38.2 285.6 20 241.7 20 195s18.2-90.7 51.3-123.7c33-33.1 77-51.3 123.7-51.3m0-20C87.3 0 0 87.3 0 195s87.3 195 195 195 195-87.3 195-195S302.7 0 195 0z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M103.3 73.2h118.1c59.6 0 74.8 37.2 74.8 62.3 0 34.9-19.6 44.7-29.8 49.8 29.8 11.2 37.6 34.9 37.6 58.9 0 19.3-8.1 37.6-21 50.1-13.9 13.5-27.1 22-76.8 22H103.3V73.2zm48.8 95.2h59.6c20 0 35.9-7.8 35.9-27.1 0-20-14.2-26.1-37.2-26.1h-58.2l-.1 53.2zm0 105.9h62.3c24.7 0 38.9-10.8 38.9-35.5 0-21.3-18.3-29.5-36.6-29.5H152v65h.1z"
}));

var _default = SvgBikeparking;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=BikeParking.js