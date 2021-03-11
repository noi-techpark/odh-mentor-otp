"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const StandardTram = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  version: "1.1",
  viewBox: "0 0 32 32",
  height: "100%",
  width: "100%"
}, props), /*#__PURE__*/_react.default.createElement("path", {
  d: "M9.9,27.2v3.2L8.5,32h1.8l0.8-1.1v-1.8H21v1.8l1,1.1h1.6l-1.4-1.7v-3.1h3.4l0.3-1.6V5.2h-3.2l-0.7-1.9h-5.3V2.6l2.7-1.7V0 h-6.5v1l2.6,1.6v0.7h-5.3L9.4,5.2H6.2l0,20.4l0.3,1.6H9.9z M22.9,8.1l1.8,1.1V16l-1.8,0.6V8.1z M14.7,0.9h2.7L16,1.8L14.7,0.9z M9.9,8.3c0-0.5,0.3-0.8,0.8-0.8h10.4c0.5,0,0.8,0.3,0.8,0.8v7.8c0,0.5-0.3,0.8-0.8,0.8H10.7c-0.5,0-0.8-0.3-0.8-0.8V8.3z M21.9,18.1V20h-3.2v-1.9H21.9z M13.2,18.1v1.8H10v-1.8H13.2z M22.8,21.1v1.6H8.9v-1.6H22.8z M7.2,9.1L9,8v8.6L7.2,16V9.1z"
}));

var _default = StandardTram;
exports.default = _default;