"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _useAuth0Hooks = require("use-auth0-hooks");

var _ui = require("../../actions/ui");

var _user = require("../../actions/user");

var _user2 = require("../../util/user");

var _desktopNav = _interopRequireDefault(require("../app/desktop-nav"));

var _accountSetupFinishPane = _interopRequireDefault(require("./account-setup-finish-pane"));

var _existingAccountDisplay = _interopRequireDefault(require("./existing-account-display"));

var _favoriteLocationsPane = _interopRequireDefault(require("./favorite-locations-pane"));

var _newAccountWizard = _interopRequireDefault(require("./new-account-wizard"));

var _notificationPrefsPane = _interopRequireDefault(require("./notification-prefs-pane"));

var _phoneVerificationPane = _interopRequireDefault(require("./phone-verification-pane"));

var _termsOfUsePane = _interopRequireDefault(require("./terms-of-use-pane"));

var _verifyEmailScreen = _interopRequireDefault(require("./verify-email-screen"));

var _withLoggedInUserSupport = _interopRequireDefault(require("./with-logged-in-user-support"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This screen handles creating/updating OTP user account settings.
 */
class UserAccountScreen extends _react.Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "_updateUserState", newUserData => {
      const {
        userData
      } = this.state;
      this.setState({
        userData: { ...userData,
          ...newUserData
        }
      });
    });

    _defineProperty(this, "_updateUserPrefs", async () => {
      // TODO: Change state of Save button while the update action takes place.
      const {
        createOrUpdateUser
      } = this.props;
      const {
        userData
      } = this.state;
      await createOrUpdateUser(userData); // TODO: Handle UI feedback (currently an alert() dialog inside createOrUpdateUser).
    });

    _defineProperty(this, "_handleExit", () => {
      // On exit, route to default search route.
      this.props.routeTo('/');
    });

    _defineProperty(this, "_handleExitAndSave", async () => {
      await this._updateUserPrefs();

      this._handleExit();
    });

    _defineProperty(this, "_hookUserData", Pane => props => {
      const {
        userData
      } = this.state;
      return /*#__PURE__*/_react.default.createElement(Pane, _extends({
        onUserDataChange: this._updateUserState,
        userData: userData
      }, props));
    });

    _defineProperty(this, "_panes", {
      terms: this._hookUserData(_termsOfUsePane.default),
      notifications: this._hookUserData(_notificationPrefsPane.default),
      verifyPhone: _phoneVerificationPane.default,
      locations: this._hookUserData(_favoriteLocationsPane.default),
      finish: _accountSetupFinishPane.default
    });

    this.state = {
      userData: (0, _cloneDeep.default)(_props.loggedInUser)
    };
  }

  // TODO: Update title bar during componentDidMount.
  render() {
    const {
      auth,
      loggedInUser
    } = this.props;
    const {
      userData
    } = this.state;
    let formContents;

    if ((0, _user2.isNewUser)(loggedInUser)) {
      if (!auth.user.email_verified) {
        // Check and prompt for email verification first to avoid extra user wait.
        formContents = /*#__PURE__*/_react.default.createElement(_verifyEmailScreen.default, null);
      } else {
        // New users are shown "wizard" (step-by-step) mode
        // (includes when a "new" user clicks 'My Account' from the account menu in the nav bar).
        formContents = /*#__PURE__*/_react.default.createElement(_newAccountWizard.default, {
          onComplete: this._handleExitAndSave,
          panes: this._panes,
          userData: userData
        });
      }
    } else {
      formContents =
      /*#__PURE__*/
      // Existing users are shown all panes together.
      _react.default.createElement(_existingAccountDisplay.default, {
        onCancel: this._handleExit,
        onComplete: this._handleExitAndSave,
        panes: this._panes
      });
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "otp"
    }, /*#__PURE__*/_react.default.createElement(_desktopNav.default, null), /*#__PURE__*/_react.default.createElement("form", {
      className: "container"
    }, formContents));
  }

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  return {
    loggedInUser: state.user.loggedInUser
  };
};

const mapDispatchToProps = {
  createOrUpdateUser: _user.createOrUpdateUser,
  routeTo: _ui.routeTo
};

var _default = (0, _withLoggedInUserSupport.default)((0, _useAuth0Hooks.withLoginRequired)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserAccountScreen)), true);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=user-account-screen.js