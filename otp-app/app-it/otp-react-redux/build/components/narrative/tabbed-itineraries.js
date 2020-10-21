"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var narrativeActions = _interopRequireWildcard(require("../../actions/narrative"));

var _defaultItinerary = _interopRequireDefault(require("./default/default-itinerary"));

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var _coreUtils$itinerary = _coreUtils.default.itinerary,
    calculateFares = _coreUtils$itinerary.calculateFares,
    calculatePhysicalActivity = _coreUtils$itinerary.calculatePhysicalActivity,
    getTimeZoneOffset = _coreUtils$itinerary.getTimeZoneOffset;
var _coreUtils$time = _coreUtils.default.time,
    formatDuration = _coreUtils$time.formatDuration,
    formatTime = _coreUtils$time.formatTime,
    getTimeFormat = _coreUtils$time.getTimeFormat;

var TabbedItineraries = /*#__PURE__*/function (_Component) {
  _inherits(TabbedItineraries, _Component);

  var _super = _createSuper(TabbedItineraries);

  function TabbedItineraries() {
    var _this;

    _classCallCheck(this, TabbedItineraries);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_toggleRealtimeItineraryClick", function (e) {
      var _this$props = _this.props,
          setUseRealtimeResponse = _this$props.setUseRealtimeResponse,
          useRealtime = _this$props.useRealtime;
      setUseRealtimeResponse({
        useRealtime: !useRealtime
      });
    });

    return _this;
  }

  _createClass(TabbedItineraries, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          activeItinerary = _this$props2.activeItinerary,
          itineraries = _this$props2.itineraries,
          itineraryClass = _this$props2.itineraryClass,
          realtimeEffects = _this$props2.realtimeEffects,
          setActiveItinerary = _this$props2.setActiveItinerary,
          timeFormat = _this$props2.timeFormat,
          useRealtime = _this$props2.useRealtime,
          itineraryClassProps = _objectWithoutProperties(_this$props2, ["activeItinerary", "itineraries", "itineraryClass", "realtimeEffects", "setActiveItinerary", "timeFormat", "useRealtime"]);

      if (!itineraries) return null;
      /* TODO: should this be moved? */

      var showRealtimeAnnotation = realtimeEffects.isAffectedByRealtimeData && (realtimeEffects.exceedsThreshold || realtimeEffects.routesDiffer || !useRealtime);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "options itinerary tabbed-itineraries"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "tab-row"
      }, itineraries.map(function (itinerary, index) {
        return /*#__PURE__*/_react.default.createElement(TabButton, {
          index: index,
          isActive: index === activeItinerary,
          itinerary: itinerary,
          onClick: setActiveItinerary,
          timeFormat: timeFormat
        });
      })), itineraries.length > 0 && activeItinerary >= 0 ? /*#__PURE__*/_react.default.createElement(itineraryClass, _objectSpread({
        itinerary: itineraries[activeItinerary],
        index: activeItinerary,
        key: activeItinerary,
        active: true,
        expanded: true,
        routingType: 'ITINERARY',
        showRealtimeAnnotation: showRealtimeAnnotation
      }, itineraryClassProps)) : null);
    }
  }]);

  return TabbedItineraries;
}(_react.Component); // connect to the redux store


_defineProperty(TabbedItineraries, "propTypes", {
  itineraries: _propTypes.default.array,
  itineraryClass: _propTypes.default.func,
  pending: _propTypes.default.number,
  activeItinerary: _propTypes.default.number,
  setActiveItinerary: _propTypes.default.func,
  setActiveLeg: _propTypes.default.func,
  setActiveStep: _propTypes.default.func,
  setUseRealtimeResponse: _propTypes.default.func,
  useRealtime: _propTypes.default.bool
});

