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

const ClassicMicromobility = ({
  title,
  ...props
}) => /*#__PURE__*/_react.default.createElement("svg", _extends({
  height: "100%",
  viewBox: "0 0 512 512",
  width: "100%",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /*#__PURE__*/_react.default.createElement("path", {
  d: "m464.027344 393.210938-47.425782-341.464844c-4.097656-29.5-29.648437-51.746094-59.429687-51.746094h-68.171875v40h68.171875c9.929687 0 18.441406 7.414062 19.808594 17.246094l36.148437 260.25c-52.128906 15.089844-91.835937 59.722656-99.703125 114.503906h-196.867187c-8.253906-23.277344-30.484375-40-56.558594-40-33.085938 0-60 26.914062-60 60s26.914062 60 60 60c26.074219 0 48.304688-16.722656 56.558594-40h235.441406v-20c0-43.472656 27.886719-80.550781 66.710938-94.296875l5.699218 41.042969c-19.234375 10.003906-32.410156 30.113281-32.410156 53.253906 0 33.085938 26.914062 60 60 60s60-26.914062 60-60c0-28.964844-20.632812-53.203125-47.972656-58.789062zm-404.027344 78.789062c-11.027344 0-20-8.972656-20-20s8.972656-20 20-20 20 8.972656 20 20-8.972656 20-20 20zm392 0c-11.027344 0-20-8.972656-20-20s8.972656-20 20-20 20 8.972656 20 20-8.972656 20-20 20zm0 0"
}));

var _default = ClassicMicromobility;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=classic-micromobility.js