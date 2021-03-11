"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledDateTimeSelector = exports.StyledSettingsSelectorPanel = exports.modeButtonButtonCss = void 0;

require("core-js/modules/es6.object.freeze");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _tripForm = require("@opentripplanner/trip-form");

var TripFormClasses = _interopRequireWildcard(require("@opentripplanner/trip-form/lib/styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  margin: 0 -15px 15px;\n\n  ", " {\n    margin: 20px 0px 15px;\n    input {\n      ", "\n      background-color: #fff;\n      border: 0;\n      border-bottom: 1px solid #000;\n      box-shadow: none;\n      outline: none;\n      text-align: center;\n    }\n  }\n  ", " {\n    ", "\n    font-size: 14px;\n    height: 35px;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n\n  ", " {\n    color: #808080;\n    font-size: 14px;\n    font-weight: 100;\n    letter-spacing: 1px;\n    padding-top: 8px;\n    text-transform: uppercase;\n  }\n  ", " {\n    color: #333333;\n    font-size: 18px;\n    margin: 16px 0px;\n  }\n  ", " {\n    margin-bottom: 16px;\n  }\n  ", " {\n    select {\n      ", "\n      -webkit-appearance: none;\n      border-radius: 3px;\n      font-size: 14px;\n      height: 34px;\n      line-height: 1.42857;\n      margin-bottom: 20px;\n\n      &:focus {\n        border-color: #66afe9;\n        box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);\n        outline: 0;\n      }\n    }\n    > div:last-child::after {\n      box-sizing: border-box;\n      color: #000;\n      content: \"\u25BC\";\n      font-size: 67%;\n      pointer-events: none;\n      position: absolute;\n      right: 8px;\n      top: 10px;\n    }\n  }\n\n  ", " {\n    font-weight: 300;\n    ", " {\n      box-shadow: none;\n      outline: none;\n      padding: 3px;\n    }\n    ", " {\n      font-size: 10px;\n      line-height: 12px;\n      padding: 4px 0px 0px;\n\n      &.active {\n        font-weight: 600;\n      }\n    }\n  }\n  ", " {\n    box-sizing: border-box;\n    font-size: 170%;\n    margin: 0px -10px 18px;\n    padding: 0px 5px;\n    ", " {\n      height: 54px;\n      width: 100%;\n      &.active {\n        font-weight: 600;\n      }\n    }\n  }\n  ", " {\n    margin: 0px -10px 10px;\n    ", " {\n      font-size: 130%;\n      font-weight: 800;\n      height: 46px;\n      > svg {\n        margin: 0 0.20em;\n      }\n    }\n  }\n  ", " {\n    font-size: 80%;\n    font-weight: 300;\n    margin: 0px -10px 10px;\n    text-align: center;\n    ", " {\n      height: 36px;\n    }\n  }\n  ", " {\n    font-size: 12px;\n    > * {\n      padding: 3px 5px 3px 0px;\n    }\n    > :last-child {\n      padding-right: 0px;\n    }\n    ", " {\n      height: 35px;\n    }\n    svg,\n    img {\n      margin-left: 0px;\n    }\n  }\n  ", " {\n    ", " {\n      margin-bottom: 0;\n    }\n  }\n  ", " {\n    margin: -3px 0px;\n    svg,\n    img {\n      height: 18px;\n      max-width: 32px;\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", " {\n    ", "\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  background: none;\n  border: 1px solid #ccc;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #555;\n  font-family: inherit;\n  font-weight: inherit;\n  padding: 6px 12px;\n  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  background: none;\n  border: 1px solid rgb(187, 187, 187);\n  border-radius: 3px;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  outline-offset: -2px;\n  padding: 6px 12px;\n  text-align: center;\n  touch-action: manipulation;\n  user-select: none;\n\n  &.active {\n    background-color: rgb(173, 216, 230);\n    border: 2px solid rgb(0, 0, 0);\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);\n    font-weight: 600;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var commonButtonCss = (0, _styledComponents.css)(_templateObject());
var commonInputCss = (0, _styledComponents.css)(_templateObject2());
var modeButtonButtonCss = (0, _styledComponents.css)(_templateObject3(), TripFormClasses.ModeButton.Button, commonButtonCss);
exports.modeButtonButtonCss = modeButtonButtonCss;
var StyledSettingsSelectorPanel = (0, _styledComponents.default)(_tripForm.SettingsSelectorPanel)(_templateObject4(), modeButtonButtonCss, TripFormClasses.SettingLabel, TripFormClasses.SettingsHeader, TripFormClasses.SettingsSection, TripFormClasses.DropdownSelector, commonInputCss, TripFormClasses.ModeSelector, TripFormClasses.ModeButton.Button, TripFormClasses.ModeButton.Title, TripFormClasses.ModeSelector.MainRow, TripFormClasses.ModeButton.Button, TripFormClasses.ModeSelector.SecondaryRow, TripFormClasses.ModeButton.Button, TripFormClasses.ModeSelector.TertiaryRow, TripFormClasses.ModeButton.Button, TripFormClasses.SubmodeSelector.Row, TripFormClasses.ModeButton.Button, TripFormClasses.SubmodeSelector, TripFormClasses.SettingLabel, TripFormClasses.SubmodeSelector.InlineRow);
exports.StyledSettingsSelectorPanel = StyledSettingsSelectorPanel;
var StyledDateTimeSelector = (0, _styledComponents.default)(_tripForm.DateTimeSelector)(_templateObject5(), TripFormClasses.DateTimeSelector.DateTimeRow, commonInputCss, TripFormClasses.ModeButton.Button, commonButtonCss);
exports.StyledDateTimeSelector = StyledDateTimeSelector;

//# sourceMappingURL=styled.js