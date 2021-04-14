"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _legIcon = _interopRequireDefault(require("./leg-icon"));

var _classicModeIcon = _interopRequireDefault(require("./classic-mode-icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ClassicLegIcon = props => /*#__PURE__*/_react.default.createElement(_legIcon.default, _extends({
  ModeIcon: _classicModeIcon.default
}, props));

var _default = ClassicLegIcon;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=classic-leg-icon.js