"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _dateTimePreview = _interopRequireDefault(require("./date-time-preview"));

var _settingsPreview = _interopRequireDefault(require("./settings-preview"));

var _dateTimeModal = _interopRequireDefault(require("./date-time-modal"));

var _connectedSettingsSelectorPanel = _interopRequireDefault(require("./connected-settings-selector-panel"));

var _ui = require("../../actions/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TabbedFormPanel extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onEditDateTimeClick", () => {
      const {
        mainPanelContent,
        setMainPanelContent
      } = this.props;
      setMainPanelContent(mainPanelContent === 'EDIT_DATETIME' ? null : 'EDIT_DATETIME');
    });

    _defineProperty(this, "_onEditSettingsClick", () => {
      const {
        mainPanelContent,
        setMainPanelContent
      } = this.props;
      setMainPanelContent(mainPanelContent === 'EDIT_SETTINGS' ? null : 'EDIT_SETTINGS');
    });

    _defineProperty(this, "_onHideClick", () => this.props.setMainPanelContent(null));
  }

  render() {
    const {
      ModeIcon,
      mainPanelContent
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "tabbed-form-panel"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "tab-row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `tab left ${mainPanelContent === 'EDIT_DATETIME' ? ' selected' : ''}`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "tab-content"
    }, /*#__PURE__*/_react.default.createElement(_dateTimePreview.default, {
      onClick: this._onEditDateTimeClick
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: `tab right ${mainPanelContent === 'EDIT_SETTINGS' ? ' selected' : ''}`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "tab-content"
    }, /*#__PURE__*/_react.default.createElement(_settingsPreview.default, {
      onClick: this._onEditSettingsClick
    })))), (mainPanelContent === 'EDIT_DATETIME' || mainPanelContent === 'EDIT_SETTINGS') && /*#__PURE__*/_react.default.createElement("div", {
      className: "active-panel"
    }, mainPanelContent === 'EDIT_DATETIME' && /*#__PURE__*/_react.default.createElement(_dateTimeModal.default, null), mainPanelContent === 'EDIT_SETTINGS' && /*#__PURE__*/_react.default.createElement(_connectedSettingsSelectorPanel.default, {
      ModeIcon: ModeIcon
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "hide-button-row"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "hide-button clear-button-formatting",
      onClick: this._onHideClick
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-caret-up"
    }), " \"$_hide_settings_$\""))));
  }

} // connect to redux store


_defineProperty(TabbedFormPanel, "propTypes", {
  ModeIcon: _propTypes.default.elementType.isRequired
});

const mapStateToProps = (state, ownProps) => {
  return {
    mainPanelContent: state.otp.ui.mainPanelContent
  };
};

const mapDispatchToProps = {
  setMainPanelContent: _ui.setMainPanelContent
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TabbedFormPanel);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=tabbed-form-panel.js