"use strict";

var _baseMap = _interopRequireDefault(require("@opentripplanner/base-map"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _react2 = require("@storybook/react");

var _faSolid = require("styled-icons/fa-solid");

var _ = _interopRequireDefault(require("."));

require("../../../node_modules/leaflet/dist/leaflet.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// BaseMap props
const center = [45.5215, -122.686202];
const zoom = 16; // EndpointsOverlay props

const clearLocation = (0, _addonActions.action)("clearLocation");
const forgetPlace = (0, _addonActions.action)("forgetPlace");
const fromLocation = {
  lat: 45.522497,
  lon: -122.676029,
  name: "Portland City Grill",
  type: "work"
};
const rememberPlace = (0, _addonActions.action)("rememberPlace");
const setLocation = (0, _addonActions.action)("setLocation");
const toLocation = {
  lat: 45.521049,
  lon: -122.693724,
  name: "Portland Towers",
  type: "home"
};
const locations = [fromLocation, toLocation];

function CatDogIcon({
  type
}) {
  return type === "from" ? /*#__PURE__*/_react.default.createElement(_faSolid.Cat, {
    size: 40,
    color: "orange"
  }) : /*#__PURE__*/_react.default.createElement(_faSolid.Dog, {
    size: 40
  });
}

CatDogIcon.propTypes = {
  type: _propTypes.default.string.isRequired
};
(0, _react2.storiesOf)("EndpointsOverlay", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("EndpointsOverlay", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  fromLocation: fromLocation,
  setLocation: setLocation,
  toLocation: toLocation,
  visible: true
}))).add("EndpointsOverlay with user settings", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  clearLocation: clearLocation,
  forgetPlace: forgetPlace,
  fromLocation: fromLocation,
  locations: locations,
  rememberPlace: rememberPlace,
  setLocation: setLocation,
  showUserSettings: true,
  toLocation: toLocation,
  visible: true
}))).add("EndpointsOverlay with custom map markers", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  fromLocation: fromLocation,
  MapMarkerIcon: CatDogIcon,
  setLocation: setLocation,
  toLocation: toLocation,
  visible: true
}))).add("EndpointsOverlay with intermediate place", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  fromLocation: fromLocation,
  intermediatePlaces: [{
    lat: 45.523193,
    lon: -122.681538,
    name: "Powell's City of Books",
    type: "intermediate-place-1"
  }],
  setLocation: setLocation,
  toLocation: toLocation,
  visible: true
})));

//# sourceMappingURL=EndpointsOverlay.story.js