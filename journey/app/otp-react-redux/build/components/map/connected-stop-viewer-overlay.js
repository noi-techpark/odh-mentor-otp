"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../../otp-ui/stop-viewer-overlay/src"));

var _defaultStopMarker = _interopRequireDefault(require("../../otp-ui/stop-viewer-overlay/src/default-stop-marker"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// connect to the redux store
const mapStateToProps = (state, ownProps) => {
  const viewedStop = state.otp.ui.viewedStop;
  return {
    stop: viewedStop ? state.otp.transitIndex.stops[viewedStop.stopId] : null,
    StopMarker: _defaultStopMarker.default
  };
};

const mapDispatchToProps = {};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_src.default);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-stop-viewer-overlay.js