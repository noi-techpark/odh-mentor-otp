"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parkAndRideOverlay = _interopRequireDefault(require("@opentripplanner/park-and-ride-overlay"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _map = require("../../actions/map");

var _api = require("../../actions/api");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ConnectedParkAndRideOverlay extends _react.Component {
  componentDidMount() {
    const params = {};

    if (this.props.maxTransitDistance) {
      params.maxTransitDistance = this.props.maxTransitDistance;
    } // TODO: support config-defined bounding envelope


    this.props.parkAndRideQuery(params);
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_parkAndRideOverlay.default, this.props);
  }

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  return {
    parkAndRideLocations: state.otp.overlay.parkAndRide && state.otp.overlay.parkAndRide.locations
  };
};

const mapDispatchToProps = {
  setLocation: _map.setLocation,
  parkAndRideQuery: _api.parkAndRideQuery
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConnectedParkAndRideOverlay);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-park-and-ride-overlay.js