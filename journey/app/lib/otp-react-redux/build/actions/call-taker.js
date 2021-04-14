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

require("core-js/modules/web.dom.iterable.js");

var _query = require("../otp-ui/core-utils/src/query");

var _qs = _interopRequireDefault(require("qs"));

var _reduxActions = require("redux-actions");

var _callTaker = require("../util/call-taker");

var _constants = require("../util/constants");

var _state = require("../util/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof fetch === 'undefined') require('isomorphic-fetch'); /// PRIVATE ACTIONS

const endingCall = (0, _reduxActions.createAction)('END_CALL');
const receivedCalls = (0, _reduxActions.createAction)('RECEIVED_CALLS');
const receivedQueries = (0, _reduxActions.createAction)('RECEIVED_QUERIES');
const requestingCalls = (0, _reduxActions.createAction)('REQUESTING_CALLS');
const requestingQueries = (0, _reduxActions.createAction)('REQUESTING_QUERIES');
const storeSession = (0, _reduxActions.createAction)('STORE_SESSION'); /// PUBLIC ACTIONS

const beginCall = (0, _reduxActions.createAction)('BEGIN_CALL');
exports.beginCall = beginCall;
const toggleCallHistory = (0, _reduxActions.createAction)('TOGGLE_CALL_HISTORY');
/**
 * End the active call and store the queries made during the call.
 */

exports.toggleCallHistory = toggleCallHistory;

function endCall() {
  return function (dispatch, getState) {
    const {
      callTaker,
      otp
    } = getState();
    const {
      activeCall,
      session
    } = callTaker;
    if (sessionIsInvalid(session)) return; // Make POST request to store call.

    const callData = new FormData();
    callData.append('sessionId', session.sessionId);
    callData.append('call.startTime', activeCall.startTime);
    callData.append('call.endTime', (0, _state.getTimestamp)());
    fetch(`${otp.config.datastoreUrl}/calltaker/call`, {
      method: 'POST',
      body: callData
    }).then(res => res.json()).then(id => {
      // Inject call ID into active call and save queries.
      dispatch(saveQueriesForCall({ ...activeCall,
        id
      }));
      dispatch(fetchCalls());
    }).catch(err => {
      console.error(err);
      alert(`Could not save call: ${JSON.stringify(err)}`);
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
    const {
      datastoreUrl,
      trinetReDirect
    } = getState().otp.config; // Initialize session if datastore enabled.

    if (datastoreUrl && trinetReDirect) {
      // TODO: Generalize for non-TriNet instances.
      const sessionId = (0, _query.getUrlParams)().sessionId;

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
  fetch(datastoreUrl + '/auth/newSession').then(res => res.json()).then(data => {
    const {
      sessionId: session
    } = data;
    console.log('newSession success: ' + session);
    const windowUrl = `${verifyLoginUrl}?${_qs.default.stringify({
      session,
      redirect
    })}`;
    console.log('redirecting to: ' + windowUrl);
    window.location = windowUrl;
  }).catch(error => {
    console.error('newSession error', error);
  });
}
/**
 * Check that a particular session ID is valid and store resulting session
 * data.
 */


function checkSession(datastoreUrl, sessionId) {
  return function (dispatch, getState) {
    fetch(datastoreUrl + `/auth/checkSession?sessionId=${sessionId}`).then(res => res.json()).then(session => dispatch(storeSession({
      session
    }))).catch(error => {
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
    const {
      callTaker,
      otp
    } = getState();
    if (sessionIsInvalid(callTaker.session)) return;
    const {
      datastoreUrl
    } = otp.config;
    const {
      sessionId
    } = callTaker.session;
    const limit = 10;
    fetch(`${datastoreUrl}/calltaker/call?${_qs.default.stringify({
      limit,
      sessionId
    })}`).then(res => res.json()).then(calls => {
      console.log('GET calls response', calls);
      dispatch(receivedCalls({
        calls
      }));
    }).catch(err => {
      alert(`Could not fetch calls: ${JSON.stringify(err)}`);
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
    const {
      callTaker,
      otp
    } = getState();
    const {
      datastoreUrl
    } = otp.config;
    if (sessionIsInvalid(callTaker.session)) return;

    if (!call) {
      alert(`Could not find call for ${call.id}. Cancelling save queries request.`);
      return;
    }

    return Promise.all(call.searches.map(searchId => {
      const search = otp.searches[searchId];
      const query = (0, _callTaker.searchToQuery)(search, call, otp.config);
      const {
        sessionId
      } = callTaker.session;
      const queryData = new FormData();
      queryData.append('sessionId', sessionId);
      queryData.append('query.queryParams', query.queryParams);
      queryData.append('query.fromPlace', query.fromPlace);
      queryData.append('query.toPlace', query.toPlace);
      queryData.append('query.timeStamp', query.timeStamp);
      queryData.append('query.call.id', call.id);
      return fetch(`${datastoreUrl}/calltaker/callQuery?sessionId=${sessionId}`, {
        method: 'POST',
        body: queryData
      }).then(res => res.json()).catch(err => {
        alert(`Could not fetch calls: ${JSON.stringify(err)}`);
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
    const {
      callTaker,
      otp
    } = getState();
    const {
      datastoreUrl
    } = otp.config;
    if (sessionIsInvalid(callTaker.session)) return;
    const {
      sessionId
    } = callTaker.session;
    fetch(`${datastoreUrl}/calltaker/callQuery?sessionId=${sessionId}&call.id=${callId}`).then(res => res.json()).then(queries => {
      dispatch(receivedQueries({
        callId,
        queries
      }));
    }).catch(err => {
      alert(`Could not fetch calls: ${JSON.stringify(err)}`);
    });
  };
}

//# sourceMappingURL=call-taker.js