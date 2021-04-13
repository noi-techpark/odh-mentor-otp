"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgTransittracker = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M285.2 264.7l-105.5-60.9V47.1h30.6v139.1l90.1 52.1z"
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M195 20c46.7 0 90.7 18.2 123.7 51.3 33.1 33.1 51.3 77 51.3 123.7s-18.2 90.7-51.3 123.7c-33.1 33.1-77 51.3-123.7 51.3s-90.7-18.2-123.7-51.3C38.2 285.6 20 241.7 20 195s18.2-90.7 51.3-123.7c33-33.1 77-51.3 123.7-51.3m0-20C87.3 0 0 87.3 0 195s87.3 195 195 195 195-87.3 195-195S302.7 0 195 0z"
}));

var _default = SvgTransittracker;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=Transittracker.js