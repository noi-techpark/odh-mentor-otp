"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomPlaceName = CustomPlaceName;
exports.CustomTimeColumnContent = CustomTimeColumnContent;
exports.customToRouteAbbreviation = customToRouteAbbreviation;
exports.CustomTransitLegSummary = CustomTransitLegSummary;
exports.WrappedOtpRRTransitLegSubheader = WrappedOtpRRTransitLegSubheader;
exports.StyledItineraryBody = void 0;

var _time = require("../../../core-utils/src/time");

var _types = require("../../../core-utils/src/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _faSolid = require("styled-icons/fa-solid");

var _ = _interopRequireDefault(require(".."));

var _transitLegSubheader = _interopRequireDefault(require("../otp-react-redux/transit-leg-subheader"));

var ItineraryBodyClasses = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CustomPlaceName({
  place
}) {
  return `🎉✨🎊 ${place.name} 🎉✨🎊`;
}
/**
 * Custom component, for illustration purposes only, for displaying the time and other info
 * of the given leg in the time column of the ItineraryBody -> PlaceRow component.
 */


function CustomTimeColumnContent({
  isDestination,
  leg,
  timeOptions
}) {
  const time = isDestination ? leg.endTime : leg.startTime;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: "red"
    }
  }, time && (0, _time.formatTime)(time, timeOptions))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: "80%",
      lineHeight: "1em"
    }
  }, /*#__PURE__*/_react.default.createElement(_faSolid.ExclamationTriangle, {
    style: {
      height: "1em"
    }
  }), " Delayed xx\xA0min."));
}

CustomTimeColumnContent.propTypes = {
  isDestination: _propTypes.default.bool.isRequired,
  leg: _types.legType.isRequired,
  timeOptions: _types.timeOptionsType
};
CustomTimeColumnContent.defaultProps = {
  timeOptions: null
};

function customToRouteAbbreviation(route) {
  if (route.toString().length < 3) {
    return route;
  }

  return undefined;
}

function CustomTransitLegSummary({
  leg,
  stopsExpanded
}) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, leg.duration && /*#__PURE__*/_react.default.createElement("span", null, "Ride ", (0, _time.formatDuration)(leg.duration)), leg.intermediateStops && /*#__PURE__*/_react.default.createElement("span", null, ` (${leg.intermediateStops.length + 1} stops)`, /*#__PURE__*/_react.default.createElement(ItineraryBodyClasses.CaretToggle, {
    expanded: stopsExpanded
  })));
}

CustomTransitLegSummary.propTypes = {
  leg: _types.legType.isRequired,
  stopsExpanded: _propTypes.default.bool.isRequired
};
const StyledItineraryBody = (0, _styledComponents.default)(_.default)`
  ${ItineraryBodyClasses.LegBody} {
    background-color: pink;
  }

  ${ItineraryBodyClasses.TimeColumn} {
    color: #999;
    font-size: 14px;
    padding-right: 4px;
    padding-top: 1px;
    text-align: right;
    vertical-align: top;
    width: 60px;
  }
`;
exports.StyledItineraryBody = StyledItineraryBody;

function WrappedOtpRRTransitLegSubheader({
  languageConfig,
  leg
}) {
  return /*#__PURE__*/_react.default.createElement(_transitLegSubheader.default, {
    languageConfig: languageConfig,
    leg: leg,
    onStopClick: (0, _addonActions.action)("Transit Stop Click")
  });
}

WrappedOtpRRTransitLegSubheader.propTypes = {
  languageConfig: _types.languageConfigType.isRequired,
  leg: _types.legType.isRequired
};

//# sourceMappingURL=index.js