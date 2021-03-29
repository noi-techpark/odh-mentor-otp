"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _velocityReact = require("velocity-react");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _viewer = require("../../util/viewer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents a single pattern row for displaying arrival times in the stop
 * viewer.
 */
class PatternRow extends _react.Component {
  constructor() {
    super();

    _defineProperty(this, "_toggleExpandedView", () => {
      this.setState({
        expanded: !this.state.expanded
      });
    });

    _defineProperty(this, "_renderNextArrivalsView", () => {
      const {
        pattern,
        route,
        stopTimes,
        homeTimezone,
        stopViewerArriving,
        stopViewerConfig,
        timeFormat
      } = this.props; // sort stop times by next departure

      let sortedStopTimes = [];
      const hasStopTimes = stopTimes && stopTimes.length > 0;

      if (hasStopTimes) {
        sortedStopTimes = stopTimes.concat().sort((a, b) => {
          const aTime = a.serviceDay + a.realtimeDeparture;
          const bTime = b.serviceDay + b.realtimeDeparture;
          return aTime - bTime;
        }) // We request only x departures per pattern, but the patterns are merged
        // according to shared headsigns, so we need to slice the stop times
        // here as well to ensure only x times are shown per route/headsign combo.
        // This is applied after the sort, so we're keeping the soonest departures.
        .slice(0, stopViewerConfig.numberOfDepartures);
      } else {
        // Do not include pattern row if it has no stop times.
        return null;
      }

      const routeName = route.shortName ? route.shortName : route.longName;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "route-name"
      }, /*#__PURE__*/_react.default.createElement("b", null, routeName), " To ", pattern.headsign), hasStopTimes && /*#__PURE__*/_react.default.createElement("div", {
        className: "next-trip-preview"
      }, (0, _viewer.getFormattedStopTime)(sortedStopTimes[0], homeTimezone, stopViewerArriving, timeFormat)), /*#__PURE__*/_react.default.createElement("div", {
        className: "expansion-button-container"
      }, /*#__PURE__*/_react.default.createElement("button", {
        className: "expansion-button",
        onClick: this._toggleExpandedView
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: `chevron-${this.state.expanded ? 'up' : 'down'}`
      })))), /*#__PURE__*/_react.default.createElement(_velocityReact.VelocityTransitionGroup, {
        enter: {
          animation: 'slideDown'
        },
        leave: {
          animation: 'slideUp'
        }
      }, this.state.expanded && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-table"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "cell"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "cell time-column"
      }, "DEPARTURE"), /*#__PURE__*/_react.default.createElement("div", {
        className: "cell status-column"
      }, "STATUS")), hasStopTimes && sortedStopTimes.map((stopTime, i) => {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "trip-row",
          style: {
            display: 'table-row',
            marginTop: 6,
            fontSize: 14
          },
          key: i
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "cell"
        }, "To ", stopTime.headsign), /*#__PURE__*/_react.default.createElement("div", {
          className: "cell time-column"
        }, (0, _viewer.getFormattedStopTime)(stopTime, homeTimezone, stopViewerArriving, timeFormat)), /*#__PURE__*/_react.default.createElement("div", {
          className: "cell status-column"
        }, stopTime.realtimeState === 'UPDATED' ? (0, _viewer.getStatusLabel)(stopTime.departureDelay) : /*#__PURE__*/_react.default.createElement("div", {
          className: "status-label",
          style: {
            backgroundColor: '#bbb'
          }
        }, "Scheduled")));
      })))));
    });

    _defineProperty(this, "_renderScheduleView", () => {
      const {
        pattern,
        route,
        stopTimes,
        homeTimezone,
        stopViewerArriving,
        stopViewerConfig,
        timeFormat
      } = this.props; // sort stop times by next departure

      let sortedStopTimes = [];
      const hasStopTimes = stopTimes && stopTimes.length > 0;

      if (hasStopTimes) {
        sortedStopTimes = stopTimes.concat().sort((a, b) => {
          const aTime = a.serviceDay + a.scheduledDeparture;
          const bTime = b.serviceDay + b.scheduledDeparture;
          return aTime - bTime;
        }) // We request only x departures per pattern, but the patterns are merged
        // according to shared headsigns, so we need to slice the stop times
        // here as well to ensure only x times are shown per route/headsign combo.
        // This is applied after the sort, so we're keeping the soonest departures.
        .slice(0, stopViewerConfig.numberOfDepartures);
      } else {
        // Do not include pattern row if it has no stop times.
        return null;
      }

      const routeName = route.shortName ? route.shortName : route.longName;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "route-name"
      }, /*#__PURE__*/_react.default.createElement("b", null, routeName), " To ", pattern.headsign)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-table"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "cell"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "cell"
      }, "BLOCK"), /*#__PURE__*/_react.default.createElement("div", {
        className: "cell time-column"
      }, "DEPARTURE")), hasStopTimes && sortedStopTimes.map((stopTime, i) => {
        // Get formatted scheduled departure time.
        const time = (0, _viewer.getFormattedStopTime)(stopTime, homeTimezone, stopViewerArriving, timeFormat, true);
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "trip-row",
          style: {
            display: 'table-row',
            marginTop: 6,
            fontSize: 14
          },
          key: i
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "cell"
        }, "To ", stopTime.headsign), /*#__PURE__*/_react.default.createElement("div", {
          className: "cell",
          style: {
            textAlign: 'center'
          }
        }, stopTime.blockId), /*#__PURE__*/_react.default.createElement("div", {
          className: "cell time-column"
        }, time));
      }))));
    });

    this.state = {
      expanded: false
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "route-row"
    }, this.props.showScheduleView ? this._renderScheduleView() : this._renderNextArrivalsView());
  }

}

exports.default = PatternRow;
module.exports = exports.default;

//# sourceMappingURL=pattern-row.js