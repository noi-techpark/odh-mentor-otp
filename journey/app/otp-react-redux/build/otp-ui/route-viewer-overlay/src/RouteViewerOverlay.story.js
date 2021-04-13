"use strict";

var _src = _interopRequireDefault(require("../../base-map/src"));

var _react = _interopRequireDefault(require("react"));

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _react2 = require("@storybook/react");

var _mockRoute = _interopRequireDefault(require("../__mocks__/mock-route.json"));

var _ = _interopRequireDefault(require("."));

require("../../../node_modules/leaflet/dist/leaflet.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const center = [45.543092, -122.671202];
const zoom = 11;
(0, _react2.storiesOf)("RouteViewerOverlay", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("RouteViewerOverlay", () => /*#__PURE__*/_react.default.createElement(_src.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  routeData: _mockRoute.default,
  visible: true
}))).add("RouteViewerOverlay with path styling", () => /*#__PURE__*/_react.default.createElement(_src.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  path: {
    opacity: 0.5,
    weight: 10
  },
  routeData: _mockRoute.default,
  visible: true
})));

//# sourceMappingURL=RouteViewerOverlay.story.js