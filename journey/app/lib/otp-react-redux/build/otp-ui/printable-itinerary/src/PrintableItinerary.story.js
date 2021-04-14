"use strict";

require("core-js/modules/web.dom.iterable.js");

var _classicLegIcon = _interopRequireDefault(require("../../icons/src/classic-leg-icon"));

var _trimetLegIcon = _interopRequireDefault(require("../../icons/src/trimet-leg-icon"));

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ = _interopRequireDefault(require("."));

var PrintableItineraryClasses = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import mock itinaries. These are all trip plan outputs from OTP.
const bikeOnlyItinerary = require("../../itinerary-body/src/__mocks__/itineraries/bike-only.json");

const bikeRentalItinerary = require("../../itinerary-body/src/__mocks__/itineraries/bike-rental.json");

const bikeRentalTransitBikeRentalItinerary = require("../../itinerary-body/src/__mocks__/itineraries/bike-rental-transit-bike-rental.json");

const bikeTransitBikeItinerary = require("../../itinerary-body/src/__mocks__/itineraries/bike-transit-bike.json");

const eScooterRentalItinerary = require("../../itinerary-body/src/__mocks__/itineraries/e-scooter-rental.json");

const eScooterRentalTransiteScooterRentalItinerary = require("../../itinerary-body/src/__mocks__/itineraries/e-scooter-transit-e-scooter.json");

const parkAndRideItinerary = require("../../itinerary-body/src/__mocks__/itineraries/park-and-ride.json");

const tncTransitTncItinerary = require("../../itinerary-body/src/__mocks__/itineraries/tnc-transit-tnc.json");

const walkInterlinedTransitItinerary = require("../../itinerary-body/src/__mocks__/itineraries/walk-interlined-transit-walk.json");

const walkOnlyItinerary = require("../../itinerary-body/src/__mocks__/itineraries/walk-only.json");

const walkTransitWalkItinerary = require("../../itinerary-body/src/__mocks__/itineraries/walk-transit-walk.json");

const walkTransitWalkTransitWalkItinerary = require("../../itinerary-body/src/__mocks__/itineraries/walk-transit-walk-transit-walk.json");

const config = require("../../itinerary-body/src/__mocks__/config.json");

const StyledPrintableItinerary = (0, _styledComponents.default)(_.default)`
  ${PrintableItineraryClasses.LegBody} {
    background-color: pink;
  }
`;
(0, _react2.storiesOf)("PrintableItinerary", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("ItineraryBody with walk-only itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: walkOnlyItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with bike-only itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: bikeOnlyItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with walk-transit-walk itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: walkTransitWalkItinerary,
  LegIcon: _trimetLegIcon.default
})).add("Styled ItineraryBody with walk-transit-walk itinerary", () => /*#__PURE__*/_react.default.createElement(StyledPrintableItinerary, {
  config: config,
  itinerary: walkTransitWalkItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with bike-transit-bike itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: bikeTransitBikeItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with walk-interlined-transit itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: walkInterlinedTransitItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with walk-transit-transfer itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: walkTransitWalkTransitWalkItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with bike-rental itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: bikeRentalItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with E-scooter-rental itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: eScooterRentalItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with park and ride itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: parkAndRideItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with bike rental + transit itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: bikeRentalTransitBikeRentalItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with E-scooter rental + transit itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: eScooterRentalTransiteScooterRentalItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with TNC + transit itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: tncTransitTncItinerary,
  LegIcon: _trimetLegIcon.default
})).add("ItineraryBody with classic icons and park and ride itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  config: config,
  itinerary: parkAndRideItinerary,
  LegIcon: _classicLegIcon.default
}));

//# sourceMappingURL=PrintableItinerary.story.js