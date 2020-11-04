"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveSearch = getActiveSearch;
exports.getTimestamp = getTimestamp;
exports.getActiveErrors = getActiveErrors;
exports.getActiveItineraries = getActiveItineraries;
exports.getTotalFareAsString = getTotalFareAsString;
exports.getActiveItinerary = getActiveItinerary;
exports.hasValidLocation = hasValidLocation;
exports.queryIsValid = queryIsValid;
exports.getRealtimeEffects = getRealtimeEffects;
exports.getShowUserSettings = getShowUserSettings;
exports.getStopViewerConfig = getStopViewerConfig;
exports.getUiUrlParams = getUiUrlParams;
exports.getTitle = getTitle;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _moment = _interopRequireDefault(require("moment"));

var _ui = require("../actions/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _coreUtils$itinerary = _coreUtils.default.itinerary,
    calculateFares = _coreUtils$itinerary.calculateFares,
    hasBike = _coreUtils$itinerary.hasBike,
    isCar = _coreUtils$itinerary.isCar,
    isTransit = _coreUtils$itinerary.isTransit,
    isWalk = _coreUtils$itinerary.isWalk;
/**
 * Get the active search object
 * @param {Object} otpState the OTP state object
 * @returns {Object} an search object, or null if there is no active search
 */

function getActiveSearch(otpState) {
  return otpState.searches[otpState.activeSearchId];
}
/**
 * Get timestamp in the expected format used by otp-datastore (call taker
 * back end). Defaults to now.
 * TODO: move to OTP-UI?
 */


function getTimestamp() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _moment.default)();
  return time.format('YYYY-MM-DDTHH:mm:ss');
}
/**
 * Gets the active errors returned for the OTP responses.
 * @param {Object} otpState the OTP state object
 * @return {Array}      array of OTP plan responses with errors
 */


function getActiveErrors(otpState) {
  var search = getActiveSearch(otpState);
  var errors = [];
  var response = !search ? null : search.response;

  if (response) {
    response.forEach(function (res) {
      if (res && res.error) errors.push(res);
    });
  }

  return errors;
}
/**
 * Get the active itineraries for the active search, which is dependent on
 * whether realtime or non-realtime results should be displayed
 * @param {Object} otpState the OTP state object
 * @return {Array}      array of itinerary objects from the OTP plan response,
 *                      or null if there is no active search
 */


function getActiveItineraries(otpState) {
  var search = getActiveSearch(otpState);
  var config = otpState.config,
      useRealtime = otpState.useRealtime; // set response to use depending on useRealtime

  var response = !search ? null : useRealtime ? search.response : search.nonRealtimeResponse;
  var itineraries = [];

  if (response) {
    response.forEach(function (res) {
      if (res && res.plan) itineraries.push.apply(itineraries, _toConsumableArray(res.plan.itineraries));
    });
  }

  var _otpState$filter = otpState.filter,
      filter = _otpState$filter.filter,
      sort = _otpState$filter.sort;
  var direction = sort.direction,
      type = sort.type;
  return itineraries.filter(function (itinerary) {
    switch (filter) {
      case 'ALL':
        return true;

      case 'ACTIVE':
        // ACTIVE filter checks that the only modes contained in the itinerary
        // are 'active' (i.e., walk or bike). FIXME: add micromobility?
        var allActiveModes = true;
        itinerary.legs.forEach(function (leg) {
          if (!isWalk(leg.mode) && !hasBike(leg.mode)) allActiveModes = false;
        });
        return allActiveModes;

      case 'TRANSIT':
        return itineraryHasTransit(itinerary);

      case 'CAR':
        var hasCar = false;
        itinerary.legs.forEach(function (leg) {
          if (isCar(leg.mode)) hasCar = true;
        });
        return hasCar;

      default:
        console.warn("Filter (".concat(filter, ") not supported"));
        return true;
    }
  }).sort(function (a, b) {
    switch (type) {
      case 'WALKTIME':
        if (direction === 'ASC') return a.walkTime - b.walkTime;else return b.walkTime - a.walkTime;

      case 'ARRIVALTIME':
        if (direction === 'ASC') return a.endTime - b.endTime;else return b.endTime - a.endTime;

      case 'DEPARTURETIME':
        if (direction === 'ASC') return a.startTime - b.startTime;else return b.startTime - a.startTime;

      case 'DURATION':
        if (direction === 'ASC') return a.duration - b.duration;else return b.duration - a.duration;

      case 'COST':
        var aTotal = getTotalFare(a, config);
        var bTotal = getTotalFare(b, config);
        if (direction === 'ASC') return aTotal - bTotal;else return bTotal - aTotal;

      default:
        if (type !== 'BEST') console.warn("Sort (".concat(type, ") not supported. Defaulting to BEST.")); // FIXME: Fully implement default sort algorithm.

        var aCost = calculateItineraryCost(a, config);
        var bCost = calculateItineraryCost(b, config);
        if (direction === 'ASC') return aCost - bCost;else return bCost - aCost;
    }
  });
}
/**
 * Default constants for calculating itinerary "cost", i.e., how preferential a
 * particular itinerary is based on factors like wait time, total fare, drive
 * time, etc.
 */


