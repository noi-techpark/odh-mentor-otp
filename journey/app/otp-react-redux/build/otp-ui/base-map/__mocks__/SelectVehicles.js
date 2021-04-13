"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

var _util = _interopRequireDefault(require("../src/util"));

var _VehicleMarker = _interopRequireDefault(require("./VehicleMarker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const vehicleData = require("./vehicle-data/all-trimet.json"); // https://maps.trimet.org/gtfs/rt/vehicles/routes/all

/**
 * This component demonstrates an example map overlay that shows real-time transit vehicle locations on a leaflet map.
 * It is modeled after the component available in this file:
 * https://github.com/OpenTransitTools/transit-components/blob/master/lib/vehicles/SelectVehicles.js
 */


class SelectVehicles extends _reactLeaflet.MapLayer {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      selectedRoutes: [],
      selectedStop: null,
      routeData: [],
      // TBD Array of <RouteData > components, which comprise route and stop geo data
      mapZoom: 0,
      trackedVehicle: vehicleData[0],
      vehicles: vehicleData
    });

    _defineProperty(this, "closeZoom", 15);

    _defineProperty(this, "midZoom", 13);

    _defineProperty(this, "farZoom", 10);

    _defineProperty(this, "onOverlayAdded", e => {
      (0, _util.default)(this.props.onOverlayAdded)(e);
    });

    _defineProperty(this, "onOverlayRemoved", e => {
      (0, _util.default)(this.props.onOverlayRemoved)(e);
    });

    _defineProperty(this, "onViewportChanged", viewport => {
      this.setState({
        mapZoom: viewport.zoom
      });
      (0, _util.default)(this.props.onViewportChanged)(viewport);
    });
  }

  componentDidMount() {
    console.log("SelectedVehicles::componentDidMount");
    const {
      registerOverlay
    } = this.props;
    (0, _util.default)(registerOverlay)(this); // Initialize zoom state here? (may trigger render again.)

    const zoom = this.getLeafletContext().map.getZoom();
    this.setState({
      mapZoom: zoom
    });
  }

  componentWillUnmount() {}

  componentDidUpdate() {// this.trackVehicle();
  }

  componentWillReceiveProps()
  /* nextProps */
  {}
  /**
   * this method is used for backporting to React 15
   * v16:  return this.props.leaflet;
   * v15:  return this.context;
   */


  getLeafletContext() {
    return this.props.leaflet;
  }

  trackVehicle() {
    if (this.state.trackedVehicle != null && this.state.trackedVehicle.id != null) {
      const v = this.findVehicle(this.state.trackedVehicle.id);

      if (v != null) {
        const ll = [v.lat, v.lon];
        this.getLeafletContext().map.setView(ll);
        this.setState({
          trackedVehicle: v
        }); // update the state with newest vehicle
      }
    }
  }

  isTrackingVehicle(vehicle) {
    return this.state.trackedVehicle && this.state.trackedVehicle.id === vehicle.id;
  }

  findVehicle(id) {
    return this.state.vehicles.find(v => v.id === id);
  } // need to implement create interface (and update interface for older React-Leaflet versions)


  createLeafletElement()
  /* props */
  {}

  updateLeafletElement()
  /* props */
  {}

  render() {
    const {
      limit = 5
    } = this.props;
    const {
      mapZoom
    } = this.state;
    let {
      vehicles
    } = this.state;
    vehicles = vehicles.slice(0, Math.min(limit, vehicles.length) - 1);
    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, {
      id: "vehicles fg"
    }, mapZoom <= this.closeZoom && mapZoom >= this.farZoom && vehicles && vehicles.map(v => /*#__PURE__*/_react.default.createElement(_VehicleMarker.default, {
      key: v.id,
      vehicle: v,
      controller: this,
      closeZoom: this.closeZoom,
      midZoom: this.midZoom,
      farZoom: this.farZoom
    })));
  }

}

var _default = (0, _reactLeaflet.withLeaflet)(SelectVehicles);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=SelectVehicles.js