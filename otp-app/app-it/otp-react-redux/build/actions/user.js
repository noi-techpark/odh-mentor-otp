"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUserMonitoredTrips = fetchUserMonitoredTrips;
exports.fetchOrInitializeUser = fetchOrInitializeUser;
exports.createOrUpdateUser = createOrUpdateUser;
exports.createOrUpdateUserMonitoredTrip = createOrUpdateUserMonitoredTrip;
exports.deleteUserMonitoredTrip = deleteUserMonitoredTrip;
exports.setPathBeforeSignIn = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.string.sub");

var _reduxActions = require("redux-actions");

var _middleware = require("../util/middleware");

var _user = require("../util/user");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var setCurrentUser = (0, _reduxActions.createAction)('SET_CURRENT_USER');
var setCurrentUserMonitoredTrips = (0, _reduxActions.createAction)('SET_CURRENT_USER_MONITORED_TRIPS');
var setPathBeforeSignIn = (0, _reduxActions.createAction)('SET_PATH_BEFORE_SIGNIN');
exports.setPathBeforeSignIn = setPathBeforeSignIn;

function createNewUser(auth0User) {
  return {
    auth0UserId: auth0User.sub,
    email: auth0User.email,
    hasConsentedToTerms: false,
    // User must agree to terms.
    notificationChannel: 'email',
    phoneNumber: '',
    savedLocations: [],
    storeTripHistory: false // User must opt in.

  };
}
/**
 * Fetches the saved/monitored trips for a user.
 * We use the accessToken to fetch the data regardless of
 * whether the process to populate state.user is completed or not.
 */


function fetchUserMonitoredTrips(accessToken) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var _getState, otp, _otp$config$persisten, otpMiddleware, _yield$getTrips, trips, fetchStatus;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _getState = getState(), otp = _getState.otp;
              _otp$config$persisten = otp.config.persistence.otp_middleware, otpMiddleware = _otp$config$persisten === void 0 ? null : _otp$config$persisten;

              if (!otpMiddleware) {
                _context.next = 9;
                break;
              }

              _context.next = 5;
              return (0, _middleware.getTrips)(otpMiddleware, accessToken);

            case 5:
              _yield$getTrips = _context.sent;
              trips = _yield$getTrips.data;
              fetchStatus = _yield$getTrips.status;

              if (fetchStatus === 'success') {
                dispatch(setCurrentUserMonitoredTrips(trips));
              }

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}
/**
 * Fetches user preferences to state.user, or set initial values under state.user if no user has been loaded.
 */


function fetchOrInitializeUser(auth) {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
      var _getState2, otp, _otp$config$persisten2, otpMiddleware, accessToken, authUser, _yield$fetchUser, user, fetchUserStatus, isNewAccount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _getState2 = getState(), otp = _getState2.otp;
              _otp$config$persisten2 = otp.config.persistence.otp_middleware, otpMiddleware = _otp$config$persisten2 === void 0 ? null : _otp$config$persisten2;

              if (!otpMiddleware) {
                _context2.next = 17;
                break;
              }

              accessToken = auth.accessToken, authUser = auth.user;
              _context2.next = 6;
              return (0, _middleware.fetchUser)(otpMiddleware, accessToken);

            case 6:
              _yield$fetchUser = _context2.sent;
              user = _yield$fetchUser.data;
              fetchUserStatus = _yield$fetchUser.status;
              // Beware! On AWS API gateway, if a user is not found in the middleware
              // (e.g. they just created their Auth0 password but have not completed the account setup form yet),
              // the call above will return, for example:
              // {
              //    status: 'success',
              //    data: {
              //      "result": "ERR",
              //      "message": "No user with id=000000 found.",
              //      "code": 404,
              //      "detail": null
              //    }
              // }
              //
              // The same call to a middleware instance that is not behind an API gateway
              // will return:
              // {
              //    status: 'error',
              //    message: 'Error get-ing user...'
              // }
              // TODO: Improve AWS response.
              isNewAccount = fetchUserStatus === 'error' || user && user.result === 'ERR';

              if (isNewAccount) {
                _context2.next = 16;
                break;
              }

              _context2.next = 13;
              return dispatch(fetchUserMonitoredTrips(accessToken));

            case 13:
              dispatch(setCurrentUser({
                accessToken: accessToken,
                user: user
              }));
              _context2.next = 17;
              break;

            case 16:
              dispatch(setCurrentUser({
                accessToken: accessToken,
                user: createNewUser(authUser)
              }));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
}
/**
 * Updates (or creates) a user entry in the middleware,
 * then, if that was successful, updates the redux state with that user.
 */


