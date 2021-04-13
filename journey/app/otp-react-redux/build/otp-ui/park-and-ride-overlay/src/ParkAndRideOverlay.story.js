"use strict";

var _baseMap = _interopRequireDefault(require("@opentripplanner/base-map"));

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _react2 = require("@storybook/react");

var _ = _interopRequireDefault(require("."));

var _parkAndRides = _interopRequireDefault(require("../__mocks__/park-and-rides.json"));

require("../../../node_modules/leaflet/dist/leaflet.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const center = [45.518092, -122.671202];
const zoom = 13;
(0, _react2.storiesOf)("ParkAndRideOverlay", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("ParkAndRideOverlay", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  parkAndRideLocations: _parkAndRides.default,
  setLocation: (0, _addonActions.action)("setLocation"),
  visible: true
})));

//# sourceMappingURL=ParkAndRideOverlay.story.js