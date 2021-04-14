"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connectedReactRouter = require("connected-react-router");

var _history = require("history");

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _useAuth0Hooks = require("use-auth0-hooks");

var _printLayout = _interopRequireDefault(require("./print-layout"));

var authActions = _interopRequireWildcard(require("../../actions/auth"));

var callTakerActions = _interopRequireWildcard(require("../../actions/call-taker"));

var configActions = _interopRequireWildcard(require("../../actions/config"));

var formActions = _interopRequireWildcard(require("../../actions/form"));

var locationActions = _interopRequireWildcard(require("../../actions/location"));

var mapActions = _interopRequireWildcard(require("../../actions/map"));

var uiActions = _interopRequireWildcard(require("../../actions/ui"));

var _auth2 = require("../../util/auth");

var _constants = require("../../util/constants");

var _state = require("../../util/state");

var _afterSigninScreen = _interopRequireDefault(require("../user/after-signin-screen"));

var _beforeSigninScreen = _interopRequireDefault(require("../user/before-signin-screen"));

var _savedTripList = _interopRequireDefault(require("../user/saved-trip-list"));

var _savedTripScreen = _interopRequireDefault(require("../user/saved-trip-screen"));

var _userAccountScreen = _interopRequireDefault(require("../user/user-account-screen"));

var _withLoggedInUserSupport = _interopRequireDefault(require("../user/with-logged-in-user-support"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  isMobile
} = _src.default.ui;

class ResponsiveWebapp extends _react.Component {
  /** Lifecycle methods **/
  componentDidUpdate(prevProps) {
    const {
      currentPosition,
      location,
      query,
      title
    } = this.props;
    document.title = title;

    const urlParams = _src.default.query.getUrlParams();

    const newSearchId = urlParams.ui_activeSearch; // Determine if trip is being replanned by checking the active search ID
    // against the ID found in the URL params. If they are different, a new one
    // has been routed to (see handleBackButtonPress) and there is no need to
    // trigger a form change because necessarily the query will be different
    // from the previous query.

    const replanningTrip = newSearchId && this.props.activeSearchId && newSearchId !== this.props.activeSearchId;

    if (!(0, _lodash.default)(prevProps.query, query) && !replanningTrip) {
      // Trigger on form change action if previous query is different from
      // current one AND trip is not being replanned already. This will
      // determine whether a search needs to be made, the mobile view needs
      // updating, etc.
      this.props.formChanged(prevProps.query, query);
    } // check if device position changed (typically only set once, on initial page load)


    if (currentPosition !== prevProps.currentPosition) {
      if (currentPosition.error || !currentPosition.coords) return;
      const pt = {
        lat: currentPosition.coords.latitude,
        lon: currentPosition.coords.longitude
      }; // if in mobile mode and from field is not set, use current location as from and recenter map

      if (isMobile() && this.props.query.from === null) {
        this.props.setLocationToCurrent({
          locationType: 'from'
        });
        this.props.setMapCenter(pt);

        if (this.props.initZoomOnLocate) {
          this.props.setMapZoom({
            zoom: this.props.initZoomOnLocate
          });
        }
      }
    } // If the path changes (e.g., via a back button press) check whether the
    // main content needs to switch between, for example, a viewer and a search.


    if (!(0, _lodash.default)(location.pathname, prevProps.location.pathname)) {
      // console.log('url changed to', location.pathname)
      this.props.matchContentToUrl(location);
    } // Check for change between ITINERARY and PROFILE routingTypes
    // TODO: restore this for profile mode

    /* if (query.routingType !== nextProps.query.routingType) {
      let queryModes = nextProps.query.mode.split(',')
      // If we are entering 'ITINERARY' mode, ensure that one and only one access mode is selected
      if (nextProps.query.routingType === 'ITINERARY') {
        queryModes = ensureSingleAccessMode(queryModes)
        this.props.setQueryParam({ mode: queryModes.join(',') })
      }
      // If we are entering 'PROFILE' mode, ensure that CAR_HAIL is not selected
      // TODO: make this more generic, i.e. introduce concept of mode->routingType permissions
      if (nextProps.query.routingType === 'ITINERARY') {
        queryModes = queryModes.filter(mode => mode !== 'CAR_HAIL')
        this.props.setQueryParam({ mode: queryModes.join(',') })
      }
    } */

  }

  componentDidMount() {
    // Add on back button press behavior.
    window.addEventListener('popstate', this.props.handleBackButtonPress);
    const {
      location,
      title
    } = this.props;
    document.title = title;

    if (isMobile()) {
      // If on mobile browser, check position on load
      this.props.getCurrentPosition(); // Also, watch for changes in position on mobile

      navigator.geolocation.watchPosition( // On success
      position => {
        this.props.receivedPositionResponse({
          position
        });
      }, // On error
      error => {
        console.log('error in watchPosition', error);
      }, // Options
      {
        enableHighAccuracy: true
      });
    } // Handle routing to a specific part of the app (e.g. stop viewer) on page
    // load. (This happens prior to routing request in case special routerId is
    // set from URL.)


    this.props.matchContentToUrl(this.props.location);

    if (location && location.search) {
      // Set search params and $_plan_trip_$ if routing enabled and a query exists
      // in the URL.
      this.props.parseUrlQueryString();
    } // Initialize call taker/field trip modules (check for valid auth session).


    this.props.initializeModules();
  }

  componentWillUnmount() {
    // Remove on back button press listener.
    window.removeEventListener('popstate', this.props.handleBackButtonPress);
  }

  render() {
    const {
      desktopView,
      mobileView
    } = this.props;
    return isMobile() ? mobileView : desktopView;
  }

} // connect to the redux store


_defineProperty(ResponsiveWebapp, "propTypes", {
  desktopView: _propTypes.default.element,
  initZoomOnLocate: _propTypes.default.number,
  mobileView: _propTypes.default.element,
  query: _propTypes.default.object
});

const mapStateToProps = (state, ownProps) => {
  const title = (0, _state.getTitle)(state);
  return {
    activeItinerary: (0, _state.getActiveItinerary)(state.otp),
    activeSearchId: state.otp.activeSearchId,
    currentPosition: state.otp.location.currentPosition,
    query: state.otp.currentQuery,
    searches: state.otp.searches,
    mobileScreen: state.otp.ui.mobileScreen,
    initZoomOnLocate: state.otp.config.map && state.otp.config.map.initZoomOnLocate,
    modeGroups: state.otp.config.modeGroups,
    title
  };
};

const mapDispatchToProps = {
  formChanged: formActions.formChanged,
  getCurrentPosition: locationActions.getCurrentPosition,
  handleBackButtonPress: uiActions.handleBackButtonPress,
  initializeModules: callTakerActions.initializeModules,
  matchContentToUrl: uiActions.matchContentToUrl,
  parseUrlQueryString: formActions.parseUrlQueryString,
  receivedPositionResponse: locationActions.receivedPositionResponse,
  setLocationToCurrent: mapActions.setLocationToCurrent,
  setMapCenter: configActions.setMapCenter,
  setMapZoom: configActions.setMapZoom
};
const history = (0, _history.createHashHistory)();
const WebappWithRouter = (0, _reactRouter.withRouter)((0, _withLoggedInUserSupport.default)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ResponsiveWebapp)));
/**
 * The routing component for the application.
 * This is the top-most "standard" component,
 * and we initialize the Auth0Provider here
 * so that Auth0 services are available everywhere.
 */

