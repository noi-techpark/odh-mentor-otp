"use strict";

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.split");

var _baseMap = _interopRequireDefault(require("@opentripplanner/base-map"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _api = require("../../actions/api");

var _config = require("../../actions/config");

var _map = require("../../actions/map");

var _boundsUpdatingOverlay = _interopRequireDefault(require("./bounds-updating-overlay"));

var _connectedEndpointsOverlay = _interopRequireDefault(require("./connected-endpoints-overlay"));

var _connectedParkAndRideOverlay = _interopRequireDefault(require("./connected-park-and-ride-overlay"));

var _connectedRouteViewerOverlay = _interopRequireDefault(require("./connected-route-viewer-overlay"));

var _connectedStopViewerOverlay = _interopRequireDefault(require("./connected-stop-viewer-overlay"));

var _connectedStopsOverlay = _interopRequireDefault(require("./connected-stops-overlay"));

var _connectedTransitiveOverlay = _interopRequireDefault(require("./connected-transitive-overlay"));

var _connectedTripViewerOverlay = _interopRequireDefault(require("./connected-trip-viewer-overlay"));

var _connectedVehicleRentalOverlay = _interopRequireDefault(require("./connected-vehicle-rental-overlay"));

var _elevationPointMarker = _interopRequireDefault(require("./elevation-point-marker"));

var _pointPopup = _interopRequireDefault(require("./point-popup"));

var _tileOverlay = _interopRequireDefault(require("./tile-overlay"));

var _zipcarOverlay = _interopRequireDefault(require("./zipcar-overlay"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

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

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  height: 100%;\n  width: 100%;\n\n  .map {\n    height: 100%;\n    width: 100%;\n  }\n\n  * {\n    box-sizing: unset;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var MapContainer = _styledComponents.default.div(_templateObject());

var DefaultMap = /*#__PURE__*/function (_Component) {
  _inherits(DefaultMap, _Component);

  var _super = _createSuper(DefaultMap);

  function DefaultMap() {
    var _this;

    _classCallCheck(this, DefaultMap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_handleQueryChange", function (oldQuery, newQuery) {
      var overlays = _this.props.overlays;

      if (overlays && oldQuery.mode) {
        // Determine any added/removed modes
        var oldModes = oldQuery.mode.split(',');
        var newModes = newQuery.mode.split(',');
        var removed = oldModes.filter(function (m) {
          return !newModes.includes(m);
        });
        var added = newModes.filter(function (m) {
          return !oldModes.includes(m);
        });
        var overlayVisibility = {};

        var _iterator = _createForOfIteratorHelper(overlays),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var oConfig = _step.value;
            if (!oConfig.modes || oConfig.modes.length !== 1) continue; // TODO: support multi-mode overlays

            var overlayMode = oConfig.modes[0];

            if ((overlayMode === 'CAR_RENT' || overlayMode === 'CAR_HAIL' || overlayMode === 'MICROMOBILITY_RENT') && oConfig.companies) {
              // Special handling for company-based mode overlays (e.g. carshare, car-hail)
              var overlayCompany = oConfig.companies[0]; // TODO: handle multi-company overlays

              if (added.includes(overlayMode)) {
                // Company-based mode was just selected; enable overlay iff overlay's company is active
                if (newQuery.companies.includes(overlayCompany)) overlayVisibility[oConfig.name] = true;
              } else if (removed.includes(overlayMode)) {
                // Company-based mode was just deselected; disable overlay (regardless of company)
                overlayVisibility[oConfig.name] = false;
              } else if (newModes.includes(overlayMode) && oldQuery.companies !== newQuery.companies) {
                // Company-based mode remains selected but companies change
                overlayVisibility[oConfig.name] = newQuery.companies.includes(overlayCompany);
              }
            } else {
              // Default handling for other modes
              if (added.includes(overlayMode)) overlayVisibility[oConfig.name] = true;
              if (removed.includes(overlayMode)) overlayVisibility[oConfig.name] = false;
            }
          } // Only trigger update action if there are overlays to update.

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (Object.keys(overlayVisibility).length > 0) {
          _this.props.updateOverlayVisibility(overlayVisibility);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMapClick", function (e) {
      _this.props.setMapPopupLocationAndGeocode(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onPopupClosed", function () {
      _this.props.setMapPopupLocation({
        location: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSetLocationFromPopup", function (payload) {
      var _this$props = _this.props,
          setLocation = _this$props.setLocation,
          setMapPopupLocation = _this$props.setMapPopupLocation;
      setMapPopupLocation({
        location: null
      });
      setLocation(payload);
    });

    return _this;
  }

  _createClass(DefaultMap, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Check if any overlays should be toggled due to mode change
      this._handleQueryChange(prevProps.query, this.props.query);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          bikeRentalQuery = _this$props2.bikeRentalQuery,
          bikeRentalStations = _this$props2.bikeRentalStations,
          carRentalQuery = _this$props2.carRentalQuery,
          carRentalStations = _this$props2.carRentalStations,
          mapConfig = _this$props2.mapConfig,
          mapPopupLocation = _this$props2.mapPopupLocation,
          vehicleRentalQuery = _this$props2.vehicleRentalQuery,
          vehicleRentalStations = _this$props2.vehicleRentalStations;
      var center = mapConfig && mapConfig.initLat && mapConfig.initLon ? [mapConfig.initLat, mapConfig.initLon] : null;
      var popup = mapPopupLocation && {
        contents: /*#__PURE__*/_react.default.createElement(_pointPopup.default, {
          mapPopupLocation: mapPopupLocation,
          onSetLocationFromPopup: this.onSetLocationFromPopup
        }),
        location: [mapPopupLocation.lat, mapPopupLocation.lon]
      };
      return /*#__PURE__*/_react.default.createElement(MapContainer, null, /*#__PURE__*/_react.default.createElement(_baseMap.default, {
        baseLayers: mapConfig.baseLayers,
        center: center,
        maxZoom: mapConfig.maxZoom,
        onClick: this.onMapClick,
        popup: popup,
        onPopupClosed: this.onPopupClosed,
        zoom: mapConfig.initZoom || 13
      }, /*#__PURE__*/_react.default.createElement(_boundsUpdatingOverlay.default, null), /*#__PURE__*/_react.default.createElement(_connectedEndpointsOverlay.default, null), /*#__PURE__*/_react.default.createElement(_connectedRouteViewerOverlay.default, null), /*#__PURE__*/_react.default.createElement(_connectedStopViewerOverlay.default, null), /*#__PURE__*/_react.default.createElement(_connectedTransitiveOverlay.default, null), /*#__PURE__*/_react.default.createElement(_connectedTripViewerOverlay.default, null), /*#__PURE__*/_react.default.createElement(_elevationPointMarker.default, null), mapConfig.overlays && mapConfig.overlays.map(function (overlayConfig, k) {
        switch (overlayConfig.type) {
          case 'bike-rental':
            return /*#__PURE__*/_react.default.createElement(_connectedVehicleRentalOverlay.default, _extends({
              key: k
            }, overlayConfig, {
              refreshVehicles: bikeRentalQuery,
              stations: bikeRentalStations
            }));

          case 'car-rental':
            return /*#__PURE__*/_react.default.createElement(_connectedVehicleRentalOverlay.default, _extends({
              key: k
            }, overlayConfig, {
              refreshVehicles: carRentalQuery,
              stations: carRentalStations
            }));

          case 'park-and-ride':
            return /*#__PURE__*/_react.default.createElement(_connectedParkAndRideOverlay.default, _extends({
              key: k
            }, overlayConfig));

          case 'stops':
            return /*#__PURE__*/_react.default.createElement(_connectedStopsOverlay.default, _extends({
              key: k
            }, overlayConfig));

          case 'tile':
            return /*#__PURE__*/_react.default.createElement(_tileOverlay.default, _extends({
              key: k
            }, overlayConfig));

          case 'micromobility-rental':
            return /*#__PURE__*/_react.default.createElement(_connectedVehicleRentalOverlay.default, _extends({
              key: k
            }, overlayConfig, {
              refreshVehicles: vehicleRentalQuery,
              stations: vehicleRentalStations
            }));

          case 'zipcar':
            return /*#__PURE__*/_react.default.createElement(_zipcarOverlay.default, _extends({
              key: k
            }, overlayConfig));

          default:
            return null;
        }
      })));
    }
  }]);

  return DefaultMap;
}(_react.Component); // connect to the redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  var overlays = state.otp.config.map && state.otp.config.map.overlays ? state.otp.config.map.overlays : [];
  return {
    bikeRentalStations: state.otp.overlay.bikeRental.stations,
    carRentalStations: state.otp.overlay.carRental.stations,
    mapConfig: state.otp.config.map,
    mapPopupLocation: state.otp.ui.mapPopupLocation,
    overlays: overlays,
    query: state.otp.currentQuery,
    vehicleRentalStations: state.otp.overlay.vehicleRental.stations
  };
};

var mapDispatchToProps = {
  bikeRentalQuery: _api.bikeRentalQuery,
  carRentalQuery: _api.carRentalQuery,
  setLocation: _map.setLocation,
  setMapPopupLocation: _map.setMapPopupLocation,
  setMapPopupLocationAndGeocode: _map.setMapPopupLocationAndGeocode,
  updateOverlayVisibility: _config.updateOverlayVisibility,
  vehicleRentalQuery: _api.vehicleRentalQuery
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DefaultMap);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=default-map.js