function createOrUpdateUser(userData) {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
      var _getState3, otp, user, _otp$config$persisten3, otpMiddleware, accessToken, loggedInUser, result, _userData;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _getState3 = getState(), otp = _getState3.otp, user = _getState3.user;
              _otp$config$persisten3 = otp.config.persistence.otp_middleware, otpMiddleware = _otp$config$persisten3 === void 0 ? null : _otp$config$persisten3;

              if (!otpMiddleware) {
                _context3.next = 14;
                break;
              }

              accessToken = user.accessToken, loggedInUser = user.loggedInUser;

              if (!(0, _user.isNewUser)(loggedInUser)) {
                _context3.next = 10;
                break;
              }

              _context3.next = 7;
              return (0, _middleware.addUser)(otpMiddleware, accessToken, userData);

            case 7:
              result = _context3.sent;
              _context3.next = 13;
              break;

            case 10:
              _context3.next = 12;
              return (0, _middleware.updateUser)(otpMiddleware, accessToken, userData);

            case 12:
              result = _context3.sent;

            case 13:
              // TODO: improve the UI feedback messages for this.
              if (result.status === 'success' && result.data) {
                alert('Your preferences have been saved.'); // Update application state with the user entry as saved
                // (as returned) by the middleware.

                _userData = result.data;
                dispatch(setCurrentUser({
                  accessToken: accessToken,
                  user: _userData
                }));
              } else {
                alert("An error was encountered:\n".concat(JSON.stringify(result)));
              }

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
}
/**
 * Updates a logged-in user's monitored trip,
 * then, if that was successful, alerts (optional)
 * and refreshes the redux monitoredTrips with the updated trip.
 */


function createOrUpdateUserMonitoredTrip(tripData, isNew, silentOnSuccess) {
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
      var _getState4, otp, user, _otp$config$persisten4, otpMiddleware, accessToken, result;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _getState4 = getState(), otp = _getState4.otp, user = _getState4.user;
              _otp$config$persisten4 = otp.config.persistence.otp_middleware, otpMiddleware = _otp$config$persisten4 === void 0 ? null : _otp$config$persisten4;

              if (!otpMiddleware) {
                _context4.next = 20;
                break;
              }

              accessToken = user.accessToken;

              if (!isNew) {
                _context4.next = 10;
                break;
              }

              _context4.next = 7;
              return (0, _middleware.addTrip)(otpMiddleware, accessToken, tripData);

            case 7:
              result = _context4.sent;
              _context4.next = 13;
              break;

            case 10:
              _context4.next = 12;
              return (0, _middleware.updateTrip)(otpMiddleware, accessToken, tripData);

            case 12:
              result = _context4.sent;

            case 13:
              if (!(result.status === 'success' && result.data)) {
                _context4.next = 19;
                break;
              }

              if (!silentOnSuccess) {
                alert('Your preferences have been saved.');
              } // Reload user's monitored trips after add/update.


              _context4.next = 17;
              return dispatch(fetchUserMonitoredTrips(accessToken));

            case 17:
              _context4.next = 20;
              break;

            case 19:
              alert("An error was encountered:\n".concat(JSON.stringify(result)));

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();
}
/**
 * Deletes a logged-in user's monitored trip,
 * then, if that was successful, refreshes the redux monitoredTrips state.
 */


function deleteUserMonitoredTrip(id) {
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
      var _getState5, otp, user, _otp$config$persisten5, otpMiddleware, accessToken, deleteResult;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _getState5 = getState(), otp = _getState5.otp, user = _getState5.user;
              _otp$config$persisten5 = otp.config.persistence.otp_middleware, otpMiddleware = _otp$config$persisten5 === void 0 ? null : _otp$config$persisten5;

              if (!otpMiddleware) {
                _context5.next = 13;
                break;
              }

              accessToken = user.accessToken;
              _context5.next = 6;
              return (0, _middleware.deleteTrip)(otpMiddleware, accessToken, id);

            case 6:
              deleteResult = _context5.sent;

              if (!(deleteResult.status === 'success')) {
                _context5.next = 12;
                break;
              }

              _context5.next = 10;
              return dispatch(fetchUserMonitoredTrips(accessToken));

            case 10:
              _context5.next = 13;
              break;

            case 12:
              alert("An error was encountered:\n".concat(JSON.stringify(deleteResult)));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();
}

//# sourceMappingURL=user.js