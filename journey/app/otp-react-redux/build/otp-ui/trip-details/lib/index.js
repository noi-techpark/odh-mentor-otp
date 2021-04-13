"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TripDetails;

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _messages = require("@opentripplanner/core-utils/lib/messages");

var _time = require("@opentripplanner/core-utils/lib/time");

var _types = require("@opentripplanner/core-utils/lib/types");

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _faSolid = require("styled-icons/fa-solid");

var Styled = _interopRequireWildcard(require("./styled"));

var _tripDetail = _interopRequireDefault(require("./trip-detail"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function TripDetails({
  className,
  itinerary,
  longDateFormat,
  messages,
  routingType,
  timeOptions
}) {
  const date = (0, _moment.default)(itinerary.startTime);
  messages = (0, _messages.mergeMessages)(TripDetails.defaultProps.messages, messages); // process the transit fare

  const {
    centsToString,
    dollarsToString,
    maxTNCFare,
    minTNCFare,
    transitFare
  } = (0, _itinerary.calculateFares)(itinerary);
  let companies;
  itinerary.legs.forEach(leg => {
    if (leg.tncData) {
      companies = leg.tncData.company;
    }
  });
  let fare;

  if (transitFare || minTNCFare) {
    fare = /*#__PURE__*/_react.default.createElement(Styled.Fare, null, transitFare && /*#__PURE__*/_react.default.createElement(Styled.TransitFare, null, messages.transitFare, ": ", /*#__PURE__*/_react.default.createElement("b", null, centsToString(transitFare))), minTNCFare !== 0 && /*#__PURE__*/_react.default.createElement(Styled.TNCFare, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(Styled.TNCFareCompanies, null, companies.toLowerCase()), " ", messages.fare, ":", " ", /*#__PURE__*/_react.default.createElement("b", null, dollarsToString(minTNCFare), " - ", dollarsToString(maxTNCFare))));
  } // Compute calories burned.


  const {
    bikeDuration,
    caloriesBurned,
    walkDuration
  } = (0, _itinerary.calculatePhysicalActivity)(itinerary);
  return /*#__PURE__*/_react.default.createElement(Styled.TripDetails, {
    className: className
  }, /*#__PURE__*/_react.default.createElement(Styled.TripDetailsHeader, null, messages.title), /*#__PURE__*/_react.default.createElement(Styled.TripDetailsBody, null, /*#__PURE__*/_react.default.createElement(_tripDetail.default, {
    description: messages.departDescription,
    icon: /*#__PURE__*/_react.default.createElement(_faSolid.CalendarAlt, {
      size: 17
    }),
    summary: /*#__PURE__*/_react.default.createElement(Styled.Timing, null, /*#__PURE__*/_react.default.createElement("span", null, messages.depart, " ", /*#__PURE__*/_react.default.createElement("b", null, date.format(longDateFormat))), routingType === "ITINERARY" && /*#__PURE__*/_react.default.createElement("span", null, " ", messages.at, " ", /*#__PURE__*/_react.default.createElement("b", null, (0, _time.formatTime)(itinerary.startTime, timeOptions))))
  }), fare && /*#__PURE__*/_react.default.createElement(_tripDetail.default, {
    description: messages.transitFareDescription,
    icon: /*#__PURE__*/_react.default.createElement(_faSolid.MoneyBillAlt, {
      size: 17
    }),
    summary: fare
  }), caloriesBurned > 0 && /*#__PURE__*/_react.default.createElement(_tripDetail.default, {
    icon: /*#__PURE__*/_react.default.createElement(_faSolid.Heartbeat, {
      size: 17
    }),
    summary: /*#__PURE__*/_react.default.createElement(Styled.CaloriesSummary, null, messages.caloriesBurned, ": ", /*#__PURE__*/_react.default.createElement("b", null, Math.round(caloriesBurned))),
    description: /*#__PURE__*/_react.default.createElement(Styled.CaloriesDescription, null, "$_calories_info_1_$", " ", /*#__PURE__*/_react.default.createElement("b", null, Math.round(walkDuration / 60), " $_minute_$"), " $_pass_walked_$ ", /*#__PURE__*/_react.default.createElement("b", null, Math.round(bikeDuration / 60), " $_minute_$"), " $_pass_rided_$", " ", /*#__PURE__*/_react.default.createElement("a", {
      href: "https://health.gov/dietaryguidelines/dga2005/document/html/chapter3.htm#table4",
      rel: "noopener noreferrer",
      target: "_blank"
    }, "Dietary Guidelines for Americans 2005, page 16, Table 4"), ".")
  })));
}

TripDetails.propTypes = {
  /** Used for additional styling with styled components for example. */
  className: _propTypes.default.string,

  /** Itinerary that the user has selected to view, contains multiple legs */
  itinerary: _types.itineraryType.isRequired,

  /** the desired format to use for a long date */
  longDateFormat: _propTypes.default.string,

  /**
   * messages to use for l10n/i8n
   *
   * Note: messages with default null values included here for visibility.
   * Overriding with a truthy string value will cause the expandable help
   * message to appear in trip details.
   */
  messages: _propTypes.default.shape({
    at: _propTypes.default.string,
    caloriesBurned: _propTypes.default.string,
    // FIXME: Add templated string description.
    caloriesBurnedDescription: _propTypes.default.string,
    depart: _propTypes.default.string,
    departDescription: _propTypes.default.string,
    title: _propTypes.default.string,
    fare: _propTypes.default.string,
    transitFare: _propTypes.default.string,
    transitFareDescription: _propTypes.default.string
  }),

  /** whether the routing type is an itinerary or a profile result */
  routingType: _propTypes.default.string,

  /** Contains the preferred format string for time display and a timezone offset */
  timeOptions: _types.timeOptionsType
};
TripDetails.defaultProps = {
  className: null,
  longDateFormat: null,
  messages: {
    at: "$_at_time_$",
    caloriesBurned: "$_calories_$",
    // FIXME: Add templated string description.
    caloriesBurnedDescription: null,
    depart: "$_departure_$",
    departDescription: null,
    title: "$_details_trip_$",
    fare: "Fare",
    transitFare: "Transit Fare",
    transitFareDescription: null
  },
  routingType: "ITINERARY",
  timeOptions: null
};
module.exports = exports.default;

//# sourceMappingURL=index.js