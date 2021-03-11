"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

var _polyline = _interopRequireDefault(require("@mapbox/polyline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * An overlay that will display the geometry of a trip.
 */
class TripViewerOverlay extends _reactLeaflet.MapLayer {
  componentDidMount() {} // TODO: determine why the default MapLayer componentWillUnmount() method throws an error


  componentWillUnmount() {}

  componentDidUpdate(prevProps) {
    const oldGeometry = prevProps.tripData && prevProps.tripData.geometry;
    const newGeometry = this.props.tripData && this.props.tripData.geometry;
    if (oldGeometry === newGeometry || !newGeometry) return;

    const pts = _polyline.default.decode(newGeometry.points);

    this.props.leaflet.map.fitBounds(pts);
  }

  createLeafletElement() {}

  updateLeafletElement() {}

  render() {
    const {
      leafletPath,
      tripData
    } = this.props;
    if (!tripData || !tripData.geometry) return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null);

    const pts = _polyline.default.decode(tripData.geometry.points);

    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null, /*#__PURE__*/_react.default.createElement(_reactLeaflet.Polyline, _extends({}, leafletPath, {
      positions: pts
    })));
  }

}

TripViewerOverlay.propTypes = {
  /**
   * Leaflet path properties to use to style the polyline that represents the
   * trip.
   *
   * See https://leafletjs.com/reference-1.6.0.html#path
   */
  leafletPath: _types.leafletPathType,

  /**
   * This represents data about a trip as obtained from a transit index.
   * Typically a trip has more data than these items, so this is only a list of
   * the properties that this component actually uses.
   */
  tripData: _propTypes.default.shape({
    geometry: _types.encodedPolylineType
  })
};
TripViewerOverlay.defaultProps = {
  leafletPath: {
    color: "#00bfff",
    opacity: 0.6,
    weight: 8
  }
};

var _default = (0, _reactLeaflet.withLeaflet)(TripViewerOverlay);

exports.default = _default;