_defineProperty(TabbedItineraries, "defaultProps", {
  itineraryClass: _defaultItinerary.default
});

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var activeSearch = (0, _state.getActiveSearch)(state.otp); // const { activeItinerary, activeLeg, activeStep } = activeSearch ? activeSearch.activeItinerary : {}

  var pending = activeSearch ? activeSearch.pending : false;
  var realtimeEffects = (0, _state.getRealtimeEffects)(state.otp);
  var useRealtime = state.otp.useRealtime;
  return {
    // swap out realtime itineraries with non-realtime depending on boolean
    pending: pending,
    realtimeEffects: realtimeEffects,
    activeItinerary: activeSearch && activeSearch.activeItinerary,
    activeLeg: activeSearch && activeSearch.activeLeg,
    activeStep: activeSearch && activeSearch.activeStep,
    useRealtime: useRealtime,
    companies: state.otp.currentQuery.companies,
    tnc: state.otp.tnc,
    timeFormat: getTimeFormat(state.otp.config),
    user: state.user.loggedInUser
  };
};

var TabButton = /*#__PURE__*/function (_Component2) {
  _inherits(TabButton, _Component2);

  var _super2 = _createSuper(TabButton);

  function TabButton() {
    var _this2;

    _classCallCheck(this, TabButton);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "_onClick", function () {
      var _this2$props = _this2.props,
          index = _this2$props.index,
          onClick = _this2$props.onClick; // FIXME: change signature once actions resolved with otp-ui

      onClick(index);
    });

    return _this2;
  }

  _createClass(TabButton, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          index = _this$props3.index,
          isActive = _this$props3.isActive,
          itinerary = _this$props3.itinerary,
          timeFormat = _this$props3.timeFormat;
      var timeOptions = {
        format: timeFormat,
        offset: getTimeZoneOffset(itinerary)
      };
      var classNames = ['tab-button', 'clear-button-formatting'];

      var _calculatePhysicalAct = calculatePhysicalActivity(itinerary),
          caloriesBurned = _calculatePhysicalAct.caloriesBurned;

      var _calculateFares = calculateFares(itinerary),
          centsToString = _calculateFares.centsToString,
          maxTNCFare = _calculateFares.maxTNCFare,
          minTNCFare = _calculateFares.minTNCFare,
          transitFare = _calculateFares.transitFare; // TODO: support non-USD


      var minTotalFare = minTNCFare * 100 + transitFare;
      var plus = maxTNCFare && maxTNCFare > minTNCFare ? '+' : '';
      if (isActive) classNames.push('selected');
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        key: "tab-button-".concat(index),
        className: classNames.join(' '),
        onClick: this._onClick
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "title"
      }, /*#__PURE__*/_react.default.createElement("span", null, "Opzione ", index + 1)), /*#__PURE__*/_react.default.createElement("div", {
        className: "details"
    }, formatDuration(itinerary.duration), /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("br", null), formatTime(itinerary.startTime, timeOptions), " - ", formatTime(itinerary.endTime, timeOptions)), /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("br", null), minTotalFare ? /*#__PURE__*/_react.default.createElement("span", null, "".concat(centsToString(minTotalFare)).concat(plus), " \u2022 ") : '', Math.round(caloriesBurned), " Cal"), itinerary.transfers > 0 && /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("br", null), itinerary.transfers, " cambi", itinerary.transfers > 1 ? '' : 'o')));
    }
  }]);

  return TabButton;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  var _setActiveItinerary = narrativeActions.setActiveItinerary,
      _setActiveLeg = narrativeActions.setActiveLeg,
      _setActiveStep = narrativeActions.setActiveStep,
      _setUseRealtimeResponse = narrativeActions.setUseRealtimeResponse;
  return {
    // FIXME
    setActiveItinerary: function setActiveItinerary(index) {
      dispatch(_setActiveItinerary({
        index: index
      }));
    },
    // FIXME
    setActiveLeg: function setActiveLeg(index, leg) {
      dispatch(_setActiveLeg({
        index: index,
        leg: leg
      }));
    },
    // FIXME
    setActiveStep: function setActiveStep(index, step) {
      dispatch(_setActiveStep({
        index: index,
        step: step
      }));
    },
    // FIXME
    setUseRealtimeResponse: function setUseRealtimeResponse(_ref) {
      var useRealtime = _ref.useRealtime;
      dispatch(_setUseRealtimeResponse({
        useRealtime: useRealtime
      }));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TabbedItineraries);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=tabbed-itineraries.js
