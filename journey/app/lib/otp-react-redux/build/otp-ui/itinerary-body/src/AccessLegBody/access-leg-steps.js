"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccessLegSteps;

var _itinerary = require("../../../core-utils/src/itinerary");

var _types = require("../../../core-utils/src/types");

var _directions = require("../../../icons/src/directions");

var _react = _interopRequireDefault(require("react"));

var Styled = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AccessLegSteps({
  steps
}) {
  return /*#__PURE__*/_react.default.createElement(Styled.Steps, null, steps.map((step, k) => {
    return /*#__PURE__*/_react.default.createElement(Styled.StepRow, {
      key: k
    }, /*#__PURE__*/_react.default.createElement(Styled.StepIconContainer, null, /*#__PURE__*/_react.default.createElement(_directions.DirectionIcon, {
      relativeDirection: step.relativeDirection
    })), /*#__PURE__*/_react.default.createElement(Styled.StepDescriptionContainer, null, (0, _itinerary.getStepDirection)(step), /*#__PURE__*/_react.default.createElement("span", null, step.relativeDirection === "ELEVATOR" ? " $_to_$ " : " $_on_$ "), /*#__PURE__*/_react.default.createElement(Styled.StepStreetName, null, (0, _itinerary.getStepStreetName)(step))));
  }));
}

AccessLegSteps.propTypes = {
  steps: _types.stepsType.isRequired
};
module.exports = exports.default;

//# sourceMappingURL=access-leg-steps.js