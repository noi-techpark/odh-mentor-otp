"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endCall = endCall;
exports.initializeModules = initializeModules;
exports.fetchCalls = fetchCalls;
exports.saveQueriesForCall = saveQueriesForCall;
exports.fetchQueries = fetchQueries;
exports.toggleCallHistory = exports.beginCall = void 0;

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

var _query = require("@opentripplanner/core-utils/lib/query");

var _qs = _interopRequireDefault(require("qs"));

var _reduxActions = require("redux-actions");

var _callTaker = require("../util/call-taker");

var _constants = require("../util/constants");

var _state = require("../util/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (typeof fetch === 'undefined') require('isomorphic-fetch'); /// PRIVATE ACTIONS

var endingCall = (0, _reduxActions.createAction)('END_CALL');
var receivedCalls = (0, _reduxActions.createAction)('RECEIVED_CALLS');
var receivedQueries = (0, _reduxActions.createAction)('RECEIVED_QUERIES');
var requestingCalls = (0, _reduxActions.createAction)('REQUESTING_CALLS');
var requestingQueries = (0, _reduxActions.createAction)('REQUESTING_QUERIES');
var storeSession = (0, _reduxActions.createAction)('STORE_SESSION'); /// PUBLIC ACTIONS

var beginCall = (0, _reduxActions.createAction)('BEGIN_CALL');
exports.beginCall = beginCall;
var toggleCallHistory = (0, _reduxActions.createAction)('TOGGLE_CALL_HISTORY');
/**
 * End the active call and store the queries made during the call.
 */

exports.toggleCallHistory = toggleCallHistory;

function endCall() {
  return function (dispatch, getState) {
    var _getState = getState(),
        callTaker = _getState.callTaker,
        otp = _getState.otp;

    var activeCall = callTaker.activeCall,
        session = callTaker.session;
    if (sessionIsInvalid(session)) return; // Make POST request to store call.

    var callData = new FormData();
    callData.append('sessionId', session.sessionId);
    callData.append('call.startTime', activeCall.startTime);
    callData.append('call.endTime', (0, _state.getTimestamp)());
    fetch("".concat(otp.config.datastoreUrl, "/calltaker/call"), {
      method: 'POST',
      body: callData
    }).then(function (res) {
      return res.json();
    }).then(function (id) {
      // Inject call ID into active call and save queries.
      dispatch(saveQueriesForCall(_objectSpread(_objectSpread({}, activeCall), {}, {
        id: id
      })));
      dispatch(fetchCalls());
    }).catch(function (err) {
      console.error(err);
      alert("Could not save call: ".concat(JSON.stringify(err)));
    });
    dispatch(endingCall());
  };
}
/**
 * Initialize the Call Taker and Field Trip modules by checking the session
 * query param against sessions in the datastore backend or initializing a new
 * session via Trinet.
 */


function initializeModules() {
  return function (dispatch, getState) {
    var _getState$otp$config = getState().otp.config,
        datastoreUrl = _getState$otp$config.datastoreUrl,
        trinetReDirect = _getState$otp$config.trinetReDirect; // Initialize session if datastore enabled.

    if (datastoreUrl && trinetReDirect) {
      // TODO: Generalize for non-TriNet instances.
      var sessionId = (0, _query.getUrlParams)().sessionId;

      if (sessionId) {
        // Initialize the session if found in URL query params.
        dispatch(checkSession(datastoreUrl, sessionId));
      } else {
        // No sessionId was passed in, so we must request one from server.
        newSession(datastoreUrl, trinetReDirect, _constants.URL_ROOT);
      }
    }
  };
}
/**
 * Handle initializing a new Trinet session by redirecting to Trinet auth and
 * returning once authenticated successfully.
 */


function newSession(datastoreUrl, verifyLoginUrl, redirect) {
  fetch(datastoreUrl + '/auth/newSession').then(function (res) {
    return res.json();
  }).then(function (data) {
    var session = data.sessionId;
    console.log('newSession success: ' + session);
    var windowUrl = "".concat(verifyLoginUrl, "?").concat(_qs.default.stringify({
      session: session,
      redirect: redirect
    }));
    console.log('redirecting to: ' + windowUrl);
    window.location = windowUrl;
  }).catch(function (error) {
    console.error('newSession error', error);
  });
}
/**
 * Check that a particular session ID is valid and store resulting session
 * data.
 */


function checkSession(datastoreUrl, sessionId) {
  return function (dispatch, getState) {
    fetch(datastoreUrl + "/auth/checkSession?sessionId=".concat(sessionId)).then(function (res) {
      return res.json();
    }).then(function (session) {
      return dispatch(storeSession({
        session: session
      }));
    }).catch(function (error) {
      console.error('checkSession error', error);
      dispatch(storeSession({
        session: null
      }));
    });
  };
}
/**
 * Fetch latest calls for a particular session.
 */


function fetchCalls() {
  return function (dispatch, getState) {
    dispatch(requestingCalls());

    var _getState2 = getState(),
        callTaker = _getState2.callTaker,
        otp = _getState2.otp;

    if (sessionIsInvalid(callTaker.session)) return;
    var datastoreUrl = otp.config.datastoreUrl;
    var sessionId = callTaker.session.sessionId;
    var limit = 10;
    fetch("".concat(datastoreUrl, "/calltaker/call?").concat(_qs.default.stringify({
      limit: limit,
      sessionId: sessionId
    }))).then(function (res) {
      return res.json();
    }).then(function (calls) {
      console.log('GET calls response', calls);
      dispatch(receivedCalls({
        calls: calls
      }));
    }).catch(function (err) {
      alert("Could not fetch calls: ".concat(JSON.stringify(err)));
    });
  };
}
/**
 * @return {boolean} - whether a calltaker session is invalid
 */


function sessionIsInvalid(session) {
  if (!session || !session.sessionId) {
    console.error('No valid OTP datastore session found.');
    return true;
  }

  return false;
}
/**
 * Store the trip queries made over the course of a call (to be called when the
 * call terminates).
 */


function saveQueriesForCall(call) {
  return function (dispatch, getState) {
    var _getState3 = getState(),
        callTaker = _getState3.callTaker,
        otp = _getState3.otp;

    var datastoreUrl = otp.config.datastoreUrl;
    if (sessionIsInvalid(callTaker.session)) return;

    if (!call) {
      alert("Could not find call for ".concat(call.id, ". Cancelling save queries request."));
      return;
    }

    return Promise.all(call.searches.map(function (searchId) {
      var search = otp.searches[searchId];
      var query = (0, _callTaker.searchToQuery)(search, call, otp.config);
      var sessionId = callTaker.session.sessionId;
      var queryData = new FormData();
      queryData.append('sessionId', sessionId);
      queryData.append('query.queryParams', query.queryParams);
      queryData.append('query.fromPlace', query.fromPlace);
      queryData.append('query.toPlace', query.toPlace);
      queryData.append('query.timeStamp', query.timeStamp);
      queryData.append('query.call.id', call.id);
      return fetch("".concat(datastoreUrl, "/calltaker/callQuery?sessionId=").concat(sessionId), {
        method: 'POST',
        body: queryData
      }).then(function (res) {
        return res.json();
      }).catch(function (err) {
        alert("Could not fetch calls: ".concat(JSON.stringify(err)));
      });
    }));
  };
}
/**
 * Fetch the trip queries that were made during a particular call.
 */


function fetchQueries(callId) {
  return function (dispatch, getState) {
    dispatch(requestingQueries());

    var _getState4 = getState(),
        callTaker = _getState4.callTaker,
        otp = _getState4.otp;

    var datastoreUrl = otp.config.datastoreUrl;
    if (sessionIsInvalid(callTaker.session)) return;
    var sessionId = callTaker.session.sessionId;
    fetch("".concat(datastoreUrl, "/calltaker/callQuery?sessionId=").concat(sessionId, "&call.id=").concat(callId)).then(function (res) {
      return res.json();
    }).then(function (queries) {
      dispatch(receivedQueries({
        callId: callId,
        queries: queries
      }));
    }).catch(function (err) {
      alert("Could not fetch calls: ".concat(JSON.stringify(err)));
    });
  };
}

//# sourceMappingURL=call-taker.js