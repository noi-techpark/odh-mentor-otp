"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _form = require("../../actions/form");

var _styled = require("./styled");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DateTimeModal extends _react.Component {
  render() {
    const {
      date,
      dateFormatLegacy,
      departArrive,
      setQueryParam,
      time,
      timeFormatLegacy
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "date-time-modal"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "main-panel"
    }, /*#__PURE__*/_react.default.createElement(_styled.StyledDateTimeSelector, {
      className: "date-time-selector",
      date: date,
      departArrive: departArrive,
      onQueryParamChange: setQueryParam,
      time: time // These props below are for Safari on MacOS, and legacy browsers
      // that don't support `<input type="time|date">`.
      // These props are not relevant in modern browsers,
      // where `<input type="time|date">` already
      // formats the time|date according to the OS settings.
      ,
      dateFormatLegacy: dateFormatLegacy,
      timeFormatLegacy: timeFormatLegacy
    })));
  }

}

_defineProperty(DateTimeModal, "propTypes", {
  setQueryParam: _propTypes.default.func
});

const mapStateToProps = (state, ownProps) => {
  const {
    departArrive,
    date,
    time
  } = state.otp.currentQuery;
  const config = state.otp.config;
  return {
    config,
    departArrive,
    date,
    time,
    // These props below are for legacy browsers (see render method above).
    timeFormatLegacy: _coreUtils.default.time.getTimeFormat(config),
    dateFormatLegacy: _coreUtils.default.time.getDateFormat(config)
  };
};

const mapDispatchToProps = {
  setQueryParam: _form.setQueryParam
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DateTimeModal);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=date-time-modal.js