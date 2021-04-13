"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgFeedback = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M326.7 46.8c24.8 0 44.9 20.1 44.9 44.8v109.8c0 24.8-20.1 44.9-44.9 44.9h-29.2v10.2c.4 21.2 3 51.2 19.6 82.2-31.1-3.9-85.1-19.9-90-83.2l-.7-9.3H63.3c-24.8 0-44.8-20.1-44.8-44.9V91.7c0-24.8 20.1-44.8 44.8-44.8h263.4m0-18.5H63.3C28.4 28.4 0 56.8 0 91.7v109.8c0 34.9 28.4 63.3 63.3 63.3h146.3c7.1 51.3 45 84.7 105.2 92.3l35.3 4.5-16.7-31.5c-12.8-23.9-16.2-47.6-17.2-65.3h10.4c34.9 0 63.3-28.4 63.3-63.3V91.7c.1-34.9-28.3-63.3-63.2-63.3z"
}));

var _default = SvgFeedback;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=Feedback.js