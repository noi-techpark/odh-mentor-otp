"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactFontawesome = _interopRequireDefault(require("react-fontawesome"));

var _reactRedux = require("react-redux");

var _ui = require("../../actions/ui");

var _appMenu = _interopRequireDefault(require("../app/app-menu"));

var _navLoginButtonAuth = _interopRequireDefault(require("../../components/user/nav-login-button-auth0"));

var _auth = require("../../util/auth");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MobileNavigationBar extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_backButtonPressed", () => {
      const {
        backScreen,
        onBackClicked
      } = this.props;
      if (backScreen) this.props.setMobileScreen(this.props.backScreen);else if (typeof onBackClicked === 'function') onBackClicked();
    });
  }

  render() {
    const {
      auth0Config,
      headerAction,
      headerText,
      showBackButton,
      title
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar, {
      fluid: true,
      fixedTop: true
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Header, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Brand, null, showBackButton ? /*#__PURE__*/_react.default.createElement("div", {
      className: "mobile-back"
    }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.default, {
      name: "arrow-left",
      onClick: this._backButtonPressed
    })) : /*#__PURE__*/_react.default.createElement(_appMenu.default, null))), /*#__PURE__*/_react.default.createElement("div", {
      className: "mobile-header"
    }, headerText ? /*#__PURE__*/_react.default.createElement("div", {
      className: "mobile-header-text"
    }, headerText) : /*#__PURE__*/_react.default.createElement("div", null, title)), headerAction && /*#__PURE__*/_react.default.createElement("div", {
      className: "mobile-close"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "mobile-header-action"
    }, headerAction)), auth0Config && /*#__PURE__*/_react.default.createElement(_navLoginButtonAuth.default, {
      id: "login-control",
      links: _auth.accountLinks
    }));
  }

} // connect to the redux store


_defineProperty(MobileNavigationBar, "propTypes", {
  backScreen: _propTypes.default.number,
  headerAction: _propTypes.default.element,
  headerText: _propTypes.default.string,
  showBackButton: _propTypes.default.bool,
  setMobileScreen: _propTypes.default.func,
  title: _propTypes.default.element
});

const mapStateToProps = (state, ownProps) => {
  return {
    auth0Config: (0, _auth.getAuth0Config)(state.otp.config.persistence)
  };
};

const mapDispatchToProps = {
  setMobileScreen: _ui.setMobileScreen
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MobileNavigationBar);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=navigation-bar.js