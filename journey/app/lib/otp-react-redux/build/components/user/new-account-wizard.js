"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _sequentialPaneDisplay = _interopRequireDefault(require("./sequential-pane-display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This component is the new account wizard.
 */
const NewAccountWizard = ({
  onComplete,
  panes,
  userData
}) => {
  const {
    hasConsentedToTerms,
    notificationChannel = 'email'
  } = userData;
  const paneSequence = {
    terms: {
      disableNext: !hasConsentedToTerms,
      nextId: 'notifications',
      pane: panes.terms,
      title: 'Create a new account'
    },
    notifications: {
      nextId: notificationChannel === 'sms' ? 'verifyPhone' : 'places',
      pane: panes.notifications,
      prevId: 'terms',
      title: 'Notification preferences'
    },
    verifyPhone: {
      disableNext: true,
      // TODO: implement verification.
      nextId: 'places',
      pane: panes.verifyPhone,
      prevId: 'notifications',
      title: 'Verify your phone'
    },
    places: {
      nextId: 'finish',
      pane: panes.locations,
      prevId: 'notifications',
      title: 'Add your locations'
    },
    finish: {
      pane: panes.finish,
      prevId: 'places',
      title: 'Account setup complete!'
    }
  };
  return /*#__PURE__*/_react.default.createElement(_sequentialPaneDisplay.default, {
    initialPaneId: "terms",
    onComplete: onComplete,
    paneSequence: paneSequence
  });
};

var _default = NewAccountWizard;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=new-account-wizard.js