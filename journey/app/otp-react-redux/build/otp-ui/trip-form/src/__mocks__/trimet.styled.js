"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var TripFormClasses = _interopRequireWildcard(require("../styled"));

require("./trimet-mock.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This file is provided as an illustrative example for custom styling.
 */
// Downloads the font.
const TriMetStyled = _styledComponents.default.div`
  font-family: Hind, sans-serif;
  font-size: 14px;
  background-color: #f0f0f0;
  padding: 15px;

  ${TripFormClasses.SettingsHeader} {
    color: #333333;
    font-size: 18px;
    margin: 16px 0px;
  }
  ${TripFormClasses.SettingsSection} {
    margin-bottom: 16px;
  }
  ${TripFormClasses.SettingLabel} {
    padding-top: 8px;
    color: #808080;
    font-weight: 100;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  ${TripFormClasses.ModeButton.Button} {
    border: 1px solid rgb(187, 187, 187);
    padding: 3px;
    border-radius: 3px;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    background: none;
    outline: none;

    &.active {
      border: 2px solid rgb(0, 0, 0);
      background-color: rgb(173, 216, 230);
      font-weight: 600;
      box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    }
  }
  ${TripFormClasses.ModeButton.Title} {
    padding: 4px 0px 0px;
    font-size: 10px;
    line-height: 12px;

    &.active {
      text-decoration: underline;
    }
  }
  ${TripFormClasses.DateTimeSelector.DateTimeRow} {
    margin: 15px 0px;
    input {
      padding: 6px 12px;
      text-align: center;
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      border: 0;
      border-bottom: 1px solid #000;
    }
  }
  ${TripFormClasses.DropdownSelector} {
    select {
      -webkit-appearance: none;
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      margin-bottom: 15px;
      background: none;
      border-radius: 3px;
      padding: 6px 12px;
      border: 1px solid #ccc;
      height: 34px;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      line-height: 1.42857;
      color: #555;
    }
    > div:last-child::after {
      content: "▼";
      font-size: 75%;
      color: #000;
      right: 8px;
      top: 10px;
      position: absolute;
      pointer-events: none;
      box-sizing: border-box;
    }
  }
  ${TripFormClasses.SubmodeSelector.Row} {
    font-size: 85%;
    > * {
      padding: 3px 5px 3px 0px;
    }
    > :last-child {
      padding-right: 0px;
    }
    button {
      padding: 6px 12px;
    }
    svg,
    img {
      margin-left: 0px;
    }
  }
  ${TripFormClasses.SubmodeSelector.InlineRow} {
    margin: -3px 0px;
  }
  ${TripFormClasses.ModeSelector.MainRow} {
    padding: 0px 5px;
    font-size: 200%;
    margin-bottom: 18px;
    box-sizing: border-box;
    > * {
      width: 100%;
      height: 55px;
    }
  }
  ${TripFormClasses.ModeSelector.SecondaryRow} {
    margin-bottom: 10px;
    > * {
      font-size: 150%;
      height: 46px;
    }
  }
  ${TripFormClasses.ModeSelector.TertiaryRow} {
    font-size: 90%;
    margin-bottom: 10px;
    text-align: center;
    > * {
      height: 36px;
    }
  }
`;

const trimet = contents => /*#__PURE__*/_react.default.createElement(TriMetStyled, null, contents);

var _default = trimet;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trimet.styled.js