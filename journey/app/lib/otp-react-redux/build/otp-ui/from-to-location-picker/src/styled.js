"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = exports.FromToPickerSpan = exports.LocationPickerSpan = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LocationPickerSpan = _styledComponents.default.span`
  :first-of-type {
    border-left: none;
  }
`;
exports.LocationPickerSpan = LocationPickerSpan;
const FromToPickerSpan = _styledComponents.default.span`
  > * {
    padding-left: 0.4em;
    border-left: 1px solid black;
  }
`;
exports.FromToPickerSpan = FromToPickerSpan;
const Button = _styledComponents.default.button`
  background: none;
  border: none;
  color: navy;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  padding-left: 0.2em;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
exports.Button = Button;

//# sourceMappingURL=styled.js