"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Styled = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ModeButton lets the user pick a travel mode.
 * It includes the actual button that supports HTML/React text and graphics,
 * and a title displayed when hovering the mouse over the button, and, optionally, underneath it.
 * A ModeButton can be enabled or disabled, active or inactive.
 */
const ModeButton = props => {
  const {
    className,
    children,
    enabled,
    onClick,
    selected,
    showTitle,
    title,
    style
  } = props;
  const activeClassName = selected ? "active" : "";
  const disabledClassName = enabled ? "" : "disabled";
  return /*#__PURE__*/_react.default.createElement(Styled.ModeButton, {
    className: className,
    style: style
  }, /*#__PURE__*/_react.default.createElement(Styled.ModeButton.Button, {
    className: `${activeClassName} ${disabledClassName}`,
    onClick: onClick,
    title: title,
    disabled: !enabled
  }, children), title && showTitle && /*#__PURE__*/_react.default.createElement(Styled.ModeButton.Title, {
    className: `${activeClassName} ${disabledClassName}`,
    title: title
  }, title));
};

ModeButton.propTypes = {
  /**
   * The contents of the button. Can be any HTML/React content.
   */
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.arrayOf(_propTypes.default.node)]),

  /**
   * The CSS class name to apply to this element.
   */
  className: _propTypes.default.string,

  /**
   * Determines whether the button is currently enabled.
   */
  enabled: _propTypes.default.bool,

  /**
   * Triggered when the user clicks the button.
   */
  onClick: _propTypes.default.func,

  /**
   * Determines whether the button should appear selected.
   */
  selected: _propTypes.default.bool,

  /**
   * Determines whether the title should be displayed (underneath the button).
   */
  showTitle: _propTypes.default.bool,

  /**
   * A title text for the button, displayed as popup when the user hover the mouse over the button,
   * and optionally displayed underneath the button if showTitle is true.
   */
  title: _propTypes.default.string
};
ModeButton.defaultProps = {
  children: null,
  className: null,
  enabled: true,
  onClick: null,
  selected: false,
  showTitle: true,
  title: null
};
var _default = ModeButton;
exports.default = _default;