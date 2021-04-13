"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("../../core-utils/src/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _placeRow = _interopRequireDefault(require("./place-row"));

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ItineraryBody = ({
  LegIcon,
  className,
  config,
  diagramVisible,
  frameLeg,
  itinerary,
  LineColumnContent,
  PlaceName,
  RouteDescription,
  routingType,
  setActiveLeg,
  setLegDiagram,
  setViewedTrip,
  showAgencyInfo,
  showElevationProfile,
  showLegIcon,
  showMapButtonColumn,
  showRouteFares,
  showViewTripButton,
  TimeColumnContent,
  timeOptions,
  toRouteAbbreviation,
  TransitLegSubheader,
  TransitLegSummary
}) => {
  /*
    TODO: replace component should update logic? companies is simply used to
    trigger a rerender of this component itinerary is also another criteria
    that is used to trigger a rerender but has more reuse than companies here
  */
  const rows = [];
  let followsTransit = false;
  let lastLeg;
  const {
    fare
  } = itinerary;
  itinerary.legs.forEach((leg, i) => {
    function createPlaceRow(isDestination) {
      // Create a row containing this leg's start place and leg traversal details
      rows.push( /*#__PURE__*/_react.default.createElement(_placeRow.default // eslint-disable-next-line react/no-array-index-key
      , {
        key: i + (isDestination ? 1 : 0),
        config: config,
        diagramVisible: diagramVisible // Itinerary fare is only passed as prop if showRouteFares is enabled.
        // The fare details will be processed in the TransitLeg component and
        // shown for all legs.
        ,
        fare: showRouteFares ? fare : null,
        followsTransit: followsTransit,
        frameLeg: frameLeg,
        isDestination: isDestination,
        lastLeg: lastLeg,
        leg: leg,
        LegIcon: LegIcon,
        legIndex: i,
        LineColumnContent: LineColumnContent,
        PlaceName: PlaceName,
        RouteDescription: RouteDescription,
        routingType: routingType,
        setActiveLeg: setActiveLeg,
        setLegDiagram: setLegDiagram,
        setViewedTrip: setViewedTrip,
        showAgencyInfo: showAgencyInfo,
        showElevationProfile: showElevationProfile,
        showLegIcon: showLegIcon,
        showMapButtonColumn: showMapButtonColumn,
        showViewTripButton: showViewTripButton,
        TimeColumnContent: TimeColumnContent,
        timeOptions: timeOptions,
        toRouteAbbreviation: toRouteAbbreviation,
        TransitLegSubheader: TransitLegSubheader,
        TransitLegSummary: TransitLegSummary
      }));
    }

    createPlaceRow(false); // If this is the last leg, create a special PlaceRow for the destination
    // only

    if (i === itinerary.legs.length - 1) {
      createPlaceRow(true);
    }

    if (leg.transitLeg) followsTransit = true;
    lastLeg = leg;
  });
  return /*#__PURE__*/_react.default.createElement(Styled.ItineraryBody, {
    className: className
  }, rows);
};

