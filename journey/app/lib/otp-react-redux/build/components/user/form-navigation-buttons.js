"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Styles
const StyledFormGroup = (0, _styledComponents.default)(_reactBootstrap.FormGroup)`
  padding: 20px 0px;
`;
const LeftButton = (0, _styledComponents.default)(_reactBootstrap.Button)`
  float: left;
`;
const RightButton = (0, _styledComponents.default)(_reactBootstrap.Button)`
  float: right;
`;
/**
 * The button bar at the bottom of the account screen.
 */

const FormNavigationButtons = ({
  backButton,
  okayButton
}) => /*#__PURE__*/_react.default.createElement(StyledFormGroup, null, /*#__PURE__*/_react.default.createElement("nav", {
  "aria-label": "..."
}, backButton && /*#__PURE__*/_react.default.createElement(LeftButton, {
  disabled: backButton.disabled,
  onClick: backButton.onClick
}, backButton.text), okayButton && /*#__PURE__*/_react.default.createElement(RightButton, {
  bsStyle: "primary",
  disabled: okayButton.disabled,
  onClick: okayButton.onClick
}, okayButton.text)));

const buttonType = _propTypes.default.shape({
  disabled: _propTypes.default.bool,

  /** Triggered when the button is clicked. */
  onClick: _propTypes.default.func.isRequired,

  /** The text to display on the button. */
  text: _propTypes.default.string
});

FormNavigationButtons.propTypes = {
  /** Information about the back button. */
  backButton: buttonType,

  /** Information about the okay (action) button. */
  okayButton: buttonType
};
FormNavigationButtons.defaultProps = {
  backButton: null,
  okayButton: null
};
var _default = FormNavigationButtons;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=form-navigation-buttons.js