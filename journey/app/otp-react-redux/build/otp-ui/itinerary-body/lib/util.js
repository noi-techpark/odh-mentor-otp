"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toModeBorder = exports.toModeBorderColor = exports.toModeColor = exports.toSafeRouteColor = void 0;
/**
 * the GTFS spec indicates that the route color should not have a leading hash
 * symbol, so add one if the routeColor exists and doesn't start with a hash
 * symbol.
 */

const toSafeRouteColor = routeColor => {
  return routeColor && (routeColor.startsWith("#") ? routeColor : `#${routeColor}`);
};

exports.toSafeRouteColor = toSafeRouteColor;

const toModeColor = (mode, routeColor) => {
  switch (mode) {
    case "WALK":
      return `#e9e9e9`;

    case "BICYCLE":
    case "BICYCLE_RENT":
      return `red`;

    case "CAR":
      return `grey`;

    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
      return `#f5a729`;

    default:
      return toSafeRouteColor(routeColor) || "#084c8d";
  }
};

exports.toModeColor = toModeColor;

const toModeBorderColor = (mode, routeColor) => {
  switch (mode) {
    case "WALK":
      return `#484848`;

    case "BICYCLE":
    case "BICYCLE_RENT":
      return `red`;

    case "CAR":
      return `grey`;

    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
      return `#f5a729`;

    default:
      return toSafeRouteColor(routeColor) || "#008ab0";
  }
};

exports.toModeBorderColor = toModeBorderColor;

const toModeBorder = (mode, routeColor) => {
  switch (mode) {
    case "WALK":
    case "BICYCLE":
    case "BICYCLE_RENT":
    case "CAR":
    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
      return `dotted 4px ${toModeBorderColor(mode, routeColor)}`;

    default:
      return `solid 8px ${toModeBorderColor(mode, routeColor)}`;
  }
};

exports.toModeBorder = toModeBorder;

//# sourceMappingURL=util.js