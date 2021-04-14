"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactBootstrap = require("react-bootstrap");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ui = require("../../actions/ui");

var _linkMenuItem = _interopRequireWildcard(require("./link-menu-item"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Avatar = _styledComponents.default.img`
  height: 2em;
  margin: -15px 0;
  width: 2em;
`;
/**
 * This component displays the sign-in status in the nav bar.
 * - When a user is not logged in: display 'Sign In' as a link or button.
 * - When a user is logged in, display an 'avatar' (retrieved from the profile prop)
 *   and a dropdown button so the user can access more options.
 */

class NavLoginButton extends _react.Component {
  render() {
    const {
      className,
      id,
      links,
      onSignInClick,
      onSignOutClick,
      profile,
      style
    } = this.props;
    const commonProps = {
      className,
      id,
      style
    }; // If a profile is passed (a user is logged in), display avatar and drop-down menu.

    if (profile) {
      const displayedName = profile.nickname || profile.name;
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavDropdown, _extends({}, commonProps, {
        pullRight: true,
        title: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(Avatar, {
          alt: displayedName,
          src: profile.picture,
          title: `${displayedName}\n(${profile.email})`
        }))
      }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.MenuItem, {
        header: true
      }, displayedName), links && links.map((link, i) => /*#__PURE__*/_react.default.createElement(_linkMenuItem.default, {
        key: i,
        link: link
      })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.MenuItem, {
        divider: true
      }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.MenuItem, {
        onSelect: onSignOutClick
      }, "Sign out"));
    } // Display the sign-in link if no profile is passed (user is not logged in).


    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.NavItem, _extends({}, commonProps, {
      onClick: onSignInClick
    }), "Sign in");
  }

} // connect to the redux store


_defineProperty(NavLoginButton, "propTypes", {
  id: _propTypes.default.string.isRequired,
  links: _propTypes.default.arrayOf(_linkMenuItem.linkType),
  onSignInClick: _propTypes.default.func.isRequired,
  onSignOutClick: _propTypes.default.func.isRequired,
  profile: _propTypes.default.shape({
    email: _propTypes.default.string.isRequired,
    name: _propTypes.default.string.isRequired,
    nickname: _propTypes.default.string,
    picture: _propTypes.default.string
  })
});

_defineProperty(NavLoginButton, "defaultProps", {
  links: null,
  profile: null
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {
  routeTo: _ui.routeTo
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NavLoginButton);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=nav-login-button.js