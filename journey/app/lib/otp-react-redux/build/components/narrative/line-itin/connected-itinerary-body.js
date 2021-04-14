"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _transitLegSummary = _interopRequireDefault(require("../../../otp-ui/itinerary-body/src/defaults/transit-leg-summary"));

var _itineraryBody = _interopRequireDefault(require("../../../otp-ui/itinerary-body/src/otp-react-redux/itinerary-body"));

var _lineColumnContent = _interopRequireDefault(require("../../../otp-ui/itinerary-body/src/otp-react-redux/line-column-content"));

var _placeName = _interopRequireDefault(require("../../../otp-ui/itinerary-body/src/otp-react-redux/place-name"));

var _styled = require("../../../otp-ui/itinerary-body/src/styled");

var _routeDescription = _interopRequireDefault(require("../../../otp-ui/itinerary-body/src/otp-react-redux/route-description"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _map = require("../../../actions/map");

var _ui = require("../../../actions/ui");

var _connectedTransitLegSubheader = _interopRequireDefault(require("./connected-transit-leg-subheader"));

var _realtimeTimeColumn = _interopRequireDefault(require("./realtime-time-column"));

var _connectedTripDetails = _interopRequireDefault(require("../connected-trip-details"));

var _tripTools = _interopRequireDefault(require("../trip-tools"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const noop = () => {};

const ItineraryBodyContainer = _styledComponents.default.div`
  padding: 0px 0px;
`;
const StyledItineraryBody = (0, _styledComponents.default)(_itineraryBody.default)`
  ${_styled.PlaceName} {
    font-weight: inherit;
  }
`;

class ConnectedItineraryBody extends _react.Component {
  /** avoid rerendering if the itinerary to display hasn't changed */
  shouldComponentUpdate(nextProps, nextState) {
    return !(0, _lodash.default)(this.props.itinerary, nextProps.itinerary);
  }

  render() {
    const {
      config,
      diagramVisible,
      itinerary,
      LegIcon,
      setActiveLeg,
      setViewedTrip,
      setLegDiagram,
      timeOptions
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(ItineraryBodyContainer, null, /*#__PURE__*/_react.default.createElement(StyledItineraryBody, {
      config: config,
      diagramVisible: diagramVisible,
      itinerary: itinerary,
      LegIcon: LegIcon,
      LineColumnContent: _lineColumnContent.default,
      PlaceName: _placeName.default,
      RouteDescription: _routeDescription.default,
      setActiveLeg: setActiveLeg,
      setLegDiagram: setLegDiagram,
      setViewedTrip: setViewedTrip,
      showAgencyInfo: true,
      showElevationProfile: config.elevationProfile,
      showLegIcon: true,
      showMapButtonColumn: false,
      showRouteFares: config.itinerary && config.itinerary.showRouteFares,
      showViewTripButton: true,
      timeOptions: timeOptions,
      toRouteAbbreviation: noop,
      TransitLegSubheader: _connectedTransitLegSubheader.default,
      TransitLegSummary: _transitLegSummary.default,
      TimeColumnContent: _realtimeTimeColumn.default
    }), /*#__PURE__*/_react.default.createElement(_connectedTripDetails.default, {
      itinerary: itinerary
    }), /*#__PURE__*/_react.default.createElement(_tripTools.default, {
      itinerary: itinerary
    }));
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    config: state.otp.config,
    diagramVisible: state.otp.ui.diagramLeg
  };
};

const mapDispatchToProps = {
  setViewedTrip: _ui.setViewedTrip,
  setLegDiagram: _map.setLegDiagram
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConnectedItineraryBody);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-itinerary-body.js