"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const SvgApp = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M284.5 0h-179C87 0 71.8 15.2 71.8 33.8v322.5c0 18.5 15.2 33.8 33.8 33.8h178.9c18.5 0 33.8-15.2 33.8-33.8V33.8C316.6 15.2 303 0 284.5 0zm11.8 354.6c0 6.7-5.1 11.8-11.8 11.8h-179c-6.7 0-11.8-5.1-11.8-11.8V33.8c0-6.7 5.1-11.8 11.8-11.8h178.9c6.7 0 11.8 5.1 11.8 11.8v320.8z"
}), /*#__PURE__*/_react.default.createElement("circle", {
  cx: 195,
  cy: 335.9,
  r: 22
}), /*#__PURE__*/_react.default.createElement("path", {
  d: "M117.3 45.6H271v260.1H117.3z"
}));

var _default = SvgApp;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=App.js