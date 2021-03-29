"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: port user-specific code from the otp reducer.
function createUserReducer() {
  const initialState = {};
  return (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURRENT_USER':
        {
          return (0, _immutabilityHelper.default)(state, {
            accessToken: {
              $set: action.payload.accessToken
            },
            loggedInUser: {
              $set: action.payload.user
            }
          });
        }

      case 'SET_CURRENT_USER_MONITORED_TRIPS':
        {
          return (0, _immutabilityHelper.default)(state, {
            loggedInUserMonitoredTrips: {
              $set: action.payload
            }
          });
        }

      case 'SET_PATH_BEFORE_SIGNIN':
        {
          return (0, _immutabilityHelper.default)(state, {
            pathBeforeSignIn: {
              $set: action.payload
            }
          });
        }

      default:
        return state;
    }
  };
}

var _default = createUserReducer;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=create-user-reducer.js