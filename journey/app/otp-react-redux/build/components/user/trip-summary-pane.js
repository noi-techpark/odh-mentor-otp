"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _monitoredTrip = require("../../util/monitored-trip");

var _tripSummary = _interopRequireDefault(require("./trip-summary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class TripSummaryPane extends _react.Component {
  render() {
    const {
      monitoredTrip
    } = this.props;
    const {
      itinerary
    } = monitoredTrip;

    if (!itinerary) {
      return /*#__PURE__*/_react.default.createElement("div", null, "No itinerary to display.");
    } else {
      // TODO: use the modern itinerary summary built for trip comparison.
      // For now, just capitalize the day fields from monitoredTrip.
      const capitalizedDays = (0, _monitoredTrip.dayFieldsToArray)(monitoredTrip).map(day => `${day.charAt(0).toUpperCase()}${day.substr(1)}`);
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_tripSummary.default, {
        monitoredTrip: monitoredTrip
      }), /*#__PURE__*/_react.default.createElement("p", null, "Happens on: ", /*#__PURE__*/_react.default.createElement("b", null, capitalizedDays.join(', '))), /*#__PURE__*/_react.default.createElement("p", null, "Notifications:", ' ', /*#__PURE__*/_react.default.createElement("b", null, monitoredTrip.isActive ? `${monitoredTrip.leadTimeInMinutes} min. before scheduled departure` : 'Disabled')));
    }
  }

}

var _default = TripSummaryPane;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trip-summary-pane.js