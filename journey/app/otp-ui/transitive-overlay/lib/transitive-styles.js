"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _map = require("@opentripplanner/core-utils/lib/map");

const STYLES = {};
/**
 * Transitive style overrides for places (basically any point that isn't a
 * transit stop)
 *
 * This style rule draws nothing except when a bikeshare station or e-scooter
 * station is encountered.
 *
 * The from/to locations are drawn outside of transitive and there are separate
 * renderers for transit stops.
 */

STYLES.places = {
  display: (display, place) => (0, _map.isBikeshareStation)(place) || (0, _map.isEScooterStation)(place) || (0, _map.isCarWalkTransition)(place) ? true : "none",
  fill: (display, place) => {
    if ((0, _map.isBikeshareStation)(place)) {
      return "#f00";
    }

    if ((0, _map.isCarWalkTransition)(place)) {
      return "#888";
    }

    if ((0, _map.isEScooterStation)(place)) {
      return "#f5a729";
    }

    return null;
  },
  stroke: "#fff",
  "stroke-width": 2,
  r: 7
};
/**
 * Transitive style overrides for transit stops. All this does is sets the
 * radius to 6 pixels.
 */

STYLES.stops_merged = {
  r() {
    return 6;
  }

};
var _default = STYLES;
exports.default = _default;