var DEFAULT_WEIGHTS = {
  walkReluctance: 0.1,
  driveReluctance: 2,
  durationFactor: 0.25,
  fareFactor: 0.5,
  waitReluctance: 0.1,
  transferReluctance: 0.9
};
/**
 * This calculates the "cost" (not the monetary cost, but the cost according to
 * multiple factors like duration, total fare, and walking distance) for a
 * particular itinerary, for use in sorting itineraries.
 * FIXME: Do major testing to get this right.
 */

function calculateItineraryCost(itinerary) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Initialize weights to default values.
  var weights = DEFAULT_WEIGHTS; // If config contains values to override defaults, apply those.

  var configWeights = config.itinerary && config.itinerary.weights;
  if (configWeights) Object.assign(weights, configWeights);
  return getTotalFare(itinerary, config) * weights.fareFactor + itinerary.duration * weights.durationFactor + itinerary.walkDistance * weights.walkReluctance + getDriveTime(itinerary) * weights.driveReluctance + itinerary.waitingTime * weights.waitReluctance + itinerary.transfers * weights.transferReluctance;
}
/**
 * Get total drive time (i.e., total duration for legs with mode=CAR) for an
 * itinerary.
 */


function getDriveTime(itinerary) {
  if (!itinerary) return 0;
  var driveTime = 0;
  itinerary.legs.forEach(function (leg) {
    if (leg.mode === 'CAR') driveTime += leg.duration;
  });
  return driveTime;
}
/**
 * Default costs for modes that currently have no costs evaluated in
 * OpenTripPlanner.
 */


var DEFAULT_COSTS = {
  // $2 per trip? This is a made up number.
  bikeshareTripCostCents: 2 * 100,
  // $2 for 3 hours of parking?
  carParkingCostCents: 3 * 2.00 * 100,
  // FL per diem rate: https://www.flcourts.org/content/download/219314/1981830/TravelInformation.pdf
  drivingCentsPerMile: 0.445 * 100
};
/**
 * Returns total fare for itinerary (in cents)
 * FIXME: Move to otp-ui?
 * TODO: Add GBFS fares
 */

function getTotalFare(itinerary) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Get transit/TNC fares.
  var _calculateFares = calculateFares(itinerary),
      maxTNCFare = _calculateFares.maxTNCFare,
      transitFare = _calculateFares.transitFare; // Start with default cost values.


  var costs = DEFAULT_COSTS; // If config contains values to override defaults, apply those.

  var configCosts = config.itinerary && config.itinerary.costs;
  if (configCosts) Object.assign(costs, configCosts); // Calculate total cost from itinerary legs.

  var drivingCost = 0;
  var hasBikeshare = false;
  itinerary.legs.forEach(function (leg) {
    if (leg.mode === 'CAR') {
      // Convert meters to miles and multiple by cost per mile.
      drivingCost += leg.distance * 0.000621371 * costs.drivingCentsPerMile;
    }

    if (leg.mode === 'BICYCLE_RENT' || leg.mode === 'MICROMOBILITY' || leg.rentedBike) {
      hasBikeshare = true;
    }
  });
  var bikeshareCost = hasBikeshare ? costs.bikeshareTripCostCents : 0; // If some leg uses driving, add parking cost to the total.

  if (drivingCost > 0) drivingCost += costs.carParkingCostCents;
  return bikeshareCost + drivingCost + transitFare + maxTNCFare * 100;
}

function getTotalFareAsString(itinerary) {
  // Get centsToString formatter.
  var _calculateFares2 = calculateFares(itinerary),
      centsToString = _calculateFares2.centsToString; // Return total fare as formatted string.


  return centsToString(getTotalFare(itinerary));
}

function itineraryHasTransit(itinerary) {
  var itinHasTransit = false;
  itinerary.legs.forEach(function (leg) {
    if (isTransit(leg.mode)) itinHasTransit = true;
  });
  return itinHasTransit;
}
/**
 * Get the active itinerary/profile for the active search object
 * @param {Object} otpState the OTP state object
 * @returns {Object} an itinerary object from the OTP plan response, or null if
 *   there is no active search or itinerary
 */


function getActiveItinerary(otpState) {
  var search = getActiveSearch(otpState);
  var itineraries = getActiveItineraries(otpState);
  if (!itineraries || !search) return null;
  return itineraries.length > search.activeItinerary && search.activeItinerary >= 0 ? itineraries[search.activeItinerary] : null;
}
/**
 * Determine if the current query has a valid location, including lat/lon
 * @param {Object} query an OTP query object
 * @param {string} locationKey the location key ('from' or 'to')
 * @returns {boolean}
 */


