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

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var modeColors = {
  BICYCLE: '#E0C3E2',
  BUS: '#CAC3DF',
  CAR: '#E4CCCC',
  PARK: '#E4CCCC',
  RAIL: '#BDDAC0',
  WALK: '#DFC486'
};
var DEFAULT_COLOR = 'grey';

function getModeColor(mode) {
  if (!mode) return DEFAULT_COLOR;
  var color = modeColors[mode.toUpperCase()];
  if (typeof color === 'undefined') color = DEFAULT_COLOR;
  return color;
}

var ItinerarySummary = /*#__PURE__*/function (_Component) {
  _inherits(ItinerarySummary, _Component);

  var _super = _createSuper(ItinerarySummary);

  function ItinerarySummary() {
    _classCallCheck(this, ItinerarySummary);

    return _super.apply(this, arguments);
  }

  _createClass(ItinerarySummary, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          itinerary = _this$props.itinerary,
          LegIcon = _this$props.LegIcon;
      var blocks = [];
      itinerary.legs.forEach(function (leg, i) {
        // Skip mid-itinerary walk transfer legs
        if (i > 0 && i < itinerary.legs.length - 1 && !leg.transitLeg && itinerary.legs[i - 1].transitLeg && itinerary.legs[i + 1].transitLeg) {
          return null;
        } // Add the mode icon


        var title = leg.mode;

        if (leg.transitLeg) {
          title = leg.routeShortName ? "".concat(leg.routeShortName).concat(leg.routeLongName ? " - ".concat(leg.routeLongName) : '') : leg.routeLongName;
        }

        var style = {
          margin: '0px',
          padding: '3px',
          height: '24px',
          width: '24px',
          backgroundColor: getModeColor(leg.mode)
        };

        if (i === 0) {
          style.borderTopLeftRadius = '4px';
          style.borderBottomLeftRadius = '4px';
        }

        if (i === itinerary.legs.length - 1) {
          style.borderTopRightRadius = '4px';
          style.borderBottomRightRadius = '4px';
        }

        blocks.push( /*#__PURE__*/_react.default.createElement("div", {
          style: style,
          title: title,
          key: blocks.length,
          className: "summary-block mode-block"
        }, /*#__PURE__*/_react.default.createElement(LegIcon, {
          leg: leg
        })));
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "summary"
      }, blocks);
    }
  }]);

  return ItinerarySummary;
}(_react.Component);

exports.default = ItinerarySummary;

_defineProperty(ItinerarySummary, "propTypes", {
  itinerary: _propTypes.default.object,
  LegIcon: _propTypes.default.elementType.isRequired
});

module.exports = exports.default;

//# sourceMappingURL=itinerary-summary.js