"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactBootstrap = require("react-bootstrap");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _ui = require("../../actions/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: make menu items configurable via props/config
class AppMenu extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_showRouteViewer", () => {
      this.props.setMainPanelContent(_ui.MainPanelContent.ROUTE_VIEWER);
    });

    _defineProperty(this, "_startOver", () => {
      const {
        reactRouterConfig
      } = this.props;
      let startOverUrl = '/';

      if (reactRouterConfig && reactRouterConfig.basename) {
        startOverUrl += reactRouterConfig.basename;
      }

      window.location.href = startOverUrl;
    });
  }

  render() {
    const {
      languageConfig
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "app-menu"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.DropdownButton, {
      "aria-label": "Application Menu",
      title: /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "bars"
      }),
      noCaret: true,
      className: "app-menu-button",
      id: "app-menu"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.MenuItem, {
      onClick: this._showRouteViewer
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "bus"
    }), " ", languageConfig.routeViewer || 'Visualizza Linee'), /*#__PURE__*/_react.default.createElement(_reactBootstrap.MenuItem, {
      onClick: this._startOver
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "undo"
    }), " $_restart_$")));
  }

} // connect to the redux store


_defineProperty(AppMenu, "propTypes", {
  setMainPanelContent: _propTypes.default.func
});

const mapStateToProps = (state, ownProps) => {
  return {
    languageConfig: state.otp.config.language
  };
};

const mapDispatchToProps = {
  setMainPanelContent: _ui.setMainPanelContent
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AppMenu);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=app-menu.js