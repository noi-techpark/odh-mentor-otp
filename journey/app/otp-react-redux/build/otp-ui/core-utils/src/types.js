"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createChainableTypeChecker = createChainableTypeChecker;
exports.userLocationType = exports.geocodedFeatureType = exports.configuredCompanyType = exports.configuredModesType = exports.configuredModeType = exports.modeSelectorOptionsType = exports.modeOptionType = exports.latlngType = exports.stationType = exports.transitiveDataType = exports.stopLayerStopType = exports.transitIndexStopWithRoutes = exports.timeOptionsType = exports.locationType = exports.itineraryType = exports.fareType = exports.legType = exports.placeType = exports.stepsType = exports.encodedPolylineType = exports.configType = exports.vehicleRentalMapOverlaySymbolsType = exports.transitVehicleType = exports.languageConfigType = exports.transitOperatorType = exports.leafletPathType = exports.companyType = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _map = require("./map");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const companyType = _propTypes.default.shape({
  id: _propTypes.default.string.isRequired,
  label: _propTypes.default.string.isRequired,

  /* a comma-separated string listing the modes that this company has */
  modes: _propTypes.default.string.isRequired
});
/**
 * Leaflet path properties to use to style a CircleMarker, Marker or Polyline.
 *
 * See https://leafletjs.com/reference-1.6.0.html#path
 */


exports.companyType = companyType;

const leafletPathType = _propTypes.default.shape({
  bubblingMouseEvents: _propTypes.default.bool,
  color: _propTypes.default.string,
  className: _propTypes.default.string,
  dashArray: _propTypes.default.string,
  dashOffset: _propTypes.default.string,
  fill: _propTypes.default.bool,
  fillColor: _propTypes.default.string,
  fillOpacity: _propTypes.default.number,
  fillRule: _propTypes.default.string,
  lineCap: _propTypes.default.string,
  lineJoin: _propTypes.default.string,
  opacity: _propTypes.default.number,
  renderer: _propTypes.default.func,
  stroke: _propTypes.default.bool,
  weight: _propTypes.default.number
});
/**
 * Describes some options to help display data about a transit agency that is
 * configured in an opentripplanner instance.
 */


exports.leafletPathType = leafletPathType;

const transitOperatorType = _propTypes.default.shape({
  defaultRouteColor: _propTypes.default.string,
  defaultRouteTextColor: _propTypes.default.string,
  id: _propTypes.default.string.isRequired,
  logo: _propTypes.default.string.isRequired,
  longNameSplitter: _propTypes.default.string,
  name: _propTypes.default.string,
  order: _propTypes.default.number
});

exports.transitOperatorType = transitOperatorType;

const languageConfigType = _propTypes.default.shape({
  stopViewer: _propTypes.default.string
});
/** describes the objects from the real-time vehicle service */


exports.languageConfigType = languageConfigType;

const transitVehicleType = _propTypes.default.shape({
  routeShortName: _propTypes.default.string,
  routeLongName: _propTypes.default.string,
  routeType: _propTypes.default.string,
  status: _propTypes.default.string,
  reportDate: _propTypes.default.string,
  seconds: _propTypes.default.number,
  stopSequence: _propTypes.default.number,
  stopId: _propTypes.default.string,
  vehicleId: _propTypes.default.string,
  tripId: _propTypes.default.string,
  blockId: _propTypes.default.string,
  lat: _propTypes.default.number,
  lon: _propTypes.default.number,
  heading: _propTypes.default.number
});

exports.transitVehicleType = transitVehicleType;

const vehicleRentalMapOverlaySymbolsType = _propTypes.default.arrayOf(_propTypes.default.shape({
  dockStrokeColor: _propTypes.default.string,
  fillColor: _propTypes.default.string,
  maxZoom: _propTypes.default.number.isRequired,
  minZoom: _propTypes.default.number.isRequired,
  pixels: _propTypes.default.number,
  type: _propTypes.default.string.isRequired
}).isRequired);
/**
 * Represents the expected configuration of the webapp.
 *
 * Note: this is an incomplete type mapping.
 */


exports.vehicleRentalMapOverlaySymbolsType = vehicleRentalMapOverlaySymbolsType;

