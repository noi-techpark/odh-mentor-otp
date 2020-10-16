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

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _form = require("../../actions/form");

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
 * This component contains the `Remember/Forget my trip options` and `Restore defaults` commands
 * that let the user save the selected trip settings such as mode choices,
 * walk/bike distance and speed, and trip optimization flags.
 * (The code below was previously embedded inside the `SettingsSelectorPanel` component.)
 */
var UserTripSettings = /*#__PURE__*/function (_Component) {
  _inherits(UserTripSettings, _Component);

  var _super = _createSuper(UserTripSettings);

  function UserTripSettings() {
    var _this;

    _classCallCheck(this, UserTripSettings);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_toggleStoredSettings", function () {
      var options = _coreUtils.default.query.getTripOptionsFromQuery(_this.props.query); // If user defaults are set, clear them. Otherwise, store them.


      if (_this.props.defaults) _this.props.clearDefaultSettings();else _this.props.storeDefaultSettings(options);
    });

    return _this;
  }

  _createClass(UserTripSettings, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          defaults = _this$props.defaults,
          query = _this$props.query,
          resetForm = _this$props.resetForm; // Do not permit remembering trip options if they do not differ from the
      // defaults and nothing has been stored

      var queryIsDefault = !_coreUtils.default.query.isNotDefaultQuery(query, config);
      var rememberIsDisabled = queryIsDefault && !defaults;
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          marginBottom: '5px'
        },
        className: "store-settings pull-right"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsStyle: "link",
        bsSize: "xsmall",
        disabled: rememberIsDisabled,
        onClick: this._toggleStoredSettings
      }, defaults ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "times"
    }), " Dimentica impostazioni") : /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "lock"
    }), " Ricorda opzioni di viaggio")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsStyle: "link",
        bsSize: "xsmall",
        disabled: queryIsDefault && !defaults,
        onClick: resetForm
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "undo"
    }), ' ', "Ripristina le", defaults ? ' mie' : '', " impostazioni"));
    }
  }]);

  return UserTripSettings;
}(_react.Component); // connect to redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _state$otp = state.otp,
      config = _state$otp.config,
      currentQuery = _state$otp.currentQuery,
      user = _state$otp.user;
  var defaults = user.defaults;
  return {
    config: config,
    defaults: defaults,
    query: currentQuery
  };
};

var mapDispatchToProps = {
  clearDefaultSettings: _form.clearDefaultSettings,
  resetForm: _form.resetForm,
  storeDefaultSettings: _form.storeDefaultSettings
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserTripSettings);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=user-trip-settings.js
