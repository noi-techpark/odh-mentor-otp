"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingsSelectorPanelUndefinedParams = exports.settingsSelectorPanelWithCustomIcons = exports.settingsSelectorPanel = exports.default = void 0;

var _icons = require("@opentripplanner/icons");

var _react = _interopRequireWildcard(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _addonInfo = require("@storybook/addon-info");

var _SettingsSelectorPanel = _interopRequireDefault(require("./SettingsSelectorPanel"));

var _companies = _interopRequireDefault(require("./__mocks__/companies"));

var _modes = _interopRequireDefault(require("./__mocks__/modes"));

var _modesEmpty = _interopRequireDefault(require("./__mocks__/modes-empty"));

var _trimet = _interopRequireDefault(require("./__mocks__/trimet.styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const headingStyle = {
  fontFamily: "sans-serif",
  fontSize: "16px"
};
const onQueryParamChange = (0, _addonActions.action)("onQueryParamChange");
const storyQueryParams = {
  mode: "WALK",
  routingType: "ITINERARY"
};

class PanelWrapper extends _react.Component {
  constructor() {
    super();

    _defineProperty(this, "handleOnQueryParamChange", queryParam => {
      const {
        queryParams
      } = this.state;
      const newParams = { ...queryParams,
        ...queryParam
      };
      onQueryParamChange(queryParam);
      this.setState({
        queryParams: newParams
      });
    });

    this.state = {
      queryParams: storyQueryParams
    };
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      children
    } = this.props;
    const {
      queryParams
    } = this.state;
    return /*#__PURE__*/_react.default.cloneElement(children, {
      onQueryParamChange: this.handleOnQueryParamChange,
      queryParams
    });
  }

}

const decorator = story => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", {
  style: headingStyle
}, "Plain"), /*#__PURE__*/_react.default.createElement("div", null, story()), /*#__PURE__*/_react.default.createElement("p", {
  style: headingStyle
}, "Styled"), /*#__PURE__*/_react.default.createElement("div", null, (0, _trimet.default)(story())));

var _default = {
  title: "SettingsSelectorPanel",
  decorators: [decorator, _addonInfo.withInfo]
};
exports.default = _default;

const settingsSelectorPanel = () => /*#__PURE__*/_react.default.createElement(PanelWrapper, null, /*#__PURE__*/_react.default.createElement(_SettingsSelectorPanel.default, {
  supportedModes: _modes.default,
  supportedCompanies: _companies.default
}));

exports.settingsSelectorPanel = settingsSelectorPanel;

const settingsSelectorPanelWithCustomIcons = () => /*#__PURE__*/_react.default.createElement(PanelWrapper, null, /*#__PURE__*/_react.default.createElement(_SettingsSelectorPanel.default, {
  ModeIcon: _icons.ClassicModeIcon,
  supportedModes: _modes.default,
  supportedCompanies: _companies.default
}));

exports.settingsSelectorPanelWithCustomIcons = settingsSelectorPanelWithCustomIcons;

const settingsSelectorPanelUndefinedParams = () => /*#__PURE__*/_react.default.createElement(PanelWrapper, null, /*#__PURE__*/_react.default.createElement(_SettingsSelectorPanel.default, {
  supportedModes: _modesEmpty.default,
  supportedCompanies: undefined
}));

exports.settingsSelectorPanelUndefinedParams = settingsSelectorPanelUndefinedParams;

//# sourceMappingURL=settings-selector-panel.story.js