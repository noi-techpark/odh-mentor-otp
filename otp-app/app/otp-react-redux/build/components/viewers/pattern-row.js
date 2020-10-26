"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _react = _interopRequireWildcard(require("react"));

var _velocityReact = require("velocity-react");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _viewer = require("../../util/viewer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

/**
 * Represents a single pattern row for displaying arrival times in the stop
 * viewer.
 */
var PatternRow = /*#__PURE__*/function (_Component) {
  _inherits(PatternRow, _Component);

  var _super = _createSuper(PatternRow);

  function PatternRow() {
    var _this;

    _classCallCheck(this, PatternRow);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_toggleExpandedView", function () {
      _this.setState({
        expanded: !_this.state.expanded
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_renderNextArrivalsView", function () {
      var _this$props = _this.props,
          pattern = _this$props.pattern,
          route = _this$props.route,
          stopTimes = _this$props.stopTimes,
          homeTimezone = _this$props.homeTimezone,
          stopViewerArriving = _this$props.stopViewerArriving,
          stopViewerConfig = _this$props.stopViewerConfig,
          timeFormat = _this$props.timeFormat; // sort stop times by next departure

      var sortedStopTimes = [];
      var hasStopTimes = stopTimes && stopTimes.length > 0;

      if (hasStopTimes) {
        sortedStopTimes = stopTimes.concat().sort(function (a, b) {
          var aTime = a.serviceDay + a.realtimeDeparture;
          var bTime = b.serviceDay + b.realtimeDeparture;
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

      var routeName = route.shortName ? route.shortName : route.longName;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "route-name"
      }, /*#__PURE__*/_react.default.createElement("b", null, routeName), " $_direction_$ ", pattern.headsign), hasStopTimes && /*#__PURE__*/_react.default.createElement("div", {
        className: "next-trip-preview"
      }, (0, _viewer.getFormattedStopTime)(sortedStopTimes[0], homeTimezone, stopViewerArriving, timeFormat)), /*#__PURE__*/_react.default.createElement("div", {
        className: "expansion-button-container"
      }, /*#__PURE__*/_react.default.createElement("button", {
        className: "expansion-button",
        onClick: _this._toggleExpandedView
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "chevron-".concat(_this.state.expanded ? 'up' : 'down')
      })))), /*#__PURE__*/_react.default.createElement(_velocityReact.VelocityTransitionGroup, {
        enter: {
          animation: 'slideDown'
        },
        leave: {
          animation: 'slideUp'
        }
      }, _this.state.expanded && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-table"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "cell"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "cell time-column"
      }, "$_departure_cap_$"), /*#__PURE__*/_react.default.createElement("div", {
        className: "cell status-column"
      }, "$_status_cap_$")), hasStopTimes && sortedStopTimes.map(function (stopTime, i) {
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
        }, "$_direction_$ ", stopTime.headsign), /*#__PURE__*/_react.default.createElement("div", {
          className: "cell time-column"
        }, (0, _viewer.getFormattedStopTime)(stopTime, homeTimezone, stopViewerArriving, timeFormat)), /*#__PURE__*/_react.default.createElement("div", {
          className: "cell status-column"
        }, stopTime.realtimeState === 'UPDATED' ? (0, _viewer.getStatusLabel)(stopTime.departureDelay) : /*#__PURE__*/_react.default.createElement("div", {
          className: "status-label",
          style: {
            backgroundColor: '#bbb'
          }
        }, "$_scheduled_$")));
      })))));
    });

    _defineProperty(_assertThisInitialized(_this), "_renderScheduleView", function () {
      var _this$props2 = _this.props,
          pattern = _this$props2.pattern,
          route = _this$props2.route,
          stopTimes = _this$props2.stopTimes,
          homeTimezone = _this$props2.homeTimezone,
          stopViewerArriving = _this$props2.stopViewerArriving,
          stopViewerConfig = _this$props2.stopViewerConfig,
          timeFormat = _this$props2.timeFormat; // sort stop times by next departure

      var sortedStopTimes = [];
      var hasStopTimes = stopTimes && stopTimes.length > 0;

      if (hasStopTimes) {
        sortedStopTimes = stopTimes.concat().sort(function (a, b) {
          var aTime = a.serviceDay + a.scheduledDeparture;
          var bTime = b.serviceDay + b.scheduledDeparture;
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

      var routeName = route.shortName ? route.shortName : route.longName;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "route-name"
      }, /*#__PURE__*/_react.default.createElement("b", null, routeName), " $_direction_$ ", pattern.headsign)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-table"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "cell"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "cell"
      }, "$_mean_cap_$"), /*#__PURE__*/_react.default.createElement("div", {
        className: "cell time-column"
      }, "$_departure_cap_$")), hasStopTimes && sortedStopTimes.map(function (stopTime, i) {
        // Get formatted scheduled departure time.
        var time = (0, _viewer.getFormattedStopTime)(stopTime, homeTimezone, stopViewerArriving, timeFormat, true);
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
        }, "$_direction_$ ", stopTime.headsign), /*#__PURE__*/_react.default.createElement("div", {
          className: "cell",
          style: {
            textAlign: 'center'
          }
        }, stopTime.blockId), /*#__PURE__*/_react.default.createElement("div", {
          className: "cell time-column"
        }, time));
      }))));
    });

    _this.state = {
      expanded: false
    };
    return _this;
  }

  _createClass(PatternRow, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "route-row"
      }, this.props.showScheduleView ? this._renderScheduleView() : this._renderNextArrivalsView());
    }
  }]);

  return PatternRow;
}(_react.Component);

exports.default = PatternRow;
module.exports = exports.default;

//# sourceMappingURL=pattern-row.js