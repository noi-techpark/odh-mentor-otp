"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const vehicleData = require("./vehicle-data/all-vehicles.json");
/**
 * This component demonstrates a example map overlay that shows real-time transit vehicle locations on a leaflet map.
 * It is modeled after the component available in this file:
 * https://github.com/OpenTransitTools/transit-components/blob/master/lib/vehicles/AllVehicles.js
 */


const AllVehiclesOverlay = () => {
  return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, {
    className: "vehicles"
  }, vehicleData.map(vehicle => {
    const key = vehicle.vehicleID;
    const position = [vehicle.latitude, vehicle.longitude];
    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Marker, {
      class: "marker",
      icon: _leaflet.default.divIcon({
        html: `<span>${vehicle.routeNumber}</span>`
      }),
      key: key,
      position: position
    }, /*#__PURE__*/_react.default.createElement(_reactLeaflet.Popup, null, /*#__PURE__*/_react.default.createElement("span", null, "VEH: ", key)));
  }));
};

var _default = AllVehiclesOverlay;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=AllVehicles.js