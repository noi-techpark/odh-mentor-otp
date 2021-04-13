"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _time2 = require("@opentripplanner/core-utils/lib/time");

var _ModeButton = _interopRequireDefault(require("../ModeButton"));

var Styled = _interopRequireWildcard(require("../styled"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * Determines whether the browser supports a particular <input type=<type> /> control,
 * so we can take advantage of native controls
 * (especially date/time selection) on modern (mobile) browsers.
 * @param {*} type One of the HTML5 input types.
 */


function isInputTypeSupported(type) {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  return input.type === type;
}
/**
 * The `DateTimeSelector` component lets the OTP user chose a departure or arrival date/time.
 * (The departure can be right now.)
 *
 * There are two rendering modes, a "normal" mode and a "legacy" mode.
 * - "Normal" mode: We try to use `<input type="time|date">` for date and time input.
 *   On current HTML5 browsers (desktop or mobile), these controls
 *   render the date/time according to OS settings and natively offer a user interface
 *   for choosing the date/time.
 *   Thus, when `<input type="time|date">` is supported, there is no need to specify a date/time format.
 *   If not, we fall back to "legacy" mode.
 * - "Legacy" mode: On Safari for MacOS, and on legacy browsers that don't support `<input type="time|date">`,
 *   `<input type="time|date">` renders as the default `<input type="text">`, and in these conditions,
 *   we have to fall back to formatting the date/time ourselves, using `dateFormatLegacy` and `timeFormatLegacy` props.
 * - Implementers don't know in advance whether the browser supports `<input type="time|date">`.
 *   That determination is performed by method `isInputTypeSupported(type)` above when the constructor is executed.
 *   Therefore, they should provide `dateFormatLegacy` and `timeFormatLegacy` props as a backup.
 *   If these props are not provided, the OTP API date format is used.
 * - For testing purposes, implementers can "force" the "legacy" mode by setting the `forceLegacy` prop to true.
 */


class DateTimeSelector extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "supportsDateTimeInputs", isInputTypeSupported("date") && isInputTypeSupported("time"));

    _defineProperty(this, "handleDateChange", evt => {
      this.handleQueryParamChange({
        date: evt.target.value
      });
    });

    _defineProperty(this, "handleTimeChange", evt => {
      this.handleQueryParamChange({
        time: evt.target.value
      });
    });

    _defineProperty(this, "handleTimeTimeChangeLegacy", evt => {
      const {
        timeFormatLegacy
      } = this.props;
      const time = (0, _moment.default)(evt.target.value, timeFormatLegacy).format(_time2.OTP_API_TIME_FORMAT);
      this.handleQueryParamChange({
        time
      });
    });

    _defineProperty(this, "handleDateChangeLegacy", evt => {
      const {
        dateFormatLegacy
      } = this.props;
      const date = (0, _moment.default)(evt.target.value, dateFormatLegacy).format(_time2.OTP_API_DATE_FORMAT);
      this.handleQueryParamChange({
        date
      });
    });

    _defineProperty(this, "setDepartArrive", option => {
      if (option.type === "NOW") {
        this.handleQueryParamChange({
          departArrive: "NOW",
          date: (0, _moment.default)().format(_time2.OTP_API_DATE_FORMAT),
          time: (0, _moment.default)().format(_time2.OTP_API_TIME_FORMAT)
        });
      } else if (!option.isSelected) {
        this.handleQueryParamChange({
          departArrive: option.type // TODO: add the depart/arrive date and time to the new state.

        });
      }
    });

    _defineProperty(this, "raiseOnQueryParamChange", queryParam => {
      const {
        onQueryParamChange
      } = this.props;

      if (typeof onQueryParamChange === "function") {
        onQueryParamChange(queryParam);
      }
    });

    _defineProperty(this, "handleQueryParamChange", queryParam => {
      this.raiseOnQueryParamChange(queryParam);
      this.setState({ ...queryParam
      });
    });

    const {
      date: _date,
      time: _time,
      departArrive
    } = props;
    this.state = {
      date: _date,
      time: _time,
      departArrive
    };
  }

  render() {
    // console.log(`supports date time: ${this.supportsDateTimeInputs}`);
    const {
      className,
      dateFormatLegacy = _time2.OTP_API_DATE_FORMAT,
      forceLegacy,
      timeFormatLegacy = _time2.OTP_API_TIME_FORMAT,
      style
    } = this.props;
    const {
      departArrive,
      date,
      time
    } = this.state;
    const departureOptions = [{
      // Default option.
      type: "NOW",
      text: "$_now_$"
    }, {
      type: "DEPART",
      text: "$_depart_at_$"
    }, {
      type: "ARRIVE",
      text: "$_arrive_at_$"
    }];
    departureOptions.forEach(opt => {
      opt.isSelected = departArrive === opt.type;
    });
    const isLegacy = forceLegacy || !this.supportsDateTimeInputs;
    return /*#__PURE__*/_react.default.createElement(Styled.DateTimeSelector, {
      className: className,
      style: style
    }, /*#__PURE__*/_react.default.createElement(Styled.DateTimeSelector.DepartureRow, null, departureOptions.map(opt => /*#__PURE__*/_react.default.createElement(_ModeButton.default, {
      key: opt.type,
      selected: opt.isSelected,
      onClick: () => this.setDepartArrive(opt)
    }, opt.text))), departArrive !== "NOW" && !isLegacy && /*#__PURE__*/_react.default.createElement(Styled.DateTimeSelector.DateTimeRow, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
      type: "time",
      value: time,
      required: true,
      onChange: this.handleTimeChange
    })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
      type: "date",
      value: date,
      required: true,
      onChange: this.handleDateChange
    }))), departArrive !== "NOW" && isLegacy && /*#__PURE__*/_react.default.createElement(Styled.DateTimeSelector.DateTimeRow, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      defaultValue: (0, _moment.default)(time, _time2.OTP_API_TIME_FORMAT).format(timeFormatLegacy),
      required: true,
      onChange: this.handleTimeTimeChangeLegacy
    })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      defaultValue: (0, _moment.default)(date, _time2.OTP_API_DATE_FORMAT).format(dateFormatLegacy),
      required: true,
      onChange: this.handleDateChangeLegacy
    }))));
  }

}

