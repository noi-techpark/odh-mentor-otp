"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LineColumnContent;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _locationIcon = _interopRequireDefault(require("@opentripplanner/location-icon"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var Styled = _interopRequireWildcard(require("../styled"));

var _RouteBadge = _interopRequireDefault(require("../RouteBadge"));

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

function LineColumnContent({
  interline,
  isDestination,
  leg,
  LegIcon,
  toRouteAbbreviation
}) {
  return /*#__PURE__*/_react.default.createElement(Styled.LegLine, null, !isDestination && /*#__PURE__*/_react.default.createElement(Styled.InnerLine, {
    mode: leg.mode,
    routeColor: leg.routeColor
  }), /*#__PURE__*/_react.default.createElement(Styled.LineBadgeContainer, null, !interline && !isDestination && leg.transitLeg && /*#__PURE__*/_react.default.createElement(_RouteBadge.default, {
    color: leg.routeColor,
    abbreviation: toRouteAbbreviation(parseInt(leg.route, 10) || leg.route),
    name: leg.routeLongName || ""
  }), !interline && !isDestination && !leg.transitLeg && /*#__PURE__*/_react.default.createElement(Styled.AccessBadge, {
    mode: leg.mode,
    routeColor: leg.routeColor
  }, /*#__PURE__*/_react.default.createElement(LegIcon, {
    leg: leg,
    title: `Travel by ${leg.mode}`,
    width: "66%"
  })), isDestination && /*#__PURE__*/_react.default.createElement(Styled.Destination, null, /*#__PURE__*/_react.default.createElement(_locationIcon.default, {
    size: 25,
    type: "to"
  }))));
}

LineColumnContent.propTypes = {
  /** Whether this leg is an interlined-transit leg */
  interline: _propTypes.default.bool.isRequired,

  /** Whether this place row represents the destination */
  isDestination: _propTypes.default.bool.isRequired,

  /** Contains details about leg object that is being displayed */
  leg: _coreUtils.default.types.legType,

  /** A component class used to render the icon for a leg */
  LegIcon: _propTypes.default.elementType.isRequired,

  /** Converts a route's ID to its accepted badge abbreviation */
  toRouteAbbreviation: _propTypes.default.func.isRequired
};
LineColumnContent.defaultProps = {
  // can be null if this is the destination place
  leg: null
};
module.exports = exports.default;

//# sourceMappingURL=line-column-content.js