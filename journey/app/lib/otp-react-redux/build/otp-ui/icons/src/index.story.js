"use strict";

require("core-js/modules/web.dom.iterable.js");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var Icons = _interopRequireWildcard(require("."));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Container({
  children
}) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 40
    }
  }, children);
}

const allStories = (0, _react2.storiesOf)("Icons", module);
const noStoryComponents = ["ClassicLegIcon", "ClassicModeIcon", "LegIcon", "StandardLegIcon", "StandardModeIcon", "TriMetLegIcon", "TriMetModeIcon"];
Object.keys(Icons).forEach(iconKey => {
  if (noStoryComponents.indexOf(iconKey) > -1) return;
  const Component = Icons[iconKey];
  allStories.add(iconKey, () => /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(Component, null)));
});

//# sourceMappingURL=index.story.js