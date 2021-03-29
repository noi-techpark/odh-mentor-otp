"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

require("moment-timezone");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _fromToLocationPicker = _interopRequireDefault(require("@opentripplanner/from-to-location-picker"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _ui = require("../../actions/ui");

var _api = require("../../actions/api");

var _map = require("../../actions/map");

var _patternRow = _interopRequireDefault(require("./pattern-row"));

var _state = require("../../util/state");

var _viewer = require("../../util/viewer");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  getTimeFormat,
  getUserTimezone,
  OTP_API_DATE_FORMAT
} = _coreUtils.default.time;
const defaultState = {
  date: (0, _moment.default)().format(OTP_API_DATE_FORMAT),
  scheduleView: false
};

class StopViewer extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", defaultState);

    _defineProperty(this, "_backClicked", () => this.props.setMainPanelContent(null));

    _defineProperty(this, "_setLocationFromStop", locationType => {
      const {
        setLocation,
        stopData
      } = this.props;
      const location = {
        name: stopData.name,
        lat: stopData.lat,
        lon: stopData.lon
      };
      setLocation({
        locationType,
        location,
        reverseGeocode: true
      });
      this.setState({
        popupPosition: null
      });
    });

    _defineProperty(this, "_onClickPlanTo", () => this._setLocationFromStop('to'));

    _defineProperty(this, "_onClickPlanFrom", () => this._setLocationFromStop('from'));

    _defineProperty(this, "_refreshStopTimes", () => {
      const {
        findStopTimesForStop,
        viewedStop
      } = this.props;
      findStopTimesForStop({
        stopId: viewedStop.stopId
      }); // TODO: GraphQL approach would just call findStop again.
      // findStop({ stopId: viewedStop.stopId })

      this.setState({
        spin: true
      });
      window.setTimeout(this._stopSpin, 1000);
    });

    _defineProperty(this, "_onToggleAutoRefresh", () => {
      const {
        autoRefreshStopTimes,
        toggleAutoRefresh
      } = this.props;

      if (autoRefreshStopTimes) {
        toggleAutoRefresh(false);
      } else {
        // Turn on auto-refresh and refresh immediately to give user feedback.
        this._refreshStopTimes();

        toggleAutoRefresh(true);
      }
    });

    _defineProperty(this, "_stopSpin", () => this.setState({
      spin: false
    }));

    _defineProperty(this, "_startAutoRefresh", () => {
      const timer = window.setInterval(this._refreshStopTimes, 10000);
      this.setState({
        timer
      });
    });

    _defineProperty(this, "_stopAutoRefresh", () => {
      window.clearInterval(this.state.timer);
    });

    _defineProperty(this, "_toggleFavorite", () => {
      const {
        forgetStop,
        rememberStop,
        stopData
      } = this.props;
      if (this._isFavorite()) forgetStop(stopData.id);else rememberStop(stopData);
    });

    _defineProperty(this, "_toggleScheduleView", () => {
      const {
        findStopTimesForStop,
        viewedStop
      } = this.props;
      const {
        date,
        scheduleView: isShowingScheduleView
      } = this.state;

      if (!isShowingScheduleView) {
        // If not currently showing schedule view, fetch schedules for current
        // date and turn off auto refresh.
        this._stopAutoRefresh();

        findStopTimesForStop({
          stopId: viewedStop.stopId,
          startTime: this._getStartTimeForDate(date),
          timeRange: 86400
        });
      } else {
        // Otherwise, turn on auto refresh.
        this._startAutoRefresh();

        this._refreshStopTimes();
      }

      this.setState({
        scheduleView: !isShowingScheduleView
      });
    });

    _defineProperty(this, "_isFavorite", () => this.props.stopData && this.props.favoriteStops.findIndex(s => s.id === this.props.stopData.id) !== -1);

    _defineProperty(this, "_getStartTimeForDate", date => (0, _moment.default)(date).startOf('day').unix());

    _defineProperty(this, "handleDateChange", evt => {
      const {
        findStopTimesForStop,
        viewedStop
      } = this.props;
      const date = evt.target.value;
      findStopTimesForStop({
        stopId: viewedStop.stopId,
        startTime: this._getStartTimeForDate(date),
        timeRange: 86400
      });
      this.setState({
        date
      });
    });

    _defineProperty(this, "_renderHeader", () => {
      const {
        hideBackButton,
        showUserSettings,
        stopData
      } = this.props;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-viewer-header"
      }, !hideBackButton && /*#__PURE__*/_react.default.createElement("div", {
        className: "back-button-container"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsSize: "small",
        onClick: this._backClicked
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "arrow-left"
      }), "Back")), /*#__PURE__*/_react.default.createElement("div", {
        className: "header-text"
      }, stopData ? /*#__PURE__*/_react.default.createElement("span", null, stopData.name) : /*#__PURE__*/_react.default.createElement("span", null, "Loading Stop..."), showUserSettings ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        onClick: this._toggleFavorite,
        bsSize: "large",
        style: {
          color: this._isFavorite() ? 'yellow' : 'black',
          padding: 0,
          marginLeft: '5px'
        },
        bsStyle: "link"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: this._isFavorite() ? 'star' : 'star-o'
      })) : null), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          clear: 'both'
        }
      }));
    });

    _defineProperty(this, "_renderControls", () => {
      const {
        stopData
      } = this.props;
      const {
        scheduleView
      } = this.state; // Rewrite stop ID to not include Agency prefix, if present
      // TODO: make this functionality configurable?

      let stopId;

      if (stopData && stopData.id) {
        stopId = stopData.id.includes(':') ? stopData.id.split(':')[1] : stopData.id;
      }

      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, "Stop ID"), ": ", stopId, /*#__PURE__*/_react.default.createElement("button", {
        className: "link-button pull-right",
        style: {
          fontSize: 'small'
        },
        onClick: this._toggleScheduleView
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: scheduleView ? 'clock-o' : 'calendar'
      }), ' ', "View ", scheduleView ? 'next arrivals' : 'schedule')), /*#__PURE__*/_react.default.createElement("b", null, "Plan a trip:"), /*#__PURE__*/_react.default.createElement(_fromToLocationPicker.default, {
        onFromClick: this._onClickPlanFrom,
        onToClick: this._onClickPlanTo
      }), scheduleView && /*#__PURE__*/_react.default.createElement("input", {
        className: "pull-right",
        onKeyDown: this.props.onKeyDown,
        type: "date",
        value: this.state.date,
        style: {
          width: '115px',
          border: 'none',
          outline: 'none'
        },
        required: true,
        onChange: this.handleDateChange
      }));
    });
  }

  componentDidMount() {
    // Load the viewed stop in the store when the Stop Viewer first mounts
    this.props.findStop({
      stopId: this.props.viewedStop.stopId
    }); // Turn on stop times refresh if enabled.

    if (this.props.autoRefreshStopTimes) this._startAutoRefresh();
  }

  componentWillUnmount() {
    // Turn off auto refresh unconditionally (just in case).
    this._stopAutoRefresh();
  }

  // refresh the stop in the store if the viewed stop changes w/ the
  // Stop Viewer already mounted
  componentDidUpdate(prevProps) {
    if (prevProps.viewedStop && this.props.viewedStop && prevProps.viewedStop.stopId !== this.props.viewedStop.stopId) {
      // Reset state to default if stop changes (i.e., show next arrivals).
      this.setState(defaultState);
      this.props.findStop({
        stopId: this.props.viewedStop.stopId
      });
    } // Handle stopping or starting the auto refresh timer.


    if (prevProps.autoRefreshStopTimes && !this.props.autoRefreshStopTimes) this._stopAutoRefresh();else if (!prevProps.autoRefreshStopTimes && this.props.autoRefreshStopTimes) this._startAutoRefresh();
  }
  /**
   * Get today at midnight (morning) in seconds since epoch.
   * FIXME: handle timezone diffs?
   */


  render() {
    const {
      homeTimezone,
      stopData,
      stopViewerArriving,
      stopViewerConfig,
      timeFormat,
      transitOperators
    } = this.props;
    const {
      scheduleView,
      spin
    } = this.state;
    const hasStopTimesAndRoutes = !!(stopData && stopData.stopTimes && stopData.stopTimes.length > 0 && stopData.routes); // construct a lookup table mapping pattern (e.g. 'ROUTE_ID-HEADSIGN') to
    // an array of stoptimes

    const stopTimesByPattern = (0, _viewer.getStopTimesByPattern)(stopData);

    const routeComparator = _coreUtils.default.route.makeRouteComparator(transitOperators);

    const patternHeadsignComparator = _coreUtils.default.route.makeStringValueComparator(pattern => pattern.pattern.headsign);

    const patternComparator = (patternA, patternB) => {
      // first sort by routes
      const routeCompareValue = routeComparator(patternA.route, patternB.route);
      if (routeCompareValue !== 0) return routeCompareValue; // if same route, sort by headsign

      return patternHeadsignComparator(patternA, patternB);
    };

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "stop-viewer"
    }, this._renderHeader(), stopData && /*#__PURE__*/_react.default.createElement("div", {
      className: "stop-viewer-body"
    }, this._renderControls(), hasStopTimesAndRoutes ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        marginTop: 20
      }
    }, Object.values(stopTimesByPattern).sort(patternComparator).map(patternTimes => {
      // Only add pattern row if route is found.
      // FIXME: there is currently a bug with the alernative transit index
      // where routes are not associated with the stop if the only stoptimes
      // for the stop are drop off only. See https://github.com/ibi-group/trimet-mod-otp/issues/217
      if (!patternTimes.route) {
        console.warn(`Cannot render stop times for missing route ID: ${(0, _viewer.getRouteIdForPattern)(patternTimes.pattern)}`);
        return null;
      }

      return /*#__PURE__*/_react.default.createElement(_patternRow.default, {
        pattern: patternTimes.pattern,
        route: patternTimes.route,
        stopTimes: patternTimes.times,
        stopViewerConfig: stopViewerConfig,
        showScheduleView: scheduleView,
        key: patternTimes.id,
        stopViewerArriving: stopViewerArriving,
        homeTimezone: homeTimezone,
        timeFormat: timeFormat
      });
    })), !scheduleView // If showing next arrivals, include auto update controls.
    ?
    /*#__PURE__*/
    _react.default.createElement("div", {
      style: {
        marginTop: '20px'
      }
    }, /*#__PURE__*/_react.default.createElement("label", {
      style: {
        fontWeight: 300,
        fontSize: 'small'
      }
    }, /*#__PURE__*/_react.default.createElement("input", {
      name: "autoUpdate",
      type: "checkbox",
      checked: this.props.autoRefreshStopTimes,
      onChange: this._onToggleAutoRefresh
    }), ' ', "Auto-refresh arrivals?"), /*#__PURE__*/_react.default.createElement("button", {
      className: "link-button pull-right",
      style: {
        fontSize: 'small'
      },
      onClick: this._refreshStopTimes
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      className: spin ? 'fa-spin' : '',
      type: "refresh"
    }), ' ', (0, _moment.default)(stopData.stopTimesLastUpdated).tz(getUserTimezone()).format(timeFormat))) : null) : /*#__PURE__*/_react.default.createElement("div", null, "No stop times found for date.")));
  }

} // connect to redux store


