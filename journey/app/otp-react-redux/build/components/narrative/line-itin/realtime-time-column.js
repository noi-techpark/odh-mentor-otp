"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _types = require("@opentripplanner/core-utils/lib/types");

var _time = require("@opentripplanner/core-utils/lib/time");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TimeText = _styledComponents.default.div``;
const TimeStruck = _styledComponents.default.div`
  text-decoration: line-through;
`;
const TimeBlock = _styledComponents.default.div`
  line-height: 1em;
  margin-bottom: 4px;
`;
const TimeColumnBase = _styledComponents.default.div``;
const StatusText = _styledComponents.default.div`
  color: #bbb;
  font-size: 80%;
  line-height: 1em;
`;
const DelayText = _styledComponents.default.span`
  display: block;
  white-space: nowrap;
`; // Reusing stop viewer colors.

const TimeColumnOnTime = (0, _styledComponents.default)(TimeColumnBase)`
  ${TimeText}, ${StatusText} {
    color: #5cb85c;
  }
`;
const TimeColumnEarly = (0, _styledComponents.default)(TimeColumnBase)`
  ${TimeText}, ${StatusText} {
    color: #337ab7;
  }
`;
const TimeColumnLate = (0, _styledComponents.default)(TimeColumnBase)`
  ${TimeText}, ${StatusText} {
    color: #d9534f;
  }
`;
/**
 * This component displays the scheduled departure/arrival time for a leg,
 * and, for transit legs, displays any delays or earliness where applicable.
 */

function RealtimeTimeColumn({
  isDestination,
  leg,
  timeOptions
}) {
  const time = isDestination ? leg.endTime : leg.startTime;
  const formattedTime = time && (0, _time.formatTime)(time, timeOptions);
  const isTransitLeg = (0, _itinerary.isTransit)(leg.mode); // For non-real-time legs, show only the scheduled time,
  // except for transit legs where we add the "scheduled" text underneath.

  if (!leg.realTime) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(TimeText, null, formattedTime), isTransitLeg && /*#__PURE__*/_react.default.createElement(StatusText, null, "$_schedule2_$"));
  } // Delay in seconds.


  const delay = isDestination ? leg.arrivalDelay : leg.departureDelay; // Time is in milliseconds.

  const originalTime = time - delay * 1000;
  const originalFormattedTime = originalTime && (0, _time.formatTime)(originalTime, timeOptions); // TODO: refine on-time thresholds.
  // const isOnTime = delay >= -60 && delay <= 120;

  const isOnTime = delay === 0;
  let statusText;
  let TimeColumn = TimeColumnBase;

  if (isOnTime) {
    statusText = 'on time';
    TimeColumn = TimeColumnOnTime;
  } else if (delay < 0) {
    statusText = 'early';
    TimeColumn = TimeColumnEarly;
  } else if (delay > 0) {
    statusText = 'late';
    TimeColumn = TimeColumnLate;
  } // Absolute delay in rounded minutes, for display purposes.


  const delayInMinutes = Math.abs(Math.round((isDestination ? leg.arrivalDelay : leg.departureDelay) / 60));
  let renderedTime;

  if (!isOnTime) {
    // If the transit vehicle is not on time, strike the original scheduled time
    // and display the updated time underneath.
    renderedTime = /*#__PURE__*/_react.default.createElement(TimeBlock, null, !isOnTime && /*#__PURE__*/_react.default.createElement(TimeStruck, null, originalFormattedTime), /*#__PURE__*/_react.default.createElement(TimeText, null, formattedTime));
  } else {
    renderedTime = /*#__PURE__*/_react.default.createElement(TimeText, null, formattedTime);
  }

  return /*#__PURE__*/_react.default.createElement(TimeColumn, null, renderedTime, /*#__PURE__*/_react.default.createElement(StatusText, null, !isOnTime && /*#__PURE__*/_react.default.createElement(DelayText, null, delayInMinutes, " min"), statusText));
} // Connect to redux store for timeOptions.


const mapStateToProps = (state, ownProps) => {
  return {
    timeOptions: {
      format: (0, _time.getTimeFormat)(state.otp.config)
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(RealtimeTimeColumn);

exports.default = _default;
RealtimeTimeColumn.propTypes = {
  isDestination: _propTypes.default.bool.isRequired,
  leg: _types.legType.isRequired,
  timeOptions: _types.timeOptionsType
};
RealtimeTimeColumn.defaultProps = {
  timeOptions: null
};
module.exports = exports.default;

//# sourceMappingURL=realtime-time-column.js