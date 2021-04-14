"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _form = require("../../actions/form");

var _state = require("../../util/state");

var _styled = require("./styled");

var _userTripSettings = _interopRequireDefault(require("./user-trip-settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: Button title should be bold when button is selected.
class ConnectedSettingsSelectorPanel extends _react.Component {
  render() {
    const {
      config,
      ModeIcon,
      query,
      setQueryParam,
      showUserSettings
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "settings-selector-panel"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "modes-panel"
    }, showUserSettings && /*#__PURE__*/_react.default.createElement(_userTripSettings.default, null), /*#__PURE__*/_react.default.createElement(_styled.StyledSettingsSelectorPanel, {
      ModeIcon: ModeIcon,
      queryParams: query,
      supportedModes: config.modes,
      supportedCompanies: config.companies,
      onQueryParamChange: setQueryParam
    })));
  }

} // connect to redux store


_defineProperty(ConnectedSettingsSelectorPanel, "propTypes", {
  ModeIcon: _propTypes.default.elementType.isRequired
});

const mapStateToProps = (state, ownProps) => {
  const {
    config,
    currentQuery
  } = state.otp;
  return {
    query: currentQuery,
    config,
    showUserSettings: (0, _state.getShowUserSettings)(state.otp)
  };
};

const mapDispatchToProps = {
  setQueryParam: _form.setQueryParam
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConnectedSettingsSelectorPanel);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-settings-selector-panel.js