"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _leaflet = require("leaflet");

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const StyledParkAndRideIcon = _styledComponents.default.div.withConfig({
  displayName: "park-and-ride-marker__StyledParkAndRideIcon",
  componentId: "sc-1ca2kns-0"
})(["background:#000;border-radius:17px;color:#fff;font-size:16px;font-weight:bold;height:12px;line-height:0px;padding-left:7px;padding-top:12px;width:17px;"]);

var _default = (0, _leaflet.divIcon)({
  iconSize: [20, 20],
  popupAnchor: [0, -10],
  html: _server.default.renderToStaticMarkup( /*#__PURE__*/_react.default.createElement(StyledParkAndRideIcon, null, "P")),
  className: ""
});

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=park-and-ride-marker.js