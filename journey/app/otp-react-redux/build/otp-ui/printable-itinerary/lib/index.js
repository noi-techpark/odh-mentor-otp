"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PrintableItinerary;

var _types = require("../../core-utils/src/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _accessLeg = _interopRequireDefault(require("./access-leg"));

var Styled = _interopRequireWildcard(require("./styled"));

var _tncLeg = _interopRequireDefault(require("./tnc-leg"));

var _transitLeg = _interopRequireDefault(require("./transit-leg"));

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

function PrintableItinerary({
  className,
  config,
  itinerary,
  LegIcon,
  timeOptions
}) {
  return /*#__PURE__*/_react.default.createElement(Styled.PrintableItinerary, {
    className: className
  }, itinerary.legs.length > 0 && /*#__PURE__*/_react.default.createElement(Styled.CollapsedTop, null, /*#__PURE__*/_react.default.createElement(Styled.LegBody, null, /*#__PURE__*/_react.default.createElement(Styled.LegHeader, null, /*#__PURE__*/_react.default.createElement("b", null, "$_from_$"), " $_from2_$ ", /*#__PURE__*/_react.default.createElement("b", null, itinerary.legs[0].from.name)))), itinerary.legs.map((leg, k) => leg.transitLeg ? /*#__PURE__*/_react.default.createElement(_transitLeg.default, {
    interlineFollows: k < itinerary.legs.length - 1 && itinerary.legs[k + 1].interlineWithPreviousLeg,
    key: k,
    leg: leg,
    LegIcon: LegIcon,
    timeOptions: timeOptions
  }) : leg.hailedCar ? /*#__PURE__*/_react.default.createElement(_tncLeg.default, {
    leg: leg,
    LegIcon: LegIcon,
    key: k,
    timeOptions: timeOptions
  }) : /*#__PURE__*/_react.default.createElement(_accessLeg.default, {
    config: config,
    key: k,
    leg: leg,
    LegIcon: LegIcon,
    timeOptions: timeOptions
  })));
}

PrintableItinerary.propTypes = {
  /** Used for additional styling with styled components for example. */
  className: _propTypes.default.string,

  /** Contains OTP configuration details. */
  config: _types.configType.isRequired,

  /** Itinerary that the user has selected to view, contains multiple legs */
  itinerary: _types.itineraryType.isRequired,

  /** A component class that is used to render icons for legs of an itinerary */
  LegIcon: _propTypes.default.elementType.isRequired,

  /** Contains the preferred format string for time display and a timezone offset */
  timeOptions: _types.timeOptionsType
};
PrintableItinerary.defaultProps = {
  className: null,
  timeOptions: null
};
module.exports = exports.default;

//# sourceMappingURL=index.js