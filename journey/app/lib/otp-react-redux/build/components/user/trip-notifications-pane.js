"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SmallInfoText = _styledComponents.default.p`
  font-size: 80%;
`;

class TripNotificationsPane extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_handleIsActiveChange", e => {
      const {
        onMonitoredTripChange
      } = this.props;
      onMonitoredTripChange({
        isActive: e.target.value === 'true'
      });
    });

    _defineProperty(this, "_handleExcludeFedHolidaysChange", e => {
      const {
        onMonitoredTripChange
      } = this.props;
      onMonitoredTripChange({
        excludeFederalHolidays: e.target.value === 'true'
      });
    });

    _defineProperty(this, "_handleLeadTimeChange", e => {
      const {
        onMonitoredTripChange
      } = this.props;
      onMonitoredTripChange({
        leadTimeInMinutes: e.target.value
      });
    });
  }

  render() {
    const {
      monitoredTrip
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Would you like to receive notifications about this trip?"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Radio, {
      checked: monitoredTrip.isActive,
      name: "isActive",
      onChange: this._handleIsActiveChange,
      value: true
    }, "Yes"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Radio, {
      checked: !monitoredTrip.isActive,
      name: "isActive",
      onChange: this._handleIsActiveChange,
      value: false
    }, "No"), /*#__PURE__*/_react.default.createElement(SmallInfoText, null, "Note: you will be notified by [email|SMS]. This can be changed in your account settings once the trip has been saved.")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "When would you like to receive notifications about delays or disruptions to your trip?"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Check for delays or disruptions:"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, {
      componentClass: "select",
      onChange: this._handleLeadTimeChange,
      placeholder: "select",
      value: monitoredTrip.leadTimeInMinutes
    }, /*#__PURE__*/_react.default.createElement("option", {
      value: 15
    }, "15 min. prior"), /*#__PURE__*/_react.default.createElement("option", {
      value: 30
    }, "30 min. prior (default)"), /*#__PURE__*/_react.default.createElement("option", {
      value: 45
    }, "45 min. prior"), /*#__PURE__*/_react.default.createElement("option", {
      value: 60
    }, "60 min. prior"))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Alert, {
      bsStyle: "warning"
    }, "Under construction!", /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Notify me if:"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Checkbox, null, "A different route or transfer point is recommended"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Checkbox, null, "There is an alert for a route or stop that is part of my journey"), "Your arrival or departure time changes by more than:", /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, {
      componentClass: "select",
      defaultValue: 5,
      placeholder: "select"
    }, /*#__PURE__*/_react.default.createElement("option", {
      value: 5
    }, "5 min. (default)"), /*#__PURE__*/_react.default.createElement("option", {
      value: 10
    }, "10 min."), /*#__PURE__*/_react.default.createElement("option", {
      value: 15
    }, "15 min."))))));
  }

}

var _default = TripNotificationsPane;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trip-notifications-pane.js