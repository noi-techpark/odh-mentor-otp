"use strict";

var _baseMap = _interopRequireDefault(require("@opentripplanner/base-map"));

var _react = _interopRequireDefault(require("react"));

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _react2 = require("@storybook/react");

var _mockTrip = _interopRequireDefault(require("../__mocks__/mock-trip.json"));

var _ = _interopRequireDefault(require("."));

require("../../../node_modules/leaflet/dist/leaflet.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const center = [45.518092, -122.671202];
const zoom = 13;
(0, _react2.storiesOf)("TripViewerOverlay", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("TripViewerOverlay", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  tripData: _mockTrip.default,
  visible: true
}))).add("TripViewerOverlay with path styling", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  leafletPath: {
    color: "#000",
    dashArray: "2 3 5 7 11",
    opacity: 0.2,
    weight: 5
  },
  tripData: _mockTrip.default,
  visible: true
})));

//# sourceMappingURL=TripViewerOverlay.story.js