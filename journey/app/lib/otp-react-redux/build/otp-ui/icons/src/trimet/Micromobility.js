"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgMicromobility = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 512 512"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M464.027 393.21L416.602 51.747C412.504 22.246 386.953 0 357.172 0H289v40h68.172c9.93 0 18.441 7.414 19.808 17.246l36.149 260.25C361 332.586 321.293 377.22 313.426 432H116.559c-8.254-23.277-30.485-40-56.559-40-33.086 0-60 26.914-60 60s26.914 60 60 60c26.074 0 48.305-16.723 56.559-40H352v-20c0-43.473 27.887-80.55 66.71-94.297l5.7 41.043C405.176 408.75 392 428.86 392 452c0 33.086 26.914 60 60 60s60-26.914 60-60c0-28.965-20.633-53.203-47.973-58.79zM60 472c-11.027 0-20-8.973-20-20s8.973-20 20-20 20 8.973 20 20-8.973 20-20 20zm392 0c-11.027 0-20-8.973-20-20s8.973-20 20-20 20 8.973 20 20-8.973 20-20 20zm0 0"
}));

var _default = SvgMicromobility;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=Micromobility.js