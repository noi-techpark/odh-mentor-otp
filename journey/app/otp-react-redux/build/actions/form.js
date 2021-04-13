"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetForm = resetForm;
exports.setQueryParam = setQueryParam;
exports.parseUrlQueryString = parseUrlQueryString;
exports.formChanged = formChanged;
exports.storeDefaultSettings = exports.clearDefaultSettings = exports.setActiveSearch = exports.clearActiveSearch = exports.settingQueryParam = void 0;

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _lodash2 = _interopRequireDefault(require("lodash.isequal"));

var _moment = _interopRequireDefault(require("moment"));

var _src = _interopRequireDefault(require("../otp-ui/core-utils/src"));

var _reduxActions = require("redux-actions");

var _state = require("../util/state");

var _ui = require("../actions/ui");

var _api = require("./api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  getDefaultQuery,
  getTripOptionsFromQuery,
  getUrlParams,
  planParamsToQueryAsync
} = _src.default.query;
const settingQueryParam = (0, _reduxActions.createAction)('SET_QUERY_PARAM');
exports.settingQueryParam = settingQueryParam;
const clearActiveSearch = (0, _reduxActions.createAction)('CLEAR_ACTIVE_SEARCH');
exports.clearActiveSearch = clearActiveSearch;
const setActiveSearch = (0, _reduxActions.createAction)('SET_ACTIVE_SEARCH');
exports.setActiveSearch = setActiveSearch;
const clearDefaultSettings = (0, _reduxActions.createAction)('CLEAR_DEFAULT_SETTINGS');
exports.clearDefaultSettings = clearDefaultSettings;
const storeDefaultSettings = (0, _reduxActions.createAction)('STORE_DEFAULT_SETTINGS');
exports.storeDefaultSettings = storeDefaultSettings;

function resetForm() {
  return function (dispatch, getState) {
    const otpState = getState().otp;
    const {
      transitModes
    } = otpState.config.modes;

    if (otpState.user.defaults) {
      dispatch(settingQueryParam(otpState.user.defaults));
    } else {
      // Get user overrides and apply to default query
      const userOverrides = _src.default.storage.getItem('defaultQuery', {});

      const defaultQuery = Object.assign(getDefaultQuery(otpState.config), userOverrides); // Filter out non-options (i.e., date, places).

      const options = getTripOptionsFromQuery(defaultQuery); // Default mode is currently WALK,TRANSIT. We need to update this value
      // here to match the list of modes, otherwise the form will break.

      options.mode = ['WALK', ...transitModes.map(m => m.mode)].join(',');
      dispatch(settingQueryParam(options));
    }
  };
}
/**
 * Action to update any specified query parameter. Replaces previous series of
 * parameter-specific actions. If a search ID is provided, a routing query (OTP
 * search) will be kicked off immediately.
 */


function setQueryParam(payload, searchId) {
  return function (dispatch, getState) {
    dispatch(settingQueryParam(payload));
    if (searchId) dispatch((0, _api.routingQuery)(searchId));
  };
}

function parseUrlQueryString(params = getUrlParams()) {
  return function (dispatch, getState) {
    // Filter out the OTP (i.e. non-UI) params and set the initial query
    const planParams = {};
    Object.keys(params).forEach(key => {
      if (!key.startsWith('ui_')) planParams[key] = params[key];
    });

    const searchId = params.ui_activeSearch || _src.default.storage.randId(); // Convert strings to numbers/objects and dispatch


    planParamsToQueryAsync(planParams, getState().otp.config).then(query => dispatch(setQueryParam(query, searchId)));
  };
}

let debouncedPlanTrip; // store as variable here, so it can be reused.

let lastDebouncePlanTimeMs;

function formChanged(oldQuery, newQuery) {
  return function (dispatch, getState) {
    const otpState = getState().otp;

    const isMobile = _src.default.ui.isMobile(); // If departArrive is set to 'NOW', update the query time to current


    if (otpState.currentQuery && otpState.currentQuery.departArrive === 'NOW') {
      dispatch(settingQueryParam({
        time: (0, _moment.default)().format(_src.default.time.OTP_API_TIME_FORMAT)
      }));
    } // Determine if either from/to location has changed


    const fromChanged = !(0, _lodash2.default)(oldQuery.from, newQuery.from);
    const toChanged = !(0, _lodash2.default)(oldQuery.to, newQuery.to); // Only clear the main panel if a single location changed. This prevents
    // clearing the panel on load if the app is focused on a stop viewer but a
    // search query should also be visible.

    const oneLocationChanged = fromChanged && !toChanged || !fromChanged && toChanged;

    if (oneLocationChanged) {
      dispatch((0, _ui.setMainPanelContent)(null));
    } // Clear the current search and return to search screen on mobile when
    // either location changes only if not currently on welcome screen (otherwise
    // when the current position is auto-set the screen will change unexpectedly).


    if (isMobile && (fromChanged || toChanged) && otpState.ui.mobileScreen !== _ui.MobileScreens.WELCOME_SCREEN) {
      dispatch(clearActiveSearch());
      dispatch((0, _ui.setMobileScreen)(_ui.MobileScreens.SEARCH_FORM));
    } // Check whether a trip should be auto-replanned


    const {
      autoPlan,
      debouncePlanTimeMs
    } = otpState.config;
    const updatePlan = autoPlan || !isMobile && oneLocationChanged || // TODO: make autoplan configurable at the parameter level?
    isMobile && fromChanged && toChanged;

    if (updatePlan && (0, _state.queryIsValid)(otpState)) {
      // trip plan should be made
      // check if debouncing function needs to be (re)created
      if (!debouncedPlanTrip || lastDebouncePlanTimeMs !== debouncePlanTimeMs) {
        debouncedPlanTrip = (0, _lodash.default)(() => dispatch((0, _api.routingQuery)()), debouncePlanTimeMs);
        lastDebouncePlanTimeMs = debouncePlanTimeMs;
      }

      debouncedPlanTrip();
    }
  };
}

//# sourceMappingURL=form.js