class RouterWrapperWithAuth0 extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_combineProps", routerProps => {
      return { ...this.props,
        ...routerProps
      };
    });
  }

  render() {
    const {
      auth0Config,
      processSignIn,
      routerConfig,
      showAccessTokenError,
      showLoginError
    } = this.props;

    const router = /*#__PURE__*/_react.default.createElement(_connectedReactRouter.ConnectedRouter, {
      basename: routerConfig && routerConfig.basename,
      history: history
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactRouter.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
      exact: true,
      path: [// App root
      '/', // Load app with preset lat/lon/zoom and optional router
      // NOTE: All params will be cast to :id in matchContentToUrl due
      // to a quirk with react-router.
      // https://github.com/ReactTraining/react-router/issues/5870#issuecomment-394194338
      '/@/:latLonZoomRouter', '/start/:latLonZoomRouter', // Route viewer (and route ID).
      '/route', '/route/:id', // Stop viewer (and stop ID).
      '/stop', '/stop/:id'],
      render: () => /*#__PURE__*/_react.default.createElement(WebappWithRouter, this.props)
    }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route // This route lets new or existing users edit or set up their account.
    , {
      path: '/account',
      component: routerProps => {
        const props = this._combineProps(routerProps);

        return /*#__PURE__*/_react.default.createElement(_userAccountScreen.default, props);
      }
    }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
      path: '/savetrip',
      component: routerProps => {
        const props = this._combineProps(routerProps);

        return /*#__PURE__*/_react.default.createElement(_savedTripScreen.default, _extends({
          isCreating: true
        }, props));
      }
    }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
      path: '/savedtrips/:id',
      component: routerProps => {
        const props = this._combineProps(routerProps);

        return /*#__PURE__*/_react.default.createElement(_savedTripScreen.default, props);
      }
    }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
      path: '/savedtrips',
      component: _savedTripList.default
    }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route // This route is called immediately after login by Auth0
    // and by the onRedirectCallback function from /lib/util/auth.js.
    // For new users, it displays the account setup form.
    // For existing users, it takes the browser back to the itinerary search prior to login.
    , {
      path: '/signedin',
      component: routerProps => {
        const props = this._combineProps(routerProps);

        return /*#__PURE__*/_react.default.createElement(_afterSigninScreen.default, props);
      }
    }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
      path: "/print",
      component: routerProps => {
        const props = this._combineProps(routerProps);

        return /*#__PURE__*/_react.default.createElement(_printLayout.default, props);
      }
    }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
      render: () => /*#__PURE__*/_react.default.createElement(WebappWithRouter, this.props)
    }))));

    return auth0Config ? /*#__PURE__*/_react.default.createElement(_useAuth0Hooks.Auth0Provider, {
      audience: _constants.AUTH0_AUDIENCE,
      clientId: auth0Config.clientId,
      domain: auth0Config.domain,
      onAccessTokenError: showAccessTokenError,
      onLoginError: showLoginError,
      onRedirectCallback: processSignIn,
      onRedirecting: _beforeSigninScreen.default,
      redirectUri: _constants.URL_ROOT,
      scope: _constants.AUTH0_SCOPE
    }, router) : router;
  }

}

const mapStateToWrapperProps = (state, ownProps) => ({
  auth0Config: (0, _auth2.getAuth0Config)(state.otp.config.persistence),
  routerConfig: state.otp.config.reactRouter
});

const mapWrapperDispatchToProps = {
  processSignIn: authActions.processSignIn,
  showAccessTokenError: authActions.showAccessTokenError,
  showLoginError: authActions.showLoginError
};

var _default = (0, _reactRedux.connect)(mapStateToWrapperProps, mapWrapperDispatchToProps)(RouterWrapperWithAuth0);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=responsive-webapp.js