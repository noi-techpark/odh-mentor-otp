"use strict";

require("core-js/modules/web.dom.iterable.js");

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _addonActions = require("@storybook/addon-actions");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _faSolid = require("styled-icons/fa-solid");

var _ = _interopRequireDefault(require("."));

var LocationFieldClasses = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const currentPosition = {
  coords: {
    latitude: 45.508246,
    longitude: -122.711574
  }
};
const geocoderConfig = {
  baseUrl: "https://ws-st.trimet.org/pelias/v1",
  // TriMet-specific default
  boundary: {
    // TriMet-specific default
    rect: {
      minLon: -123.2034,
      maxLon: -122.135,
      minLat: 45.273,
      maxLat: 45.7445
    }
  },
  maxResults: 30,
  maxNearbyStops: 4,
  type: "PELIAS"
};
const getCurrentPosition = (0, _addonActions.action)("getCurrentPosition");
const nearbyStops = ["1", "2"];
const onLocationSelected = (0, _addonActions.action)("onLocationSelected");
const selectedLocation = {
  name: "123 Main St"
};
const sessionSearches = [{
  lat: 12.34,
  lon: 34.45,
  name: "123 Main St"
}];
const stopsIndex = {
  "1": {
    code: "1",
    dist: 123,
    lat: 12.34,
    lon: 34.56,
    name: "1st & Main",
    routes: [{
      shortName: "1"
    }]
  },
  "2": {
    code: "2",
    dist: 345,
    lat: 23.45,
    lon: 67.89,
    name: "Main & 2nd",
    routes: [{
      shortName: "2"
    }]
  }
};
const userLocationsAndRecentPlaces = [{
  icon: "home",
  lat: 45.89,
  lon: 67.12,
  name: "456 Suburb St",
  type: "home"
}, {
  icon: "work",
  lat: 54.32,
  lon: 43.21,
  name: "789 Busy St",
  type: "work"
}, {
  lat: 12.34,
  lon: 34.45,
  name: "123 Main St",
  type: "recent"
}];
const StyledLocationField = (0, _styledComponents.default)(_.default)`
  ${LocationFieldClasses.OptionContainer} {
    font-size: 24px;
    background-color: pink;
  }
`;

function GeocodedOptionIconComponent({
  feature
}) {
  if (feature.properties.layer === "stops") return /*#__PURE__*/_react.default.createElement(_faSolid.MapSigns, {
    size: 13
  });
  if (feature.properties.layer === "station") return /*#__PURE__*/_react.default.createElement(_faSolid.Train, {
    size: 13
  });
  return /*#__PURE__*/_react.default.createElement(_faSolid.MapPin, {
    size: 13
  });
}

GeocodedOptionIconComponent.propTypes = {
  feature: _types.geocodedFeatureType.isRequired
};

function LocationIconComponent({
  locationType
}) {
  if (locationType === "from") return /*#__PURE__*/_react.default.createElement(_faSolid.PlaneDeparture, {
    size: 13
  });
  return /*#__PURE__*/_react.default.createElement(_faSolid.PlaneArrival, {
    size: 13
  });
}

LocationIconComponent.propTypes = {
  locationType: _propTypes.default.string.isRequired
};

function UserLocationIconComponent({
  userLocation
}) {
  if (userLocation.icon === "work") return /*#__PURE__*/_react.default.createElement(_faSolid.Building, {
    size: 13
  });
  return /*#__PURE__*/_react.default.createElement(_faSolid.Star, {
    size: 13
  });
}

