"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _tripDetails = _interopRequireDefault(require("@opentripplanner/trip-details"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TripDetails = (0, _styledComponents.default)(_tripDetails.default)`
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
      format: _coreUtils.default.time.getTimeFormat(state.otp.config)
    },
    longDateFormat: _coreUtils.default.time.getLongDateFormat(state.otp.config)
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(TripDetails);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-trip-details.js