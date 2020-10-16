"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.freeze");

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _types = require("@opentripplanner/core-utils/lib/types");

var _time = require("@opentripplanner/core-utils/lib/time");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  ", ", ", " {\n    color: #d9534f;\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  ", ", ", " {\n    color: #337ab7;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  ", ", ", " {\n    color: #5cb85c;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  white-space: nowrap;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  color: #bbb;\n  font-size: 80%;\n  line-height: 1em;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  line-height: 1em;\n  margin-bottom: 4px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  text-decoration: line-through;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TimeText = _styledComponents.default.div(_templateObject());

var TimeStruck = _styledComponents.default.div(_templateObject2());

var TimeBlock = _styledComponents.default.div(_templateObject3());

var TimeColumnBase = _styledComponents.default.div(_templateObject4());

var StatusText = _styledComponents.default.div(_templateObject5());

var DelayText = _styledComponents.default.span(_templateObject6()); // Reusing stop viewer colors.


var TimeColumnOnTime = (0, _styledComponents.default)(TimeColumnBase)(_templateObject7(), TimeText, StatusText);
var TimeColumnEarly = (0, _styledComponents.default)(TimeColumnBase)(_templateObject8(), TimeText, StatusText);
var TimeColumnLate = (0, _styledComponents.default)(TimeColumnBase)(_templateObject9(), TimeText, StatusText);
/**
 * This component displays the scheduled departure/arrival time for a leg,
 * and, for transit legs, displays any delays or earliness where applicable.
 */

function RealtimeTimeColumn(_ref) {
  var isDestination = _ref.isDestination,
      leg = _ref.leg,
      timeOptions = _ref.timeOptions;
  var time = isDestination ? leg.endTime : leg.startTime;
  var formattedTime = time && (0, _time.formatTime)(time, timeOptions);
  var isTransitLeg = (0, _itinerary.isTransit)(leg.mode); // For non-real-time legs, show only the scheduled time,
  // except for transit legs where we add the "scheduled" text underneath.

  if (!leg.realTime) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(TimeText, null, formattedTime), isTransitLeg && /*#__PURE__*/_react.default.createElement(StatusText, null, "scheduled"));
  } // Delay in seconds.


  var delay = isDestination ? leg.arrivalDelay : leg.departureDelay; // Time is in milliseconds.

  var originalTime = time - delay * 1000;
  var originalFormattedTime = originalTime && (0, _time.formatTime)(originalTime, timeOptions); // TODO: refine on-time thresholds.
  // const isOnTime = delay >= -60 && delay <= 120;

  var isOnTime = delay === 0;
  var statusText;
  var TimeColumn = TimeColumnBase;

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


  var delayInMinutes = Math.abs(Math.round((isDestination ? leg.arrivalDelay : leg.departureDelay) / 60));
  var renderedTime;

  if (!isOnTime) {
    // If the transit vehicle is not on time, strike the original scheduled time
    // and display the updated time underneath.
    renderedTime = /*#__PURE__*/_react.default.createElement(TimeBlock, null, !isOnTime && /*#__PURE__*/_react.default.createElement(TimeStruck, null, originalFormattedTime), /*#__PURE__*/_react.default.createElement(TimeText, null, formattedTime));
  } else {
    renderedTime = /*#__PURE__*/_react.default.createElement(TimeText, null, formattedTime);
  }

  return /*#__PURE__*/_react.default.createElement(TimeColumn, null, renderedTime, /*#__PURE__*/_react.default.createElement(StatusText, null, !isOnTime && /*#__PURE__*/_react.default.createElement(DelayText, null, delayInMinutes, " min"), statusText));
} // Connect to redux store for timeOptions.


var mapStateToProps = function mapStateToProps(state, ownProps) {
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