"use strict";

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _locationField = _interopRequireDefault(require("@opentripplanner/location-field"));

var _styled = require("@opentripplanner/location-field/lib/styled");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _map = require("../../actions/map");

var _location = require("../../actions/location");

var _api = require("../../actions/api");

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n\n  ", " {\n    display: table-cell;\n    vertical-align: middle;\n    width: 1%;\n  }\n\n  ", " {\n    display: table;\n    padding: 6px 12px;\n    width: 100%;\n  }\n\n  ", " {\n    display: table-cell;\n    padding: 6px 12px;\n    width: 100%;\n  }\n\n  ", " {\n    width: 100%;\n  }\n\n  ", " {\n    display: table-cell;\n    vertical-align: middle;\n    width: 1%;\n  }\n\n  ", " {\n    text-decoration: none;\n  }\n\n  ", ":hover {\n    color: #333;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledIntermediatePlace = (0, _styledComponents.default)(_locationField.default)(_templateObject(), _styled.DropdownContainer, _styled.FormGroup, _styled.Input, _styled.InputGroup, _styled.InputGroupAddon, _styled.MenuItemA, _styled.MenuItemA);
/**
 * Component that leverages LocationField to allow selecting an intermediate
 * place (e.g., stopover on the way from origin to the destination).
 * TODO: move this to otp-ui?
 */

var IntermediatePlaceField = /*#__PURE__*/function (_Component) {
  _inherits(IntermediatePlaceField, _Component);

  var _super = _createSuper(IntermediatePlaceField);

  function IntermediatePlaceField() {
    var _this;

    _classCallCheck(this, IntermediatePlaceField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_removeIntermediatePlace", function () {
      var _this$props = _this.props,
          index = _this$props.index,
          location = _this$props.location,
          onLocationCleared = _this$props.onLocationCleared;
      onLocationCleared && onLocationCleared({
        location: location,
        index: index
      });
    });

    return _this;
  }

  _createClass(IntermediatePlaceField, [{
    key: "render",
    value: function render() {
      var index = this.props.index;
      return /*#__PURE__*/_react.default.createElement(StyledIntermediatePlace, _extends({}, this.props, {
        locationType: "intermediate-place-".concat(index),
        clearLocation: this._removeIntermediatePlace
      }));
    }
  }]);

  return IntermediatePlaceField;
}(_react.Component); // connect to redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _state$otp = state.otp,
      config = _state$otp.config,
      location = _state$otp.location,
      transitIndex = _state$otp.transitIndex,
      user = _state$otp.user;
  var currentPosition = location.currentPosition,
      nearbyStops = location.nearbyStops,
      sessionSearches = location.sessionSearches;
  return {
    currentPosition: currentPosition,
    geocoderConfig: config.geocoder,
    nearbyStops: nearbyStops,
    sessionSearches: sessionSearches,
    showUserSettings: (0, _state.getShowUserSettings)(state.otp),
    stopsIndex: transitIndex.stops,
    userLocationsAndRecentPlaces: [].concat(_toConsumableArray(user.locations), _toConsumableArray(user.recentPlaces))
  };
};

var mapDispatchToProps = {
  addLocationSearch: _location.addLocationSearch,
  findNearbyStops: _api.findNearbyStops,
  getCurrentPosition: _location.getCurrentPosition,
  clearLocation: _map.clearLocation
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(IntermediatePlaceField);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=intermediate-place-field.js