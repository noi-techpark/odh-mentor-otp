"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var routerActions = _interopRequireWildcard(require("connected-react-router"));

var _react = _interopRequireWildcard(require("react"));

var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));

var _reactRedux = require("react-redux");

var uiActions = _interopRequireWildcard(require("../../actions/ui"));

var _user = require("../../util/user");

var _withLoggedInUserSupport = _interopRequireDefault(require("./with-logged-in-user-support"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * This screen is flashed just after user sign in while state.user.loggedInUser is being fetched.
 * Once state.user.loggedInUser is available:
 * - For new users, route them to the account page (it will show account setup).
 *   while trying to preserve the search portion of the URL before login.
 * - For existing users, simply take them to the route (itinerary search, stop/trip viewer) that was in place before login.
 *
 * Rerouting is performed so that the current URL does not appear in the browser history.
 */
class AfterSignInScreen extends _react.Component {
  componentDidUpdate() {
    const {
      loggedInUser,
      replace,
      routeTo,
      pathBeforeSignIn
    } = this.props; // Redirect when loggedInUser is populated (i.e. after several calls to componentDidUpdate())

    if (loggedInUser) {
      if ((0, _user.isNewUser)(loggedInUser)) {
        const previousSearch = pathBeforeSignIn.split('?')[1];
        const newSearch = previousSearch ? `?${previousSearch}` : null; // if not null, must include '?'.

        routeTo('/account', newSearch, routerActions.replace);
      } else {
        replace(pathBeforeSignIn);
      }
    }
  }

  render() {
    // TODO: Improve the visuals.
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, "Signed In...", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: "hourglass-half",
      size: "4x"
    })));
  }

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  const {
    loggedInUser,
    pathBeforeSignIn
  } = state.user;
  return {
    loggedInUser,
    pathBeforeSignIn
  };
};

const mapDispatchToProps = {
  replace: routerActions.replace,
  routeTo: uiActions.routeTo
};

var _default = (0, _withLoggedInUserSupport.default)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AfterSignInScreen));

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=after-signin-screen.js