ItineraryBody.propTypes = {
  /**
   * Used for additional styling with styled components for example.
   */
  className: _propTypes.default.string,

  /** Contains OTP configuration details. */
  config: _types.configType.isRequired,

  /**
   * Should be either null or a legType. Indicates that a particular leg diagram
   * has been selected and is active.
   */
  diagramVisible: _types.legType,

  /**
   * Called upon clicking the map icon on place headers. This function is sent a
   * single argument of an object with the keys as follow:
   * - `leg`: the leg clicked (can be null if the destination is clicked)
   * - `legIndex`: the index of the leg clicked (can be null if the destination
   *    is clicked)
   * - `isDestination`: if the place header that is clicked is the destination
   * - `place`: The place associated with the click event
   */
  frameLeg: _propTypes.default.func,

  /** Itinerary that the user has selected to view, contains multiple legs */
  itinerary: _types.itineraryType.isRequired,

  /** A component class that is used to render icons for legs of an itinerary */
  LegIcon: _propTypes.default.elementType.isRequired,

  /**
   * A slot for a component that can render the content in the line column.
   * This component is sent the following props:
   * - interline - whether this place is an interlined stop
   * - isDestination - whether this place is the destination
   * - lastLeg - the leg prior to the current leg
   * - leg - the current leg
   * - LegIcon - the LegIcon class used to render leg icons.
   * - legIndex - the current leg index
   * - toRouteAbbreviation - a function to help abbreviate route names
   */
  LineColumnContent: _propTypes.default.elementType.isRequired,

  /**
   * A custom component for rendering the place name of legs.
   * The component is sent 3 props:
   * - config: the application config
   * - interline: whether this place is an interlined stop (a stop where a
   *   transit vehicle changes routes, but a rider can continue riding without
   *   deboarding)
   * - place: the particular place. Typically this is the from place, but it
   *   could also be the to place if it is the destination of the itinerary.
   */
  PlaceName: _propTypes.default.elementType.isRequired,

  /**
   * A component to render the name of a route.
   *
   * The component is sent 2 props:
   * - leg: the itinerary leg with the transit information
   * - transitOperator: the transit operator associated with the route if available
   */
  RouteDescription: _propTypes.default.elementType.isRequired,

  /** TODO: Routing Type is usually 'ITINERARY' but we should get more details on what this does */
  routingType: _propTypes.default.string,

  /**
   * Sets the active leg and legIndex.
   * Called with 2 arguments: (legIndex, leg)
   */
  setActiveLeg: _propTypes.default.func.isRequired,

  /** Handler for when a leg diagram is selected. */
  setLegDiagram: _propTypes.default.func.isRequired,

  /** Fired when a user clicks on a view trip button of a transit leg */
  setViewedTrip: _propTypes.default.func.isRequired,

  /** If true, will show agency information in transit legs */
  showAgencyInfo: _propTypes.default.bool,

  /** If true, will show the elevation profile for walk/bike legs */
  showElevationProfile: _propTypes.default.bool,

  /** If true will show the leg icon in the leg body */
  showLegIcon: _propTypes.default.bool,

  /** If true, will show the right column with the map button */
  showMapButtonColumn: _propTypes.default.bool,

  /** If true, will show fare information in transit leg bodies */
  showRouteFares: _propTypes.default.bool,

  /** If true, shows the view trip button in transit leg bodies */
  showViewTripButton: _propTypes.default.bool,

  /**
   * A slot for a component that can render the content in the time column portion of ItineraryBody.
   * This component is sent the following props:
   * - isDestination - whether this place is the destination
   * - leg - the current leg
   * - timeOptions - options for formatting time.
   */
  TimeColumnContent: _propTypes.default.elementType,

  /** Contains the preferred format string for time display and a timezone offset */
  timeOptions: _types.timeOptionsType,

  /** Converts a route's ID to its accepted badge abbreviation */
  toRouteAbbreviation: _propTypes.default.func,

  /**
   * An optional custom component for rendering a subheader on transit legs.
   * * The component is sent 4 props:
   * - languageConfig: The language values
   * - leg: the transit leg
   */
  TransitLegSubheader: _propTypes.default.elementType,

  /**
   * A custom component for rendering the summary of a transit leg.
   * The component is sent 2 props:
   * - leg: the transit leg
   * - stopsExpanded: whether the intermediate stop display is currently expanded
   */
  TransitLegSummary: _propTypes.default.elementType.isRequired
};

function noop() {}

ItineraryBody.defaultProps = {
  className: null,
  diagramVisible: null,
  frameLeg: noop,
  routingType: "ITINERARY",
  showAgencyInfo: false,
  showElevationProfile: false,
  showLegIcon: false,
  showMapButtonColumn: true,
  showRouteFares: false,
  showViewTripButton: false,
  TimeColumnContent: _placeRow.default.defaultProps.TimeColumnContent,
  timeOptions: null,
  toRouteAbbreviation: noop,
  TransitLegSubheader: undefined
};
var _default = ItineraryBody;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js