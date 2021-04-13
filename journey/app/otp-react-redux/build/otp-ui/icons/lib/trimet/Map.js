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

const SvgMap = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  viewBox: "0 0 390 390"
}, props), title ? /*#__PURE__*/_react.default.createElement("title", null, title) : null, /*#__PURE__*/_react.default.createElement("path", {
  d: "M260.4 54.2L129.6 0 6.6 50.9v335.8l123-50.9L260.4 390l123-50.9V3.3l-123 50.9zM139.2 25l111.5 46.2v294L139.2 319V25zM25.9 63.9l94.1-39v294l-94.1 39v-294zm338.2 262.2l-94.1 39V71.2l94.1-39v293.9z"
}));

var _default = SvgMap;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=Map.js