DateTimeSelector.propTypes = {
  /**
   * The CSS class name to apply to this element.
   */
  className: _propTypes.default.string,

  /**
   * The initial departure/arrival date string, in a format that an HTML <input type="date"> control can render.
   */
  date: _propTypes.default.string,

  /**
   * The date format string for legacy mode (on legacy browsers, or if `forceLegacy` is true).
   */
  dateFormatLegacy: _propTypes.default.string,

  /**
   * The initial setting determining whether a trip should start or end at a given time.
   */
  departArrive: _propTypes.default.oneOf(["NOW", "DEPART", "ARRIVE"]),

  /**
   * If true, forces legacy mode and uses `<input type="text">`
   * instead of the native date/time pickers found on modern browsers.
   */
  forceLegacy: _propTypes.default.bool,

  /**
   * The initial departure/arrival time string, in a format that an HTML <input type="time"> control can render.
   */
  time: _propTypes.default.string,

  /**
   * The time format string for legacy mode (on legacy browsers, or if `forceLegacy` is true).
   */
  timeFormatLegacy: _propTypes.default.string,

  /**
   * Triggered when a query parameter is changed.
   * @param params A { param1: value1, param2, value2, ... } object that contains the new values for the parameter(s) that has (have) changed.
   */
  onQueryParamChange: _propTypes.default.func
};
DateTimeSelector.defaultProps = {
  className: null,
  date: null,
  dateFormatLegacy: null,
  departArrive: "NOW",
  forceLegacy: false,
  time: null,
  timeFormatLegacy: null,
  onQueryParamChange: null
};
var _default = DateTimeSelector;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js