"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var Icons = _interopRequireWildcard(require("@opentripplanner/icons"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const modeOptions = {
  primary: {
    id: "PRIMARY",
    title: "Primary Choice",
    text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(Icons.Max, null), /*#__PURE__*/_react.default.createElement(Icons.Bus, null), " Primary Choice")
  },
  secondary: [{
    id: "SECONDARY1",
    title: "Secondary 1",
    text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(Icons.Bike, null), " Sec. #1")
  }, {
    id: "SECONDARY2",
    title: "Secondary 2",
    selected: true,
    showTitle: false,
    text: /*#__PURE__*/_react.default.createElement("span", null, "Sec. #2 ", /*#__PURE__*/_react.default.createElement(Icons.Micromobility, null))
  }],
  tertiary: [{
    id: "OTHER",
    title: "Other Mode",
    text: /*#__PURE__*/_react.default.createElement("span", null, "Tertiary Mode")
  }]
};
var _default = modeOptions;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=mode-options.js