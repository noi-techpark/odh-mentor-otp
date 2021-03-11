"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgUTurnRight = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 261 261"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M112.5 120.5l70 100 70-100h-40v-20c0-75.5-23.57-97.75-95.36-97.5S22.5 26.38 22.5 100.5v160h60v-160c0-35.54 3.21-39.69 34.64-40s35.36 5.19 35.36 40v20h-40z"
}));

var _default = SvgUTurnRight;
exports.default = _default;