_defineProperty(StopViewer, "propTypes", {
  hideBackButton: _propTypes.default.bool,
  stopData: _propTypes.default.object,
  viewedStop: _propTypes.default.object
});

const mapStateToProps = (state, ownProps) => {
  const showUserSettings = (0, _state.getShowUserSettings)(state.otp);
  const stopViewerConfig = (0, _state.getStopViewerConfig)(state.otp);
  return {
    autoRefreshStopTimes: state.otp.user.autoRefreshStopTimes,
    favoriteStops: state.otp.user.favoriteStops,
    homeTimezone: state.otp.config.homeTimezone,
    viewedStop: state.otp.ui.viewedStop,
    showUserSettings,
    stopData: state.otp.transitIndex.stops[state.otp.ui.viewedStop.stopId],
    stopViewerArriving: state.otp.config.language.stopViewerArriving,
    stopViewerConfig,
    timeFormat: getTimeFormat(state.otp.config),
    transitOperators: state.otp.config.transitOperators
  };
};

const mapDispatchToProps = {
  findStop: _api.findStop,
  findStopTimesForStop: _api.findStopTimesForStop,
  forgetStop: _map.forgetStop,
  rememberStop: _map.rememberStop,
  setLocation: _map.setLocation,
  setMainPanelContent: _ui.setMainPanelContent,
  toggleAutoRefresh: _ui.toggleAutoRefresh
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(StopViewer);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=stop-viewer.js