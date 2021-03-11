"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _styledComponents = _interopRequireDefault(require("styled-components"));

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

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-size: 80%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var SmallInfoText = _styledComponents.default.p(_templateObject());

var TripNotificationsPane = /*#__PURE__*/function (_Component) {
  _inherits(TripNotificationsPane, _Component);

  var _super = _createSuper(TripNotificationsPane);

  function TripNotificationsPane() {
    var _this;

    _classCallCheck(this, TripNotificationsPane);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_handleIsActiveChange", function (e) {
      var onMonitoredTripChange = _this.props.onMonitoredTripChange;
      onMonitoredTripChange({
        isActive: e.target.value === 'true'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleExcludeFedHolidaysChange", function (e) {
      var onMonitoredTripChange = _this.props.onMonitoredTripChange;
      onMonitoredTripChange({
        excludeFederalHolidays: e.target.value === 'true'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleLeadTimeChange", function (e) {
      var onMonitoredTripChange = _this.props.onMonitoredTripChange;
      onMonitoredTripChange({
        leadTimeInMinutes: e.target.value
      });
    });

    return _this;
  }

  _createClass(TripNotificationsPane, [{
    key: "render",
    value: function render() {
      var monitoredTrip = this.props.monitoredTrip;
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Would you like to receive notifications about this trip?"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Radio, {
        checked: monitoredTrip.isActive,
        name: "isActive",
        onChange: this._handleIsActiveChange,
        value: true
      }, "$_yes_$"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Radio, {
        checked: !monitoredTrip.isActive,
        name: "isActive",
        onChange: this._handleIsActiveChange,
        value: false
      }, "$_no_$"), /*#__PURE__*/_react.default.createElement(SmallInfoText, null, "Note: you will be notified by [email|SMS]. This can be changed in your account settings once the trip has been saved.")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "When would you like to receive notifications about delays or disruptions to your trip?"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Check for delays or disruptions:"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, {
        componentClass: "select",
        onChange: this._handleLeadTimeChange,
        placeholder: "select",
        value: monitoredTrip.leadTimeInMinutes
      }, /*#__PURE__*/_react.default.createElement("Option", {
        value: 15
      }, "15 min. prior"), /*#__PURE__*/_react.default.createElement("Option", {
        value: 30
      }, "30 min. prior (default)"), /*#__PURE__*/_react.default.createElement("Option", {
        value: 45
      }, "45 min. prior"), /*#__PURE__*/_react.default.createElement("Option", {
        value: 60
      }, "60 min. prior"))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Alert, {
        bsStyle: "warning"
      }, "Under construction!", /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Notify me if:"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Checkbox, null, "A different route or transfer point is recommended"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Checkbox, null, "There is an alert for a route or stop that is part of my journey"), "Your arrival or departure time changes by more than:", /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, {
        componentClass: "select",
        defaultValue: 5,
        placeholder: "select"
      }, /*#__PURE__*/_react.default.createElement("Option", {
        value: 5
      }, "5 min. (default)"), /*#__PURE__*/_react.default.createElement("Option", {
        value: 10
      }, "10 min."), /*#__PURE__*/_react.default.createElement("Option", {
        value: 15
      }, "15 min."))))));
    }
  }]);

  return TripNotificationsPane;
}(_react.Component);

var _default = TripNotificationsPane;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trip-notifications-pane.js