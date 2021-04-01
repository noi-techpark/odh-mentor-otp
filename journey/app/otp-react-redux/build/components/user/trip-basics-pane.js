"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _monitoredTrip = require("../../util/monitored-trip");

var _tripSummary = _interopRequireDefault(require("./trip-summary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This component shows summary information for a trip
 * and lets the user edit the trip name and day.
 */
class TripBasicsPane extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_handleTripDaysChange", e => {
      const {
        onMonitoredTripChange
      } = this.props;
      onMonitoredTripChange((0, _monitoredTrip.arrayToDayFields)(e));
    });

    _defineProperty(this, "_handleTripNameChange", e => {
      const {
        onMonitoredTripChange
      } = this.props;
      onMonitoredTripChange({
        tripName: e.target.value
      });
    });
  }

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
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Selected itinerary:"), /*#__PURE__*/_react.default.createElement(_tripSummary.default, {
        monitoredTrip: monitoredTrip
      }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Please provide a name for this trip:"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, {
        onChange: this._handleTripNameChange,
        type: "text",
        value: monitoredTrip.tripName
      })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "What days to you take this trip?"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonToolbar, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButtonGroup, {
        onChange: this._handleTripDaysChange,
        type: "checkbox",
        value: (0, _monitoredTrip.dayFieldsToArray)(monitoredTrip)
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButton, {
        value: 'monday'
      }, "Monday"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButton, {
        value: 'tuesday'
      }, "Tuesday"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButton, {
        value: 'wednesday'
      }, "Wednesday"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButton, {
        value: 'thursday'
      }, "Thursday"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButton, {
        value: 'friday'
      }, "Friday"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButton, {
        value: 'saturday'
      }, "Saturday"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButton, {
        value: 'sunday'
      }, "Sunday")))));
    }
  }

}

var _default = TripBasicsPane;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trip-basics-pane.js