const configType = _propTypes.default.shape({
  companies: _propTypes.default.arrayOf(companyType.isRequired),
  dateTime: _propTypes.default.shape({
    timeFormat: _propTypes.default.string,
    dateFormat: _propTypes.default.string,
    longDateFormat: _propTypes.default.string
  }),
  // TODO: add full typing
  map: _propTypes.default.shape({
    overlays: _propTypes.default.arrayOf(_propTypes.default.shape({
      /**
       * The applicable companies this overlay covers. Only applicable in
       * certain vehicle rental overlays.
       */
      companies: _propTypes.default.arrayOf(_propTypes.default.string.isRequired),
      name: _propTypes.default.string.isRequired,

      /**
       * The applicable map symbols. Only applicable in vehicle rental
       * overlays.
       */
      mapSymbols: vehicleRentalMapOverlaySymbolsType,

      /**
       * Only used during park and ride queries. This will filter out P&Rs
       * that are futher than the specified number of meters from a transit
       * stop.
       */
      maxTransitDistance: _propTypes.default.number,

      /**
       * The applicable modes this overlay covers. Only applicable in certain
       * vehicle rental overlays.
       */
      modes: _propTypes.default.arrayOf(_propTypes.default.string.isRequired),

      /**
       * The type of overlay. Currently valid values include:
       *
       * "bike-rental", "car-rental", "micromobility-rental", "park-and-ride",
       * "stops", "tile"
       */
      type: _propTypes.default.string.isRequired
    }))
  }),
  transitOperators: _propTypes.default.arrayOf(transitOperatorType)
});

exports.configType = configType;

const feedScopedIdType = _propTypes.default.shape({
  agencyId: _propTypes.default.string,
  id: _propTypes.default.string
});

const encodedPolylineType = _propTypes.default.shape({
  length: _propTypes.default.number.isRequired,
  points: _propTypes.default.string.isRequired
});

exports.encodedPolylineType = encodedPolylineType;

const elevationData = _propTypes.default.arrayOf(_propTypes.default.shape({
  first: _propTypes.default.number.isRequired,
  second: _propTypes.default.number.isRequired
}).isRequired);

const alertType = _propTypes.default.shape({
  alertHeaderText: _propTypes.default.string,
  alertDescriptionText: _propTypes.default.string,
  alertUrl: _propTypes.default.string,
  effectiveStartDate: _propTypes.default.number
});
/**
 * Represents steps in a leg in an itinerary of an OTP plan response. These are
 * only for non-transit modes.
 * See documentation here: http://otp-docs.ibi-transit.com/api/json_WalkStep.html
 */


const stepsType = _propTypes.default.arrayOf(_propTypes.default.shape({
  absoluteDirection: _propTypes.default.string.isRequired,
  alerts: _propTypes.default.arrayOf(alertType),
  area: _propTypes.default.bool.isRequired,
  bogusName: _propTypes.default.bool.isRequired,
  distance: _propTypes.default.number.isRequired,
  elevation: elevationData.isRequired,
  lat: _propTypes.default.number.isRequired,
  lon: _propTypes.default.number.isRequired,
  relativeDirection: _propTypes.default.string.isRequired,
  stayOn: _propTypes.default.bool.isRequired,
  streetName: _propTypes.default.string.isRequired
}));

exports.stepsType = stepsType;

const placeType = _propTypes.default.shape({
  arrival: _propTypes.default.number,
  departure: _propTypes.default.number,
  lat: _propTypes.default.number.isRequired,
  lon: _propTypes.default.number.isRequired,
  name: _propTypes.default.string.isRequired,
  networks: _propTypes.default.arrayOf(_propTypes.default.string.isRequired),
  stopCode: _propTypes.default.string,
  stopId: _propTypes.default.string,
  stopIndex: _propTypes.default.number,
  stopSequence: _propTypes.default.number,
  vertexType: _propTypes.default.string.isRequired,
  zoneId: _propTypes.default.string
});
/**
 * Represents a leg in an itinerary of an OTP plan response. Each leg represents
 * a portion of the overall itinerary that is done until either reaching the
 * destination or transitioning to another mode of travel. See OTP webservice
 * documentation here:
 * http://otp-docs.ibi-transit.com/api/json_Leg.html
 */


exports.placeType = placeType;

