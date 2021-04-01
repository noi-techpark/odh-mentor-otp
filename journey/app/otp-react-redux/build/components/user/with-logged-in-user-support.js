"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withLoggedInUserSupport;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _useAuth0Hooks = require("use-auth0-hooks");

var userActions = _interopRequireWildcard(require("../../actions/user"));

var _constants = require("../../util/constants");

var _ui = require("../../util/ui");

var _awaitingScreen = _interopRequireDefault(require("./awaiting-screen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * This higher-order component ensures that state.user is loaded
 * in the redux store for any wrapped component that may need it.
 * The requireLoggedInUser argument handles the two use cases for this component:
 * - Some components (e.g. those processing a user account) require a logged in user to be available,
 *   and without it they cannot function.
     For such components, set requireLoggedInUser to true.
 *   An awaiting screen will be displayed while state.user data are being fetched,
 *   and the wrapped component will be shown upon availability of state.user.
 * - Other components (e.g. landing pages) don't require a logged in user to be available to function
 *   but will display extra functionality if so.
 *   For such components, omit requireLoggedInUser parameter (or set to false).
 *   The wrapped component is shown immediately, and no awaiting screen is displayed while state.user is being retrieved.
 * @param {React.Component} WrappedComponent The component to be wrapped to that uses state.user from the redux store.
 * @param {boolean} requireLoggedInUser Whether the wrapped component requires state.user to properly function.
 */
function withLoggedInUserSupport(WrappedComponent, requireLoggedInUser) {
  return props => /*#__PURE__*/_react.default.createElement(UserLoaderScreenWithAuth, {
    requireLoggedInUser: requireLoggedInUser
  }, /*#__PURE__*/_react.default.createElement(WrappedComponent, props));
}
/**
 * This component ensures that values under state.user are set when a user is logged in.
 * If needed by the children, this component displays a wait screen while state.user values are being fetched.
 * Upon completion (or if no user is logged in or if auth is disabled), it renders children.
 */


class UserLoaderScreen extends _react.Component {
  componentDidUpdate() {
    const {
      auth,
      fetchOrInitializeUser,
      loggedInUser
    } = this.props; // Once accessToken is available, proceed to fetch or initialize loggedInUser.

    if (auth && auth.accessToken && !loggedInUser) {
      fetchOrInitializeUser(auth);
    }
  }

  render() {
    const {
      auth,
      children,
      loggedInUser,
      requireLoggedInUser
    } = this.props;

    if (auth) {
      if (requireLoggedInUser && auth.isAuthenticated && !loggedInUser) {
        // Display a hint while fetching user data for logged in user (from componentDidMount).
        // Don't display this if loggedInUser is already available.
        // TODO: Improve this screen.
        return /*#__PURE__*/_react.default.createElement(_awaitingScreen.default, null);
      } else {
        return (0, _ui.renderChildrenWithProps)(children, {
          auth
        });
      }
    }

    return children;
  }

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  return {
    loggedInUser: state.user.loggedInUser
  };
};

const mapDispatchToProps = {
  fetchOrInitializeUser: userActions.fetchOrInitializeUser
};
const UserLoaderScreenWithAuth = (0, _useAuth0Hooks.withAuth)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserLoaderScreen), {
  audience: _constants.AUTH0_AUDIENCE,
  scope: _constants.AUTH0_SCOPE
});
module.exports = exports.default;

//# sourceMappingURL=with-logged-in-user-support.js