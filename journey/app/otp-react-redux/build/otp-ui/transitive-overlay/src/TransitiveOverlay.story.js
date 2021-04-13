"use strict";

var _baseMap = _interopRequireDefault(require("@opentripplanner/base-map"));

var _map = require("@opentripplanner/core-utils/lib/map");

var _endpointsOverlay = _interopRequireDefault(require("@opentripplanner/endpoints-overlay"));

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _react2 = require("@storybook/react");

var _ = _interopRequireDefault(require("."));

require("../../../node_modules/leaflet/dist/leaflet.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mock itinaries. These are all trip plan outputs from OTP.
const bikeOnlyItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/bike-only.json");

const bikeRentalItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/bike-rental.json");

const bikeRentalTransitBikeRentalItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/bike-rental-transit-bike-rental.json");

const bikeTransitBikeItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/bike-transit-bike.json");

const eScooterRentalItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/e-scooter-rental.json");

const eScooterRentalTransiteScooterRentalItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/e-scooter-transit-e-scooter.json");

const parkAndRideItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/park-and-ride.json");

const tncTransitTncItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/tnc-transit-tnc.json");

const walkInterlinedTransitItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-interlined-transit-walk.json");

const walkOnlyItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-only.json");

const walkTransitWalkItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-transit-walk.json");

const walkTransitWalkItineraryNoIntermediateStops = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-transit-walk-no-intermediate-stops.json");

const walkTransitWalkTransitWalkItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-transit-walk-transit-walk.json");

const companies = [{
  id: "RAZOR",
  label: "Razor",
  modes: "MICROMOBILITY_RENT"
}, {
  id: "SHARED",
  label: "Shared",
  modes: "MICROMOBILITY_RENT"
}];
const setLocation = (0, _addonActions.action)("setLocation");

function getFromLocation(itinerary) {
  return itinerary.legs[0].from;
}

function getToLocation(itinerary) {
  return itinerary.legs[itinerary.legs.length - 1].to;
}

(0, _react2.storiesOf)("TransitiveOverlay", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("TransitiveOverlay with walking itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.518841, -122.679302],
  zoom: 19
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(walkOnlyItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(walkOnlyItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(walkOnlyItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with bike-only itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.520441, -122.68302],
  zoom: 16
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(bikeOnlyItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(bikeOnlyItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(bikeOnlyItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with walk-transit-walk itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.520441, -122.68302],
  zoom: 16
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(walkTransitWalkItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(walkTransitWalkItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(walkTransitWalkItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with walk-transit-walk itinerary with no intermediate stops", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.525841, -122.649302],
  zoom: 13
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(walkTransitWalkItineraryNoIntermediateStops),
  setLocation: setLocation,
  toLocation: getToLocation(walkTransitWalkItineraryNoIntermediateStops),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(walkTransitWalkItineraryNoIntermediateStops, companies),
  visible: true
}))).add("TransitiveOverlay with bike-transit-bike itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.520441, -122.68302],
  zoom: 16
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(bikeTransitBikeItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(bikeTransitBikeItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(bikeTransitBikeItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with walk-interlined-transit itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.511841, -122.679302],
  zoom: 14
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(walkInterlinedTransitItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(walkInterlinedTransitItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(walkInterlinedTransitItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with walk-transit-transfer itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.505841, -122.631302],
  zoom: 14
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(walkTransitWalkTransitWalkItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(walkTransitWalkTransitWalkItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(walkTransitWalkTransitWalkItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with bike-rental itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.508841, -122.631302],
  zoom: 14
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(bikeRentalItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(bikeRentalItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(bikeRentalItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with E-scooter-rental itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.52041, -122.675302],
  zoom: 16
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(eScooterRentalItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(eScooterRentalItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(eScooterRentalItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with park and ride itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.515841, -122.75302],
  zoom: 13
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(parkAndRideItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(parkAndRideItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(parkAndRideItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with bike rental + transit itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.538841, -122.6302],
  zoom: 12
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(bikeRentalTransitBikeRentalItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(bikeRentalTransitBikeRentalItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(bikeRentalTransitBikeRentalItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with E-scooter rental + transit itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.538841, -122.6302],
  zoom: 12
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(eScooterRentalTransiteScooterRentalItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(eScooterRentalTransiteScooterRentalItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(eScooterRentalTransiteScooterRentalItinerary, companies),
  visible: true
}))).add("TransitiveOverlay with TNC + transit itinerary", () => /*#__PURE__*/_react.default.createElement(_baseMap.default, {
  center: [45.538841, -122.6302],
  zoom: 12
}, /*#__PURE__*/_react.default.createElement(_endpointsOverlay.default, {
  fromLocation: getFromLocation(tncTransitTncItinerary),
  setLocation: setLocation,
  toLocation: getToLocation(tncTransitTncItinerary),
  visible: true
}), /*#__PURE__*/_react.default.createElement(_.default, {
  transitiveData: (0, _map.itineraryToTransitive)(tncTransitTncItinerary, companies),
  visible: true
})));

//# sourceMappingURL=TransitiveOverlay.story.js