const legType = _propTypes.default.shape({
  agencyId: _propTypes.default.string,
  agencyName: _propTypes.default.string,
  agencyTimeZoneOffset: _propTypes.default.number.isRequired,
  agencyUrl: _propTypes.default.string,
  alerts: _propTypes.default.arrayOf(alertType),
  arrivalDelay: _propTypes.default.number.isRequired,
  departureDelay: _propTypes.default.number.isRequired,
  distance: _propTypes.default.number.isRequired,
  duration: _propTypes.default.number.isRequired,
  endTime: _propTypes.default.number.isRequired,
  from: placeType.isRequired,
  hailedCar: _propTypes.default.bool.isRequired,
  headsign: _propTypes.default.string,
  interlineWithPreviousLeg: _propTypes.default.bool.isRequired,
  intermediateStops: _propTypes.default.arrayOf(placeType).isRequired,
  interStopGeometry: _propTypes.default.arrayOf(encodedPolylineType),
  legGeometry: encodedPolylineType.isRequired,
  mode: _propTypes.default.string.isRequired,
  pathway: _propTypes.default.bool.isRequired,
  realTime: _propTypes.default.bool.isRequired,
  rentedBike: _propTypes.default.bool.isRequired,
  rentedCar: _propTypes.default.bool.isRequired,
  rentedVehicle: _propTypes.default.bool.isRequired,
  route: _propTypes.default.string,
  routeId: _propTypes.default.string,
  routeType: _propTypes.default.number,
  serviceDate: _propTypes.default.string,
  startTime: _propTypes.default.number.isRequired,
  steps: stepsType.isRequired,
  tncData: _propTypes.default.shape({
    company: _propTypes.default.string.isRequired,
    currency: _propTypes.default.string.isRequired,
    displayName: _propTypes.default.string.isRequired,
    estimatedArrival: _propTypes.default.number.isRequired,
    maxCost: _propTypes.default.number.isRequired,
    minCost: _propTypes.default.number.isRequired,
    productId: _propTypes.default.string.isRequired,
    travelDuration: _propTypes.default.number.isRequired
  }),
  to: placeType.isRequired,
  transitLeg: _propTypes.default.bool.isRequired,
  tripBlockId: _propTypes.default.string,
  tripId: _propTypes.default.string
});

exports.legType = legType;

const moneyType = _propTypes.default.shape({
  cents: _propTypes.default.number.isRequired,
  currency: _propTypes.default.shape({
    defaultFractionDigits: _propTypes.default.number.isRequired,
    currencyCode: _propTypes.default.string.isRequired,
    symbol: _propTypes.default.string.isRequired,
    currency: _propTypes.default.string.isRequired
  }).isRequired
});
/**
 * Represents the fare component of an itinerary of an OTP plan response. See
 * detailed documentation in OTP webservice documentation here:
 * http://otp-docs.ibi-transit.com/api/json_Fare.html
 *
 * NOTE: so far the fare includes ONLY a fare encountered on public transit and
 * not any bike rental or TNC rental fees.
 */


const fareType = _propTypes.default.shape({
  details: _propTypes.default.objectOf(_propTypes.default.arrayOf(_propTypes.default.shape({
    fareId: _propTypes.default.oneOfType([_propTypes.default.string, feedScopedIdType]).isRequired,
    price: moneyType.isRequired,
    routes: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, feedScopedIdType])).isRequired
  })).isRequired),
  fare: _propTypes.default.objectOf(moneyType)
});
/**
 * Represents an itinerary of an OTP plan response. See detailed documentation
 * in OTP webservice documentation here:
 * http://otp-docs.ibi-transit.com/api/json_Itinerary.html
 */


exports.fareType = fareType;

const itineraryType = _propTypes.default.shape({
  duration: _propTypes.default.number.isRequired,
  elevationGained: _propTypes.default.number.isRequired,
  elevationLost: _propTypes.default.number.isRequired,
  endTime: _propTypes.default.number.isRequired,
  fare: fareType,
  legs: _propTypes.default.arrayOf(legType).isRequired,
  startTime: _propTypes.default.number.isRequired,
  tooSloped: _propTypes.default.bool,
  transfers: _propTypes.default.number.isRequired,
  transitTime: _propTypes.default.number.isRequired,
  waitingTime: _propTypes.default.number.isRequired,
  walkDistance: _propTypes.default.number.isRequired,
  walkLimitExceeded: _propTypes.default.bool.isRequired,
  walkTime: _propTypes.default.number.isRequired
});
/**
 * Used to model a location that is used in planning a trip.
 */


exports.itineraryType = itineraryType;

const locationType = _propTypes.default.shape({
  lat: _propTypes.default.number.isRequired,
  lon: _propTypes.default.number.isRequired,
  name: _propTypes.default.string.isRequired,

  /**
   * This is only used location that a user has saved. Can be either:
   * "home" or "work"
   */
  type: _propTypes.default.string
});
/**
 * Used to help display the time of day within the context of a particular itinerary.
 */


