"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactResizeDetector = _interopRequireDefault(require("react-resize-detector"));

var Styled = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const METERS_TO_FEET = 1;

function generateSvg(profile, width) {
  const height = 30;
  const {
    points: ptArr,
    traversed
  } = profile;
  let {
    minElev,
    maxElev
  } = profile; // Pad the min-max range by 25m on either side

  minElev -= 25;
  maxElev += 25; // Transform the point array and store it as an SVG-ready string

  const pts = ptArr.map(pt => {
    const x = pt[0] / traversed * width;
    const y = height - height * (pt[1] - minElev) / (maxElev - minElev);
    return `${x},${y}`;
  }).join(" "); // Render the SVG

  return /*#__PURE__*/_react.default.createElement("svg", {
    height: height,
    width: width
  }, /*#__PURE__*/_react.default.createElement("polyline", {
    points: pts,
    fill: "none",
    stroke: "black",
    strokeWidth: 1.3
  }));
}

class LegDiagramPreview extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onResize", width => {
      if (width > 0) {
        this.setState({
          width
        });
      }
    });

    _defineProperty(this, "isActive", () => {
      const {
        diagramVisible,
        leg
      } = this.props;
      return diagramVisible && diagramVisible.startTime === leg.startTime;
    });

    _defineProperty(this, "onExpandClick", () => {
      const {
        leg,
        setLegDiagram
      } = this.props;
      if (this.isActive()) setLegDiagram(null);else setLegDiagram(leg);
    });

    _defineProperty(this, "formatElevation", elev => `${Math.round(elev)}'`);

    this.state = {
      width: null
    };
  }

  render() {
    const {
      leg,
      showElevationProfile
    } = this.props;
    const {
      width
    } = this.state;
    if (!showElevationProfile) return null;
    const profile = (0, _itinerary.getElevationProfile)(leg.steps); // Don't show for very short legs

    if (leg.distance < 500 || leg.mode === "CAR") return null;
    return /*#__PURE__*/_react.default.createElement(Styled.PreviewContainer, {
      active: this.isActive()
    }, /*#__PURE__*/_react.default.createElement(Styled.PreviewDiagram, {
      tabIndex: "0",
      title: "Toggle elevation chart",
      role: "button",
      onClick: this.onExpandClick
    }, /*#__PURE__*/_react.default.createElement(Styled.PreviewDiagramTitle, null, "$_altimetry_$", " ", /*#__PURE__*/_react.default.createElement(Styled.PreviewDiagramElevationGain, null, "\u2191", this.formatElevation(profile.gain * METERS_TO_FEET), "  "), /*#__PURE__*/_react.default.createElement(Styled.PreviewDiagramElevationLoss, null, "\u2193", this.formatElevation(-profile.loss * METERS_TO_FEET))), profile.points.length > 0 ? generateSvg(profile, width) : "$_altimetry_unavailable_$.", /*#__PURE__*/_react.default.createElement(_reactResizeDetector.default, {
      handleWidth: true,
      onResize: this.onResize
    })));
  }

}

LegDiagramPreview.propTypes = {
  diagramVisible: _types.legType,
  leg: _types.legType.isRequired,
  setLegDiagram: _propTypes.default.func.isRequired,
  showElevationProfile: _propTypes.default.bool.isRequired
};
LegDiagramPreview.defaultProps = {
  diagramVisible: null
};
var _default = LegDiagramPreview;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=leg-diagram-preview.js