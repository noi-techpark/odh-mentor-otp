"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _tripTools = _interopRequireDefault(require("../narrative/trip-tools"));

var _state = require("../../util/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ErrorMessage extends _react.Component {
  render() {
    const {
      error,
      errorMessages,
      currentQuery
    } = this.props;
    if (!error) return null;
    let message = error.msg; // check for configuration-defined message override

    if (errorMessages) {
      const msgConfig = errorMessages.find(m => m.id === error.id);

      if (msgConfig) {
        if (msgConfig.modes) {
          for (const mode of msgConfig.modes) {
            if (currentQuery.mode.includes(mode)) {
              message = msgConfig.msg;
              break;
            }
          }
        } else message = msgConfig.msg;
      }
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "error-message"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "header"
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-exclamation-circle"
    }), " Could Not $_plan_trip_$"), /*#__PURE__*/_react.default.createElement("div", {
      className: "message"
    }, message), /*#__PURE__*/_react.default.createElement(_tripTools.default, {
      buttonTypes: ['START_OVER', 'REPORT_ISSUE']
    }));
  }

} // connect to the redux store


_defineProperty(ErrorMessage, "propTypes", {
  error: _propTypes.default.object
});

const mapStateToProps = (state, ownProps) => {
  const activeSearch = (0, _state.getActiveSearch)(state.otp);
  return {
    error: activeSearch && activeSearch.response && activeSearch.response.error,
    currentQuery: state.otp.currentQuery,
    errorMessages: state.otp.config.errorMessages
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ErrorMessage);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=error-message.js