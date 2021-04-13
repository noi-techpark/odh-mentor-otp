"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LineItineraryContainer = void 0;

var _src = _interopRequireDefault(require("../../../otp-ui/core-utils/src"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _connectedItineraryBody = _interopRequireDefault(require("./connected-itinerary-body"));

var _itinSummary = _interopRequireDefault(require("./itin-summary"));

var _narrativeItinerary = _interopRequireDefault(require("../narrative-itinerary"));

var _simpleRealtimeAnnotation = _interopRequireDefault(require("../simple-realtime-annotation"));

var _linkButton = _interopRequireDefault(require("../../user/link-button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getLegModeLabel,
  getTimeZoneOffset,
  isTransit
} = _src.default.itinerary;
const LineItineraryContainer = _styledComponents.default.div`
  margin-bottom: 20px;
`;
exports.LineItineraryContainer = LineItineraryContainer;

class LineItinerary extends _narrativeItinerary.default {
  _headerText() {
    const {
      itinerary
    } = this.props;
    return itinerary.summary || this._getSummary(itinerary);
  }

  _getSummary(itinerary) {
    let summary = '';
    let transitModes = [];
    itinerary.legs.forEach((leg, index) => {
      if (isTransit(leg.mode)) {
        const modeStr = getLegModeLabel(leg);
        if (transitModes.indexOf(modeStr) === -1) transitModes.push(modeStr);
      }
    }); // check for access mode

    if (!isTransit(itinerary.legs[0].mode)) {
      summary += getLegModeLabel(itinerary.legs[0]);
    } // append transit modes, if applicable


    if (transitModes.length > 0) {
      summary += ' to ' + transitModes.join(', ');
    }

    return summary;
  }

  render() {
    const {
      active,
      companies,
      expanded,
      itinerary,
      itineraryFooter,
      LegIcon,
      onClick,
      setActiveLeg,
      showRealtimeAnnotation,
      timeFormat,
      user
    } = this.props;

    if (!itinerary) {
      return /*#__PURE__*/_react.default.createElement("div", null, "No Itinerary!");
    }

    const timeOptions = {
      format: timeFormat,
      offset: getTimeZoneOffset(itinerary)
    };
    return /*#__PURE__*/_react.default.createElement(LineItineraryContainer, {
      className: "line-itin"
    }, /*#__PURE__*/_react.default.createElement(_itinSummary.default, {
      companies: companies,
      itinerary: itinerary,
      LegIcon: LegIcon,
      onClick: onClick,
      timeOptions: timeOptions
    }), user && /*#__PURE__*/_react.default.createElement("span", {
      className: "pull-right"
    }, /*#__PURE__*/_react.default.createElement(_linkButton.default, {
      to: "/savetrip"
    }, "Save this option")), showRealtimeAnnotation && /*#__PURE__*/_react.default.createElement(_simpleRealtimeAnnotation.default, null), active || expanded ? /*#__PURE__*/_react.default.createElement(_connectedItineraryBody.default, {
      itinerary: itinerary,
      LegIcon: LegIcon // timeOptions={timeOptions}
      // Don't use setActiveLeg as an import
      // (will cause error when clicking on itinerary suymmary).
      // Use the one passed by NarrativeItineraries instead.
      ,
      setActiveLeg: setActiveLeg,
      timeOptions: timeOptions
    }) : null, itineraryFooter);
  }

}

exports.default = LineItinerary;

//# sourceMappingURL=line-itinerary.js