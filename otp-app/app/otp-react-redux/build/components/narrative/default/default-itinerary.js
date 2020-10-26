"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _narrativeItinerary = _interopRequireDefault(require("../narrative-itinerary"));

var _connectedItineraryBody = _interopRequireDefault(require("../line-itin/connected-itinerary-body"));

var _itinerarySummary = _interopRequireDefault(require("./itinerary-summary"));

var _simpleRealtimeAnnotation = _interopRequireDefault(require("../simple-realtime-annotation"));

var _state = require("../../../util/state");

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

var _coreUtils$itinerary = _coreUtils.default.itinerary,
    isBicycle = _coreUtils$itinerary.isBicycle,
    isTransit = _coreUtils$itinerary.isTransit;
var _coreUtils$time = _coreUtils.default.time,
    formatDuration = _coreUtils$time.formatDuration,
    formatTime = _coreUtils$time.formatTime; // FIXME move to core utils

function getItineraryDescription(itinerary) {
  var primaryTransitDuration = 0;
  var mainMode = 'Walk';
  var transitMode;
  itinerary.legs.forEach(function (leg, i) {
    var duration = leg.duration,
        mode = leg.mode,
        rentedBike = leg.rentedBike;

    if (isTransit(mode) && duration > primaryTransitDuration) {
      // TODO: convert OTP's TRAM mode to the correct wording for Portland
      primaryTransitDuration = duration;
      transitMode = mode.toLowerCase();
    }

    if (isBicycle(mode)) mainMode = 'Bike';
    if (rentedBike) mainMode = 'Bikeshare';
    if (mode === 'CAR') mainMode = 'Drive';
  });
  var description = mainMode;
  if (transitMode) description += " to ".concat(transitMode);
  return description;
}

var ITINERARY_ATTRIBUTES = [{
  alias: 'best',
  id: 'duration',
  order: 0,
  render: function render(itinerary, options) {
    return formatDuration(itinerary.duration);
  }
}, {
  alias: 'departureTime',
  id: 'arrivalTime',
  order: 1,
  render: function render(itinerary, options) {
    if (options.isSelected) {
      if (options.selection === 'ARRIVALTIME') return formatTime(itinerary.endTime, options);else return formatTime(itinerary.startTime, options);
    }

    return /*#__PURE__*/_react.default.createElement("span", null, formatTime(itinerary.startTime, options), "\u2014", formatTime(itinerary.endTime, options));
  }
}, {
  id: 'cost',
  order: 2,
  render: function render(itinerary, options) {
    return (0, _state.getTotalFareAsString)(itinerary);
  }
}, {
  id: 'walkTime',
  order: 3,
  render: function render(itinerary, options) {
    var leg = itinerary.legs[0];
    var LegIcon = options.LegIcon;
    return (
      /*#__PURE__*/
      // FIXME: For CAR mode, walk time considers driving time.
      _react.default.createElement("span", null, formatDuration(itinerary.walkTime), ' ', /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: '20px',
          height: '20px',
          display: 'inline-block',
          paddingLeft: '2px',
          paddingBottom: '6px'
        }
      }, /*#__PURE__*/_react.default.createElement(LegIcon, {
        leg: leg,
        size: 5
      })))
    );
  }
}];

var DefaultItinerary = /*#__PURE__*/function (_NarrativeItinerary) {
  _inherits(DefaultItinerary, _NarrativeItinerary);

  var _super = _createSuper(DefaultItinerary);

  function DefaultItinerary() {
    var _this;

    _classCallCheck(this, DefaultItinerary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_onMouseEnter", function () {
      var _this$props = _this.props,
          active = _this$props.active,
          index = _this$props.index,
          setVisibleItinerary = _this$props.setVisibleItinerary,
          visibleItinerary = _this$props.visibleItinerary; // Set this itinerary as visible if not already visible.

      var visibleNotSet = visibleItinerary === null || visibleItinerary === undefined;
      var isVisible = visibleItinerary === index || active === index && visibleNotSet;

      if (typeof setVisibleItinerary === 'function' && !isVisible) {
        setVisibleItinerary({
          index: index
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onMouseLeave", function () {
      var _this$props2 = _this.props,
          index = _this$props2.index,
          setVisibleItinerary = _this$props2.setVisibleItinerary,
          visibleItinerary = _this$props2.visibleItinerary;

      if (typeof setVisibleItinerary === 'function' && visibleItinerary === index) {
        setVisibleItinerary({
          index: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_isSortingOnAttribute", function (attribute) {
      var sort = _this.props.sort;

      if (sort && sort.type) {
        var type = sort.type.toLowerCase();
        return attribute.id.toLowerCase() === type || attribute.alias && attribute.alias.toLowerCase() === type;
      }

      return false;
    });

    return _this;
  }

  _createClass(DefaultItinerary, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          active = _this$props3.active,
          expanded = _this$props3.expanded,
          itinerary = _this$props3.itinerary,
          LegIcon = _this$props3.LegIcon,
          showRealtimeAnnotation = _this$props3.showRealtimeAnnotation,
          timeFormat = _this$props3.timeFormat;
      var timeOptions = {
        format: timeFormat,
        offset: _coreUtils.default.itinerary.getTimeZoneOffset(itinerary)
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "option default-itin".concat(active ? ' active' : '').concat(expanded ? ' expanded' : ''),
        role: "presentation" // FIXME: Move style to css
        ,
        style: {
          borderLeft: active && !expanded ? '4px teal solid' : undefined,
          backgroundColor: expanded ? 'white' : undefined
        },
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave
      }, /*#__PURE__*/_react.default.createElement("button", {
        className: "header" // _onHeaderClick comes from super component (NarrativeItinerary).
        ,
        onClick: this._onHeaderClick
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "title"
      }, getItineraryDescription(itinerary)), /*#__PURE__*/_react.default.createElement("ul", {
        className: "list-unstyled itinerary-attributes"
      }, ITINERARY_ATTRIBUTES.sort(function (a, b) {
        var aSelected = _this2._isSortingOnAttribute(a);

        var bSelected = _this2._isSortingOnAttribute(b);

        if (aSelected) return -1;
        if (bSelected) return 1;else return a.order - b.order;
      }).map(function (attribute) {
        var isSelected = _this2._isSortingOnAttribute(attribute);

        var options = attribute.id === 'arrivalTime' ? timeOptions : {};

        if (isSelected) {
          options.isSelected = true;
          options.selection = _this2.props.sort.type;
        }

        options.LegIcon = LegIcon;
        return /*#__PURE__*/_react.default.createElement("li", {
          key: attribute.id,
          className: "".concat(attribute.id).concat(isSelected ? ' main' : '')
        }, attribute.render(itinerary, options));
      })), /*#__PURE__*/_react.default.createElement(_itinerarySummary.default, {
        itinerary: itinerary,
        LegIcon: LegIcon
      }), active && !expanded && /*#__PURE__*/_react.default.createElement("small", {
        style: {
          clear: 'both',
          textAlign: 'center',
          display: 'block',
          color: 'grey'
        }
      }, "click to view details")), active && expanded && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showRealtimeAnnotation && /*#__PURE__*/_react.default.createElement(_simpleRealtimeAnnotation.default, null), /*#__PURE__*/_react.default.createElement(_connectedItineraryBody.default, {
        timeOptions: timeOptions,
        itinerary: itinerary,
        LegIcon: LegIcon
      })));
    }
  }]);

  return DefaultItinerary;
}(_narrativeItinerary.default);

exports.default = DefaultItinerary;
module.exports = exports.default;

//# sourceMappingURL=default-itinerary.js