"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _formNavigationButtons = _interopRequireDefault(require("./form-navigation-buttons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles.
// TODO: Improve layout.
const PaneContainer = _styledComponents.default.div`
  border-bottom: 1px solid #c0c0c0;
  > h3 {
    margin-top: 0.5em;
  }
  > div {
    margin-left: 10%;
  }
`;
/**
 * This component handles the flow between screens for new OTP user accounts.
 */

const StackedPaneDisplay = ({
  onCancel,
  onComplete,
  paneSequence,
  title
}) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, title && /*#__PURE__*/_react.default.createElement("h1", null, title), paneSequence.map(({
  pane: Pane,
  props,
  title
}, index) => /*#__PURE__*/_react.default.createElement(PaneContainer, {
  key: index
}, /*#__PURE__*/_react.default.createElement("h3", null, title), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Pane, props)))), /*#__PURE__*/_react.default.createElement(_formNavigationButtons.default, {
  backButton: {
    onClick: onCancel,
    text: 'Cancel'
  },
  okayButton: {
    onClick: onComplete,
    text: 'Save Preferences'
  }
}));

StackedPaneDisplay.propTypes = {
  onCancel: _propTypes.default.func.isRequired,
  onComplete: _propTypes.default.func.isRequired,
  paneSequence: _propTypes.default.array.isRequired
};
var _default = StackedPaneDisplay;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=stacked-pane-display.js