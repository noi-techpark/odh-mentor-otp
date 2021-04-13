"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _time = require("../../../core-utils/src/time");

var _types = require("../../../core-utils/src/types");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _velocityReact = require("velocity-react");

var _accessLegSteps = _interopRequireDefault(require("./access-leg-steps"));

var _accessLegSummary = _interopRequireDefault(require("./access-leg-summary"));

var _legDiagramPreview = _interopRequireDefault(require("./leg-diagram-preview"));

var _rentedVehicleSubheader = _interopRequireDefault(require("./rented-vehicle-subheader"));

var Styled = _interopRequireWildcard(require("../styled"));

var _tncLeg = _interopRequireDefault(require("./tnc-leg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Component for access (e.g. walk/bike/etc.) leg in narrative itinerary. This
 * particular component is used in the line-itin (i.e., trimet-mod-otp) version
 * of the narrative itinerary.
 */
class AccessLegBody extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onStepsHeaderClick", () => {
      const {
        expanded
      } = this.state;
      this.setState({
        expanded: !expanded
      });
    });

    _defineProperty(this, "onSummaryClick", () => {
      const {
        leg,
        legIndex,
        setActiveLeg
      } = this.props;
      setActiveLeg(legIndex, leg);
    });

    this.state = {
      expanded: false
    };
  }

  render() {
    const {
      config,
      diagramVisible,
      followsTransit,
      leg,
      LegIcon,
      setLegDiagram,
      showElevationProfile,
      showLegIcon,
      timeOptions
    } = this.props;
    const {
      expanded
    } = this.state;

    if (leg.mode === "CAR" && leg.hailedCar) {
      return /*#__PURE__*/_react.default.createElement(_tncLeg.default, {
        config: config,
        followsTransit: followsTransit,
        leg: leg,
        LegIcon: LegIcon,
        onSummaryClick: this.onSummaryClick,
        showLegIcon: showLegIcon,
        timeOptions: timeOptions
      });
    }

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, leg && (leg.rentedVehicle || leg.rentedBike || leg.rentedCar) && /*#__PURE__*/_react.default.createElement(_rentedVehicleSubheader.default, {
      config: config,
      leg: leg
    }), /*#__PURE__*/_react.default.createElement(Styled.LegBody, null, /*#__PURE__*/_react.default.createElement(_accessLegSummary.default, {
      config: config,
      leg: leg,
      LegIcon: LegIcon,
      onSummaryClick: this.onSummaryClick,
      showLegIcon: showLegIcon
    }), /*#__PURE__*/_react.default.createElement(Styled.StepsHeader, {
      onClick: this.onStepsHeaderClick
    }, (0, _time.formatDuration)(leg.duration), leg.steps && /*#__PURE__*/_react.default.createElement("span", null, " ", /*#__PURE__*/_react.default.createElement(Styled.CaretToggle, {
      expanded: expanded
    }))), /*#__PURE__*/_react.default.createElement(_legDiagramPreview.default, {
      diagramVisible: diagramVisible,
      leg: leg,
      setLegDiagram: setLegDiagram,
      showElevationProfile: showElevationProfile
    }), /*#__PURE__*/_react.default.createElement(_velocityReact.VelocityTransitionGroup, {
      enter: {
        animation: "slideDown"
      },
      leave: {
        animation: "slideUp"
      }
    }, expanded && /*#__PURE__*/_react.default.createElement(_accessLegSteps.default, {
      steps: leg.steps
    }))));
  }

}

exports.default = AccessLegBody;
AccessLegBody.propTypes = {
  config: _types.configType.isRequired,

  /**
   * Should be either null or a legType. Indicates that a particular leg diagram
   * has been selected and is active.
   */
  diagramVisible: _types.legType,
  followsTransit: _propTypes.default.bool,
  leg: _types.legType.isRequired,
  LegIcon: _propTypes.default.elementType.isRequired,
  legIndex: _propTypes.default.number.isRequired,
  setActiveLeg: _propTypes.default.func.isRequired,
  setLegDiagram: _propTypes.default.func.isRequired,
  showElevationProfile: _propTypes.default.bool.isRequired,
  showLegIcon: _propTypes.default.bool.isRequired,
  timeOptions: _types.timeOptionsType
};
AccessLegBody.defaultProps = {
  diagramVisible: null,
  followsTransit: false,
  timeOptions: null
};
module.exports = exports.default;

//# sourceMappingURL=index.js