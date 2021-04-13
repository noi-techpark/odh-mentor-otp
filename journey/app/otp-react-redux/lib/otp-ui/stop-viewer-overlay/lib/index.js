"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This overlay is intended to highlight a specific stop on a map typically in
 * conjunction with some kind of stop viewer.
 */
class StopViewerOverlay extends _reactLeaflet.MapLayer {
  componentDidMount() {} // TODO: determine why the default MapLayer componentWillUnmount() method throws an error


  componentWillUnmount() {}
  /**
   * Only reset map view if a new stop is selected. This prevents resetting the
   * bounds if, for example, the arrival times have changed for the same stop
   * in the viewer.
   */


  componentDidUpdate(prevProps) {
    const nextStop = this.props.stop;
    const oldStopId = prevProps.stop && prevProps.stop.id;
    const hasNewStopId = nextStop && nextStop.id !== oldStopId;
    if (hasNewStopId) this.props.leaflet.map.setView([nextStop.lat, nextStop.lon]);
  }

  createLeafletElement() {}

  updateLeafletElement() {}

  render() {
    const {
      stop,
      StopMarker
    } = this.props;
    if (!stop) return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null);
    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.FeatureGroup, null, /*#__PURE__*/_react.default.createElement(StopMarker, {
      stop: stop
    }));
  }

}

StopViewerOverlay.props = {
  /**
   * An object representing a transit stop
   */
  stop: _types.stopLayerStopType,
  StopMarker: _propTypes.default.elementType.isRequired
};
StopViewerOverlay.defaultProps = {
  stop: null
};

var _default = (0, _reactLeaflet.withLeaflet)(StopViewerOverlay);

exports.default = _default;