exports.locationType = locationType;

const timeOptionsType = _propTypes.default.shape({
  /**
   * A format string template to be used to display a date using moment.js
   */
  format: _propTypes.default.string,

  /*
   * The timezone offset in milliseconds if any should be added. This is
   * typically calculated using the itinerary.js#getTimeZoneOffset function.
   */
  offset: _propTypes.default.number
});
/**
 * This models data about a stop and it's associated routes that is obtained
 * from a transit index API.
 */


exports.timeOptionsType = timeOptionsType;

const transitIndexStopWithRoutes = _propTypes.default.shape({
  /**
   * The stop code if the stop has one
   */
  code: _propTypes.default.string,

  /**
   * The distance from the user to the stop in meters
   */
  dist: _propTypes.default.number,
  lat: _propTypes.default.number,
  lon: _propTypes.default.number,
  name: _propTypes.default.string,
  routes: _propTypes.default.arrayOf(_propTypes.default.shape({
    longName: _propTypes.default.string,
    shortName: _propTypes.default.string
  }))
});

exports.transitIndexStopWithRoutes = transitIndexStopWithRoutes;

const stopLayerStopType = _propTypes.default.shape({
  id: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  lat: _propTypes.default.number.isRequired,
  lon: _propTypes.default.number.isRequired
});

exports.stopLayerStopType = stopLayerStopType;

const transitivePlaceType = _propTypes.default.shape({
  place_id: _propTypes.default.string.isRequired,
  type: _propTypes.default.string.isRequired
});

const transitiveDataType = _propTypes.default.shape({
  journeys: _propTypes.default.arrayOf(_propTypes.default.shape({
    journey_id: _propTypes.default.string.isRequired,
    journey_name: _propTypes.default.string.isRequired,
    segments: _propTypes.default.arrayOf(_propTypes.default.shape({
      arc: _propTypes.default.bool,
      from: transitivePlaceType,
      patterns: _propTypes.default.arrayOf(_propTypes.default.shape({
        pattern_id: _propTypes.default.string.isRequired,
        from_stop_index: _propTypes.default.number.isRequired,
        to_stop_index: _propTypes.default.number.isRequired
      })),
      streetEdges: _propTypes.default.arrayOf(_propTypes.default.number),
      to: transitivePlaceType,
      type: _propTypes.default.string.isRequired
    })).isRequired
  })).isRequired,
  patterns: _propTypes.default.arrayOf(_propTypes.default.shape({
    pattern_id: _propTypes.default.string.isRequired,
    pattern_name: _propTypes.default.string.isRequired,
    route_id: _propTypes.default.string.isRequired,
    stops: _propTypes.default.arrayOf(_propTypes.default.shape({
      geometry: _propTypes.default.string,
      stop_id: _propTypes.default.string.isRequired
    })).isRequired
  })).isRequired,
  places: _propTypes.default.arrayOf(_propTypes.default.shape({
    place_id: _propTypes.default.string.isRequired,
    place_lat: _propTypes.default.number.isRequired,
    place_lon: _propTypes.default.number.isRequired,
    place_name: _propTypes.default.string
  })).isRequired,
  routes: _propTypes.default.arrayOf(_propTypes.default.shape({
    agency_id: _propTypes.default.string.isRequired,
    route_id: _propTypes.default.string.isRequired,
    route_short_name: _propTypes.default.string.isRequired,
    route_long_name: _propTypes.default.string.isRequired,
    route_type: _propTypes.default.number.isRequired,
    route_color: _propTypes.default.string
  })).isRequired,
  stops: _propTypes.default.arrayOf(_propTypes.default.shape({
    stop_id: _propTypes.default.string.isRequired,
    stop_name: _propTypes.default.string.isRequired,
    stop_lat: _propTypes.default.number.isRequired,
    stop_lon: _propTypes.default.number.isRequired
  })).isRequired,
  streetEdges: _propTypes.default.arrayOf(_propTypes.default.shape({
    edge_id: _propTypes.default.number.isRequired,
    geometry: encodedPolylineType
  })).isRequired
});
/**
 * This models data about a vehicle rental station as obtained from various
 * vehicle rental API endpoints from OTP.
 */


exports.transitiveDataType = transitiveDataType;

