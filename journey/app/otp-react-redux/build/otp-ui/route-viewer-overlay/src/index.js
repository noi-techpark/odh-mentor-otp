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

// helper fn to check if geometry has been populated for all patterns in route
const isGeomComplete = routeData => {
  return routeData && routeData.patterns && Object.values(routeData.patterns).every(ptn => typeof ptn.geometry !== "undefined");
};
/**
 * An overlay that will display all polylines of the patterns of a route.
 */


class RouteViewerOverlay extends _reactLeaflet.MapLayer {
  componentDidMount() {} // TODO: determine why the default MapLayer componentWillUnmount() method throws an error


  componentWillUnmount() {}

  componentDidUpdate(prevProps) {
    // if pattern geometry just finished populating, update the map points
    if (!isGeomComplete(prevProps.routeData) && isGeomComplete(this.props.routeData)) {
      const allPoints = Object.values(this.props.routeData.patterns).reduce((acc, ptn) => {
        return acc.concat(_polyline.default.decode(ptn.geometry.points));
      }, []);
      this.props.leaflet.map.fitBounds(allPoints);
    }
  }

  createLeafletElement() {}

  updateLeafletElement() {}

  render() {
    const {
      path,
      routeData
    } = this.props;
    if (!routeData || !routeData.patterns) return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null);
    const routeColor = routeData.color ? `#${routeData.color}` : path.color;
    const segments = [];
    Object.values(routeData.patterns).forEach(pattern => {
      if (!pattern.geometry) return;

      const pts = _polyline.default.decode(pattern.geometry.points);

      segments.push( /*#__PURE__*/_react.default.createElement(_reactLeaflet.Polyline
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      , _extends({}, path, {
        color: routeColor,
        key: pattern.id,
        positions: pts
      })));
    });
    return segments.length > 0 ? /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null, /*#__PURE__*/_react.default.createElement("div", null, segments)) : /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null);
  }

}

RouteViewerOverlay.propTypes = {
  /**
   * Leaflet path properties to use to style each polyline that represents a
   * pattern of the route. Only a few of the items are actually used.
   *
   * See https://leafletjs.com/reference-1.6.0.html#path
   */
  path: _types.leafletPathType,

  /**
   * This represents data about a route as obtained from a transit index.
   * Typically a route has more data than these items, so this is only a list of
   * the properties that this component actually uses.
   */
  routeData: _propTypes.default.shape({
    color: _propTypes.default.string,
    patterns: _propTypes.default.objectOf(_propTypes.default.shape({
      geometry: _types.encodedPolylineType,
      id: _propTypes.default.string.isRequired
    }).isRequired)
  })
};
RouteViewerOverlay.defaultProps = {
  path: {
    color: "#00bfff",
    opacity: 1,
    weight: 4
  }
};

var _default = (0, _reactLeaflet.withLeaflet)(RouteViewerOverlay);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js