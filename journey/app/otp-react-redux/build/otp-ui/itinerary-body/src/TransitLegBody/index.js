"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _itinerary = require("../../../core-utils/src/itinerary");

var _time = require("../../../core-utils/src/time");

var _types = require("../../../core-utils/src/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _faSolid = require("styled-icons/fa-solid");

var _velocityReact = require("velocity-react");

var _alertsBody = _interopRequireDefault(require("./alerts-body"));

var _intermediateStops = _interopRequireDefault(require("./intermediate-stops"));

var Styled = _interopRequireWildcard(require("../styled"));

var _viewTripButton = _interopRequireDefault(require("./view-trip-button"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO use pluralize that for internationalization (and complex plurals, i.e., not just adding 's')
function pluralize(str, list) {
  return `${str}${list.length > 1 ? "s" : ""}`;
}

class TransitLegBody extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "getFareForLeg", (leg, fare) => {
      let fareForLeg;

      if (fare && fare.details && fare.details.regular) {
        fare.details.regular.forEach(fareComponent => {
          if (fareComponent.routes.includes(leg.routeId)) {
            fareForLeg = (0, _itinerary.getTransitFare)(fareComponent.price);
          }
        });
      }

      return fareForLeg;
    });

    _defineProperty(this, "onToggleStopsClick", () => {
      const {
        stopsExpanded
      } = this.state;
      this.setState({
        stopsExpanded: !stopsExpanded
      });
    });

    _defineProperty(this, "onToggleAlertsClick", () => {
      const {
        alertsExpanded
      } = this.state;
      this.setState({
        alertsExpanded: !alertsExpanded
      });
    });

    _defineProperty(this, "onSummaryClick", () => {
      const {
        leg,
        legIndex,
        setActiveLeg
      } = this.props;
      setActiveLeg(legIndex, leg);
    });

    this.state = {
      alertsExpanded: false,
      stopsExpanded: false
    };
  }

  render() {
    const {
      config,
      fare,
      leg,
      LegIcon,
      longDateFormat,
      RouteDescription,
      setViewedTrip,
      showAgencyInfo,
      showViewTripButton,
      timeFormat,
      TransitLegSubheader,
      TransitLegSummary,
      transitOperator
    } = this.props;
    const {
      language: languageConfig
    } = config;
    const {
      agencyBrandingUrl,
      agencyName,
      agencyUrl,
      alerts
    } = leg;
    const {
      alertsExpanded,
      stopsExpanded
    } = this.state; // If the config contains an operator with a logo URL, prefer that over the
    // one provided by OTP (which is derived from agency.txt#agency_branding_url)

    const logoUrl = transitOperator && transitOperator.logo ? transitOperator.logo : agencyBrandingUrl;
    const expandAlerts = alertsExpanded || leg.alerts && leg.alerts.length < 3;
    const fareForLeg = this.getFareForLeg(leg, fare);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, TransitLegSubheader && /*#__PURE__*/_react.default.createElement(TransitLegSubheader, {
      languageConfig: languageConfig,
      leg: leg
    }), /*#__PURE__*/_react.default.createElement(Styled.LegBody, null, /*#__PURE__*/_react.default.createElement(Styled.LegClickable, {
      onClick: this.onSummaryClick
    }, /*#__PURE__*/_react.default.createElement(RouteDescription, {
      leg: leg,
      LegIcon: LegIcon,
      transitOperator: transitOperator
    })), showAgencyInfo && /*#__PURE__*/_react.default.createElement(Styled.AgencyInfo, null, "$_service_$", " ", /*#__PURE__*/_react.default.createElement("a", {
      href: agencyUrl,
      rel: "noopener noreferrer",
      target: "_blank"
    }, agencyName, logoUrl && /*#__PURE__*/_react.default.createElement("img", {
      alt: `${agencyName} logo`,
      src: logoUrl,
      height: 25
    }))), alerts && alerts.length > 2 && /*#__PURE__*/_react.default.createElement(Styled.TransitAlertToggle, {
      onClick: this.onToggleAlertsClick
    }, /*#__PURE__*/_react.default.createElement(_faSolid.ExclamationTriangle, {
      size: 15
    }), " ", alerts.length, " ", pluralize("alert", alerts), " ", /*#__PURE__*/_react.default.createElement(Styled.CaretToggle, {
      expanded: alertsExpanded
    })), /*#__PURE__*/_react.default.createElement(_velocityReact.VelocityTransitionGroup, {
      enter: {
        animation: "slideDown"
      },
      leave: {
        animation: "slideUp"
      }
    }, expandAlerts && /*#__PURE__*/_react.default.createElement(_alertsBody.default, {
      alerts: leg.alerts,
      longDateFormat: longDateFormat,
      timeFormat: timeFormat
    })), leg.intermediateStops && leg.intermediateStops.length > 0 && /*#__PURE__*/_react.default.createElement(Styled.TransitLegDetails, null, /*#__PURE__*/_react.default.createElement(Styled.TransitLegDetailsHeader, null, /*#__PURE__*/_react.default.createElement(TransitLegSummary, {
      leg: leg,
      onClick: this.onToggleStopsClick,
      stopsExpanded: stopsExpanded
    }), showViewTripButton && /*#__PURE__*/_react.default.createElement(_viewTripButton.default, {
      tripId: leg.tripId,
      fromIndex: leg.from.stopIndex,
      setViewedTrip: setViewedTrip,
      toIndex: leg.to.stopIndex
    })), /*#__PURE__*/_react.default.createElement(_velocityReact.VelocityTransitionGroup, {
      enter: {
        animation: "slideDown"
      },
      leave: {
        animation: "slideUp"
      }
    }, stopsExpanded ? /*#__PURE__*/_react.default.createElement(Styled.TransitLegExpandedBody, null, /*#__PURE__*/_react.default.createElement(_intermediateStops.default, {
      stops: leg.intermediateStops
    }), fareForLeg && /*#__PURE__*/_react.default.createElement(Styled.TransitLegFare, null, "Fare: ", fareForLeg.centsToString(fareForLeg.transitFare))) : null), leg.averageWait && /*#__PURE__*/_react.default.createElement("span", null, "Typical Wait: ", (0, _time.formatDuration)(leg.averageWait)))));
  }

}

exports.default = TransitLegBody;
TransitLegBody.propTypes = {
  config: _types.configType.isRequired,
  fare: _types.fareType,
  leg: _types.legType.isRequired,
  LegIcon: _propTypes.default.elementType.isRequired,
  legIndex: _propTypes.default.number.isRequired,
  longDateFormat: _propTypes.default.string.isRequired,
  RouteDescription: _propTypes.default.elementType.isRequired,
  setActiveLeg: _propTypes.default.func.isRequired,
  setViewedTrip: _propTypes.default.func.isRequired,
  showAgencyInfo: _propTypes.default.bool.isRequired,
  showViewTripButton: _propTypes.default.bool.isRequired,
  timeFormat: _propTypes.default.string.isRequired,
  TransitLegSubheader: _propTypes.default.elementType,
  TransitLegSummary: _propTypes.default.elementType.isRequired,
  transitOperator: _types.transitOperatorType
};
TransitLegBody.defaultProps = {
  fare: null,
  TransitLegSubheader: undefined,
  transitOperator: null
};
module.exports = exports.default;

//# sourceMappingURL=index.js