"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgMapmarkersolid = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M195 0C124.6 0 67.3 57.3 67.3 127.7c0 102.8 112.8 243.9 117.6 249.8L195 390l10.1-12.5c4.8-6 117.6-147 117.6-249.8C322.7 57.3 265.4 0 195 0zm0 182.8c-29.5 0-53.5-24-53.5-53.5s24-53.5 53.5-53.5 53.5 24 53.5 53.5-24 53.5-53.5 53.5z"
}));

var _default = SvgMapmarkersolid;
exports.default = _default;