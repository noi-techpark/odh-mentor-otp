"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TNCLeg;

var _currencyFormatter = _interopRequireDefault(require("currency-formatter"));

var _time = require("@opentripplanner/core-utils/lib/time");

var _types = require("@opentripplanner/core-utils/lib/types");

var _ui = require("@opentripplanner/core-utils/lib/ui");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _accessLegSummary = _interopRequireDefault(require("./access-leg-summary"));

var Styled = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function TNCLeg({
  config,
  LYFT_CLIENT_ID,
  UBER_CLIENT_ID,
  followsTransit,
  leg,
  LegIcon,
  onSummaryClick,
  showLegIcon,
  timeOptions
}) {
  const universalLinks = {
    UBER: `https://m.uber.com/${(0, _ui.isMobile)() ? "ul/" : ""}?client_id=${UBER_CLIENT_ID}&action=setPickup&pickup[latitude]=${leg.from.lat}&pickup[longitude]=${leg.from.lon}&pickup[formatted_address]=${encodeURI(leg.from.name)}&dropoff[latitude]=${leg.to.lat}&dropoff[longitude]=${leg.to.lon}&dropoff[formatted_address]=${encodeURI(leg.to.name)}`,
    LYFT: `https://lyft.com/ride?id=lyft&partner=${LYFT_CLIENT_ID}&pickup[latitude]=${leg.from.lat}&pickup[longitude]=${leg.from.lon}&destination[latitude]=${leg.to.lat}&destination[longitude]=${leg.to.lon}`
  };
  const {
    tncData
  } = leg;
  if (!tncData || !tncData.estimatedArrival) return null;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Styled.PlaceSubheader, null, "Wait", " ", !followsTransit && /*#__PURE__*/_react.default.createElement("span", null, Math.round(tncData.estimatedArrival / 60), " minutes "), "for ", tncData.displayName, " pickup"), /*#__PURE__*/_react.default.createElement(Styled.LegBody, null, /*#__PURE__*/_react.default.createElement(_accessLegSummary.default, {
    config: config,
    leg: leg,
    LegIcon: LegIcon,
    onSummaryClick: onSummaryClick,
    showLegIcon: showLegIcon
  }), /*#__PURE__*/_react.default.createElement(Styled.BookTNCRideButtonContainer, null, /*#__PURE__*/_react.default.createElement(Styled.BookTNCRideButton, {
    href: universalLinks[tncData.company],
    target: (0, _ui.isMobile)() ? "_self" : "_blank"
  }, "Book Ride"), followsTransit && /*#__PURE__*/_react.default.createElement(Styled.BookLaterPointer, null), followsTransit && /*#__PURE__*/_react.default.createElement(Styled.BookLaterContainer, null, /*#__PURE__*/_react.default.createElement(Styled.BookLaterInnerContainer, null, /*#__PURE__*/_react.default.createElement(Styled.BookLaterText, null, "Wait until", " ", (0, _time.formatTime)(leg.startTime - tncData.estimatedArrival * 1000, timeOptions), " ", "to book")))), /*#__PURE__*/_react.default.createElement(Styled.TNCTravelTime, null, "Estimated travel time: ", (0, _time.formatDuration)(leg.duration), " (does not account for traffic)"), tncData.minCost && /*#__PURE__*/_react.default.createElement(Styled.TNCCost, null, "Estimated cost:", " ", `${_currencyFormatter.default.format(tncData.minCost, {
    code: tncData.currency
  })} - ${_currencyFormatter.default.format(tncData.maxCost, {
    code: tncData.currency
  })}`)));
}

TNCLeg.propTypes = {
  config: _types.configType.isRequired,
  LYFT_CLIENT_ID: _propTypes.default.string,
  UBER_CLIENT_ID: _propTypes.default.string,
  followsTransit: _propTypes.default.bool.isRequired,
  leg: _types.legType.isRequired,
  LegIcon: _propTypes.default.elementType.isRequired,
  onSummaryClick: _propTypes.default.func.isRequired,
  showLegIcon: _propTypes.default.bool.isRequired,
  timeOptions: _types.timeOptionsType
};
TNCLeg.defaultProps = {
  LYFT_CLIENT_ID: "",
  UBER_CLIENT_ID: "",
  timeOptions: null
};
module.exports = exports.default;

//# sourceMappingURL=tnc-leg.js