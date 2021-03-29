"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _reactResizeDetector = _interopRequireDefault(require("react-resize-detector"));

var _map = require("../../actions/map");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  getElevationProfile,
  getTextWidth,
  legElevationAtDistance
} = _coreUtils.default.itinerary; // Fixed dimensions for chart

const height = 160;
const yAxisPanelWidth = 40; // width of y axis labels

const BASELINE_Y = height - 20;
const topElevYPx = 20;
const bottomElevYPx = height - 40;
const elevHeight = bottomElevYPx - topElevYPx;
const METERS_TO_FEET = 1;

class LegDiagram extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_determineCompressionFactor", (width, leg) => {
      const {
        traversed
      } = this._getElevationProfile(leg);

      if (traversed > 0) {
        // Determine the appropriate compression factor to scale the elevation
        // chart to fit the container width (i.e., remove the need for x-scrolling).
        const xAxisCompression = width / (traversed + yAxisPanelWidth);
        this.setState({
          xAxisCompression,
          width
        });
      }
    });

    _defineProperty(this, "_onResize", (width, height) => {
      this._determineCompressionFactor(width, this.props.leg);
    });

    _defineProperty(this, "_onMouseMove", evt => {
      const m = evt.clientX - this.container.getBoundingClientRect().left + this.container.scrollLeft;
      this.props.setElevationPoint(m / this.state.xAxisCompression);
    });

    _defineProperty(this, "_onMouseLeave", () => {
      this.props.setElevationPoint(null);
    });

    _defineProperty(this, "_onCloseButtonClick", () => {
      this.props.setLegDiagram(null);
      this.props.setElevationPoint(null);
    });

    _defineProperty(this, "_unitConversion", () => this.state.useImperialUnits ? METERS_TO_FEET : 1);

    _defineProperty(this, "_getElevationProfile", (0, _lodash.default)(leg => {
      if (!leg) return {};
      return getElevationProfile(leg.steps, this._unitConversion());
    }));

    this.state = {
      useImperialUnits: true,
      xAxisCompression: 0.5
    };
  }

  componentDidUpdate(prevProps) {
    const {
      leg
    } = this.props;

    if (leg && prevProps.leg && leg.startTime !== prevProps.leg.startTime) {
      this._determineCompressionFactor(this.state.width, leg);
    }
  }

  /** Round elevation to whole number and add symbol. */
  _formatElevation(elev) {
    return Math.round(elev) + (this.state.useImperialUnits ? `'` : 'm');
  }

  render() {
    const {
      elevationPoint
    } = this.props;
    const {
      xAxisCompression
    } = this.state;
    const {
      leg
    } = this.props;
    if (!leg) return null;
    const yAxisPanelSvgContent = [];
    const backgroundSvgContent = [];
    const mainSvgContent = [];
    const foregroundSvgContent = [];

    const {
      minElev,
      maxElev,
      points,
      traversed
    } = this._getElevationProfile(leg);

    const SVG_WIDTH = traversed * xAxisCompression;
    const range = maxElev - minElev;
    let rangeUnit;

    if (range > 4000) {
      rangeUnit = 1000;
    } else if (range > 2000) {
      rangeUnit = 500;
    } else if (range > 800) {
      rangeUnit = 250;
    } else if (range > 400) {
      rangeUnit = 100;
    } else {
      rangeUnit = 50;
    } // Compute the displayed elevation range


    const minDisplayed = Math.floor(minElev / rangeUnit) * rangeUnit;
    const maxDisplayed = Math.ceil(maxElev / rangeUnit) * rangeUnit;
    const displayedRange = maxDisplayed - minDisplayed; // Draw the y-axis labels & guidelines

    for (let elev = minDisplayed; elev <= maxDisplayed; elev += rangeUnit) {
      const y = topElevYPx + elevHeight - elevHeight * (elev - minDisplayed) / displayedRange;
      yAxisPanelSvgContent.push( /*#__PURE__*/_react.default.createElement("text", {
        key: `axis-label-${elev}`,
        x: yAxisPanelWidth - 3,
        y: y + 3,
        fontSize: 11,
        textAnchor: "end"
      }, this._formatElevation(elev)));
      backgroundSvgContent.push( /*#__PURE__*/_react.default.createElement("line", {
        key: `axis-guideline-${elev}`,
        x1: 0,
        y1: y,
        x2: SVG_WIDTH,
        y2: y,
        strokeWidth: 1,
        stroke: "#ccc",
        strokeDasharray: "1, 1"
      }));
    } // Process each step in this leg


    let currentX = 0;
    const ptArr = [];
    const stepArr = [currentX];
    const stepDetails = [];
    let previousPair;
    leg.steps.map((step, stepIndex) => {
      const stepWidthPx = step.distance * xAxisCompression;
      let gain = 0;
      let loss = 0; // Add this step to the polyline coords

      if (step.elevation && step.elevation.length > 0) {
        for (let i = 0; i < step.elevation.length; i++) {
          const elevPair = step.elevation[i];

          if (previousPair) {
            const diff = (elevPair.second - previousPair.second) * this._unitConversion();

            if (diff > 0) gain += diff;else loss += diff;
          }

          const x = currentX + elevPair.first * xAxisCompression; // - firstX

          const y = topElevYPx + elevHeight - elevHeight * (elevPair.second * this._unitConversion() - minDisplayed) / displayedRange;
          ptArr.push([x, y]);
          previousPair = elevPair;
        }
      } // Add the street segment as a horizontal line at the bottom of the diagram


      mainSvgContent.push( /*#__PURE__*/_react.default.createElement("line", {
        key: `step-${stepIndex}-line`,
        x1: currentX + 1,
        y1: BASELINE_Y,
        x2: currentX + stepWidthPx - 1,
        y2: BASELINE_Y,
        strokeWidth: 6,
        stroke: "#aaa"
      })); // Add The street name label, including clipping path to prevent overflow

      if (stepWidthPx > 30) {
        mainSvgContent.push( /*#__PURE__*/_react.default.createElement("g", {
          key: `step-${stepIndex}-label`
        }, /*#__PURE__*/_react.default.createElement("clipPath", {
          id: `clip-${stepIndex}`
        }, /*#__PURE__*/_react.default.createElement("rect", {
          x: currentX + 10,
          y: 0,
          width: stepWidthPx - 10,
          height: 200
        })), /*#__PURE__*/_react.default.createElement("text", {
          x: currentX + stepWidthPx / 2,
          y: BASELINE_Y + 16,
          fontSize: 11,
          textAnchor: "middle"
        }, gain >= 10 && /*#__PURE__*/_react.default.createElement("tspan", {
          fill: "red"
        }, "\u2191", this._formatElevation(gain), '  '), loss <= -10 && /*#__PURE__*/_react.default.createElement("tspan", {
          fill: "green"
        }, "\u2193", this._formatElevation(-loss)))));
      }

      currentX += stepWidthPx;
      stepArr.push(currentX);
      stepDetails.push({
        gain,
        loss
      });
    });

    if (ptArr.length === 0) {
      console.warn(`There is no elevation data to render for leg`, leg);
      return null;
    } // Add initial point if the first elevation entry does not start at zero
    // distance.


    if (ptArr[0][0] !== 0) ptArr.unshift([0, ptArr[0][1]]); // Add final points in order to round out area field.

    ptArr.push([SVG_WIDTH, ptArr[ptArr.length - 1][1]]);
    ptArr.push([ptArr[ptArr.length - 1][0], BASELINE_Y]);
    ptArr.push([0, BASELINE_Y]); // Construct and add the main elevation contour area

    const pts = ptArr.map((pt, i) => i === 0 ? `M${pt[0]} ${pt[1]}` : `L${pt[0]} ${pt[1]}`).join(' ');
    mainSvgContent.unshift( /*#__PURE__*/_react.default.createElement("path", {
      key: "elev-polyline",
      d: `${pts} Z`,
      strokeWidth: 0,
      fill: "lightsteelblue",
      fillOpacity: 0.5
    })); // Add the highlighted elevation point (on mouse hover), if actively hovering.

    if (elevationPoint) {
      const elev = legElevationAtDistance(points, elevationPoint);

      const elevConverted = elev * this._unitConversion();

      const x = elevationPoint * xAxisCompression;

      for (var i = 0; i < stepArr.length; i++) {
        if (x >= stepArr[i] && x <= stepArr[i + 1]) {
          const beginStep = stepArr[i]; // Mouse hover is at step i, add hover fill for street step and draw
          // street label

          const stepWidth = stepArr[i + 1] - beginStep;
          backgroundSvgContent.push( /*#__PURE__*/_react.default.createElement("rect", {
            key: `step-hover-${i}`,
            x: beginStep,
            y: 0,
            width: stepWidth,
            height: 200,
            fillOpacity: 0.5,
            fill: "#eee"
          }));
          const name = compressStreetName(leg.steps[i].streetName);
          const fontSize = 22;
          const midPoint = beginStep + stepWidth / 2; // Determine where to anchor hover street label text (to avoid
          // clipping on edges of svg).

          let anchor = 'middle';
          let x = midPoint;
          const halfLabelWidth = getTextWidth(name) / 2;

          if (midPoint - halfLabelWidth < 0) {
            // Anchor left edge of text to left of svg
            anchor = 'start';
            x = 0 + 3;
          } else if (midPoint + halfLabelWidth > SVG_WIDTH) {
            // Anchor right edge of text to right of svg
            anchor = 'end';
            x = SVG_WIDTH - 3;
          }

          backgroundSvgContent.push( /*#__PURE__*/_react.default.createElement("text", {
            key: `step-text-hover-${i}`,
            x: x,
            y: height / 2,
            fontSize: fontSize,
            textAnchor: anchor,
            fill: "#777",
            opacity: 0.6
          }, name));
        }
      }

      const y = elev !== null ? topElevYPx + elevHeight - elevHeight * (elevConverted - minDisplayed) / displayedRange : height / 2;
      backgroundSvgContent.push( /*#__PURE__*/_react.default.createElement("line", {
        key: "elev-point-line",
        x1: x,
        y1: elev !== null ? y : topElevYPx,
        x2: x,
        y2: BASELINE_Y,
        strokeWidth: 1,
        stroke: "#aaa"
      })); // Only add the current elevation indicator and label if there is a data
      // point available.

      if (elev !== null) {
        foregroundSvgContent.push( /*#__PURE__*/_react.default.createElement("circle", {
          key: "elev-point-circle",
          cx: x,
          cy: y,
          r: "4",
          fill: "#084c8d",
          stroke: "white",
          strokeWidth: "0"
        })); // Add the current elevation text label

        foregroundSvgContent.push( /*#__PURE__*/_react.default.createElement("text", {
          key: "elev-point-label",
          x: x,
          y: y - 10,
          fontSize: 11,
          textAnchor: "middle"
        }, this._formatElevation(elevConverted)));
      }
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "leg-diagram"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "y-axis-panel",
      style: {
        width: yAxisPanelWidth
      }
    }, /*#__PURE__*/_react.default.createElement("svg", null, yAxisPanelSvgContent)), /*#__PURE__*/_react.default.createElement("div", {
      ref: container => {
        this.container = container;
      },
      onMouseMove: this._onMouseMove,
      onMouseLeave: this._onMouseLeave,
      className: "main-diagram",
      style: {
        left: 40
      }
    }, /*#__PURE__*/_react.default.createElement("svg", {
      height: height,
      width: SVG_WIDTH + 10
    }, backgroundSvgContent, mainSvgContent, foregroundSvgContent), /*#__PURE__*/_react.default.createElement(_reactResizeDetector.default, {
      handleWidth: true,
      onResize: this._onResize
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "close-button clear-button-formatting",
      onClick: this._onCloseButtonClick
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-close"
    })));
  }

}

_defineProperty(LegDiagram, "propTypes", {
  elevationPoint: _propTypes.default.number,
  setLegDiagram: _propTypes.default.func,
  setElevationPoint: _propTypes.default.func
});

function compressStreetName(name) {
  return name.split(' ').map(str => {
    if (str === 'Northwest') return 'NW';
    if (str === 'Northeast') return 'NE';
    if (str === 'Southwest') return 'SW';
    if (str === 'Southeast') return 'SE';
    if (str === 'North') return 'N';
    if (str === 'East') return 'E';
    if (str === 'South') return 'S';
    if (str === 'West') return 'W';
    if (str === 'Street') return 'St';
    if (str === 'Avenue') return 'Ave';
    if (str === 'Road') return 'Rd';
    if (str === 'Drive') return 'Dr';
    if (str === 'Boulevard') return 'Blvd';
    return str;
  }).join(' ');
} // Connect to Redux store


const mapStateToProps = (state, ownProps) => {
  return {
    elevationPoint: state.otp.ui.elevationPoint
  };
};

const mapDispatchToProps = {
  setLegDiagram: _map.setLegDiagram,
  setElevationPoint: _map.setElevationPoint
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LegDiagram);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=leg-diagram.js