"use strict";

var _src = _interopRequireDefault(require("../../base-map/src"));

var _types = require("../../core-utils/src/types");

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _react2 = require("@storybook/react");

var _defaultStopMarker = _interopRequireDefault(require("./default-stop-marker"));

var _ = _interopRequireDefault(require("."));

require("../../../node_modules/leaflet/dist/leaflet.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const center = [45.518092, -122.671202];
const zoom = 13;
const fakeStop = {
  id: "stop-id",
  lat: 45.518,
  lon: -122.671,
  name: "Fake Stop"
};

function CustomMarker({
  stop
}) {
  return /*#__PURE__*/_react.default.createElement(_reactLeaflet.CircleMarker, {
    center: [stop.lat, stop.lon],
    key: stop.id
  });
}

CustomMarker.propTypes = {
  stop: _types.stopLayerStopType.isRequired
};
(0, _react2.storiesOf)("StopViewerOverlay", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("StopViewerOverlay", () => /*#__PURE__*/_react.default.createElement(_src.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  stop: fakeStop,
  StopMarker: _defaultStopMarker.default,
  visible: true
}))).add("StopViewerOverlay with custom marker", () => /*#__PURE__*/_react.default.createElement(_src.default, {
  center: center,
  zoom: zoom
}, /*#__PURE__*/_react.default.createElement(_.default, {
  stop: fakeStop,
  StopMarker: CustomMarker,
  visible: true
})));

//# sourceMappingURL=StopViewerOverlay.story.js