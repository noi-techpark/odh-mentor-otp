"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _src2 = _interopRequireDefault(require("../../otp-ui/trip-details/src"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TripDetails = (0, _styledComponents.default)(_src2.default)`
  b {
    font-weight: 600;
  }
`; // Connect imported TripDetails class to redux store.

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.otp.config.language.tripDetails,
    routingType: state.otp.currentQuery.routingType,
    tnc: state.otp.tnc,
    timeOptions: {
      format: _src.default.time.getTimeFormat(state.otp.config)
    },
    longDateFormat: _src.default.time.getLongDateFormat(state.otp.config)
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(TripDetails);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-trip-details.js