UserLocationIconComponent.propTypes = {
  userLocation: _types.userLocationType.isRequired
};
(0, _react2.storiesOf)("LocationField", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("LocationField in desktop context", () => /*#__PURE__*/_react.default.createElement(_.default, {
  currentPosition: currentPosition,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  inputPlaceholder: "Select from location",
  locationType: "from",
  onLocationSelected: onLocationSelected
})).add("LocationField in mobile context", () => /*#__PURE__*/_react.default.createElement(_.default, {
  currentPosition: currentPosition,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  locationType: "from",
  onLocationSelected: onLocationSelected,
  static: true
})).add("Styled LocationField in mobile context", () => /*#__PURE__*/_react.default.createElement(StyledLocationField, {
  currentPosition: currentPosition,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  locationType: "from",
  onLocationSelected: onLocationSelected,
  static: true
})).add("LocationField with selected location in desktop context", () => /*#__PURE__*/_react.default.createElement(_.default, {
  currentPosition: currentPosition,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  location: selectedLocation,
  locationType: "to",
  onLocationSelected: onLocationSelected
})).add("LocationField with selected location in mobile context", () => /*#__PURE__*/_react.default.createElement(_.default, {
  currentPosition: currentPosition,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  location: selectedLocation,
  locationType: "to",
  onLocationSelected: onLocationSelected,
  static: true
})).add("LocationField with nearby stops in mobile context", () => /*#__PURE__*/_react.default.createElement(_.default, {
  currentPosition: currentPosition,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  locationType: "to",
  nearbyStops: nearbyStops,
  onLocationSelected: onLocationSelected,
  static: true,
  stopsIndex: stopsIndex
})).add("LocationField with session searches in mobile context", () => /*#__PURE__*/_react.default.createElement(_.default, {
  currentPosition: currentPosition,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  locationType: "to",
  onLocationSelected: onLocationSelected,
  sessionSearches: sessionSearches,
  static: true
})).add("LocationField with user settings in mobile context", () => /*#__PURE__*/_react.default.createElement(_.default, {
  currentPosition: currentPosition,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  locationType: "to",
  onLocationSelected: onLocationSelected,
  showUserSettings: true,
  static: true,
  userLocationsAndRecentPlaces: userLocationsAndRecentPlaces
})).add("LocationField in mobile context with custom icons", () => /*#__PURE__*/_react.default.createElement(_.default, {
  currentPosition: currentPosition,
  currentPositionIcon: /*#__PURE__*/_react.default.createElement(_faSolid.Crosshairs, {
    size: 13
  }),
  currentPositionUnavailableIcon: /*#__PURE__*/_react.default.createElement(_faSolid.SkullCrossbones, {
    size: 13
  }),
  GeocodedOptionIconComponent: GeocodedOptionIconComponent,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  LocationIconComponent: LocationIconComponent,
  locationType: "to",
  nearbyStops: nearbyStops,
  onLocationSelected: onLocationSelected,
  sessionOptionIcon: /*#__PURE__*/_react.default.createElement(_faSolid.Clock, {
    size: 13
  }),
  sessionSearches: sessionSearches,
  showUserSettings: true,
  static: true,
  stopsIndex: stopsIndex,
  stopOptionIcon: /*#__PURE__*/_react.default.createElement(_faSolid.MapSigns, {
    size: 13
  }),
  userLocationsAndRecentPlaces: userLocationsAndRecentPlaces,
  UserLocationIconComponent: UserLocationIconComponent
})).add("LocationField no auto-focus with multiple controls", () => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
  id: "example",
  defaultValue: "Enter text"
}), /*#__PURE__*/_react.default.createElement("button", {
  type: "button"
}, "Click me!"), /*#__PURE__*/_react.default.createElement(_.default, {
  currentPosition: currentPosition,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  inputPlaceholder: "Select from location",
  locationType: "from",
  onLocationSelected: onLocationSelected
}))).add("LocationField auto-focus with multiple controls", () => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
  id: "example",
  defaultValue: "Enter text"
}), /*#__PURE__*/_react.default.createElement("button", {
  type: "button"
}, "Click me!"), /*#__PURE__*/_react.default.createElement(_.default, {
  autoFocus: true,
  currentPosition: currentPosition,
  geocoderConfig: geocoderConfig,
  getCurrentPosition: getCurrentPosition,
  inputPlaceholder: "Select from location",
  locationType: "from",
  onLocationSelected: onLocationSelected
})));

//# sourceMappingURL=LocationField.story.js