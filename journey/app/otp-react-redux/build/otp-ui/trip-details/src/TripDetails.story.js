"use strict";

require("core-js/modules/web.dom.iterable.js");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ = _interopRequireDefault(require("."));

var TripDetailsClasses = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

const walkTransitWalkTransitWalkItinerary = require("@opentripplanner/itinerary-body/src/__mocks__/itineraries/walk-transit-walk-transit-walk.json");

const StyledTripDetails = (0, _styledComponents.default)(_.default)`
  ${TripDetailsClasses.TripDetailsHeader} {
    background-color: pink;
  }
`;
const customMessages = {
  title: "Details about this Trip",
  transitFare: "Transit Fare",
  transitFareDescription: "Note: actual fare may be lower if you have a transit pass or something like that."
};
const longDateFormat = "MMMM D, YYYY";
(0, _react2.storiesOf)("TripDetails", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("TripDetails with walk-only itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: walkOnlyItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with bike-only itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: bikeOnlyItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with walk-transit-walk itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: walkTransitWalkItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with walk-transit-walk itinerary and custom messages", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: walkTransitWalkItinerary,
  longDateFormat: longDateFormat,
  messages: customMessages
})).add("Styled TripDetails with walk-transit-walk itinerary", () => /*#__PURE__*/_react.default.createElement(StyledTripDetails, {
  itinerary: walkTransitWalkItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with bike-transit-bike itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: bikeTransitBikeItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with walk-interlined-transit itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: walkInterlinedTransitItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with walk-transit-transfer itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: walkTransitWalkTransitWalkItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with bike-rental itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: bikeRentalItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with E-scooter-rental itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: eScooterRentalItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with park and ride itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: parkAndRideItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with bike rental + transit itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: bikeRentalTransitBikeRentalItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with E-scooter rental + transit itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: eScooterRentalTransiteScooterRentalItinerary,
  longDateFormat: longDateFormat
})).add("TripDetails with TNC + transit itinerary", () => /*#__PURE__*/_react.default.createElement(_.default, {
  itinerary: tncTransitTncItinerary,
  longDateFormat: longDateFormat
}));

//# sourceMappingURL=TripDetails.story.js