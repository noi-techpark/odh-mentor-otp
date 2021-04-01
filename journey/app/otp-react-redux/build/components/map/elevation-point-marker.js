"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactLeaflet = require("react-leaflet");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * As the OTP user moves the cursor over the elevation tracking chart
 * of a walking or biking leg (to see which point of their itinerary is at which elevation),
 * ElevationPointMarker displays and moves a marker on the map to highlight
 * the location that corresponds to the cursor position on the elevation chart,
 * so the user can see the streets and paths that correspond to a portion of an elevation profile.
 */
class ElevationPointMarker extends _react.Component {
  render() {
    const {
      diagramLeg,
      elevationPoint,
      showElevationProfile
    } = this.props; // Compute the elevation point marker, if activeLeg and elevation profile is enabled.

    let elevationPointMarker = null;

    if (showElevationProfile && diagramLeg && elevationPoint) {
      const pos = _coreUtils.default.itinerary.legLocationAtDistance(diagramLeg, elevationPoint);

      if (pos) {
        elevationPointMarker = /*#__PURE__*/_react.default.createElement(_reactLeaflet.CircleMarker, {
          center: pos,
          fillColor: "#084c8d",
          weight: 6,
          color: "#555",
          opacity: 0.4,
          radius: 5,
          fill: true,
          fillOpacity: 1
        });
      }
    }

    return elevationPointMarker;
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    diagramLeg: state.otp.ui.diagramLeg,
    elevationPoint: state.otp.ui.elevationPoint,
    showElevationProfile: !!state.otp.config.elevationProfile
  };
};

const mapDispatchToProps = {};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ElevationPointMarker);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=elevation-point-marker.js