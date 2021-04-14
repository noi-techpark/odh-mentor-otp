"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledLocationIcon = (0, _styledComponents.default)(_.default)`
  color: blue;
`;
(0, _react2.storiesOf)("LocationIcon", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).addParameters({
  info: {
    text: "A simple component used to show the from or to location icon"
  }
}).add("From LocationIcon", () => /*#__PURE__*/_react.default.createElement(_.default, {
  type: "from",
  size: 25
})).add("To LocationIcon", () => /*#__PURE__*/_react.default.createElement(_.default, {
  type: "to",
  size: 25
})).add("To LocationIcon test", () => /*#__PURE__*/_react.default.createElement(StyledLocationIcon, {
  type: "to",
  size: 25
}));

//# sourceMappingURL=LocationIcon.story.js