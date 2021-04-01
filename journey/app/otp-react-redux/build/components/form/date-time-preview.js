"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  OTP_API_DATE_FORMAT,
  OTP_API_TIME_FORMAT,
  getTimeFormat,
  getDateFormat
} = _coreUtils.default.time;

class DateTimePreview extends _react.Component {
  render() {
    const {
      caret,
      date,
      editButtonText,
      time,
      departArrive,
      routingType,
      startTime,
      endTime,
      timeFormat,
      dateFormat
    } = this.props;
    let timeStr;

    _moment.default.locale(getUserLang() || "it");

    var separator = getUserLang() === "it" ? "a" : "um";

    const formattedTime = _moment.default.utc(time, OTP_API_TIME_FORMAT).format(timeFormat);

    if (routingType === 'ITINERARY') {
      if (departArrive === 'NOW') timeStr = '$_now_$';else if (departArrive === 'ARRIVE') timeStr = '$_arrive_$ ' + formattedTime;else if (departArrive === 'DEPART') timeStr = '$_departure_$ ' + formattedTime;
    } else if (routingType === 'PROFILE') {
      timeStr = startTime + " " + separator + " " + endTime;
    }

    const summary = /*#__PURE__*/_react.default.createElement("div", {
      className: "summary"
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-calendar"
    }), " ", (0, _moment.default)(date, OTP_API_DATE_FORMAT).calendar(null, {
      sameElse: dateFormat
    }).split(" " + separator)[0], /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-clock-o"
    }), " ", timeStr);

    const button = /*#__PURE__*/_react.default.createElement("div", {
      className: "button-container"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      "aria-label": "Edit departure or arrival time",
      onClick: this.props.onClick
    }, editButtonText, caret && /*#__PURE__*/_react.default.createElement("span", null, " ", /*#__PURE__*/_react.default.createElement("i", {
      className: `fa fa-caret-${caret}`
    }))));

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "settings-preview",
      onClick: this.props.onClick
    }, summary, button, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        clear: 'both'
      }
    }));
  }

}

_defineProperty(DateTimePreview, "propTypes", {
  caret: _propTypes.default.string,
  compressed: _propTypes.default.bool,
  date: _propTypes.default.string,
  departArrive: _propTypes.default.string,
  editButtonText: _propTypes.default.element,
  time: _propTypes.default.string,
  onClick: _propTypes.default.func,
  routingType: _propTypes.default.string
});

_defineProperty(DateTimePreview, "defaultProps", {
  editButtonText: /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-pencil"
  })
});

const mapStateToProps = (state, ownProps) => {
  const {
    departArrive,
    date,
    time,
    routingType,
    startTime,
    endTime
  } = state.otp.currentQuery;
  const config = state.otp.config;
  return {
    config,
    routingType,
    departArrive,
    date,
    time,
    startTime,
    endTime,
    timeFormat: getTimeFormat(config),
    dateFormat: getDateFormat(config)
  };
};

const mapDispatchToProps = {};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DateTimePreview);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=date-time-preview.js