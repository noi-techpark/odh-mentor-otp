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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

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

/**
 * User terms of use pane.
 */
var TermsOfUsePane = /*#__PURE__*/function (_Component) {
  _inherits(TermsOfUsePane, _Component);

  var _super = _createSuper(TermsOfUsePane);

  function TermsOfUsePane() {
    var _this;

    _classCallCheck(this, TermsOfUsePane);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_handleCheckHistoryChange", function (e) {
      var onUserDataChange = _this.props.onUserDataChange;
      onUserDataChange({
        storeTripHistory: e.target.checked
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleCheckTermsChange", function (e) {
      var onUserDataChange = _this.props.onUserDataChange;
      onUserDataChange({
        hasConsentedToTerms: e.target.checked
      });
    });

    return _this;
  }

  _createClass(TermsOfUsePane, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          disableCheckTerms = _this$props.disableCheckTerms,
          userData = _this$props.userData;
      var hasConsentedToTerms = userData.hasConsentedToTerms,
          storeTripHistory = userData.storeTripHistory;
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "You must agree to the terms of service to continue."), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Checkbox, {
        checked: hasConsentedToTerms,
        disabled: disableCheckTerms,
        onChange: disableCheckTerms ? null : this._handleCheckTermsChange
      }, "I have read and consent to the ", /*#__PURE__*/_react.default.createElement("a", {
        href: "/#/terms-of-service"
      }, "Terms of Service"), " for using the Trip Planner.")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Checkbox, {
        checked: storeTripHistory,
        onChange: this._handleCheckHistoryChange
      }, "Optional: I consent to the Trip Planner storing my historical planned trips in order to improve transit services in my area. ", /*#__PURE__*/_react.default.createElement("a", {
        href: "/#/terms-of-storage"
      }, "More info..."))));
    }
  }]);

  return TermsOfUsePane;
}(_react.Component);

_defineProperty(TermsOfUsePane, "propTypes", {
  disableCheckTerms: _propTypes.default.bool,
  onUserDataChange: _propTypes.default.func.isRequired,
  userData: _propTypes.default.object.isRequired
});

var _default = TermsOfUsePane;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=terms-of-use-pane.js