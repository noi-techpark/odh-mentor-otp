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

var _reactSwipeableViews = _interopRequireDefault(require("react-swipeable-views"));

var _narrative = require("../../actions/narrative");

var _icon = _interopRequireDefault(require("./icon"));

var _defaultItinerary = _interopRequireDefault(require("./default/default-itinerary"));

var _loading = _interopRequireDefault(require("./loading"));

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var ItineraryCarousel = /*#__PURE__*/function (_Component) {
  _inherits(ItineraryCarousel, _Component);

  var _super = _createSuper(ItineraryCarousel);

  function ItineraryCarousel() {
    var _this;

    _classCallCheck(this, ItineraryCarousel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "_onItineraryClick", function () {
      if (typeof _this.props.onClick === 'function') _this.props.onClick();
    });

    _defineProperty(_assertThisInitialized(_this), "_onLeftClick", function () {
      var _this$props = _this.props,
          activeItinerary = _this$props.activeItinerary,
          itineraries = _this$props.itineraries,
          setActiveItinerary = _this$props.setActiveItinerary;
      setActiveItinerary(activeItinerary === 0 ? itineraries.length - 1 : activeItinerary - 1);
    });

    _defineProperty(_assertThisInitialized(_this), "_onRightClick", function () {
      var _this$props2 = _this.props,
          activeItinerary = _this$props2.activeItinerary,
          itineraries = _this$props2.itineraries,
          setActiveItinerary = _this$props2.setActiveItinerary;
      setActiveItinerary(activeItinerary === itineraries.length - 1 ? 0 : activeItinerary + 1);
    });

    _defineProperty(_assertThisInitialized(_this), "_onSwipe", function (index, indexLatest) {
      _this.props.setActiveItinerary(index);
    });

    return _this;
  }

  _createClass(ItineraryCarousel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          activeItinerary = _this$props3.activeItinerary,
          itineraries = _this$props3.itineraries,
          itineraryClass = _this$props3.itineraryClass,
          hideHeader = _this$props3.hideHeader,
          pending = _this$props3.pending,
          user = _this$props3.user;
      if (pending) return /*#__PURE__*/_react.default.createElement(_loading.default, {
        small: true
      });
      if (!itineraries) return null;
      var views = itineraries.map(function (itinerary, index) {
        return /*#__PURE__*/_react.default.createElement(itineraryClass, _objectSpread({
          itinerary: itinerary,
          index: index,
          key: index,
          expanded: _this2.props.expanded,
          onClick: _this2._onItineraryClick,
          user: user
        }, _this2.props));
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "options itinerary"
      }, hideHeader ? null : /*#__PURE__*/_react.default.createElement("div", {
        className: "header carousel-header"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        className: "carousel-left-button carousel-button",
        disabled: activeItinerary === 0,
        onClick: this._onLeftClick
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "arrow-left"
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "text-center carousel-header-text"
      }, activeItinerary + 1, " of ", itineraries.length), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        disabled: activeItinerary === itineraries.length - 1,
        className: "pull-right carousel-right-button carousel-button",
        onClick: this._onRightClick
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "arrow-right"
      }))), /*#__PURE__*/_react.default.createElement(_reactSwipeableViews.default, {
        index: activeItinerary,
        onChangeIndex: this._onSwipe
      }, views));
    }
  }]);

  return ItineraryCarousel;
}(_react.Component); // connect to the redux store


_defineProperty(ItineraryCarousel, "propTypes", {
  itineraries: _propTypes.default.array,
  pending: _propTypes.default.number,
  activeItinerary: _propTypes.default.number,
  hideHeader: _propTypes.default.bool,
  itineraryClass: _propTypes.default.func,
  onClick: _propTypes.default.func,
  setActiveItinerary: _propTypes.default.func,
  setActiveLeg: _propTypes.default.func,
  setActiveStep: _propTypes.default.func,
  expanded: _propTypes.default.bool,
  companies: _propTypes.default.string
});

_defineProperty(ItineraryCarousel, "defaultProps", {
  itineraryClass: _defaultItinerary.default
});

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var activeSearch = (0, _state.getActiveSearch)(state.otp);
  var itineraries = (0, _state.getActiveItineraries)(state.otp);
  return {
    itineraries: itineraries,
    pending: activeSearch && activeSearch.pending,
    activeItinerary: activeSearch && activeSearch.activeItinerary,
    activeLeg: activeSearch && activeSearch.activeLeg,
    activeStep: activeSearch && activeSearch.activeStep,
    companies: state.otp.currentQuery.companies,
    timeFormat: _coreUtils.default.time.getTimeFormat(state.otp.config),
    user: state.user.loggedInUser
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    setActiveItinerary: function setActiveItinerary(index) {
      dispatch((0, _narrative.setActiveItinerary)({
        index: index
      }));
    },
    setActiveLeg: function setActiveLeg(index, leg) {
      dispatch((0, _narrative.setActiveLeg)({
        index: index,
        leg: leg
      }));
    },
    setActiveStep: function setActiveStep(index, step) {
      dispatch((0, _narrative.setActiveStep)({
        index: index,
        step: step
      }));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ItineraryCarousel);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=itinerary-carousel.js