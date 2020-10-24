"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hubIcons = exports.floatingBikeIcon = void 0;

var _leaflet = require("leaflet");

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const floatingBikeIcon = (0, _leaflet.divIcon)({
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -12],
  html: _server.default.renderToStaticMarkup( /*#__PURE__*/_react.default.createElement(Styled.OutOfHubBikeIcon, null)),
  className: ""
});
exports.floatingBikeIcon = floatingBikeIcon;
const hubIcons = Styled.hubIcons.map(StyledIcon => (0, _leaflet.divIcon)({
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -12],
  html: _server.default.renderToStaticMarkup( /*#__PURE__*/_react.default.createElement(StyledIcon, null)),
  className: ""
}));
exports.hubIcons = hubIcons;