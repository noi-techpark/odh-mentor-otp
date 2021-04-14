"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const allowedNotificationChannels = [{
  type: 'email',
  text: 'Email'
}, {
  type: 'sms',
  text: 'SMS'
}, {
  type: 'none',
  text: 'Don\'t notify me'
}]; // Styles
// HACK: Preverve container height.

const Details = _styledComponents.default.div`
  height: 150px;
`;
/**
 * User notification preferences pane.
 */

class NotificationPrefsPane extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_handleNotificationChannelChange", e => {
      const {
        onUserDataChange
      } = this.props;
      onUserDataChange({
        notificationChannel: e
      });
    });

    _defineProperty(this, "_handlePhoneNumberChange", e => {
      const {
        onUserDataChange
      } = this.props;
      onUserDataChange({
        phoneNumber: e.target.value
      });
    });
  }

  render() {
    const {
      userData
    } = this.props;
    const {
      email,
      notificationChannel,
      phoneNumber
    } = userData;
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, "You can receive notifications about trips you frequently take."), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "How would you like to receive notifications?"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonToolbar, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButtonGroup, {
      name: "notificationChannels",
      onChange: this._handleNotificationChannelChange,
      type: "radio",
      value: notificationChannel
    }, allowedNotificationChannels.map(({
      type,
      text
    }, index) => /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButton, {
      bsStyle: notificationChannel === type ? 'primary' : 'default',
      key: index,
      value: type
    }, text))))), /*#__PURE__*/_react.default.createElement(Details, null, notificationChannel === 'email' && /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Notification emails will be sent out to:"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, {
      disabled: true,
      type: "text",
      value: email
    })), notificationChannel === 'sms' && /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "Enter your phone number for SMS notifications:"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormControl, {
      onChange: this._handlePhoneNumberChange,
      type: "tel",
      value: phoneNumber
    }))));
  }

}

_defineProperty(NotificationPrefsPane, "propTypes", {
  onUserDataChange: _propTypes.default.func.isRequired,
  userData: _propTypes.default.object.isRequired
});

var _default = NotificationPrefsPane;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=notification-prefs-pane.js