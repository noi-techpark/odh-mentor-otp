"use strict";

require("core-js/modules/web.dom.iterable.js");

var _types = require("../../core-utils/src/types");

var _classicLegIcon = _interopRequireDefault(require("../../icons/src/classic-leg-icon"));

var _trimetLegIcon = _interopRequireDefault(require("../../icons/src/trimet-leg-icon"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _addonActions = require("@storybook/addon-actions");

var _ = _interopRequireDefault(require("."));

var _lineColumnContent = _interopRequireDefault(require("./defaults/line-column-content"));

var _placeName = _interopRequireDefault(require("./defaults/place-name"));

var _routeDescription = _interopRequireDefault(require("./defaults/route-description"));

var _transitLegSummary = _interopRequireDefault(require("./defaults/transit-leg-summary"));

var _demos = require("./demos");

var _itineraryBody = _interopRequireDefault(require("./otp-react-redux/itinerary-body"));

var _lineColumnContent2 = _interopRequireDefault(require("./otp-react-redux/line-column-content"));

var _placeName2 = _interopRequireDefault(require("./otp-react-redux/place-name"));

var _routeDescription2 = _interopRequireDefault(require("./otp-react-redux/route-description"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const config = require("./__mocks__/config.json"); // import mock itinaries. These are all trip plan outputs from OTP.


const bikeOnlyItinerary = require("./__mocks__/itineraries/bike-only.json");

const bikeRentalItinerary = require("./__mocks__/itineraries/bike-rental.json");

const bikeRentalTransitBikeRentalItinerary = require("./__mocks__/itineraries/bike-rental-transit-bike-rental.json");

const bikeTransitBikeItinerary = require("./__mocks__/itineraries/bike-transit-bike.json");

const eScooterRentalItinerary = require("./__mocks__/itineraries/e-scooter-rental.json");

const eScooterRentalTransiteScooterRentalItinerary = require("./__mocks__/itineraries/e-scooter-transit-e-scooter.json");

const fareComponentsItinerary = require("./__mocks__/itineraries/fare-components.json");

const parkAndRideItinerary = require("./__mocks__/itineraries/park-and-ride.json");

const tncTransitTncItinerary = require("./__mocks__/itineraries/tnc-transit-tnc.json");

const walkInterlinedTransitItinerary = require("./__mocks__/itineraries/walk-interlined-transit-walk.json");

const walkOnlyItinerary = require("./__mocks__/itineraries/walk-only.json");

const walkTransitWalkItinerary = require("./__mocks__/itineraries/walk-transit-walk.json");

const walkTransitWalkTransitWalkItinerary = require("./__mocks__/itineraries/walk-transit-walk-transit-walk.json");

class ItineraryBodyDefaultsWrapper extends _react.Component {
  constructor() {
    super();

    _defineProperty(this, "setLegDiagram", leg => {
      this.setState({
        diagramVisible: leg
      });
    });

    this.state = {};
  }

  render() {
    const {
      itinerary,
      LegIcon,
      LineColumnContent,
      PlaceName,
      RouteDescription,
      showAgencyInfo,
      showLegIcon,
      showMapButtonColumn,
      showRouteFares,
      showViewTripButton,
      styledItinerary,
      TimeColumnContent,
      toRouteAbbreviation,
      TransitLegSubheader,
      TransitLegSummary
    } = this.props;
    const {
      diagramVisible
    } = this.state;
    let ItineraryBodyComponent;

    switch (styledItinerary) {
      case "pink-legs":
        ItineraryBodyComponent = _demos.StyledItineraryBody;
        break;

      case "otp-rr":
        ItineraryBodyComponent = _itineraryBody.default;
        break;

      default:
        ItineraryBodyComponent = _.default;
    }

    return /*#__PURE__*/_react.default.createElement(ItineraryBodyComponent, {
      config: config,
      diagramVisible: diagramVisible,
      frameLeg: (0, _addonActions.action)("frameLeg"),
      itinerary: itinerary,
      LegIcon: LegIcon,
      LineColumnContent: LineColumnContent || _lineColumnContent.default,
      PlaceName: PlaceName || _placeName.default,
      RouteDescription: RouteDescription || _routeDescription.default,
      routingType: "ITINERARY",
      setActiveLeg: (0, _addonActions.action)("setActiveLeg"),
      setLegDiagram: this.setLegDiagram,
      setViewedTrip: (0, _addonActions.action)("setViewedTrip"),
      showAgencyInfo: showAgencyInfo,
      showElevationProfile: true,
      showLegIcon: showLegIcon,
      showMapButtonColumn: showMapButtonColumn,
      showRouteFares: showRouteFares,
      showViewTripButton: showViewTripButton,
      TimeColumnContent: TimeColumnContent,
      toRouteAbbreviation: toRouteAbbreviation,
      TransitLegSubheader: TransitLegSubheader,
      TransitLegSummary: TransitLegSummary || _transitLegSummary.default
    });
  }

}

ItineraryBodyDefaultsWrapper.propTypes = {
  itinerary: _types.itineraryType.isRequired,
  LegIcon: _propTypes.default.elementType,
  LineColumnContent: _propTypes.default.elementType,
  PlaceName: _propTypes.default.elementType,
  RouteDescription: _propTypes.default.elementType,
  showAgencyInfo: _propTypes.default.bool,
  showLegIcon: _propTypes.default.bool,
  showMapButtonColumn: _propTypes.default.bool,
  showRouteFares: _propTypes.default.bool,
  showViewTripButton: _propTypes.default.bool,
  styledItinerary: _propTypes.default.string,
  TimeColumnContent: _propTypes.default.elementType,
  toRouteAbbreviation: _propTypes.default.func,
  TransitLegSubheader: _propTypes.default.elementType,
  TransitLegSummary: _propTypes.default.elementType
};
ItineraryBodyDefaultsWrapper.defaultProps = {
  LegIcon: _trimetLegIcon.default,
  LineColumnContent: undefined,
  PlaceName: undefined,
  RouteDescription: undefined,
  showAgencyInfo: false,
  showLegIcon: false,
  showMapButtonColumn: true,
  showRouteFares: false,
  showViewTripButton: false,
  styledItinerary: null,
  TimeColumnContent: undefined,
  toRouteAbbreviation: r => r.toString().substr(0, 2),
  TransitLegSubheader: undefined,
  TransitLegSummary: undefined
};

function OtpRRItineraryBodyWrapper({
  itinerary,
  showRouteFares,
  TimeColumnContent
}) {
  return /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
    itinerary: itinerary,
    LegIcon: _classicLegIcon.default,
    LineColumnContent: _lineColumnContent2.default,
    PlaceName: _placeName2.default,
    RouteDescription: _routeDescription2.default,
    showAgencyInfo: true,
    showLegIcon: true,
    showMapButtonColumn: false,
    showRouteFares: showRouteFares,
    showViewTripButton: true,
    styledItinerary: "otp-rr",
    TimeColumnContent: TimeColumnContent,
    TransitLegSubheader: _demos.WrappedOtpRRTransitLegSubheader
  });
}

OtpRRItineraryBodyWrapper.propTypes = {
  itinerary: _types.itineraryType.isRequired,
  showRouteFares: _propTypes.default.bool,
  TimeColumnContent: _propTypes.default.elementType
};
OtpRRItineraryBodyWrapper.defaultProps = {
  showRouteFares: undefined,
  TimeColumnContent: undefined
};
(0, _react2.storiesOf)("ItineraryBody", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("ItineraryBody with walk-only itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: walkOnlyItinerary
})).add("ItineraryBody with bike-only itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: bikeOnlyItinerary
})).add("ItineraryBody with walk-transit-walk itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: walkTransitWalkItinerary
})).add("Styled ItineraryBody with walk-transit-walk itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: walkTransitWalkItinerary,
  styledItinerary: "pink-legs"
})).add("ItineraryBody with walk-transit-walk itinerary with agency information", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: walkTransitWalkItinerary,
  showAgencyInfo: true
})).add("ItineraryBody with walk-transit-walk itinerary with custom transit leg summary component", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: walkTransitWalkItinerary,
  TransitLegSummary: _demos.CustomTransitLegSummary
})).add("ItineraryBody with walk-transit-walk itinerary with custom place name component", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: walkTransitWalkItinerary,
  PlaceName: _demos.CustomPlaceName
})).add("ItineraryBody with walk-transit-walk itinerary with custom view trip button activated and custom route abbreviation", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: walkTransitWalkItinerary,
  showViewTripButton: true,
  toRouteAbbreviation: _demos.customToRouteAbbreviation
})).add("ItineraryBody with bike-transit-bike itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: bikeTransitBikeItinerary
})).add("ItineraryBody with walk-interlined-transit itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: walkInterlinedTransitItinerary
})).add("ItineraryBody with walk-transit-transfer itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: walkTransitWalkTransitWalkItinerary
})).add("ItineraryBody with bike-rental itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: bikeRentalItinerary
})).add("ItineraryBody with E-scooter-rental itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: eScooterRentalItinerary
})).add("ItineraryBody with park and ride itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: parkAndRideItinerary
})).add("ItineraryBody with bike rental + transit itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: bikeRentalTransitBikeRentalItinerary
})).add("ItineraryBody with E-scooter rental + transit itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: eScooterRentalTransiteScooterRentalItinerary
})).add("ItineraryBody with TNC + transit itinerary", () => /*#__PURE__*/_react.default.createElement(ItineraryBodyDefaultsWrapper, {
  itinerary: tncTransitTncItinerary
})).add("otp-rr ItineraryBody with walk-only itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: walkOnlyItinerary
})).add("otp-rr ItineraryBody with bike-only itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: bikeOnlyItinerary
})).add("otp-rr ItineraryBody with walk-transit-walk itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: walkTransitWalkItinerary
})).add("otp-rr ItineraryBody with bike-transit-bike itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: bikeTransitBikeItinerary
})).add("otp-rr ItineraryBody with walk-interlined-transit itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: walkInterlinedTransitItinerary
})).add("otp-rr ItineraryBody with walk-transit-transfer itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: walkTransitWalkTransitWalkItinerary
})).add("otp-rr ItineraryBody with bike-rental itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: bikeRentalItinerary
})).add("otp-rr ItineraryBody with E-scooter-rental itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: eScooterRentalItinerary
})).add("otp-rr ItineraryBody with park and ride itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: parkAndRideItinerary
})).add("otp-rr ItineraryBody with bike rental + transit itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: bikeRentalTransitBikeRentalItinerary
})).add("otp-rr ItineraryBody with E-scooter rental + transit itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: eScooterRentalTransiteScooterRentalItinerary
})).add("otp-rr ItineraryBody with TNC + transit itinerary", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: tncTransitTncItinerary
})).add("otp-rr ItineraryBody with Individual Leg Fare Components", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: fareComponentsItinerary,
  showRouteFares: true
})).add("otp-rr ItineraryBody and custom TimeColumnContent", () => /*#__PURE__*/_react.default.createElement(OtpRRItineraryBodyWrapper, {
  itinerary: tncTransitTncItinerary,
  TimeColumnContent: _demos.CustomTimeColumnContent
}));

//# sourceMappingURL=ItineraryBody.story.js