"use strict";

require("core-js/modules/web.dom.iterable.js");

var _baseMap = _interopRequireDefault(require("@opentripplanner/base-map"));

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _react2 = require("@storybook/react");

var _2 = _interopRequireDefault(require("."));

var _bikeRentalStations = _interopRequireDefault(require("../__mocks__/bike-rental-stations.json"));

var _carRentalStations = _interopRequireDefault(require("../__mocks__/car-rental-stations.json"));

var _eScooterRentalStations = _interopRequireDefault(require("../__mocks__/e-scooter-rental-stations.json"));

require("../../../node_modules/leaflet/dist/leaflet.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const center = [45.518092, -122.671202];
const bikeMapSymbols = [{
  dockStrokeColor: "#000000",
  fillColor: "#FF2E28",
  maxZoom: 13,
  minZoom: 0,
  pixels: 4,
  type: "circle"
}, {
  dockStrokeColor: "#000000",
  fillColor: "#FF2E28",
  maxZoom: 17,
  minZoom: 14,
  pixels: 6,
  type: "circle"
}, {
  maxZoom: 999,
  minZoom: 18,
  type: "hubAndFloatingBike"
}];
const carMapSymbols = [{
  fillColor: "#009cde",
  maxZoom: 13,
  minZoom: 0,
  pixels: 4,
  type: "circle"
}, {
  fillColor: "#009cde",
  maxZoom: 17,
  minZoom: 14,
  pixels: 6,
  type: "circle"
}, {
  fillColor: "#009cde",
  maxZoom: 999,
  minZoom: 18,
  type: "marker"
}];
const configCompanies = [{
  id: "BIKETOWN",
  label: "Biketown",
  modes: "BICYCLE_RENT"
}, {
  id: "CAR2GO",
  label: "car2go",
  modes: "CAR_RENT"
}, {
  id: "RAZOR",
  label: "Razor",
  modes: "MICROMOBILITY_RENT"
}, {
  id: "SHARED",
  label: "Shared",
  modes: "MICROMOBILITY_RENT"
}];
const EScooterMapSymbols = [{
  fillColor: "#F80600",
  maxZoom: 13,
  minZoom: 0,
  pixels: 4,
  strokeColor: "#CCCCCC",
  type: "circle"
}, {
  fillColor: "#F80600",
  maxZoom: 17,
  minZoom: 14,
  pixels: 6,
  strokeColor: "#CCCCCC",
  type: "circle"
}, {
  fillColor: "#F80600",
  maxZoom: 999,
  minZoom: 18,
  type: "marker"
}];
const setLocation = (0, _addonActions.action)("setLocation");

class ZoomControlledMapWithVehicleRentalOverlay extends _react.Component {
  constructor() {
    super();

    _defineProperty(this, "onViewportChanged", ({
      zoom
    }) => {
      const {
        zoom: stateZoom
      } = this.state;

      if (zoom !== stateZoom) {
        this.setState({
          zoom
        });
      }
    });

    this.state = {
      zoom: 13
    };
  }

  render() {
    const {
      companies,
      getStationName,
      mapSymbols,
      refreshVehicles,
      stations
    } = this.props;
    const {
      zoom
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(_baseMap.default, {
      center: center,
      onViewportChanged: this.onViewportChanged,
      zoom: zoom
    }, /*#__PURE__*/_react.default.createElement(_2.default, {
      configCompanies: configCompanies,
      companies: companies,
      getStationName: getStationName,
      setLocation: setLocation,
      mapSymbols: mapSymbols,
      refreshVehicles: refreshVehicles,
      stations: stations,
      visible: true,
      zoom: zoom
    }));
  }

}

ZoomControlledMapWithVehicleRentalOverlay.propTypes = {
  companies: _propTypes.default.arrayOf(_propTypes.default.string.isRequired),
  getStationName: _propTypes.default.func,
  mapSymbols: _types.vehicleRentalMapOverlaySymbolsType.isRequired,
  refreshVehicles: _propTypes.default.func.isRequired,
  stations: _propTypes.default.arrayOf(_types.stationType.isRequired).isRequired
};
ZoomControlledMapWithVehicleRentalOverlay.defaultProps = {
  companies: null,
  getStationName: undefined
};

function customStationName(_, station) {
  return `🛴 (ID: ${station.id})`;
}

(0, _react2.storiesOf)("VehicleRentalOverlay", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("VehicleRentalOverlay with rental bicycles", () => /*#__PURE__*/_react.default.createElement(ZoomControlledMapWithVehicleRentalOverlay, {
  companies: ["BIKETOWN"],
  mapSymbols: bikeMapSymbols,
  refreshVehicles: (0, _addonActions.action)("refresh bicycles"),
  stations: _bikeRentalStations.default
})).add("VehicleRentalOverlay with rental cars", () => /*#__PURE__*/_react.default.createElement(ZoomControlledMapWithVehicleRentalOverlay, {
  companies: ["CAR2GO"],
  mapSymbols: carMapSymbols,
  refreshVehicles: (0, _addonActions.action)("refresh cars"),
  stations: _carRentalStations.default
})).add("VehicleRentalOverlay with rental E-scooters", () => /*#__PURE__*/_react.default.createElement(ZoomControlledMapWithVehicleRentalOverlay, {
  companies: ["SHARED"],
  mapSymbols: EScooterMapSymbols,
  refreshVehicles: (0, _addonActions.action)("refresh E-scooters"),
  stations: _eScooterRentalStations.default
})).add("VehicleRentalOverlay with rental E-scooters with custom naming", () => /*#__PURE__*/_react.default.createElement(ZoomControlledMapWithVehicleRentalOverlay, {
  companies: ["SHARED"],
  getStationName: customStationName,
  mapSymbols: EScooterMapSymbols,
  refreshVehicles: (0, _addonActions.action)("refresh E-scooters"),
  stations: _eScooterRentalStations.default
}));

//# sourceMappingURL=VehicleRentalOverlay.story.js