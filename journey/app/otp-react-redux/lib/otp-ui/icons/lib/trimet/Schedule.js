"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgSchedule = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M253.1 390c-66.9 0-121.3-54.4-121.3-121.3s54.4-121.3 121.3-121.3 121.3 54.4 121.3 121.3S320.1 390 253.1 390zm0-223.4c-56.2 0-102 45.8-102 102s45.8 102 102 102 102-45.8 102-102-45.7-102-102-102z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M304.5 309.2l-60.6-35v-90h19.3V263l51 29.5zM152.9 125.7H65.8v-19.3H153v19.3zM152.9 77.4H65.8V58.1H153v19.3zM172.2 106.4h87.2v19.3h-87.2zM172.3 58.1h87.2v19.3h-87.2z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M34.8 310V19.3h255.5V133c6.7 1.8 13.1 4.1 19.3 6.9V0H15.5v329.4h110.8c-3-6.2-5.5-12.7-7.6-19.3l-83.9-.1z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M152.9 154.7H65.8V174H149l3.9-4.2v-15.1zM65.8 203.2v19.3h54.4c2.3-6.7 5.1-13.1 8.4-19.3H65.8zM113.4 251.5H65.8v19.3h46.6v-2.3c.1-5.6.4-11.4 1-17z"
}));

var _default = SvgSchedule;
exports.default = _default;