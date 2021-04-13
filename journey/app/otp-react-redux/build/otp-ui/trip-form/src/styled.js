"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsSelectorPanel = exports.GeneralSettingsPanel = exports.DropdownSelector = exports.ModeButton = exports.SubmodeSelector = exports.ModeSelector = exports.DateTimeSelector = exports.FloatingSettingLabel = exports.SettingLabel = exports.SettingsSection = exports.SettingsHeader = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SettingsHeader = _styledComponents.default.div``;
exports.SettingsHeader = SettingsHeader;
const SettingsSection = _styledComponents.default.div``;
exports.SettingsSection = SettingsSection;
const SettingLabel = _styledComponents.default.label``;
exports.SettingLabel = SettingLabel;
const FloatingSettingLabel = (0, _styledComponents.default)(SettingLabel)`
  float: left;
`;
exports.FloatingSettingLabel = FloatingSettingLabel;
const DateTimeSelector = _styledComponents.default.div``;
exports.DateTimeSelector = DateTimeSelector;
DateTimeSelector.DepartureRow = _styledComponents.default.div`
  box-sizing: border-box;
  > * {
    box-sizing: border-box;
    width: 33.333333%;
    padding: 0px 5px;
  }
`;
DateTimeSelector.DateTimeRow = _styledComponents.default.div`
  box-sizing: border-box;
  > * {
    box-sizing: border-box;
    width: 50%;
    padding: 0px 5px;
    display: inline-block;
  }
  input {
    box-sizing: border-box;
    width: 100%;
  }
`;
const ModeSelector = _styledComponents.default.div``;
exports.ModeSelector = ModeSelector;
ModeSelector.MainRow = _styledComponents.default.div`
  padding: 0px 5px;
  box-sizing: border-box;
  > * {
    width: 100%;
  }
`;
ModeSelector.SecondaryRow = _styledComponents.default.div`
  > * {
    width: 33.333333%;
    padding: 0px 5px;
  }
`;
ModeSelector.TertiaryRow = _styledComponents.default.div`
  > * {
    width: 33.333333%;
    padding: 0px 5px;
  }
`;
const SubmodeSelector = (0, _styledComponents.default)(SettingsSection)``;
exports.SubmodeSelector = SubmodeSelector;
SubmodeSelector.Row = _styledComponents.default.div``;
SubmodeSelector.InlineRow = (0, _styledComponents.default)(SubmodeSelector.Row)`
  text-align: right;
`;
const ModeButton = _styledComponents.default.div`
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  > * {
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
  }
`;
exports.ModeButton = ModeButton;
ModeButton.Title = _styledComponents.default.div`
  font-size: 70%;
  &.disabled {
    color: #ccc;
  }
`;
ModeButton.Button = _styledComponents.default.button`
  cursor: pointer;
  width: 100%;
  height: 100%;

  svg,
  img {
    vertical-align: middle;
    max-width: 1.25em;
    margin: 0 0.25em;
    height: 1.25em;
  }
  &.active {
    font-weight: 600;
    box-shadow: 0 0 2px 2px rgba(0, 64, 255, 0.5);
  }
  &.disabled {
    cursor: default;
  }
  &.disabled svg {
    fill: #ccc;
  }
`;
const DropdownSelector = _styledComponents.default.div`
  > div {
    width: 50%;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
  }
  select {
    width: 100%;
    box-sizing: border-box;
  }
`;
exports.DropdownSelector = DropdownSelector;
const GeneralSettingsPanel = _styledComponents.default.div``;
exports.GeneralSettingsPanel = GeneralSettingsPanel;
const SettingsSelectorPanel = _styledComponents.default.div``;
exports.SettingsSelectorPanel = SettingsSelectorPanel;

//# sourceMappingURL=styled.js