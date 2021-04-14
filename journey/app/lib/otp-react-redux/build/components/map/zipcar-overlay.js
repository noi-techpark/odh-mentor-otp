"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactLeaflet = require("react-leaflet");

var _leaflet = require("leaflet");

var _setFromTo = _interopRequireDefault(require("./set-from-to"));

var _map = require("../../actions/map");

var _zipcar = require("../../actions/zipcar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const zipcarIcon = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.09 120.1"><defs><style>.cls-1{fill:#59ad46;}.cls-2{fill:#fff;}.cls-3{fill:#5c5d5f;}</style></defs><title>zipcar-icon</title><path class="cls-1" d="M246.37,396.78a60,60,0,1,1,60,60,60.05,60.05,0,0,1-60-60" transform="translate(-246.37 -336.74)"/><path class="cls-2" d="M363.6,418.66q0.47-1.28.9-2.58H314.16l2.46-3.15h34.87a1.27,1.27,0,1,0,0-2.53H318.6l2.42-3.09h17.74a1.31,1.31,0,0,0,0-2.58H291.69l28.85-37.59H273.06v10.27h25.28l-26.48,34.34-5.45,6.9h21a12,12,0,0,1,22.29,0H363.6" transform="translate(-246.37 -336.74)"/><path class="cls-3" d="M307.84,423.3a9.27,9.27,0,1,1-9.27-9.27,9.27,9.27,0,0,1,9.27,9.27" transform="translate(-246.37 -336.74)"/></svg>';

class ZipcarOverlay extends _reactLeaflet.MapLayer {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onOverlayAdded", () => {
      this._startRefreshing();
    });

    _defineProperty(this, "onOverlayRemoved", () => {
      this._stopRefreshing();
    });
  }

  _startRefreshing() {
    // ititial station retrieval
    this.props.zipcarLocationsQuery(this.props.api); // set up timer to refresh stations periodically

    this._refreshTimer = setInterval(() => {
      this.props.zipcarLocationsQuery(this.props.api);
    }, 30000); // defaults to every 30 sec. TODO: make this configurable?*/
  }

  _stopRefreshing() {
    if (this._refreshTimer) clearInterval(this._refreshTimer);
  }

  componentDidMount() {
    this.props.registerOverlay(this);
  }

  componentWillUnmount() {
    this._stopRefreshing();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this._startRefreshing();
    } else if (prevProps.visible && !this.props.visible) {
      this._stopRefreshing();
    }
  }

  createLeafletElement() {}

  updateLeafletElement() {}

  render() {
    const {
      locations
    } = this.props;
    if (!locations || locations.length === 0) return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null);
    const markerIcon = (0, _leaflet.divIcon)({
      iconSize: [24, 24],
      popupAnchor: [0, -12],
      html: zipcarIcon,
      className: ''
    });
    const bulletIconStyle = {
      color: 'gray',
      fontSize: 12,
      width: 15
    };
    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null, locations.map(location => {
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
        map: this.props.leaflet.map,
        location: {
          lat: location.coordinates.lat,
          lon: location.coordinates.lng,
          name: location.display_name
        },
        setLocation: this.props.setLocation
      })))));
    }));
  }

} // connect to the redux store


_defineProperty(ZipcarOverlay, "propTypes", {
  api: _propTypes.default.string,
  locations: _propTypes.default.array,
  zipcarLocationsQuery: _propTypes.default.func,
  setLocation: _propTypes.default.func
});

const mapStateToProps = (state, ownProps) => {
  return {
    locations: state.otp.overlay.zipcar && state.otp.overlay.zipcar.locations
  };
};

const mapDispatchToProps = {
  setLocation: _map.setLocation,
  zipcarLocationsQuery: _zipcar.zipcarLocationsQuery
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _reactLeaflet.withLeaflet)(ZipcarOverlay));

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=zipcar-overlay.js