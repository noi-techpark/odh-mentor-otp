"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../otp-ui/core-utils/src"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _moment = _interopRequireDefault(require("moment"));

var _state = require("../util/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  randId
} = _src.default.storage;
const UPPER_RIGHT_CORNER = {
  x: 604,
  y: 53
};
const FETCH_STATUS = {
  UNFETCHED: 0,
  FETCHING: 1,
  FETCHED: 2,
  ERROR: -1
};

function createCallTakerReducer() {
  const initialState = {
    activeCall: null,
    callHistory: {
      position: UPPER_RIGHT_CORNER,
      visible: false,
      calls: {
        status: FETCH_STATUS.UNFETCHED,
        data: []
      }
    },
    fieldTrips: [],
    session: null
  };
  return (state = initialState, action) => {
    switch (action.type) {
      case 'BEGIN_CALL':
        {
          const newCall = {
            startTime: (0, _state.getTimestamp)(),
            id: randId(),
            searches: []
          }; // Initialize new call and show call history window.

          return (0, _immutabilityHelper.default)(state, {
            activeCall: {
              $set: newCall
            },
            callHistory: {
              visible: {
                $set: true
              }
            }
          });
        }

      case 'REQUESTING_CALLS':
        {
          return (0, _immutabilityHelper.default)(state, {
            callHistory: {
              calls: {
                status: {
                  $set: FETCH_STATUS.FETCHING
                }
              }
            }
          });
        }

      case 'RECEIVED_CALLS':
        {
          const data = action.payload.calls;
          const calls = {
            status: FETCH_STATUS.FETCHED,
            data: data.sort((a, b) => (0, _moment.default)(b.endTime) - (0, _moment.default)(a.endTime))
          };
          return (0, _immutabilityHelper.default)(state, {
            callHistory: {
              calls: {
                $set: calls
              }
            }
          });
        }

      case 'RECEIVED_QUERIES':
        {
          const {
            callId,
            queries
          } = action.payload;
          const {
            data
          } = state.callHistory.calls;
          const index = data.findIndex(call => call.id === callId);
          const call = { ...data[index],
            queries
          };
          return (0, _immutabilityHelper.default)(state, {
            callHistory: {
              calls: {
                data: {
                  [index]: {
                    $set: call
                  }
                }
              }
            }
          });
        }

      case 'ROUTING_RESPONSE':
        {
          // If call is in progress, record search ID when a routing response is
          // fulfilled.
          // TODO: How should we handle routing errors.
          if (state.activeCall) {
            return (0, _immutabilityHelper.default)(state, {
              activeCall: {
                searches: {
                  $push: [action.payload.searchId]
                }
              }
            });
          } // Otherwise, ignore.


          return state;
        }

      case 'STORE_SESSION':
        {
          const {
            session
          } = action.payload;

          if (!session || !session.username) {
            const sessionId = session ? session.sessionId : 'N/A'; // Session is invalid if username is missing.

            window.alert(`Session ID ${sessionId} is invalid!`); // TODO: Should we return to URL_ROOT at this point?

            return (0, _immutabilityHelper.default)(state, {
              session: {
                $set: null
              }
            });
          }

          return (0, _immutabilityHelper.default)(state, {
            session: {
              $set: session
            }
          });
        }

      case 'TOGGLE_CALL_HISTORY':
        {
          return (0, _immutabilityHelper.default)(state, {
            callHistory: {
              visible: {
                $set: !state.callHistory.visible
              }
            }
          });
        }

      case 'END_CALL':
        {
          return (0, _immutabilityHelper.default)(state, {
            activeCall: {
              $set: null
            }
          });
        }

      default:
        return state;
    }
  };
}

var _default = createCallTakerReducer;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=call-taker.js