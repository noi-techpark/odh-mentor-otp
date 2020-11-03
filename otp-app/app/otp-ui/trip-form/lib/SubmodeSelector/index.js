"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _types = require("@opentripplanner/core-utils/lib/types");

var _ModeButton = _interopRequireDefault(require("../ModeButton"));

var Styled = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SubmodeSelector is the control container where the OTP user selects
 * the submodes (e.g. train, bus) for transit, or the providers for TNC and rental companies.
 */
const SubmodeSelector = props => {
  const {
    className,
    inline,
    label,
    modes,
    onChange,
    style
  } = props;
  const LabelType = inline ? Styled.FloatingSettingLabel : Styled.SettingLabel;
  const RowType = inline ? Styled.SubmodeSelector.InlineRow : Styled.SubmodeSelector.Row;
  return /*#__PURE__*/_react.default.createElement(Styled.SubmodeSelector, {
    className: className,
    style: style
  }, label && /*#__PURE__*/_react.default.createElement(LabelType, null, label), /*#__PURE__*/_react.default.createElement(RowType, null, modes && modes.map(option => /*#__PURE__*/_react.default.createElement(_ModeButton.default, {
    key: option.id,
    selected: option.selected,
    showTitle: false,
    title: option.title,
    onClick: () => onChange(option.id)
  }, option.text))));
};

SubmodeSelector.propTypes = {
  /**
   * The CSS class name to apply to this element.
   */
  className: _propTypes.default.string,

  /**
   * Determines how the label and mode buttons are displayed.
   */
  inline: _propTypes.default.bool,

  /**
   * The optional text to display before the submodes.
   */
  label: _propTypes.default.string,

  /**
   * An array of submodes for the trip query, i.e. transit modes, TNC, or rental companies.
   */
  modes: _propTypes.default.arrayOf(_types.modeOptionType),

  /**
   * Triggered when the user toggles a submode.
   * @param id The id of the option clicked.
   */
  onChange: _propTypes.default.func
};
SubmodeSelector.defaultProps = {
  className: null,
  inline: false,
  label: null,
  modes: null,
  onChange: null
};
var _default = SubmodeSelector;
exports.default = _default;