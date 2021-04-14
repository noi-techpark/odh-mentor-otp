"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onContextMenuPopup = exports.customLocationPopupContent = exports.withOverlaysOverlappingOtherMarkers = exports.overlayWithLargeDataSet = exports.withTwoOverlaysFromTrimetTransitComponents = exports.withSampleMarkers = exports.withExampleBaseLayers = exports.maxZoom = exports.zoomed = exports.clickAndViewportchangedEvents = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

var _addonActions = require("@storybook/addon-actions");

var _addonInfo = require("@storybook/addon-info");

var _addonKnobs = require("@storybook/addon-knobs");

var _ = _interopRequireDefault(require("."));

var _SelectVehicles = _interopRequireDefault(require("../__mocks__/SelectVehicles"));

var _AllVehicles = _interopRequireDefault(require("../__mocks__/AllVehicles"));

var _ContextMenuDemo = _interopRequireDefault(require("../__mocks__/ContextMenuDemo"));

require("../../../node_modules/leaflet/dist/leaflet.css");

require("../__mocks__/mapbox-wordmark.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: "BaseMap",
  component: _.default,
  decorators: [_addonInfo.withInfo, _addonKnobs.withKnobs],
  parameters: {
    info: {
      text: `
      The BaseMap component renders a Leaflet map with overlays and other ad-hoc markers
      that are declared as child elements of the BaseMap element.

      Overlays are groups of similar React-Leaflet markers, e.g. vehicle location markers, bus stop markers, etc.
      Overlays are automatically added to the overlay control displayed by the BaseMap. The user uses that control to turn overlays on or off.
      See the [Two Overlays From TriMet Transit Components](./?path=/story/basemap--with-two-overlays-from-trimet-transit-components) example for more information on overlays.
      `
    }
  }
};
exports.default = _default;
const center = [45.522862, -122.667837];

const sampleMarkers = /*#__PURE__*/_react.default.createElement(_reactLeaflet.CircleMarker, {
  center: center,
  radius: 100,
  interactive: false
}, /*#__PURE__*/_react.default.createElement(_reactLeaflet.Marker, {
  position: center
}));

const samplePopup = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, "Popup Title"), /*#__PURE__*/_react.default.createElement("p", null, "Sample ", /*#__PURE__*/_react.default.createElement("span", {
  style: {
    color: "purple"
  }
}, "popup"), " content."));

const onClick = (0, _addonActions.action)("onClick");
const onContextMenu = (0, _addonActions.action)("onContextMenu");
const onPopupClosed = (0, _addonActions.action)("onPopupClosed");
const onOverlayAdded = (0, _addonActions.action)("onOverlayAdded");
const onOverlayRemoved = (0, _addonActions.action)("onOverlayRemoved");
const onViewportChanged = (0, _addonActions.action)("onViewportChanged");
const layerOnOverlayAdded = (0, _addonActions.action)("Layer::onOverlayAdded");
const layerOnOverlayRemoved = (0, _addonActions.action)("Layer::onOverlayRemoved");
const layerOnViewportChanged = (0, _addonActions.action)("Layer::onViewportChanged");

const clickAndViewportchangedEvents = () => /*#__PURE__*/_react.default.createElement(_.default, {
  center: center,
  onClick: onClick,
  onContextMenu: onContextMenu,
  onViewportChanged: onViewportChanged
});

exports.clickAndViewportchangedEvents = clickAndViewportchangedEvents;

const zoomed = () => /*#__PURE__*/_react.default.createElement(_.default, {
  center: center,
  zoom: 17
});

exports.zoomed = zoomed;

const maxZoom = () => /*#__PURE__*/_react.default.createElement(_.default, {
  center: center,
  maxZoom: 18,
  zoom: 30
});

exports.maxZoom = maxZoom;

