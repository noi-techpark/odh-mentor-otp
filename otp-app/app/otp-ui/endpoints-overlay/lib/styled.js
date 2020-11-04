"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToIcon = exports.StackedIconContainer = exports.StackedToIcon = exports.StackedLocationIcon = exports.StackedCircle = exports.Button = void 0;

var _locationIcon = _interopRequireDefault(require("@opentripplanner/location-icon"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _faSolid = require("styled-icons/fa-solid");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Button = _styledComponents.default.button.withConfig({
  displayName: "styled__Button",
  componentId: "sc-13zfm2i-0"
})(["border:none;color:navy;font-family:inherit;font-size:inherit;line-height:inherit;padding-left:0.2em;:hover{text-decoration:underline;cursor:pointer;}"]);

exports.Button = Button;
const stacked = (0, _styledComponents.css)(["left:0;position:absolute;text-align:center;"]);
const StackedCircle = (0, _styledComponents.default)(_faSolid.Circle).withConfig({
  displayName: "styled__StackedCircle",
  componentId: "sc-13zfm2i-1"
})(["color:#fff;", ""], stacked);
exports.StackedCircle = StackedCircle;
const StackedLocationIcon = (0, _styledComponents.default)(_locationIcon.default).withConfig({
  displayName: "styled__StackedLocationIcon",
  componentId: "sc-13zfm2i-2"
})(["", ""], stacked);
exports.StackedLocationIcon = StackedLocationIcon;
const StackedToIcon = (0, _styledComponents.default)(StackedLocationIcon).withConfig({
  displayName: "styled__StackedToIcon",
  componentId: "sc-13zfm2i-3"
})(["color:#333;"]);
exports.StackedToIcon = StackedToIcon;

const StackedIconContainer = _styledComponents.default.span.withConfig({
  displayName: "styled__StackedIconContainer",
  componentId: "sc-13zfm2i-4"
})(["display:inline-block;height:2em;line-height:2em;line-height:inherit;margin-left:-10px;margin-top:-7px;opacity:1;position:relative;vertical-align:middle;width:2em;"]);

exports.StackedIconContainer = StackedIconContainer;
const ToIcon = (0, _styledComponents.default)(_locationIcon.default).withConfig({
  displayName: "styled__ToIcon",
  componentId: "sc-13zfm2i-5"
})(["", " line-height:inherit;margin-left:2px;margin-top:2px;"], stacked);
exports.ToIcon = ToIcon;