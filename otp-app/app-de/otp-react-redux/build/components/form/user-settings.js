"use strict";

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.array.find");

var _moment = _interopRequireDefault(require("moment"));

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _api = require("../../actions/api");

var _form = require("../../actions/form");

var _map = require("../../actions/map");

var _ui = require("../../actions/ui");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var _coreUtils$map = _coreUtils.default.map,
    getDetailText = _coreUtils$map.getDetailText,
    formatStoredPlaceName = _coreUtils$map.formatStoredPlaceName,
    matchLatLon = _coreUtils$map.matchLatLon;
var summarizeQuery = _coreUtils.default.query.summarizeQuery;
var BUTTON_WIDTH = 40;

var UserSettings = /*#__PURE__*/function (_Component) {
  _inherits(UserSettings, _Component);

  var _super = _createSuper(UserSettings);

  function UserSettings() {
    var _this;

    _classCallCheck(this, UserSettings);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_disableTracking", function () {
      var _this$props = _this.props,
          user = _this$props.user,
          toggleTracking = _this$props.toggleTracking;
      if (!user.trackRecent) return;
      var hasRecents = user.recentPlaces.length > 0 || user.recentSearches.length > 0; // If user has recents and does not confirm deletion, return without doing
      // anything.

      if (hasRecents && !window.confirm('You have recent searches and/or places stored. Disabling storage of recent places/searches will remove these items. Continue?')) {
        return;
      } // Disable tracking if we reach this statement.


      toggleTracking(false);
    });

    _defineProperty(_assertThisInitialized(_this), "_enableTracking", function () {
      return !_this.props.user.trackRecent && _this.props.toggleTracking(true);
    });

    _defineProperty(_assertThisInitialized(_this), "_getLocations", function (user) {
      var locations = _toConsumableArray(user.locations);

      if (!locations.find(function (l) {
        return l.type === 'work';
      })) {
        locations.push({
          id: 'work',
          type: 'work',
          icon: 'briefcase',
          name: 'aggiungi',
          blank: true
        });
      }

      if (!locations.find(function (l) {
        return l.type === 'home';
      })) {
        locations.push({
          id: 'home',
          type: 'home',
          icon: 'home',
          name: 'aggiungi',
          blank: true
        });
      }

      return locations;
    });

    return _this;
  }

  _createClass(UserSettings, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          storageDisclaimer = _this$props2.storageDisclaimer,
          user = _this$props2.user;
      var favoriteStops = user.favoriteStops,
          trackRecent = user.trackRecent,
          recentPlaces = user.recentPlaces,
          recentSearches = user.recentSearches; // Clone locations in order to prevent blank locations from seeping into the
      // app state/store.

      var locations = this._getLocations(user);

      var order = ['home', 'work', 'suggested', 'stop', 'recent'];
      var sortedLocations = locations.sort(function (a, b) {
        return order.indexOf(a.type) - order.indexOf(b.type);
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "user-settings"
      }, /*#__PURE__*/_react.default.createElement("ul", {
        style: {
          padding: 0
        }
      }, sortedLocations.map(function (location) {
        return /*#__PURE__*/_react.default.createElement(Place, _extends({
          key: location.id,
          location: location
        }, _this2.props));
      })), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
        className: "section-header"
      }, "Fermate preferite"), /*#__PURE__*/_react.default.createElement("ul", {
        style: {
          padding: 0
        }
      }, favoriteStops.length > 0 ? favoriteStops.map(function (location) {
        return /*#__PURE__*/_react.default.createElement(Place, _extends({
          key: location.id,
          location: location
        }, _this2.props));
      }) : /*#__PURE__*/_react.default.createElement("small", null, "Nessuna fermata preferita ")), trackRecent && recentPlaces.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
        className: "recent-places-container"
      }, /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
        className: "section-header"
      }, "Recent places"), /*#__PURE__*/_react.default.createElement("ul", {
        style: {
          padding: 0
        }
      }, recentPlaces.map(function (location) {
        return /*#__PURE__*/_react.default.createElement(Place, _extends({
          key: location.id,
          location: location
        }, _this2.props));
      }))), trackRecent && recentSearches.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
        className: "recent-searches-container"
      }, /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
        className: "section-header"
      }, "Recent searches"), /*#__PURE__*/_react.default.createElement("ul", {
        style: {
          padding: 0
        }
      }, recentSearches.sort(function (a, b) {
        return b.timestamp - a.timestamp;
      }).map(function (search) {
        return /*#__PURE__*/_react.default.createElement(RecentSearch, _extends({
          key: search.id,
          search: search
        }, _this2.props));
      }))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
        className: "remember-settings"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "section-header"
      }, "Le mie preferenze"), /*#__PURE__*/_react.default.createElement("small", null, "Ricordare ricerche recenti e luoghi?"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        onClick: this._enableTracking,
        className: trackRecent ? 'active' : '',
        bsSize: "xsmall",
        bsStyle: "link"
      }, "Sì"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        onClick: this._disableTracking,
        className: !trackRecent ? 'active' : '',
        bsSize: "xsmall",
        bsStyle: "link"
      }, "No")), storageDisclaimer && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
        className: "disclaimer"
      }, storageDisclaimer)));
    }
  }]);

  return UserSettings;
}(_react.Component);

