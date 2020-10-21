"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _leaflet = require("leaflet");

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var BaseMapStyled = _interopRequireWildcard(require("@opentripplanner/base-map/lib/styled"));

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _types = require("@opentripplanner/core-utils/lib/types");

var _fromToLocationPicker = _interopRequireDefault(require("@opentripplanner/from-to-location-picker"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _reactLeaflet = require("react-leaflet");

var _bikeIcons = require("./bike-icons");

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getStationMarkerByColor = (0, _lodash.default)(color => (0, _leaflet.divIcon)({
  className: "",
  iconSize: [11, 16],
  popupAnchor: [0, -6],
  html: _server.default.renderToStaticMarkup( /*#__PURE__*/_react.default.createElement(Styled.StationMarker, {
    color: color
  }))
}));
/**
 * This vehicle rental overlay can be used to render vehicle rentals of various
 * types. This layer can be configured to show different styles of markers at
 * different zoom levels.
 */

class VehicleRentalOverlay extends _reactLeaflet.MapLayer {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderPopupForStation", (station, stationIsHub = false) => {
      const {
        configCompanies,
        getStationName,
        setLocation
      } = this.props;
      const stationName = getStationName(configCompanies, station);
      const location = {
        lat: station.y,
        lon: station.x,
        name: stationName
      };
      return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Popup, null, /*#__PURE__*/_react.default.createElement(BaseMapStyled.MapOverlayPopup, null, /*#__PURE__*/_react.default.createElement(BaseMapStyled.PopupTitle, null, stationName), stationIsHub && /*#__PURE__*/_react.default.createElement(BaseMapStyled.PopupRow, null, /*#__PURE__*/_react.default.createElement("div", null, "Available bikes: ", station.bikesAvailable), /*#__PURE__*/_react.default.createElement("div", null, "Available docks: ", station.spacesAvailable)), /*#__PURE__*/_react.default.createElement(BaseMapStyled.PopupRow, null, /*#__PURE__*/_react.default.createElement("b", null, "Viaggia:"), /*#__PURE__*/_react.default.createElement(_fromToLocationPicker.default, {
        location: location,
        setLocation: setLocation
      }))));
    });

    _defineProperty(this, "renderStationAsCircle", (station, symbolDef) => {
      let strokeColor = symbolDef.strokeColor || symbolDef.fillColor;

      if (!station.isFloatingBike) {
        strokeColor = symbolDef.dockStrokeColor || strokeColor;
      }

      return /*#__PURE__*/_react.default.createElement(_reactLeaflet.CircleMarker, {
        key: station.id,
        center: [station.y, station.x],
        color: strokeColor,
        fillColor: symbolDef.fillColor,
        fillOpacity: 1,
        radius: symbolDef.pixels - (station.isFloatingBike ? 1 : 0),
        weight: 1
      }, this.renderPopupForStation(station));
    });

    _defineProperty(this, "renderStationAsHubAndFloatingBike", station => {
      let icon;

      if (station.isFloatingBike) {
        icon = _bikeIcons.floatingBikeIcon;
      } else {
        const pctFull = station.bikesAvailable / (station.bikesAvailable + station.spacesAvailable);
        const i = Math.round(pctFull * 9);
        icon = _bikeIcons.hubIcons[i];
      }

      return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Marker, {
        icon: icon,
        key: station.id,
        position: [station.y, station.x]
      }, this.renderPopupForStation(station, !station.isFloatingBike));
    });

    _defineProperty(this, "renderStationAsMarker", (station, symbolDef) => {
      const color = symbolDef && symbolDef.fillColor ? symbolDef.fillColor : "gray";
      const markerIcon = getStationMarkerByColor(color);
      return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Marker, {
        icon: markerIcon,
        key: station.id,
        position: [station.y, station.x]
      }, this.renderPopupForStation(station));
    });

    _defineProperty(this, "renderStation", station => {
      // render the station according to any map symbol configuration
      const {
        mapSymbols
      } = this.props; // no config set, just render a default marker

      if (!mapSymbols) return this.renderStationAsMarker(station); // get zoom to check which symbol to render

      const zoom = this.props.leaflet.map.getZoom();

      for (let i = 0; i < mapSymbols.length; i++) {
        const symbolDef = mapSymbols[i];

        if (symbolDef.minZoom <= zoom && symbolDef.maxZoom >= zoom) {
          switch (symbolDef.type) {
            case "circle":
              return this.renderStationAsCircle(station, symbolDef);

            case "hubAndFloatingBike":
              return this.renderStationAsHubAndFloatingBike(station);

            default:
              return this.renderStationAsMarker(station, symbolDef);
          }
        }
      } // no matching symbol definition, render default marker


      return this.renderStationAsMarker(station);
    });
  }

  createLeafletElement() {}

  updateLeafletElement() {}

  startRefreshing() {
    const {
      refreshVehicles
    } = this.props; // Create the timer only if refreshVehicles is a valid function.

    if (typeof refreshVehicles === "function") {
      // initial station retrieval
      refreshVehicles(); // set up timer to refresh stations periodically

      this.refreshTimer = setInterval(() => {
        refreshVehicles();
      }, 30000); // defaults to every 30 sec. TODO: make this configurable?
    }
  }

  stopRefreshing() {
    if (this.refreshTimer) clearInterval(this.refreshTimer);
  }

  componentDidMount() {
    const {
      companies,
      mapSymbols,
      name,
      visible
    } = this.props;
    if (visible) this.startRefreshing();
    if (!mapSymbols) console.warn(`No map symbols provided for layer ${name}`, companies);
  }

  componentWillUnmount() {
    this.stopRefreshing();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.startRefreshing();
    } else if (prevProps.visible && !this.props.visible) {
      this.stopRefreshing();
    }
  }
  /**
   * Render some popup html for a station. This contains custom logic for
   * displaying rental vehicles in the TriMet MOD website that might not be
   * applicable to other regions.
   */


  render() {
    const {
      stations,
      companies
    } = this.props;
    let filteredStations = stations;

    if (companies) {
      filteredStations = stations.filter(station => station.networks.filter(value => companies.includes(value)).length > 0);
    }

    if (!filteredStations || filteredStations.length === 0) {
      return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null);
    }

    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null, filteredStations.map(this.renderStation));
  }

}

