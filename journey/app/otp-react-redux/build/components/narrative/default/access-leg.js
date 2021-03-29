"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _humanizeDistance = require("@opentripplanner/humanize-distance");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _icon = _interopRequireDefault(require("../icon"));

var _legDiagramPreview = _interopRequireDefault(require("../leg-diagram-preview"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Default access leg component for narrative itinerary.
 */
class AccessLeg extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onLegClick", e => {
      const {
        active,
        leg,
        index,
        setActiveLeg
      } = this.props;

      if (active) {
        setActiveLeg(null);
      } else {
        setActiveLeg(index, leg);
      }
    });
  }

  _onStepClick(e, step, index) {
    if (index === this.props.activeStep) {
      this.props.setActiveStep(null);
    } else {
      this.props.setActiveStep(index, step);
    }
  }

  render() {
    const {
      active,
      activeStep,
      index,
      leg
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      className: `leg${active ? ' active' : ''} access-leg`
    }, /*#__PURE__*/_react.default.createElement("button", {
      className: "header",
      onClick: this._onLegClick
    }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: `caret-${active ? 'down' : 'right'}`
    })), /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("b", null, leg.mode)), ' ', /*#__PURE__*/_react.default.createElement("span", {
      className: "leg-duration"
    }, _coreUtils.default.time.formatDuration(leg.duration)), ' ', /*#__PURE__*/_react.default.createElement("span", {
      className: "leg-distance"
    }, "(", (0, _humanizeDistance.humanizeDistanceString)(leg.distance), ")")), active && /*#__PURE__*/_react.default.createElement("div", {
      className: "step-by-step"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "access-leg"
    }, leg.steps.map((step, stepIndex) => {
      const stepIsActive = activeStep === stepIndex;
      return /*#__PURE__*/_react.default.createElement("button", {
        key: stepIndex,
        className: `step ${stepIsActive ? 'active' : ''}`,
        onClick: e => this._onStepClick(e, step, stepIndex)
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "step-distance"
      }, (0, _humanizeDistance.humanizeDistanceString)(step.distance)), /*#__PURE__*/_react.default.createElement("span", {
        className: "step-text"
      }, _coreUtils.default.itinerary.getStepInstructions(step)));
    }))), /*#__PURE__*/_react.default.createElement(_legDiagramPreview.default, {
      leg: leg
    }));
  }

}

exports.default = AccessLeg;

_defineProperty(AccessLeg, "propTypes", {
  activeStep: _propTypes.default.number,
  leg: _propTypes.default.object,
  setActiveLeg: _propTypes.default.func,
  setActiveStep: _propTypes.default.func
});

module.exports = exports.default;

//# sourceMappingURL=access-leg.js