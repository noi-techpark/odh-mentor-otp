"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: make this a prop
const defaultRouteColor = '#008';
const Container = _styledComponents.default.div`
  display: ${() => _coreUtils.default.ui.isMobile() ? 'table' : 'none'};
  height: 60px;
  margin-bottom: 15px;
  padding-right: 5px;
  width: 100%;
`;
const Detail = _styledComponents.default.div`
  color: #999999;
  font-size: 13px;
`;
const Details = _styledComponents.default.div`
  display: table-cell;
  vertical-align: top;
`;
const Header = _styledComponents.default.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: -3px;
`;
const LegIconContainer = _styledComponents.default.div`
  height: 30px;
  width: 30px;
`;
const NonTransitSpacer = _styledComponents.default.div`
  height: 30px;
  overflow: hidden
`;
const RoutePreview = _styledComponents.default.div`
  display: inline-block;
  margin-left: 8px;
  vertical-align: top;
`;
const Routes = _styledComponents.default.div`
  display: table-cell;
  text-align: right;
`;
const ShortName = _styledComponents.default.div`
  background-color: ${props => getRouteColorForBadge(props.leg)};
  border-radius: 15px;
  border: 2px solid white;
  box-shadow: 0 0 0.5em #000;
  color: white;
  font-size: 15px;
  font-weight: 500;
  height: 30px;
  margin-top: 6px;
  overflow: hidden;
  padding-top: 4px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 30px;
`;

class ItinerarySummary extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onSummaryClicked", () => {
      if (typeof this.props.onClick === 'function') this.props.onClick();
    });
  }

  render() {
    const {
      itinerary,
      LegIcon,
      timeOptions
    } = this.props;

    const {
      centsToString,
      maxTNCFare,
      minTNCFare,
      transitFare
    } = _coreUtils.default.itinerary.calculateFares(itinerary); // TODO: support non-USD


    const minTotalFare = minTNCFare * 100 + transitFare;
    const maxTotalFare = maxTNCFare * 100 + transitFare;

    const {
      caloriesBurned
    } = _coreUtils.default.itinerary.calculatePhysicalActivity(itinerary);

    return /*#__PURE__*/_react.default.createElement(Container, {
      onClick: this._onSummaryClicked
    }, /*#__PURE__*/_react.default.createElement(Details, null, /*#__PURE__*/_react.default.createElement(Header, null, _coreUtils.default.time.formatDuration(itinerary.duration)), /*#__PURE__*/_react.default.createElement(Detail, null, _coreUtils.default.time.formatTime(itinerary.startTime, timeOptions), " - ", _coreUtils.default.time.formatTime(itinerary.endTime, timeOptions)), /*#__PURE__*/_react.default.createElement(Detail, null, minTotalFare > 0 && /*#__PURE__*/_react.default.createElement("span", null, centsToString(minTotalFare), minTotalFare !== maxTotalFare && /*#__PURE__*/_react.default.createElement("span", null, " - ", centsToString(maxTotalFare)), /*#__PURE__*/_react.default.createElement("span", null, " \u2022 ")), Math.round(caloriesBurned), " Cals"), itinerary.transfers > 0 && /*#__PURE__*/_react.default.createElement(Detail, null, itinerary.transfers, " cambi", itinerary.transfers > 1 ? '' : 'o')), /*#__PURE__*/_react.default.createElement(Routes, null, itinerary.legs.filter(leg => {
      return !(leg.mode === 'WALK' && itinerary.transitTime > 0);
    }).map((leg, k) => {
      return /*#__PURE__*/_react.default.createElement(RoutePreview, {
        key: k
      }, /*#__PURE__*/_react.default.createElement(LegIconContainer, null, /*#__PURE__*/_react.default.createElement(LegIcon, {
        leg: leg
      })), _coreUtils.default.itinerary.isTransit(leg.mode) ? /*#__PURE__*/_react.default.createElement(ShortName, {
        leg: leg
      }, getRouteNameForBadge(leg)) : /*#__PURE__*/_react.default.createElement(NonTransitSpacer, null));
    })));
  }

} // Helper functions


exports.default = ItinerarySummary;

_defineProperty(ItinerarySummary, "propTypes", {
  itinerary: _propTypes.default.object,
  LegIcon: _propTypes.default.elementType.isRequired
});

function getRouteLongName(leg) {
  return leg.routes && leg.routes.length > 0 ? leg.routes[0].longName : leg.routeLongName;
}

function getRouteNameForBadge(leg) {
  const shortName = leg.routes && leg.routes.length > 0 ? leg.routes[0].shortName : leg.routeShortName;
  const longName = getRouteLongName(leg); // check for max

  if (longName && longName.toLowerCase().startsWith('max')) return null; // check for streetcar

  if (longName && longName.startsWith('Portland Streetcar')) return longName.split('-')[1].trim().split(' ')[0];
  return shortName || longName;
}

function getRouteColorForBadge(leg) {
  return leg.routeColor ? '#' + leg.routeColor : defaultRouteColor;
}

module.exports = exports.default;

//# sourceMappingURL=itin-summary.js