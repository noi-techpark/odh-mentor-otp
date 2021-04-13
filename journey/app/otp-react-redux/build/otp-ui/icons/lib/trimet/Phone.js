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

const SvgPhone = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M114.8 195.5c0 110.9 43.9 194.5 102 194.5v-94.4c-15.1 0-41.3-21.6-41.3-100.2 0-78.5 26.2-102.7 41.3-102.7V1c-58 0-102 83.6-102 194.5M232.6 92.5h20c12.4 0 22.5-7.3 22.5-16.3V16.3c0-9-10.1-16.3-22.5-16.3h-20v92.5zM232.6 389.3h20c12.4 0 22.5-7.3 22.5-16.3v-59.9c0-9-10.1-16.3-22.5-16.3h-20v92.5z"
}));

var _default = SvgPhone;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=Phone.js