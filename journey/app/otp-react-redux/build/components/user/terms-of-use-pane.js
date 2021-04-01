"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * User terms of use pane.
 */
class TermsOfUsePane extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_handleCheckHistoryChange", e => {
      const {
        onUserDataChange
      } = this.props;
      onUserDataChange({
        storeTripHistory: e.target.checked
      });
    });

    _defineProperty(this, "_handleCheckTermsChange", e => {
      const {
        onUserDataChange
      } = this.props;
      onUserDataChange({
        hasConsentedToTerms: e.target.checked
      });
    });
  }

  render() {
    const {
      disableCheckTerms,
      userData
    } = this.props;
    const {
      hasConsentedToTerms,
      storeTripHistory
    } = userData;
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ControlLabel, null, "You must agree to the terms of service to continue."), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Checkbox, {
      checked: hasConsentedToTerms,
      disabled: disableCheckTerms,
      onChange: disableCheckTerms ? null : this._handleCheckTermsChange
    }, "I have read and consent to the ", /*#__PURE__*/_react.default.createElement("a", {
      href: "/#/terms-of-service"
    }, "Terms of Service"), " for using the Trip Planner.")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.FormGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Checkbox, {
      checked: storeTripHistory,
      onChange: this._handleCheckHistoryChange
    }, "Optional: I consent to the Trip Planner storing my historical planned trips in order to improve transit services in my area. ", /*#__PURE__*/_react.default.createElement("a", {
      href: "/#/terms-of-storage"
    }, "More info..."))));
  }

}

_defineProperty(TermsOfUsePane, "propTypes", {
  disableCheckTerms: _propTypes.default.bool,
  onUserDataChange: _propTypes.default.func.isRequired,
  userData: _propTypes.default.object.isRequired
});

var _default = TermsOfUsePane;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=terms-of-use-pane.js