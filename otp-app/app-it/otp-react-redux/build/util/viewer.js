"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormattedStopTime = getFormattedStopTime;
exports.getRouteIdForPattern = getRouteIdForPattern;
exports.getStatusLabel = getStatusLabel;
exports.getStopTimesByPattern = getStopTimesByPattern;

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.split");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _moment = _interopRequireDefault(require("moment"));

require("moment-timezone");

var _react = _interopRequireDefault(require("react"));

var _icon = _interopRequireDefault(require("../components/narrative/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _coreUtils$time = _coreUtils.default.time,
    formatDuration = _coreUtils$time.formatDuration,
    formatSecondsAfterMidnight = _coreUtils$time.formatSecondsAfterMidnight,
    getUserTimezone = _coreUtils$time.getUserTimezone;
var ONE_HOUR_IN_SECONDS = 3600;
var ONE_DAY_IN_SECONDS = 86400;
/**
 * Helper method to generate stop time w/ status icon
 *
 * @param  {Object} stopTime  A stopTime object as received from a transit index API
 * @param  {string} [homeTimezone]  If configured, the timezone of the area
 * @param  {string} [soonText='Due']  The text to display for departure times
 *    about to depart in a short amount of time
 * @param  {string} timeFormat  A valid moment.js formatting string
 * @param  {boolean} useSchedule  Whether to use scheduled departure (otherwise uses realtime)
 */

function getFormattedStopTime(stopTime, homeTimezone) {
  var soonText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Due';
  var timeFormat = arguments.length > 3 ? arguments[3] : undefined;
  var useSchedule = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var departureTime = useSchedule ? stopTime.scheduledDeparture : stopTime.realtimeDeparture;
  var userTimeZone = getUserTimezone();
  var inHomeTimezone = homeTimezone && homeTimezone === userTimeZone;
  var now = (0, _moment.default)().tz(homeTimezone);
  var serviceDay = (0, _moment.default)(stopTime.serviceDay * 1000).tz(homeTimezone); // Determine if arrival occurs on different day, making sure to account for
  // any extra days added to the service day if it arrives after midnight. Note:
  // this can handle the rare (and non-existent?) case where an arrival occurs
  // 48:00 hours (or more) from the start of the service day.

  var departureTimeRemainder = departureTime % ONE_DAY_IN_SECONDS;
  var daysAfterServiceDay = (departureTime - departureTimeRemainder) / ONE_DAY_IN_SECONDS;
  var departureDay = serviceDay.add(daysAfterServiceDay, 'day');
  var vehicleDepartsToday = now.dayOfYear() === departureDay.dayOfYear(); // Determine whether to show departure as countdown (e.g. "5 min") or as HH:mm
  // time.

  var secondsUntilDeparture = departureTime + stopTime.serviceDay - now.unix(); // Determine if vehicle arrives after midnight in order to advance the day of
  // the week when showing arrival time/day.

  var departsInFuture = secondsUntilDeparture > 0; // Show the exact time if the departure happens within an hour.

  var showCountdown = secondsUntilDeparture < ONE_HOUR_IN_SECONDS && departsInFuture; // Use "soon text" (e.g., Due) if vehicle is approaching.

  var countdownString = secondsUntilDeparture < 60 ? soonText : formatDuration(secondsUntilDeparture);
  var formattedTime = formatSecondsAfterMidnight(departureTime, // Only show timezone (e.g., PDT) if user is not in home time zone (e.g., user
  // in New York, but viewing a trip planner for service based in Los Angeles).
  inHomeTimezone ? timeFormat : "".concat(timeFormat, " z")); // We only want to show the day of the week if the arrival is on a
  // different day and we're not showing the countdown string. This avoids
  // cases such as when it's Wednesday at 11:55pm and an arrival occurs at
  // Thursday 12:19am. We don't want the time to read: 'Thursday, 24 minutes'.

  var showDayOfWeek = !vehicleDepartsToday && !showCountdown;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      float: 'left'
    }
  }, stopTime.realtimeState === 'UPDATED' ? /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "rss",
    style: {
      color: '#888',
      fontSize: '0.8em',
      marginRight: 2
    }
  }) : /*#__PURE__*/_react.default.createElement(_icon.default, {
    type: "clock-o",
    style: {
      color: '#888',
      fontSize: '0.8em',
      marginRight: 2
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: 20,
      fontSize: showDayOfWeek ? 12 : 14
    }
  }, showDayOfWeek && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginBottom: -4
    }
  }, departureDay.format('dddd')), /*#__PURE__*/_react.default.createElement("div", null, showCountdown // Show countdown string (e.g., 3 min or Due)
  ? countdownString // Show formatted time (with timezone if user is not in home timezone)
  : formattedTime)));
}

function getRouteIdForPattern(pattern) {
  var patternIdParts = pattern.id.split(':');
  var routeId = patternIdParts[0] + ':' + patternIdParts[1];
  return routeId;
} // helper method to generate status label


function getStatusLabel(delay) {
  // late departure
  if (delay > 60) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "status-label",
      style: {
        backgroundColor: '#d9534f'
      }
    }, formatDuration(delay), " Late");
  } // early departure


  if (delay < -60) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "status-label",
      style: {
        backgroundColor: '#337ab7'
      }
    }, formatDuration(Math.abs(delay)), " Early");
  } // on-time departure


  return /*#__PURE__*/_react.default.createElement("div", {
    className: "status-label",
    style: {
      backgroundColor: '#5cb85c'
    }
  }, "On Time");
}

function getStopTimesByPattern(stopData) {
  var stopTimesByPattern = {};

  if (stopData && stopData.routes && stopData.stopTimes) {
    stopData.stopTimes.forEach(function (patternTimes) {
      var routeId = getRouteIdForPattern(patternTimes.pattern);
      var headsign = patternTimes.times[0] && patternTimes.times[0].headsign;
      patternTimes.pattern.headsign = headsign;
      var id = "".concat(routeId, "-").concat(headsign);

      if (!(id in stopTimesByPattern)) {
        var route = stopData.routes.find(function (r) {
          return r.id === routeId;
        }); // in some cases, the TriMet transit index will not return all routes
        // that serve a stop. Perhaps it doesn't return some routes if the
        // route only performs a drop-off at the stop... not quite sure. So a
        // check is needed to make sure we don't add data for routes not found
        // from the routes query.

        if (!route) {
          console.warn("Route with id ".concat(routeId, " not found in list of routes! No stop times from this route will be displayed."));
          return;
        }

        stopTimesByPattern[id] = {
          id: id,
          route: route,
          pattern: patternTimes.pattern,
          times: []
        };
      }

      var filteredTimes = patternTimes.times.filter(function (stopTime) {
        return stopTime.stopIndex < stopTime.stopCount - 1; // ensure that this isn't the last stop
      });
      stopTimesByPattern[id].times = stopTimesByPattern[id].times.concat(filteredTimes);
    });
  }

  return stopTimesByPattern;
}

//# sourceMappingURL=viewer.js