var Place = /*#__PURE__*/function (_Component2) {
  _inherits(Place, _Component2);

  var _super2 = _createSuper(Place);

  function Place() {
    var _this3;

    _classCallCheck(this, Place);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this3), "_onSelect", function () {
      var _this3$props = _this3.props,
          location = _this3$props.location,
          query = _this3$props.query,
          setLocation = _this3$props.setLocation;

      if (location.blank) {
        window.alert("Enter origin/destination in the form (or set via map click) and click the resulting marker to set as ".concat(location.type, " location."));
      } else {
        // If 'to' not set and 'from' does not match location, set as 'to'.
        if (!query.to && (!query.from || !matchLatLon(location, query.from))) {
          setLocation({
            locationType: 'to',
            location: location
          });
        } else if ( // Vice versa for setting as 'from'.
        !query.from && !matchLatLon(location, query.to)) {
          setLocation({
            locationType: 'from',
            location: location
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this3), "_onView", function () {
      var _this3$props2 = _this3.props,
          location = _this3$props2.location,
          setViewedStop = _this3$props2.setViewedStop;
      setViewedStop({
        stopId: location.id
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "_onForget", function () {
      var _this3$props3 = _this3.props,
          forgetPlace = _this3$props3.forgetPlace,
          forgetStop = _this3$props3.forgetStop,
          location = _this3$props3.location;
      if (location.type === 'stop') forgetStop(location.id);else forgetPlace(location.id);
    });

    _defineProperty(_assertThisInitialized(_this3), "_isViewable", function () {
      return _this3.props.location.type === 'stop';
    });

    _defineProperty(_assertThisInitialized(_this3), "_isForgettable", function () {
      return ['stop', 'home', 'work', 'recent'].indexOf(_this3.props.location.type) !== -1;
    });

    return _this3;
  }

  _createClass(Place, [{
    key: "render",
    value: function render() {
      var location = this.props.location;
      var blank = location.blank,
          icon = location.icon;

      var showView = this._isViewable();

      var showForget = this._isForgettable() && !blank; // Determine how much to offset width of main button (based on visibility of
      // other buttons sharing the same line).

      var offset = 0;
      if (showView) offset += BUTTON_WIDTH;
      if (showForget) offset += BUTTON_WIDTH;
      return /*#__PURE__*/_react.default.createElement("li", {
        className: "place-item"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsStyle: "link",
        title: formatStoredPlaceName(location),
        className: "place-button",
        style: {
          width: "calc(100% - ".concat(offset, "px)")
        },
        onClick: this._onSelect
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "place-text"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: icon
      }), " ", formatStoredPlaceName(location, false)), /*#__PURE__*/_react.default.createElement("span", {
        className: "place-detail"
      }, getDetailText(location))), showView && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        onClick: this._onView,
        className: "place-view",
        bsSize: "xsmall",
        title: "View stop",
        style: {
          width: "".concat(BUTTON_WIDTH, "px")
        },
        bsStyle: "link"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "search"
      })), showForget && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        onClick: this._onForget,
        className: "place-clear",
        bsSize: "xsmall",
        style: {
          width: "".concat(BUTTON_WIDTH, "px")
        },
        bsStyle: "link"
      }, "Clear"));
    }
  }]);

  return Place;
}(_react.Component);

var RecentSearch = /*#__PURE__*/function (_Component3) {
  _inherits(RecentSearch, _Component3);

  var _super3 = _createSuper(RecentSearch);

  function RecentSearch() {
    var _this4;

    _classCallCheck(this, RecentSearch);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _super3.call.apply(_super3, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this4), "_onSelect", function () {
      var _this4$props = _this4.props,
          search = _this4$props.search,
          setQueryParam = _this4$props.setQueryParam; // Update query params and initiate search.

      setQueryParam(search.query, search.id);
    });

    _defineProperty(_assertThisInitialized(_this4), "_onForget", function () {
      return _this4.props.forgetSearch(_this4.props.search.id);
    });

    return _this4;
  }

  _createClass(RecentSearch, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          search = _this$props3.search,
          user = _this$props3.user;
      var query = search.query,
          timestamp = search.timestamp;
      var name = summarizeQuery(query, user.locations);
      return /*#__PURE__*/_react.default.createElement("li", {
        className: "place-item"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsStyle: "link",
        title: "".concat(name, " (").concat((0, _moment.default)(timestamp).fromNow(), ")"),
        style: {
          padding: '5px 0 0 0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textAlign: 'left',
          width: "calc(100% - ".concat(BUTTON_WIDTH, "px)")
        },
        onClick: this._onSelect
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "place-text"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "clock-o"
      }), " ", name, " "), /*#__PURE__*/_react.default.createElement("span", {
        className: "place-detail"
      }, (0, _moment.default)(timestamp).fromNow())), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        onClick: this._onForget,
        bsSize: "xsmall",
        style: {
          paddingTop: '6px',
          width: "".concat(BUTTON_WIDTH, "px")
        },
        bsStyle: "link"
      }, "Clear"));
    }
  }]);

  return RecentSearch;
}(_react.Component); // connect to redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    config: state.otp.config,
    currentPosition: state.otp.location.currentPosition,
    nearbyStops: state.otp.location.nearbyStops,
    query: state.otp.currentQuery,
    sessionSearches: state.otp.location.sessionSearches,
    stopsIndex: state.otp.transitIndex.stops,
    storageDisclaimer: state.otp.config.language.storageDisclaimer,
    user: state.otp.user
  };
};

var mapDispatchToProps = {
  forgetStop: _map.forgetStop,
  forgetPlace: _map.forgetPlace,
  forgetSearch: _api.forgetSearch,
  setLocation: _map.setLocation,
  setQueryParam: _form.setQueryParam,
  setViewedStop: _ui.setViewedStop,
  toggleTracking: _api.toggleTracking
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserSettings);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=user-settings.js