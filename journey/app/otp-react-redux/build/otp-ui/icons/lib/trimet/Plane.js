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

const SvgPlane = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M355.3 366.5L232.8 228.4l-47.5 82.3 18.3 47.1L185 390l-44.8-48.2-63.7-14.5L95 295.2l49.9-7.8 47.4-82.2L11.5 168l23.4-40.6 204.1-5 64.1-110.8c15.2-26.6 55.9-2.8 40.4 24L279.7 146l98.8 179.8-23.2 40.7z"
}));

var _default = SvgPlane;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=Plane.js