"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.function.name");

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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _coreUtils$time = _coreUtils.default.time,
    getTimeFormat = _coreUtils$time.getTimeFormat,
    getUserTimezone = _coreUtils$time.getUserTimezone,
    OTP_API_DATE_FORMAT = _coreUtils$time.OTP_API_DATE_FORMAT;
var defaultState = {
  date: (0, _moment.default)().format(OTP_API_DATE_FORMAT),
  scheduleView: false
};

var StopViewer = /*#__PURE__*/function (_Component) {
  _inherits(StopViewer, _Component);

  var _super = _createSuper(StopViewer);

  function StopViewer() {
    var _this;

    _classCallCheck(this, StopViewer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", defaultState);

    _defineProperty(_assertThisInitialized(_this), "_backClicked", function () {
      return _this.props.setMainPanelContent(null);
    });

    _defineProperty(_assertThisInitialized(_this), "_setLocationFromStop", function (locationType) {
      var _this$props = _this.props,
          setLocation = _this$props.setLocation,
          stopData = _this$props.stopData;
      var location = {
        name: stopData.name,
        lat: stopData.lat,
        lon: stopData.lon
      };
      setLocation({
        locationType: locationType,
        location: location,
        reverseGeocode: true
      });

      _this.setState({
        popupPosition: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onClickPlanTo", function () {
      return _this._setLocationFromStop('to');
    });

    _defineProperty(_assertThisInitialized(_this), "_onClickPlanFrom", function () {
      return _this._setLocationFromStop('from');
    });

    _defineProperty(_assertThisInitialized(_this), "_refreshStopTimes", function () {
      var _this$props2 = _this.props,
          findStopTimesForStop = _this$props2.findStopTimesForStop,
          viewedStop = _this$props2.viewedStop;
      findStopTimesForStop({
        stopId: viewedStop.stopId
      }); // TODO: GraphQL approach would just call findStop again.
      // findStop({ stopId: viewedStop.stopId })

      _this.setState({
        spin: true
      });

      window.setTimeout(_this._stopSpin, 1000);
    });

    _defineProperty(_assertThisInitialized(_this), "_onToggleAutoRefresh", function () {
      var _this$props3 = _this.props,
          autoRefreshStopTimes = _this$props3.autoRefreshStopTimes,
          toggleAutoRefresh = _this$props3.toggleAutoRefresh;

      if (autoRefreshStopTimes) {
        toggleAutoRefresh(false);
      } else {
        // Turn on auto-refresh and refresh immediately to give user feedback.
        _this._refreshStopTimes();

        toggleAutoRefresh(true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_stopSpin", function () {
      return _this.setState({
        spin: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_startAutoRefresh", function () {
      var timer = window.setInterval(_this._refreshStopTimes, 10000);

      _this.setState({
        timer: timer
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_stopAutoRefresh", function () {
      window.clearInterval(_this.state.timer);
    });

    _defineProperty(_assertThisInitialized(_this), "_toggleFavorite", function () {
      var _this$props4 = _this.props,
          forgetStop = _this$props4.forgetStop,
          rememberStop = _this$props4.rememberStop,
          stopData = _this$props4.stopData;
      if (_this._isFavorite()) forgetStop(stopData.id);else rememberStop(stopData);
    });

    _defineProperty(_assertThisInitialized(_this), "_toggleScheduleView", function () {
      var _this$props5 = _this.props,
          findStopTimesForStop = _this$props5.findStopTimesForStop,
          viewedStop = _this$props5.viewedStop;
      var _this$state = _this.state,
          date = _this$state.date,
          isShowingScheduleView = _this$state.scheduleView;

      if (!isShowingScheduleView) {
        // If not currently showing schedule view, fetch schedules for current
        // date and turn off auto refresh.
        _this._stopAutoRefresh();

        findStopTimesForStop({
          stopId: viewedStop.stopId,
          startTime: _this._getStartTimeForDate(date),
          timeRange: 86400
        });
      } else {
        // Otherwise, turn on auto refresh.
        _this._startAutoRefresh();

        _this._refreshStopTimes();
      }

      _this.setState({
        scheduleView: !isShowingScheduleView
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_isFavorite", function () {
      return _this.props.stopData && _this.props.favoriteStops.findIndex(function (s) {
        return s.id === _this.props.stopData.id;
      }) !== -1;
    });

    _defineProperty(_assertThisInitialized(_this), "_getStartTimeForDate", function (date) {
      return (0, _moment.default)(date).startOf('day').unix();
    });

    _defineProperty(_assertThisInitialized(_this), "handleDateChange", function (evt) {
      var _this$props6 = _this.props,
          findStopTimesForStop = _this$props6.findStopTimesForStop,
          viewedStop = _this$props6.viewedStop;
      var date = evt.target.value;
      findStopTimesForStop({
        stopId: viewedStop.stopId,
        startTime: _this._getStartTimeForDate(date),
        timeRange: 86400
      });

      _this.setState({
        date: date
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_renderHeader", function () {
      var _this$props7 = _this.props,
          hideBackButton = _this$props7.hideBackButton,
          showUserSettings = _this$props7.showUserSettings,
          stopData = _this$props7.stopData;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-viewer-header"
      }, !hideBackButton && /*#__PURE__*/_react.default.createElement("div", {
        className: "back-button-container"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsSize: "small",
        onClick: _this._backClicked
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "arrow-left"
      }), "$_back_$")), /*#__PURE__*/_react.default.createElement("div", {
        className: "header-text"
      }, stopData ? /*#__PURE__*/_react.default.createElement("span", null, stopData.name) : /*#__PURE__*/_react.default.createElement("span", null, "Loading Stop..."), showUserSettings ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        onClick: _this._toggleFavorite,
        bsSize: "large",
        style: {
          color: _this._isFavorite() ? 'yellow' : 'black',
          padding: 0,
          marginLeft: '5px'
        },
        bsStyle: "link"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: _this._isFavorite() ? 'star' : 'star-o'
      })) : null), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          clear: 'both'
        }
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_renderControls", function () {
      var stopData = _this.props.stopData;
      var scheduleView = _this.state.scheduleView; // Rewrite stop ID to not include Agency prefix, if present
      // TODO: make this functionality configurable?

      var stopId;

      if (stopData && stopData.id) {
        stopId = stopData.id.includes(':') ? stopData.id.split(':')[1] : stopData.id;
      }

      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("b", null, "Stop ID"), ": ", stopId, /*#__PURE__*/_react.default.createElement("button", {
        className: "link-button pull-right",
        style: {
          fontSize: 'small'
        },
        onClick: _this._toggleScheduleView
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: scheduleView ? 'clock-o' : 'calendar'
      }), ' ', " $_show_$ ", scheduleView ? "$_next_$" : "$_schedule_$")), /*#__PURE__*/_react.default.createElement("b", null, "$_travel_$:"), /*#__PURE__*/_react.default.createElement(_fromToLocationPicker.default, {
        onFromClick: _this._onClickPlanFrom,
        onToClick: _this._onClickPlanTo
      }), scheduleView && /*#__PURE__*/_react.default.createElement("input", {
        className: "pull-right",
        onKeyDown: _this.props.onKeyDown,
        type: "date",
        value: _this.state.date,
        style: {
          width: '115px',
          border: 'none',
          outline: 'none'
        },
        required: true,
        onChange: _this.handleDateChange
      }));
    });

    return _this;
  }

  _createClass(StopViewer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Load the viewed stop in the store when the Fermata first mounts
      this.props.findStop({
        stopId: this.props.viewedStop.stopId
      }); // Turn on stop times refresh if enabled.

      if (this.props.autoRefreshStopTimes) this._startAutoRefresh();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Turn off auto refresh unconditionally (just in case).
      this._stopAutoRefresh();
    }
  }, {
    key: "componentDidUpdate",
    // refresh the stop in the store if the viewed stop changes w/ the
    // Fermata already mounted
    value: function componentDidUpdate(prevProps) {
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

  }, {
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
          homeTimezone = _this$props8.homeTimezone,
          stopData = _this$props8.stopData,
          stopViewerArriving = _this$props8.stopViewerArriving,
          stopViewerConfig = _this$props8.stopViewerConfig,
          timeFormat = _this$props8.timeFormat;
      var _this$state2 = this.state,
          scheduleView = _this$state2.scheduleView,
          spin = _this$state2.spin;
      var hasStopTimesAndRoutes = !!(stopData && stopData.stopTimes && stopData.stopTimes.length > 0 && stopData.routes); // construct a lookup table mapping pattern (e.g. 'ROUTE_ID-HEADSIGN') to an array of stoptimes

      var stopTimesByPattern = (0, _viewer.getStopTimesByPattern)(stopData);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-viewer"
      }, this._renderHeader(), stopData && /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-viewer-body"
      }, this._renderControls(), hasStopTimesAndRoutes ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          marginTop: 20
        }
      }, Object.values(stopTimesByPattern).sort(function (a, b) {
        return _coreUtils.default.route.routeComparator(a.route, b.route);
      }).map(function (patternTimes) {
        // Only add pattern row if route is found.
        // FIXME: there is currently a bug with the alernative transit index
        // where routes are not associated with the stop if the only stoptimes
        // for the stop are drop off only. See https://github.com/ibi-group/trimet-mod-otp/issues/217
        if (!patternTimes.route) {
          console.warn("Cannot render stop times for missing route ID: ".concat((0, _viewer.getRouteIdForPattern)(patternTimes.pattern)));
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
      }), ' ', "$_refresh_arrival_$"), /*#__PURE__*/_react.default.createElement("button", {
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
  }]);

  return StopViewer;
}(_react.Component); // connect to redux store


_defineProperty(StopViewer, "propTypes", {
  hideBackButton: _propTypes.default.bool,
  stopData: _propTypes.default.object,
  viewedStop: _propTypes.default.object
});

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var showUserSettings = (0, _state.getShowUserSettings)(state.otp);
  var stopViewerConfig = (0, _state.getStopViewerConfig)(state.otp);
  return {
    autoRefreshStopTimes: state.otp.user.autoRefreshStopTimes,
    favoriteStops: state.otp.user.favoriteStops,
    homeTimezone: state.otp.config.homeTimezone,
    viewedStop: state.otp.ui.viewedStop,
    showUserSettings: showUserSettings,
    stopData: state.otp.transitIndex.stops[state.otp.ui.viewedStop.stopId],
    stopViewerArriving: state.otp.config.language.stopViewerArriving,
    stopViewerConfig: stopViewerConfig,
    timeFormat: getTimeFormat(state.otp.config)
  };
};

var mapDispatchToProps = {
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
