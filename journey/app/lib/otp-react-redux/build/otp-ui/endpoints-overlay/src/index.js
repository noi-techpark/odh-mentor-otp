"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("../../core-utils/src/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _endpoint = _interopRequireDefault(require("./endpoint"));

var _styled = require("./styled");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DefaultMapMarkerIcon({
  location,
  type
}) {
  let inner;

  switch (type) {
    case "to":
      inner = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_styled.StackedToIcon, {
        size: 24,
        type: type
      }), /*#__PURE__*/_react.default.createElement(_styled.ToIcon, {
        size: 20,
        type: type
      }));
      break;

    default:
      // Default to the location icon on top of a white background.
      inner = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_styled.StackedCircle, {
        size: 24
      }), /*#__PURE__*/_react.default.createElement(_styled.StackedLocationIcon, {
        size: 24,
        type: type
      }));
      break;
  }

  return /*#__PURE__*/_react.default.createElement(_styled.StackedIconContainer, {
    title: location.name
  }, inner);
}

DefaultMapMarkerIcon.propTypes = {
  location: _types.locationType.isRequired,
  type: _propTypes.default.string.isRequired
};

function EndpointsOverlay({
  clearLocation,
  forgetPlace,
  fromLocation,
  intermediatePlaces,
  locations,
  MapMarkerIcon,
  rememberPlace,
  setLocation,
  showUserSettings,
  toLocation
}) {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_endpoint.default, {
    clearLocation: clearLocation,
    forgetPlace: forgetPlace,
    location: fromLocation,
    locations: locations,
    MapMarkerIcon: MapMarkerIcon,
    rememberPlace: rememberPlace,
    setLocation: setLocation,
    showUserSettings: showUserSettings,
    type: "from"
  }), intermediatePlaces.map((place, index) => {
    return /*#__PURE__*/_react.default.createElement(_endpoint.default, {
      key: index,
      clearLocation: clearLocation,
      forgetPlace: forgetPlace,
      location: place,
      locations: locations,
      MapMarkerIcon: MapMarkerIcon,
      rememberPlace: rememberPlace,
      setLocation: setLocation,
      showUserSettings: showUserSettings,
      type: place.type
    });
  }), /*#__PURE__*/_react.default.createElement(_endpoint.default, {
    clearLocation: clearLocation,
    forgetPlace: forgetPlace,
    location: toLocation,
    locations: locations,
    MapMarkerIcon: MapMarkerIcon,
    rememberPlace: rememberPlace,
    setLocation: setLocation,
    showUserSettings: showUserSettings,
    type: "to"
  }));
}

EndpointsOverlay.propTypes = {
  /**
   * Dispatched when a user clicks on the clear location button in the user
   * settings. Not needed unless user settings is activated. Dispatched with an
   * argument in the form of:
   *
   * { type: "from/to" }
   */
  clearLocation: _propTypes.default.func,

  /**
   * Dispatched when a user clicks on the forget location button in the user
   * settings. Not needed unless user settings is activated. Dispatched with a
   * string argument representing the type of saved location.
   */
  forgetPlace: _propTypes.default.func,

  /**
   * The from location.
   */
  fromLocation: _types.locationType,

  /**
   * Intermediate places along a journey.
   */
  intermediatePlaces: _propTypes.default.arrayOf(_types.locationType),

  /**
   * An array of location that the user has saved. Not needed unless user
   * settings is activated.
   */
  locations: _propTypes.default.arrayOf(_types.locationType),

  /**
   * An optional custom component that can be used to create custom html that
   * is used in a leaflet divIcon to render the map marker icon for each
   * endpoint.
   *
   * See https://leafletjs.com/reference-1.6.0.html#divicon
   *
   * This component is passed 2 props:
   * - location: either the from or to location depending on the endpoint
   * - type: either "from" or "to"
   */
  MapMarkerIcon: _propTypes.default.elementType,

  /**
   * Dispatched when a user clicks on the remember place button in the user
   * settings. Not needed unless user settings is activated. Dispatched with an
   * argument in the form of:
   *
   * { location: {...location}, type: "home/work" }
   */
  rememberPlace: _propTypes.default.func,

  /**
   * Dispatched when a location is dragged somewhere else on the map. Dispatched
   * with an argument in the form of:
   *
   * { location: {...location}, reverseGeocode: true, type: "from/to" }
   */
  setLocation: _propTypes.default.func.isRequired,

  /**
   * Whether or not to show the user settings popup when an endpoint is clicked.
   */
  showUserSettings: _propTypes.default.bool,

  /**
   * To to location
   */
  toLocation: _types.locationType
};

const noop = () => {};

EndpointsOverlay.defaultProps = {
  clearLocation: noop,
  forgetPlace: noop,
  fromLocation: undefined,
  intermediatePlaces: [],
  rememberPlace: noop,
  locations: [],
  MapMarkerIcon: DefaultMapMarkerIcon,
  showUserSettings: false,
  toLocation: undefined
};
var _default = EndpointsOverlay;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js