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

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactLeaflet = require("react-leaflet");

var _leaflet = require("leaflet");

var _setFromTo = _interopRequireDefault(require("./set-from-to"));

var _map = require("../../actions/map");

var _zipcar = require("../../actions/zipcar");

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

var zipcarIcon = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.09 120.1"><defs><style>.cls-1{fill:#59ad46;}.cls-2{fill:#fff;}.cls-3{fill:#5c5d5f;}</style></defs><title>zipcar-icon</title><path class="cls-1" d="M246.37,396.78a60,60,0,1,1,60,60,60.05,60.05,0,0,1-60-60" transform="translate(-246.37 -336.74)"/><path class="cls-2" d="M363.6,418.66q0.47-1.28.9-2.58H314.16l2.46-3.15h34.87a1.27,1.27,0,1,0,0-2.53H318.6l2.42-3.09h17.74a1.31,1.31,0,0,0,0-2.58H291.69l28.85-37.59H273.06v10.27h25.28l-26.48,34.34-5.45,6.9h21a12,12,0,0,1,22.29,0H363.6" transform="translate(-246.37 -336.74)"/><path class="cls-3" d="M307.84,423.3a9.27,9.27,0,1,1-9.27-9.27,9.27,9.27,0,0,1,9.27,9.27" transform="translate(-246.37 -336.74)"/></svg>';

var ZipcarOverlay = /*#__PURE__*/function (_MapLayer) {
  _inherits(ZipcarOverlay, _MapLayer);

  var _super = _createSuper(ZipcarOverlay);

  function ZipcarOverlay() {
    var _this;

    _classCallCheck(this, ZipcarOverlay);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onOverlayAdded", function () {
      _this._startRefreshing();
    });

    _defineProperty(_assertThisInitialized(_this), "onOverlayRemoved", function () {
      _this._stopRefreshing();
    });

    return _this;
  }

  _createClass(ZipcarOverlay, [{
    key: "_startRefreshing",
    value: function _startRefreshing() {
      var _this2 = this;

      // ititial station retrieval
      this.props.zipcarLocationsQuery(this.props.api); // set up timer to refresh stations periodically

      this._refreshTimer = setInterval(function () {
        _this2.props.zipcarLocationsQuery(_this2.props.api);
      }, 30000); // defaults to every 30 sec. TODO: make this configurable?*/
    }
  }, {
    key: "_stopRefreshing",
    value: function _stopRefreshing() {
      if (this._refreshTimer) clearInterval(this._refreshTimer);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.registerOverlay(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._stopRefreshing();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.visible && this.props.visible) {
        this._startRefreshing();
      } else if (prevProps.visible && !this.props.visible) {
        this._stopRefreshing();
      }
    }
  }, {
    key: "createLeafletElement",
    value: function createLeafletElement() {}
  }, {
    key: "updateLeafletElement",
    value: function updateLeafletElement() {}
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var locations = this.props.locations;
      if (!locations || locations.length === 0) return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null);
      var markerIcon = (0, _leaflet.divIcon)({
        iconSize: [24, 24],
        popupAnchor: [0, -12],
        html: zipcarIcon,
        className: ''
      });
      var bulletIconStyle = {
        color: 'gray',
        fontSize: 12,
        width: 15
      };
      return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null, locations.map(function (location) {
        return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Marker, {
          icon: markerIcon,
          key: location.location_id,
          position: [location.coordinates.lat, location.coordinates.lng]
        }, /*#__PURE__*/_react.default.createElement(_reactLeaflet.Popup, null, /*#__PURE__*/_react.default.createElement("div", {
          className: "map-overlay-popup"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "popup-title"
        }, "Zipcar Location"), /*#__PURE__*/_react.default.createElement("div", {
          className: "popup-row"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "fa fa-map-marker",
          style: bulletIconStyle
        }), " ", location.display_name), /*#__PURE__*/_react.default.createElement("div", {
          className: "popup-row"
        }, /*#__PURE__*/_react.default.createElement("i", {
          className: "fa fa-car",
          style: bulletIconStyle
        }), " ", location.num_vehicles, " Vehicles"), /*#__PURE__*/_react.default.createElement("div", {
          className: "popup-row"
        }, /*#__PURE__*/_react.default.createElement(_setFromTo.default, {
          map: _this3.props.leaflet.map,
          location: {
            lat: location.coordinates.lat,
            lon: location.coordinates.lng,
            name: location.display_name
          },
          setLocation: _this3.props.setLocation
        })))));
      }));
    }
  }]);

  return ZipcarOverlay;
}(_reactLeaflet.MapLayer); // connect to the redux store


_defineProperty(ZipcarOverlay, "propTypes", {
  api: _propTypes.default.string,
  locations: _propTypes.default.array,
  zipcarLocationsQuery: _propTypes.default.func,
  setLocation: _propTypes.default.func
});

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    locations: state.otp.overlay.zipcar && state.otp.overlay.zipcar.locations
  };
};

var mapDispatchToProps = {
  setLocation: _map.setLocation,
  zipcarLocationsQuery: _zipcar.zipcarLocationsQuery
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactLeaflet.withLeaflet)(ZipcarOverlay));

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=zipcar-overlay.js