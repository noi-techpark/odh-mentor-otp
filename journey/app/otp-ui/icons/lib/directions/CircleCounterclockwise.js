"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgCircleCounterclockwise = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 261 261"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M130.5 20.5a100 100 0 00-100 100c0 42.49 27.63 75.52 65 90 0-30 10-45 25-50-19.49-2.68-30-19.78-30-40a40 40 0 0180 0h60a100 100 0 00-100-100z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M200.5 80.5l-60 60h25.63c-5.54 12-15.57 20-25.62 20-25 0-40 20-40 40v60h60v-44.59a100.12 100.12 0 0068-75.41h32z"
}));

var _default = SvgCircleCounterclockwise;
exports.default = _default;