VehicleRentalOverlay.props = {
  /**
   * The entire companies config array.
   */
  configCompanies: _propTypes.default.arrayOf(_types.companyType.isRequired).isRequired,

  /**
   * A list of companies that are applicable to just this instance of the
   * overlay.
   */
  companies: _propTypes.default.arrayOf(_propTypes.default.string.isRequired),

  /**
   * An optional custom function to create a string name of a particular vehicle
   * rental station. This function takes two arguments of the configCompanies
   * prop and a vehicle rental station. The function must return a string.
   */
  getStationName: _propTypes.default.func,

  /**
   * A configuration of what map markers or symbols to show at various zoom
   * levels.
   */
  mapSymbols: _types.vehicleRentalMapOverlaySymbolsType,

  /**
   * If specified, a function that will be triggered every 30 seconds whenever this layer is
   * visible.
   */
  refreshVehicles: _propTypes.default.func,

  /**
   * A callback for when a user clicks on setting this stop as either the from
   * or to location of a new search.
   *
   * This will be dispatched with the following argument:
   *
   * ```js
   *  {
   *    location: {
   *      lat: number,
   *      lon: number,
   *      name: string
   *    },
   *    locationType: "from" or "to"
   *  }
   * ```
   */
  setLocation: _propTypes.default.func.isRequired,

  /**
   * A list of the vehicle rental stations specific to this overlay instance.
   */
  stations: _propTypes.default.arrayOf(_types.stationType),

  /**
   * Whether the overlay is currently visible.
   */
  visible: _propTypes.default.bool,

  /**
   * The current map zoom level.
   */
  zoom: _propTypes.default.number.isRequired
};
VehicleRentalOverlay.defaultProps = {
  getStationName: (configCompanies, station) => {
    const stationNetworks = (0, _itinerary.getCompaniesLabelFromNetworks)(station.networks, configCompanies);
    let stationName = station.name || station.id;

    if (station.isFloatingBike) {
      stationName = `Free-floating bike: ${stationName}`;
    } else if (station.isFloatingCar) {
      stationName = `${stationNetworks} ${stationName}`;
    } else if (station.isFloatingVehicle) {
      // assumes that all floating vehicles are E-scooters
      stationName = `${stationNetworks} E-scooter`;
    }

    return stationName;
  },
  mapSymbols: null,
  refreshVehicles: null,
  stations: [],
  visible: false
};

var _default = (0, _reactLeaflet.withLeaflet)(VehicleRentalOverlay);

exports.default = _default;