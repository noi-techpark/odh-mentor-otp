"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("../../core-utils/src/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _timeColumnContent = _interopRequireDefault(require("./defaults/time-column-content"));

var _AccessLegBody = _interopRequireDefault(require("./AccessLegBody"));

var Styled = _interopRequireWildcard(require("./styled"));

var _TransitLegBody = _interopRequireDefault(require("./TransitLegBody"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Looks up an operator from the provided configuration */
const getTransitOperatorFromConfig = (id, config) => config.transitOperators.find(transitOperator => transitOperator.id === id) || null;
/*
  TODO: Wondering if it's possible for us to destructure the time
  preferences from the config object and avoid making the props list so long
*/


const PlaceRow = ({
  config,
  diagramVisible,
  fare,
  followsTransit,
  frameLeg,
  isDestination,
  lastLeg,
  leg,
  LegIcon,
  legIndex,
  LineColumnContent,
  PlaceName,
  RouteDescription,
  setActiveLeg,
  setLegDiagram,
  setViewedTrip,
  showAgencyInfo,
  showElevationProfile,
  showLegIcon,
  showMapButtonColumn,
  showViewTripButton,
  TimeColumnContent,
  timeOptions,
  toRouteAbbreviation,
  TransitLegSubheader,
  TransitLegSummary
}) => {
  // NOTE: Previously there was a check for itineraries that changed vehicles
  // at a single stop, which would render the stop place the same as the
  // interline stop. However, this prevents the user from being able to click
  // on the stop viewer in this case, which they may want to do in order to
  // check the real-time arrival information for the next leg of their journey.
  const interline = !!(!isDestination && leg.interlineWithPreviousLeg);
  const hideBorder = interline || !legIndex;
  const place = isDestination ? leg.to : leg.from;
  const {
    longDateFormat,
    timeFormat
  } = config.dateTime;
  return /*#__PURE__*/_react.default.createElement(Styled.PlaceRowWrapper, {
    key: legIndex || "destination-place"
  }, /*#__PURE__*/_react.default.createElement(Styled.TimeColumn, null, /*#__PURE__*/_react.default.createElement(TimeColumnContent, {
    isDestination: isDestination,
    leg: leg,
    timeOptions: timeOptions
  })), /*#__PURE__*/_react.default.createElement(Styled.LineColumn, null, /*#__PURE__*/_react.default.createElement(LineColumnContent, {
    interline: interline,
    isDestination: isDestination,
    lastLeg: lastLeg,
    leg: leg,
    LegIcon: LegIcon,
    legIndex: legIndex,
    toRouteAbbreviation: toRouteAbbreviation
  })), /*#__PURE__*/_react.default.createElement(Styled.DetailsColumn, {
    hideBorder: hideBorder.toString()
  }, /*#__PURE__*/_react.default.createElement(Styled.PlaceDetails, null, /*#__PURE__*/_react.default.createElement(Styled.PlaceHeader, null, interline && /*#__PURE__*/_react.default.createElement(Styled.InterlineDot, null, "\u2022"), /*#__PURE__*/_react.default.createElement(Styled.PlaceName, null, /*#__PURE__*/_react.default.createElement(PlaceName, {
    config: config,
    interline: interline,
    place: place
  }))), !isDestination && (leg.transitLeg ?
  /*#__PURE__*/

  /* This is a transit leg */
  _react.default.createElement(_TransitLegBody.default, {
    config: config,
    fare: fare,
    leg: leg,
    LegIcon: LegIcon,
    legIndex: legIndex,
    setActiveLeg: setActiveLeg,
    longDateFormat: longDateFormat,
    RouteDescription: RouteDescription,
    setViewedTrip: setViewedTrip,
    showAgencyInfo: showAgencyInfo,
    showViewTripButton: showViewTripButton,
    timeFormat: timeFormat,
    TransitLegSubheader: TransitLegSubheader,
    TransitLegSummary: TransitLegSummary,
    transitOperator: leg.agencyId && getTransitOperatorFromConfig(leg.agencyId, config)
  }) :
  /*#__PURE__*/

  /* This is an access (e.g. walk/bike/etc.) leg */
  _react.default.createElement(_AccessLegBody.default, {
    config: config,
    diagramVisible: diagramVisible,
    followsTransit: followsTransit,
    leg: leg,
    LegIcon: LegIcon,
    legIndex: legIndex,
    setActiveLeg: setActiveLeg,
    setLegDiagram: setLegDiagram,
    showElevationProfile: showElevationProfile,
    showLegIcon: showLegIcon,
    timeOptions: timeOptions
  })))), showMapButtonColumn && /*#__PURE__*/_react.default.createElement(Styled.MapButtonColumn, {
    hideBorder: hideBorder.toString()
  }, /*#__PURE__*/_react.default.createElement(Styled.MapButton, {
    onClick: () => frameLeg({
      isDestination,
      leg,
      legIndex,
      place
    })
  }, /*#__PURE__*/_react.default.createElement(Styled.MapIcon, null))));
}; // A lot of these props are passed through from the ItineraryBody. See the
// documentation in that component for more information.


PlaceRow.propTypes = {
  config: _types.configType.isRequired,
  diagramVisible: _types.legType,
  fare: _types.fareType,

  /** Indicates whether this leg directly follows a transit leg */
  followsTransit: _propTypes.default.bool,
  frameLeg: _propTypes.default.func.isRequired,

  /** whether this place row represents the destination */
  isDestination: _propTypes.default.bool.isRequired,

  /** Contains details about the leg object prior to the current one */
  lastLeg: _types.legType,

  /** Contains details about leg object that is being displayed */
  leg: _types.legType.isRequired,
  LegIcon: _propTypes.default.elementType.isRequired,

  /** The index value of this specific leg within the itinerary */
  legIndex: _propTypes.default.number.isRequired,
  LineColumnContent: _propTypes.default.elementType.isRequired,
  PlaceName: _propTypes.default.elementType.isRequired,
  RouteDescription: _propTypes.default.elementType.isRequired,
  setActiveLeg: _propTypes.default.func.isRequired,
  setLegDiagram: _propTypes.default.func.isRequired,
  setViewedTrip: _propTypes.default.func.isRequired,
  showAgencyInfo: _propTypes.default.bool.isRequired,
  showElevationProfile: _propTypes.default.bool.isRequired,
  showLegIcon: _propTypes.default.bool.isRequired,
  showMapButtonColumn: _propTypes.default.bool.isRequired,
  showViewTripButton: _propTypes.default.bool.isRequired,
  TimeColumnContent: _propTypes.default.elementType,
  timeOptions: _types.timeOptionsType,
  toRouteAbbreviation: _propTypes.default.func.isRequired,
  TransitLegSubheader: _propTypes.default.elementType,
  TransitLegSummary: _propTypes.default.elementType.isRequired
};
PlaceRow.defaultProps = {
  diagramVisible: null,
  fare: null,
  followsTransit: false,
  // can be null if this is the origin place
  lastLeg: null,
  TimeColumnContent: _timeColumnContent.default,
  timeOptions: null,
  TransitLegSubheader: undefined
};
var _default = PlaceRow;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=place-row.js