function hasValidLocation(query, locationKey) {
  return query[locationKey] && query[locationKey].lat && query[locationKey].lon;
}
/**
 * Determine if the current query is valid
 * @param {Object} otpState the OTP state object
 * @returns {boolean}
 */


function queryIsValid(otpState) {
  var currentQuery = otpState.currentQuery;
  return hasValidLocation(currentQuery, 'from') && hasValidLocation(currentQuery, 'to'); // TODO: add mode validation
  // TODO: add date/time validation
}

function getRealtimeEffects(otpState) {
  var search = getActiveSearch(otpState);
  var realtimeItineraries = search && search.response && search.response.plan ? search.response.plan.itineraries : null;
  var hasNonRealtimeItineraries = search && search.nonRealtimeResponse && search.nonRealtimeResponse.plan;
  var nonRealtimeItineraries = hasNonRealtimeItineraries ? search.nonRealtimeResponse.plan.itineraries : null;
  var isAffectedByRealtimeData = !!(realtimeItineraries && hasNonRealtimeItineraries && // FIXME: Are realtime impacts only indicated by a change in the duration
  // of the first itinerary
  realtimeItineraries[0].duration !== nonRealtimeItineraries[0].duration);
  var normalRoutes = isAffectedByRealtimeData && nonRealtimeItineraries ? nonRealtimeItineraries[0].legs.filter(function (leg) {
    return !!leg.route;
  }).map(function (leg) {
    return leg.route;
  }) : [];
  var realtimeRoutes = isAffectedByRealtimeData && realtimeItineraries ? realtimeItineraries[0].legs.filter(function (leg) {
    return !!leg.route;
  }).map(function (leg) {
    return leg.route;
  }) : [];
  var normalDuration = isAffectedByRealtimeData && nonRealtimeItineraries ? nonRealtimeItineraries[0].duration : 0;
  var realtimeDuration = isAffectedByRealtimeData && realtimeItineraries ? realtimeItineraries[0].duration : 0;
  return {
    isAffectedByRealtimeData: isAffectedByRealtimeData,
    normalRoutes: normalRoutes,
    realtimeRoutes: realtimeRoutes,
    routesDiffer: !(0, _lodash.default)(normalRoutes, realtimeRoutes),
    normalDuration: normalDuration,
    realtimeDuration: realtimeDuration,
    exceedsThreshold: Math.abs(normalDuration - realtimeDuration) >= otpState.config.realtimeEffectsDisplayThreshold
  }; // // TESTING: Return this instead to simulate a realtime-affected itinerary.
  // return {
  //   isAffectedByRealtimeData: true,
  //   normalRoutes: ['10', '2', '10'],
  //   realtimeRoutes: ['1', '2'],
  //   routesDiffer: true,
  //   normalDuration: 1000,
  //   realtimeDuration: 800,
  //   exceedsThreshold: true
  // }
}
/**
 * Determine whether user settings panel is enabled.
 */


function getShowUserSettings(otpState) {
  return otpState.config.persistence && otpState.config.persistence.enabled;
}

function getStopViewerConfig(otpState) {
  return otpState.config.stopViewer;
}
/**
 * Assemble any UI-state properties to be tracked via URL into a single object
 * TODO: Expand to include additional UI properties
 */


function getUiUrlParams(otpState) {
  var activeSearch = getActiveSearch(otpState);
  var uiParams = {
    ui_activeItinerary: activeSearch ? activeSearch.activeItinerary : 0,
    ui_activeSearch: otpState.activeSearchId
  };
  return uiParams;
} // Set default title to the original document title (on load) set in index.html


var DEFAULT_TITLE = document.title;

function getTitle(state) {
  // Override title can optionally be provided in config.yml
  var _state$otp = state.otp,
      config = _state$otp.config,
      ui = _state$otp.ui,
      user = _state$otp.user;
  var title = config.title || DEFAULT_TITLE;
  var mainPanelContent = ui.mainPanelContent,
      viewedRoute = ui.viewedRoute,
      viewedStop = ui.viewedStop;

  switch (mainPanelContent) {
    case _ui.MainPanelContent.ROUTE_VIEWER:
      title += ' | Route';
      if (viewedRoute && viewedRoute.routeId) title += " ".concat(viewedRoute.routeId);
      break;

    case _ui.MainPanelContent.STOP_VIEWER:
      title += ' | Stop';
      if (viewedStop && viewedStop.stopId) title += " ".concat(viewedStop.stopId);
      break;

    default:
      var activeSearch = getActiveSearch(state.otp);

      if (activeSearch) {
        title += " | ".concat(_coreUtils.default.query.summarizeQuery(activeSearch.query, user.locations));
      }

      break;
  } // if (printView) title += ' | Print'


  return title;
}

//# sourceMappingURL=state.js