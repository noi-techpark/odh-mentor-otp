"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submodeSelector = exports.modeSelector = exports.modeButtons = exports.generalSettingsPanel = exports.dropdownSelector = exports.dateTimeSelector = exports.checkboxSelector = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _addonInfo = require("@storybook/addon-info");

var _addonKnobs = require("@storybook/addon-knobs");

var Icons = _interopRequireWildcard(require("@opentripplanner/icons"));

var Core = _interopRequireWildcard(require("."));

var _modes = _interopRequireDefault(require("./__mocks__/modes"));

var _modeOptions = _interopRequireDefault(require("./__mocks__/mode-options"));

var _submodeOptions = _interopRequireDefault(require("./__mocks__/submode-options"));

var _trimet = _interopRequireDefault(require("./__mocks__/trimet.styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const headingStyle = {
  fontFamily: "sans-serif",
  fontSize: "16px"
};

const decorator = story => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
  style: headingStyle
}, "Plain"), /*#__PURE__*/_react.default.createElement("div", null, story()), /*#__PURE__*/_react.default.createElement("p", {
  style: headingStyle
}, "Styled"), /*#__PURE__*/_react.default.createElement("div", null, (0, _trimet.default)(story())));

var _default = {
  title: "Trip Form Components",
  decorators: [decorator, _addonInfo.withInfo, _addonKnobs.withKnobs]
}; // Events

exports.default = _default;
const onChange = (0, _addonActions.action)("onChange");
const onClick = (0, _addonActions.action)("onClick");
const onQueryParamChange = (0, _addonActions.action)("onQueryParamChange");

const checkboxSelector = () => /*#__PURE__*/_react.default.createElement(Core.CheckboxSelector, {
  name: "MyParam",
  style: {
    display: "inline-block",
    width: "250px"
  },
  label: "Check me.",
  onChange: onChange
});

exports.checkboxSelector = checkboxSelector;

const dateTimeSelector = () => /*#__PURE__*/_react.default.createElement(Core.DateTimeSelector, {
  departArrive: "NOW",
  date: "2020-02-15",
  dateFormatLegacy: (0, _addonKnobs.text)("dateFormatLegacy", "YY-M-d"),
  forceLegacy: (0, _addonKnobs.boolean)("forceLegacy", false),
  time: "14:17",
  timeFormatLegacy: (0, _addonKnobs.text)("timeFormatLegacy", "HH:mm"),
  onQueryParamChange: onQueryParamChange
});

exports.dateTimeSelector = dateTimeSelector;

const dropdownSelector = () => /*#__PURE__*/_react.default.createElement(Core.DropdownSelector, {
  name: "MyParam",
  style: {
    display: "inline-block",
    width: "250px"
  },
  label: "Pick an option:",
  options: [{
    text: "Option 1",
    value: "Value1"
  }, {
    text: "Option 2",
    value: "Value2"
  }],
  onChange: onChange,
  value: "Value2"
});

exports.dropdownSelector = dropdownSelector;

const generalSettingsPanel = () => /*#__PURE__*/_react.default.createElement(Core.GeneralSettingsPanel, {
  query: {
    mode: (0, _addonKnobs.text)("mode", "WALK,BUS,TRAM,SUBWAY"),
    routingType: "ITINERARY"
  },
  onQueryParamChange: onQueryParamChange,
  supportedModes: _modes.default
});

exports.generalSettingsPanel = generalSettingsPanel;

const Space = () => /*#__PURE__*/_react.default.createElement("span", {
  style: {
    display: "inline-block",
    width: "1em"
  }
});

const modeButtons = () => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Core.ModeButton, {
  onClick: onClick,
  title: "Normal"
}, /*#__PURE__*/_react.default.createElement(Icons.Max, null), "+", /*#__PURE__*/_react.default.createElement(Icons.Bike, null), "Go by train", /*#__PURE__*/_react.default.createElement("span", {
  style: {
    fontSize: "150%",
    color: "red"
  }
}, " or "), " bike"), /*#__PURE__*/_react.default.createElement(Space, null), /*#__PURE__*/_react.default.createElement(Core.ModeButton, {
  selected: true,
  onClick: onClick,
  title: "Active"
}, /*#__PURE__*/_react.default.createElement(Icons.Max, null), "Train"), /*#__PURE__*/_react.default.createElement(Space, null), /*#__PURE__*/_react.default.createElement(Core.ModeButton, {
  enabled: false,
  label: "Can't Select!",
  onClick: onClick,
  title: "Disabled"
}, /*#__PURE__*/_react.default.createElement(Icons.AlertSolid, null), "Can't select!", /*#__PURE__*/_react.default.createElement(Icons.Alert, null))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Core.ModeButton, {
  onClick: onClick,
  showTitle: false,
  title: "Walk Only"
}, /*#__PURE__*/_react.default.createElement(Icons.Max, null), "Walk Only")));

exports.modeButtons = modeButtons;

const modeSelector = () => /*#__PURE__*/_react.default.createElement(Core.ModeSelector, {
  modes: _modeOptions.default,
  onChange: onChange
});

exports.modeSelector = modeSelector;

const submodeSelector = () => /*#__PURE__*/_react.default.createElement(Core.SubmodeSelector, {
  inline: (0, _addonKnobs.boolean)("inline", false),
  label: "Submodes:",
  modes: _submodeOptions.default,
  onChange: onChange
});

exports.submodeSelector = submodeSelector;

//# sourceMappingURL=components.story.js