const stationType = _propTypes.default.shape({
  bikesAvailable: _propTypes.default.number,
  id: _propTypes.default.string.isRequired,
  isFloatingBike: _propTypes.default.bool,
  isFloatingCar: _propTypes.default.bool,
  isFloatingVehicle: _propTypes.default.bool,
  name: _propTypes.default.string,
  networks: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired,
  spacesAvailable: _propTypes.default.number,
  x: _propTypes.default.number.isRequired,
  y: _propTypes.default.number.isRequired
});
/**
 * Utility function to help create chained validators
 * per https://www.ian-thomas.net/custom-proptype-validation-with-react/
 * @param {*} validator The validator to use.
 */


exports.stationType = stationType;

function createChainableTypeChecker(validator) {
  function checkType(isRequired, props, propName, componentName, location) {
    componentName = componentName || "ANONYMOUS";

    if (props[propName] == null) {
      if (isRequired) {
        const locationName = _react.ReactPropTypeLocationNames[location];
        return new Error(`Required '${locationName}/${propName}' was not specified in '${componentName}'.`);
      }

      return null;
    }

    return validator(props, propName, componentName, location);
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
}

const latlngType = createChainableTypeChecker((props, propName) => {
  // Source: https://reactjs.org/docs/typechecking-with-proptypes.html#react.proptypes
  if (!(0, _map.isValidLatLng)(props[propName])) {
    return new Error(`${propName} needs to be a [lat, lng] array`);
  }

  return null;
});
exports.latlngType = latlngType;

const modeOptionType = _propTypes.default.shape({
  id: _propTypes.default.string.isRequired,
  selected: _propTypes.default.bool,
  showTitle: _propTypes.default.bool,
  text: _propTypes.default.node.isRequired,
  title: _propTypes.default.string
});

exports.modeOptionType = modeOptionType;

const modeSelectorOptionsType = _propTypes.default.shape({
  primary: modeOptionType,
  secondary: _propTypes.default.arrayOf(modeOptionType),
  tertiary: _propTypes.default.arrayOf(modeOptionType)
});

exports.modeSelectorOptionsType = modeSelectorOptionsType;

const configuredModeType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
  mode: _propTypes.default.string.isRequired,
  label: _propTypes.default.string.isRequired,
  company: _propTypes.default.string
})]);

exports.configuredModeType = configuredModeType;

const configuredModesType = _propTypes.default.shape({
  transitModes: _propTypes.default.arrayOf(configuredModeType),
  accessModes: _propTypes.default.arrayOf(configuredModeType),
  exclusiveModes: _propTypes.default.arrayOf(configuredModeType),
  bicycleModes: _propTypes.default.arrayOf(configuredModeType),
  micromobilityModes: _propTypes.default.arrayOf(configuredModeType)
});

exports.configuredModesType = configuredModesType;

const configuredCompanyType = _propTypes.default.shape({
  /**
   * The id of the company. This is typically in all-caps.
   */
  id: _propTypes.default.string.isRequired,

  /**
   * A human readable text value that can be displayed to users.
   */
  label: _propTypes.default.string.isRequired,

  /**
   * A comma-separated list of applicable modes of travel that the company
   * offers.
   */
  modes: _propTypes.default.string.isRequired
});
/**
 * Depending on the geocoder that is used, more properties than just the `label`
 * property might be provided by the geocoder. For example, with the Pelias
 * geocoder, properties such as `id`, `layer`, `source` are also included.
 */


exports.configuredCompanyType = configuredCompanyType;

const geocodedFeatureType = _propTypes.default.shape({
  geometry: _propTypes.default.shape({
    coordinates: _propTypes.default.arrayOf(_propTypes.default.number.isRequired).isRequired,
    type: _propTypes.default.string.isRequired
  }).isRequired,
  properties: _propTypes.default.shape({
    label: _propTypes.default.string.isRequired
  }).isRequired
});

exports.geocodedFeatureType = geocodedFeatureType;

const userLocationType = _propTypes.default.shape({
  id: _propTypes.default.string,

  /**
   * Can be either 'home', 'work', or null
   */
  icon: _propTypes.default.string,
  lat: _propTypes.default.number.isRequired,
  lon: _propTypes.default.number.isRequired,
  name: _propTypes.default.string.isRequired,

  /**
   * This represents the last time that this location was selected in a
   * search
   */
  timestamp: _propTypes.default.number,

  /**
   * One of: 'home', 'work', 'stop' or 'recent'
   */
  type: _propTypes.default.string.isRequired
});

exports.userLocationType = userLocationType;

//# sourceMappingURL=types.js