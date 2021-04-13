"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.otpAmbientStyle = exports.smallTextSansSerif = exports.fromTo = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _addonInfo = require("@storybook/addon-info");

var _ = _interopRequireDefault(require("."));

require("../__mocks__/trimet-mock.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: "From-To-Picker",
  decorators: [_addonInfo.withInfo]
};
exports.default = _default;
const onFromClick = (0, _addonActions.action)("onFromClick");
const onToClick = (0, _addonActions.action)("onToClick");

const fromTo = () => /*#__PURE__*/_react.default.createElement(_.default, {
  onFromClick: onFromClick,
  onToClick: onToClick
});

exports.fromTo = fromTo;

const smallTextSansSerif = () => /*#__PURE__*/_react.default.createElement("span", {
  style: {
    fontSize: "75%",
    fontFamily: "sans-serif"
  }
}, "$_travel_$", /*#__PURE__*/_react.default.createElement(_.default, {
  onFromClick: onFromClick,
  onToClick: onToClick
}));

exports.smallTextSansSerif = smallTextSansSerif;

const otpAmbientStyle = () => /*#__PURE__*/_react.default.createElement("div", {
  className: "trimet-ambient"
}, /*#__PURE__*/_react.default.createElement(_.default, {
  fromText: "Start here",
  toText: "Go here",
  showIcons: false,
  onFromClick: onFromClick,
  onToClick: onToClick
}));

exports.otpAmbientStyle = otpAmbientStyle;

//# sourceMappingURL=index.story.js