"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _legDiagramPreview = _interopRequireDefault(require("@opentripplanner/itinerary-body/lib/AccessLegBody/leg-diagram-preview"));

var _reactRedux = require("react-redux");

var _map = require("../../actions/map");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connect to the redux store
const mapStateToProps = (state, ownProps) => {
  return {
    diagramVisible: state.otp.ui.diagramLeg,
    showElevationProfile: Boolean(state.otp.config.elevationProfile)
  };
};

const mapDispatchToProps = {
  setLegDiagram: _map.setLegDiagram
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_legDiagramPreview.default);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=leg-diagram-preview.js