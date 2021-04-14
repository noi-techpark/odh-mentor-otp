"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../../otp-ui/stops-overlay/src"));

var _connectedStopMarker = _interopRequireDefault(require("./connected-stop-marker"));

var _reactRedux = require("react-redux");

var _api = require("../../actions/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// connect to the redux store
const mapStateToProps = (state, ownProps) => {
  return {
    StopMarker: _connectedStopMarker.default,
    stops: state.otp.overlay.transit.stops
  };
};

const mapDispatchToProps = {
  refreshStops: _api.findStopsWithinBBox
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_src.default);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-stops-overlay.js