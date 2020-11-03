"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToIcon = exports.FromIcon = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _faRegular = require("styled-icons/fa-regular");

var _faSolid = require("styled-icons/fa-solid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FromIcon = (0, _styledComponents.default)(_faRegular.DotCircle).withConfig({
  displayName: "styled__FromIcon",
  componentId: "sc-3u4t5y-0"
})(["color:#333;"]);
exports.FromIcon = FromIcon;
const ToIcon = (0, _styledComponents.default)(_faSolid.MapMarkerAlt).withConfig({
  displayName: "styled__ToIcon",
  componentId: "sc-3u4t5y-1"
})(["color:#f44256;"]);
exports.ToIcon = ToIcon;