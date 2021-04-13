"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */

/* eslint-disable react/destructuring-assignment */

/**
 * This component demonstrates a custom marker used in the SelectVehicles overlay provided as an example.
 * It is modeled after the component available in this file:
 * https://github.com/OpenTransitTools/transit-components/blob/master/lib/vehicles/VehicleMarker.js
 */
class VehicleMarker extends _react.default.Component {
  getLastReportDate(v) {
    return `${v.seconds} seconds ago`;
  }

  makeToolTip() {
    const v = this.props.vehicle;
    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Tooltip, null, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("b", null, v.routeShortName), ": ", this.getLastReportDate(v)));
  }

  makePopup() {
    const v = this.props.vehicle;
    let status = "unknown";
    if (v.status === "IN_TRANSIT_TO") status = "en-route to stop ";else if (v.status === "STOPPED_AT") if (v.stopSequence === 1) status = "beginning route from stop ";else status = "stopped at ";
    let vehicle = "";
    if (v.vehicleId.indexOf("+") > 0) vehicle = `Vehicles: ${v.vehicleId.replace(/\+/g, ", ")}`;else vehicle = `Vehicle: ${v.vehicleId}`;
    const stopLink = `https://trimet.org/ride/stop.html?stop_id=${v.stopId}`;
    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Popup, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("b", null, v.routeLongName)), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "Last reported: ", this.getLastReportDate(v)), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "Report date: ", v.reportDate), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "Status: ", status, " ", /*#__PURE__*/_react.default.createElement("a", {
      target: "#",
      href: stopLink
    }, v.stopId)), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, "Trip: ", v.tripId, ", Block: ", v.blockId), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", null, vehicle), " ", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null)));
  }

  render() {
    const v = this.props.vehicle;
    const position = [v.lat, v.lon];
    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Circle, {
      center: position,
      radius: 100,
      color: "black"
    }, this.makePopup(), this.makeToolTip());
  }

}

var _default = (0, _reactLeaflet.withLeaflet)(VehicleMarker);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=VehicleMarker.js