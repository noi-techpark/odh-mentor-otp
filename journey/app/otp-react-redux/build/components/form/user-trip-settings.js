"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _form = require("../../actions/form");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This component contains the `Remember/Forget my trip options` and `Restore defaults` commands
 * that let the user save the selected trip settings such as mode choices,
 * walk/bike distance and speed, and trip optimization flags.
 * (The code below was previously embedded inside the `SettingsSelectorPanel` component.)
 */
class UserTripSettings extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_toggleStoredSettings", () => {
      const options = _coreUtils.default.query.getTripOptionsFromQuery(this.props.query); // If user defaults are set, clear them. Otherwise, store them.


      if (this.props.defaults) this.props.clearDefaultSettings();else this.props.storeDefaultSettings(options);
    });
  }

  render() {
    const {
      config,
      defaults,
      query,
      resetForm
    } = this.props; // Do not permit remembering trip options if they do not differ from the
    // defaults and nothing has been stored

    const queryIsDefault = !_coreUtils.default.query.isNotDefaultQuery(query, config);
    const rememberIsDisabled = queryIsDefault && !defaults;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        marginBottom: '5px'
      },
      className: "store-settings pull-right"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsStyle: "link",
      bsSize: "xsmall",
      disabled: rememberIsDisabled,
      onClick: this._toggleStoredSettings
    }, defaults ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "times"
    }), " Dimentica Impostazioni") : /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "lock"
    }), " Ricorda impostazioni di viaggio")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsStyle: "link",
      bsSize: "xsmall",
      disabled: queryIsDefault && !defaults,
      onClick: resetForm
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "undo"
    }), ' ', "Restore", defaults ? ' my' : '', " defaults"));
  }

} // connect to redux store


const mapStateToProps = (state, ownProps) => {
  const {
    config,
    currentQuery,
    user
  } = state.otp;
  const {
    defaults
  } = user;
  return {
    config,
    defaults,
    query: currentQuery
  };
};

const mapDispatchToProps = {
  clearDefaultSettings: _form.clearDefaultSettings,
  resetForm: _form.resetForm,
  storeDefaultSettings: _form.storeDefaultSettings
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserTripSettings);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=user-trip-settings.js