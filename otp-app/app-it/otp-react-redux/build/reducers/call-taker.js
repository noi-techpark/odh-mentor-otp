"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.find-index");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

var _moment = _interopRequireDefault(require("moment"));

var _state = require("../util/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var randId = _coreUtils.default.storage.randId;
var UPPER_RIGHT_CORNER = {
  x: 604,
  y: 53
};
var FETCH_STATUS = {
  UNFETCHED: 0,
  FETCHING: 1,
  FETCHED: 2,
  ERROR: -1
};

function createCallTakerReducer() {
  var initialState = {
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
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'BEGIN_CALL':
        {
          var newCall = {
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
          var data = action.payload.calls;
          var calls = {
            status: FETCH_STATUS.FETCHED,
            data: data.sort(function (a, b) {
              return (0, _moment.default)(b.endTime) - (0, _moment.default)(a.endTime);
            })
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
          var _action$payload = action.payload,
              callId = _action$payload.callId,
              queries = _action$payload.queries;
          var _data = state.callHistory.calls.data;

          var index = _data.findIndex(function (call) {
            return call.id === callId;
          });

          var call = _objectSpread(_objectSpread({}, _data[index]), {}, {
            queries: queries
          });

          return (0, _immutabilityHelper.default)(state, {
            callHistory: {
              calls: {
                data: _defineProperty({}, index, {
                  $set: call
                })
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
          var session = action.payload.session;

          if (!session || !session.username) {
            var sessionId = session ? session.sessionId : 'N/A'; // Session is invalid if username is missing.

            window.alert("Session ID ".concat(sessionId, " is invalid!")); // TODO: Should we return to URL_ROOT at this point?

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