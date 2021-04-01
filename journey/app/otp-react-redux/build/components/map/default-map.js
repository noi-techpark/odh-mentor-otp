"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable.js");

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

var _parkingOverlay = _interopRequireDefault(require("./parking-overlay"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const MapContainer = _styledComponents.default.div`
  height: 100%;
  width: 100%;

  .map {
    height: 100%;
    width: 100%;
  }

  * {
    box-sizing: unset;
  }
`;

class DefaultMap extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_handleQueryChange", (oldQuery, newQuery) => {
      const {
        overlays
      } = this.props;

      if (overlays && oldQuery.mode) {
        // Determine any added/removed modes
        const oldModes = oldQuery.mode.split(',');
        const newModes = newQuery.mode.split(',');
        const removed = oldModes.filter(m => !newModes.includes(m));
        const added = newModes.filter(m => !oldModes.includes(m));
        const overlayVisibility = {};

        for (const oConfig of overlays) {
          if (!oConfig.modes || oConfig.modes.length !== 1) continue; // TODO: support multi-mode overlays

          const overlayMode = oConfig.modes[0];

          if ((overlayMode === 'CAR_RENT' || overlayMode === 'CAR_HAIL' || overlayMode === 'MICROMOBILITY_RENT') && oConfig.companies) {
            // Special handling for company-based mode overlays (e.g. carshare, car-hail)
            const overlayCompany = oConfig.companies[0]; // TODO: handle multi-company overlays

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


        if (Object.keys(overlayVisibility).length > 0) {
          this.props.updateOverlayVisibility(overlayVisibility);
        }
      }
    });

    _defineProperty(this, "onMapClick", e => {
      this.props.setMapPopupLocationAndGeocode(e);
    });

    _defineProperty(this, "onPopupClosed", () => {
      this.props.setMapPopupLocation({
        location: null
      });
    });

    _defineProperty(this, "onSetLocationFromPopup", payload => {
      const {
        setLocation,
        setMapPopupLocation
      } = this.props;
      setMapPopupLocation({
        location: null
      });
      setLocation(payload);
    });
  }

  componentDidUpdate(prevProps) {
    // Check if any overlays should be toggled due to mode change
    this._handleQueryChange(prevProps.query, this.props.query);
  }

  render() {
    const {
      bikeRentalQuery,
      bikeRentalStations,
      carRentalQuery,
      carRentalStations,
      mapConfig,
      mapPopupLocation,
      vehicleRentalQuery,
      vehicleRentalStations
    } = this.props;
    const center = mapConfig && mapConfig.initLat && mapConfig.initLon ? [mapConfig.initLat, mapConfig.initLon] : null;
    const popup = mapPopupLocation && {
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
    }, /*#__PURE__*/_react.default.createElement(_boundsUpdatingOverlay.default, null), /*#__PURE__*/_react.default.createElement(_connectedEndpointsOverlay.default, null), /*#__PURE__*/_react.default.createElement(_connectedRouteViewerOverlay.default, null), /*#__PURE__*/_react.default.createElement(_connectedStopViewerOverlay.default, null), /*#__PURE__*/_react.default.createElement(_connectedTransitiveOverlay.default, null), /*#__PURE__*/_react.default.createElement(_connectedTripViewerOverlay.default, null), /*#__PURE__*/_react.default.createElement(_elevationPointMarker.default, null), mapConfig.overlays && mapConfig.overlays.map((overlayConfig, k) => {
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

        case 'parking':
          return /*#__PURE__*/_react.default.createElement(_parkingOverlay.default, _extends({
            key: k
          }, overlayConfig));

        default:
          return null;
      }
    })));
  }

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  const overlays = state.otp.config.map && state.otp.config.map.overlays ? state.otp.config.map.overlays : [];
  return {
    bikeRentalStations: state.otp.overlay.bikeRental.stations,
    carRentalStations: state.otp.overlay.carRental.stations,
    mapConfig: state.otp.config.map,
    mapPopupLocation: state.otp.ui.mapPopupLocation,
    overlays,
    query: state.otp.currentQuery,
    vehicleRentalStations: state.otp.overlay.vehicleRental.stations
  };
};

const mapDispatchToProps = {
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