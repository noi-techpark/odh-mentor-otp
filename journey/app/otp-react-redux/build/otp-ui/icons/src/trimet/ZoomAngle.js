"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgZoomangle = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M137.5 81.8v55.7H81.8c-6.3 0-11.5 5.2-11.5 11.5s5.2 11.5 11.5 11.5h55.7v55.7c0 6.3 5.2 11.5 11.5 11.5s11.5-5.2 11.5-11.5v-55.7h55.7c6.3 0 11.5-5.2 11.5-11.5s-5.2-11.5-11.5-11.5h-55.7V81.8c0-6.3-5.2-11.5-11.5-11.5s-11.5 5.2-11.5 11.5z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M365.4 344.6L246.9 226.2c38.6-48.8 35.3-120-9.8-165.1-48.5-48.5-127.5-48.6-176.1 0s-48.5 127.6 0 176.1c45 45 116.4 48.3 165.2 9.7l118.3 118.4 20.9-20.7zM78.8 219.4c-38.7-38.7-38.7-101.8 0-140.6s101.8-38.7 140.6 0 38.7 101.8 0 140.6c-38.8 38.8-101.8 38.8-140.6 0z"
}));

var _default = SvgZoomangle;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=ZoomAngle.js