const withExampleBaseLayers = () => {
  const mapboxToken = (0, _addonKnobs.text)("Your Mapbox token", "my_token");
  const exampleBaseLayers = [{
    name: "Streets",
    url: "//cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png",
    attribution: 'Map tiles: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 20 // FIXME?? CartoDB displays characters proportionally too large
    // on regular monitors (1080p or lower) when using the "retina" parameters below.
    // (That does not happen on "retina" displays such as Macbook or mobile phones.)
    // url:
    //  "//cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{retina}.png",
    // retina: "@2x",
    // detectRetina: true

  }, {
    name: "TriMet",
    url: "//tile{s}.trimet.org/tilecache/tilecache.py/1.0.0/currentOSM/{z}/{x}/{y}",
    subdomains: "abcd",
    attribution: '&copy; <a target="#" href="https://www.oregonmetro.gov/rlis-live">Metro</a> | &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 20,
    detectRetina: true
  }, {
    name: "Mapbox (Bring your own token)",
    url: `//api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}{retina}?access_token=${mapboxToken}`,
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 20,
    retina: "@2x"
  }, {
    name: "Stamen Toner Lite",
    url: "http://tile.stamen.com/toner-lite/{z}/{x}/{y}.png",
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.' // FIXME?? Stamen displays characters proportionally too large
    // on regular monitors (1080p or lower) when using the "retina" parameters below.
    // (That does not happen on "retina" displays such as Macbook or mobile phones.)
    // url: "http://tile.stamen.com/toner-lite/{z}/{x}/{y}{retina}.png",
    // retina: "@2x",
    // detectRetina: true

  }];
  const onBaseLayerChange = (0, _addonActions.action)("onBaseLayerChange");
  return /*#__PURE__*/_react.default.createElement(_.default, {
    onBaseLayerChange: onBaseLayerChange,
    baseLayers: exampleBaseLayers,
    center: center
  });
};

exports.withExampleBaseLayers = withExampleBaseLayers;

const withSampleMarkers = () => /*#__PURE__*/_react.default.createElement(_.default, {
  center: center
}, sampleMarkers);

exports.withSampleMarkers = withSampleMarkers;

const withTwoOverlaysFromTrimetTransitComponents = () => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "Click the layers button to toggle overlays. Overlays manage their own tooltips and popups. Check actions log for overlay events."), /*#__PURE__*/_react.default.createElement(_.default, {
  center: center,
  onOverlayAdded: onOverlayAdded,
  onOverlayRemoved: onOverlayRemoved,
  onViewportChanged: onViewportChanged
}, /*#__PURE__*/_react.default.createElement(_AllVehicles.default, {
  name: "Simple vehicle layer"
}), /*#__PURE__*/_react.default.createElement(_SelectVehicles.default, {
  name: "Fancier vehicle layer",
  onOverlayAdded: layerOnOverlayAdded,
  onOverlayRemoved: layerOnOverlayRemoved,
  onViewportChanged: layerOnViewportChanged,
  visible: true
})));

exports.withTwoOverlaysFromTrimetTransitComponents = withTwoOverlaysFromTrimetTransitComponents;

const overlayWithLargeDataSet = () => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "Do not add Storybook overhead on layers with large dataset..."), /*#__PURE__*/_react.default.createElement(_.default, {
  center: center
}, /*#__PURE__*/_react.default.createElement(_AllVehicles.default, {
  name: "Simple vehicle layer"
}), /*#__PURE__*/_react.default.createElement(_SelectVehicles.default, {
  name: "Fancier vehicle layer",
  limit: 500,
  visible: true
})));

exports.overlayWithLargeDataSet = overlayWithLargeDataSet;

const withOverlaysOverlappingOtherMarkers = () => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "You should be able to see the tooltip and interact with the dots inside the blue circle."), /*#__PURE__*/_react.default.createElement(_.default, {
  center: center,
  onOverlayAdded: onOverlayAdded,
  onOverlayRemoved: onOverlayRemoved
}, /*#__PURE__*/_react.default.createElement(_AllVehicles.default, {
  name: "Simple vehicle layer"
}), /*#__PURE__*/_react.default.createElement(_SelectVehicles.default, {
  name: "Fancier vehicle layer",
  visible: true
}), sampleMarkers));

exports.withOverlaysOverlappingOtherMarkers = withOverlaysOverlappingOtherMarkers;

const customLocationPopupContent = () => /*#__PURE__*/_react.default.createElement(_.default, {
  center: center,
  popup: {
    location: center,
    contents: samplePopup
  },
  onPopupClosed: onPopupClosed
});

exports.customLocationPopupContent = customLocationPopupContent;

const onContextMenuPopup = () => /*#__PURE__*/_react.default.createElement(_ContextMenuDemo.default, null);

exports.onContextMenuPopup = onContextMenuPopup;

//# sourceMappingURL=index.story.js