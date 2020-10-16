"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LineItineraryContainer = void 0;

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _connectedItineraryBody = _interopRequireDefault(require("./connected-itinerary-body"));

var _itinSummary = _interopRequireDefault(require("./itin-summary"));

var _narrativeItinerary = _interopRequireDefault(require("../narrative-itinerary"));

var _simpleRealtimeAnnotation = _interopRequireDefault(require("../simple-realtime-annotation"));

var _linkButton = _interopRequireDefault(require("../../user/link-button"));

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

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin-bottom: 20px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _coreUtils$itinerary = _coreUtils.default.itinerary,
    getLegModeLabel = _coreUtils$itinerary.getLegModeLabel,
    getTimeZoneOffset = _coreUtils$itinerary.getTimeZoneOffset,
    isTransit = _coreUtils$itinerary.isTransit;

var LineItineraryContainer = _styledComponents.default.div(_templateObject());

exports.LineItineraryContainer = LineItineraryContainer;

var LineItinerary = /*#__PURE__*/function (_NarrativeItinerary) {
  _inherits(LineItinerary, _NarrativeItinerary);

  var _super = _createSuper(LineItinerary);

  function LineItinerary() {
    _classCallCheck(this, LineItinerary);

    return _super.apply(this, arguments);
  }

  _createClass(LineItinerary, [{
    key: "_headerText",
    value: function _headerText() {
      var itinerary = this.props.itinerary;
      return itinerary.summary || this._getSummary(itinerary);
    }
  }, {
    key: "_getSummary",
    value: function _getSummary(itinerary) {
      var summary = '';
      var transitModes = [];
      itinerary.legs.forEach(function (leg, index) {
        if (isTransit(leg.mode)) {
          var modeStr = getLegModeLabel(leg);
          if (transitModes.indexOf(modeStr) === -1) transitModes.push(modeStr);
        }
      }); // check for access mode

      if (!isTransit(itinerary.legs[0].mode)) {
        summary += getLegModeLabel(itinerary.legs[0]);
      } // append transit modes, if applicable


      if (transitModes.length > 0) {
        summary += ' to ' + transitModes.join(', ');
      }

      return summary;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          companies = _this$props.companies,
          expanded = _this$props.expanded,
          itinerary = _this$props.itinerary,
          itineraryFooter = _this$props.itineraryFooter,
          LegIcon = _this$props.LegIcon,
          onClick = _this$props.onClick,
          setActiveLeg = _this$props.setActiveLeg,
          showRealtimeAnnotation = _this$props.showRealtimeAnnotation,
          timeFormat = _this$props.timeFormat,
          user = _this$props.user;

      if (!itinerary) {
        return /*#__PURE__*/_react.default.createElement("div", null, "No Itinerary!");
      }

      var timeOptions = {
        format: timeFormat,
        offset: getTimeZoneOffset(itinerary)
      };
      return /*#__PURE__*/_react.default.createElement(LineItineraryContainer, {
        className: "line-itin"
      }, /*#__PURE__*/_react.default.createElement(_itinSummary.default, {
        companies: companies,
        itinerary: itinerary,
        LegIcon: LegIcon,
        onClick: onClick,
        timeOptions: timeOptions
      }), user && /*#__PURE__*/_react.default.createElement("span", {
        className: "pull-right"
      }, /*#__PURE__*/_react.default.createElement(_linkButton.default, {
        to: "/savetrip"
      }, "Save this option")), showRealtimeAnnotation && /*#__PURE__*/_react.default.createElement(_simpleRealtimeAnnotation.default, null), active || expanded ? /*#__PURE__*/_react.default.createElement(_connectedItineraryBody.default, {
        itinerary: itinerary,
        LegIcon: LegIcon // timeOptions={timeOptions}
        // Don't use setActiveLeg as an import
        // (will cause error when clicking on itinerary suymmary).
        // Use the one passed by NarrativeItineraries instead.
        ,
        setActiveLeg: setActiveLeg,
        timeOptions: timeOptions
      }) : null, itineraryFooter);
    }
  }]);

  return LineItinerary;
}(_narrativeItinerary.default);

exports.default = LineItinerary;

//# sourceMappingURL=line-itinerary.js