"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgMapmarker = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M195 390l-10.1-12.5c-4.8-6-117.6-147-117.6-249.8C67.3 57.3 124.6 0 195 0s127.7 57.3 127.7 127.7c0 102.8-112.8 243.9-117.6 249.8L195 390zm0-364.1c-56.1 0-101.8 45.7-101.8 101.8 0 76.8 74.3 183.6 101.8 220.5 27.5-36.9 101.8-143.7 101.8-220.5 0-56.2-45.7-101.8-101.8-101.8z"
}), /*#__PURE__*/_react.default.createElement("circle", {
  cx: 195,
  cy: 129.3,
  r: 53.5
}));

var _default = SvgMapmarker;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=MapMarker.js