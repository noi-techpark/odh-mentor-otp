"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimeColumnContent;

var _time = require("../../../core-utils/src/time");

var _types = require("../../../core-utils/src/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is the default component for displaying the time with the specified format
 * of the given leg in the time column of the ItineraryBody -> PlaceRow component.
 */
function TimeColumnContent({
  isDestination,
  leg,
  timeOptions
}) {
  const time = isDestination ? leg.endTime : leg.startTime;
  return time && (0, _time.formatTime)(time, timeOptions);
}

TimeColumnContent.propTypes = {
  /** Whether this place row represents the destination */
  isDestination: _propTypes.default.bool.isRequired,

  /** Contains details about leg object that is being displayed */
  leg: _types.legType.isRequired,

  /** Contains the preferred format string for time display and a timezone offset */
  timeOptions: _types.timeOptionsType
};
TimeColumnContent.defaultProps = {
  timeOptions: null
};
module.exports = exports.default;

//# sourceMappingURL=time-column-content.js