"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var BaseMapStyled = _interopRequireWildcard(require("@opentripplanner/base-map/lib/styled"));

var _fromToLocationPicker = _interopRequireDefault(require("@opentripplanner/from-to-location-picker"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

var _parkAndRideMarker = _interopRequireDefault(require("./park-and-ride-marker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class ParkAndRideOverlay extends _reactLeaflet.MapLayer {
  componentDidMount() {}

  componentWillUnmount() {}

  createLeafletElement() {}

  updateLeafletElement() {}

  render() {
    const {
      parkAndRideLocations,
      setLocation
    } = this.props;
    if (!parkAndRideLocations || parkAndRideLocations.length === 0) return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null);
    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null, parkAndRideLocations.map((location, k) => {
      const name = location.name.startsWith("P+R ") ? location.name.substring(4) : location.name;
      return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Marker, {
        icon: _parkAndRideMarker.default,
        key: k,
        position: [location.y, location.x]
      }, /*#__PURE__*/_react.default.createElement(_reactLeaflet.Popup, null, /*#__PURE__*/_react.default.createElement(BaseMapStyled.MapOverlayPopup, null, /*#__PURE__*/_react.default.createElement(BaseMapStyled.PopupTitle, null, name), /*#__PURE__*/_react.default.createElement(BaseMapStyled.PopupRow, null, /*#__PURE__*/_react.default.createElement("b", null, "$_travel_$"), /*#__PURE__*/_react.default.createElement(_fromToLocationPicker.default, {
        location: {
          lat: location.y,
          lon: location.x,
          name
        },
        setLocation: setLocation
      })))));
    }));
  }

}

ParkAndRideOverlay.propTypes = {
  parkAndRideLocations: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    x: _propTypes.default.number.isRequired,
    y: _propTypes.default.number.isRequired
  }).isRequired),
  setLocation: _propTypes.default.func.isRequired
};

var _default = (0, _reactLeaflet.withLeaflet)(ParkAndRideOverlay);

exports.default = _default;