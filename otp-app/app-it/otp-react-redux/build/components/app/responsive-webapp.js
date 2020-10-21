"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.regexp.search");

var _connectedReactRouter = require("connected-react-router");

var _history = require("history");

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isMobile = _coreUtils.default.ui.isMobile;

var ResponsiveWebapp = /*#__PURE__*/function (_Component) {
  _inherits(ResponsiveWebapp, _Component);

  var _super = _createSuper(ResponsiveWebapp);

  function ResponsiveWebapp() {
    _classCallCheck(this, ResponsiveWebapp);

    return _super.apply(this, arguments);
  }

  _createClass(ResponsiveWebapp, [{
    key: "componentDidUpdate",

    /** Lifecycle methods **/
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          currentPosition = _this$props.currentPosition,
          location = _this$props.location,
          query = _this$props.query,
          title = _this$props.title;
      document.title = title;

      var urlParams = _coreUtils.default.query.getUrlParams();

      var newSearchId = urlParams.ui_activeSearch; // Determine if trip is being replanned by checking the active search ID
      // against the ID found in the URL params. If they are different, a new one
      // has been routed to (see handleBackButtonPress) and there is no need to
      // trigger a form change because necessarily the query will be different
      // from the previous query.

      var replanningTrip = newSearchId && this.props.activeSearchId && newSearchId !== this.props.activeSearchId;

      if (!(0, _lodash.default)(prevProps.query, query) && !replanningTrip) {
        // Trigger on form change action if previous query is different from
        // current one AND trip is not being replanned already. This will
        // determine whether a search needs to be made, the mobile view needs
        // updating, etc.
        this.props.formChanged(prevProps.query, query);
      } // check if device position changed (typically only set once, on initial page load)


      if (currentPosition !== prevProps.currentPosition) {
        if (currentPosition.error || !currentPosition.coords) return;
        var pt = {
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
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      // Add on back button press behavior.
      window.addEventListener('popstate', this.props.handleBackButtonPress);
      var _this$props2 = this.props,
          location = _this$props2.location,
          title = _this$props2.title;
      document.title = title;

      if (isMobile()) {
        // If on mobile browser, check position on load
        this.props.getCurrentPosition(); // Also, watch for changes in position on mobile

        navigator.geolocation.watchPosition( // On success
        function (position) {
          _this.props.receivedPositionResponse({
            position: position
          });
        }, // On error
        function (error) {
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
        // Set search params and Pianifica Viaggio if routing enabled and a query exists
        // in the URL.
        this.props.parseUrlQueryString();
      } // Initialize call taker/field trip modules (check for valid auth session).


      this.props.initializeModules();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Remove on back button press listener.
      window.removeEventListener('popstate', this.props.handleBackButtonPress);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          desktopView = _this$props3.desktopView,
          mobileView = _this$props3.mobileView;
      return isMobile() ? mobileView : desktopView;
    }
  }]);

  return ResponsiveWebapp;
}(_react.Component); // connect to the redux store


_defineProperty(ResponsiveWebapp, "propTypes", {
  desktopView: _propTypes.default.element,
  initZoomOnLocate: _propTypes.default.number,
  mobileView: _propTypes.default.element,
  query: _propTypes.default.object
});

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var title = (0, _state.getTitle)(state);
  return {
    activeItinerary: (0, _state.getActiveItinerary)(state.otp),
    activeSearchId: state.otp.activeSearchId,
    currentPosition: state.otp.location.currentPosition,
    query: state.otp.currentQuery,
    searches: state.otp.searches,
    mobileScreen: state.otp.ui.mobileScreen,
    initZoomOnLocate: state.otp.config.map && state.otp.config.map.initZoomOnLocate,
    modeGroups: state.otp.config.modeGroups,
    title: title
  };
};

var mapDispatchToProps = {
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
var history = (0, _history.createHashHistory)();
var WebappWithRouter = (0, _reactRouter.withRouter)((0, _withLoggedInUserSupport.default)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ResponsiveWebapp)));
/**
 * The routing component for the application.
 * This is the top-most "standard" component,
 * and we initialize the Auth0Provider here
 * so that Auth0 services are available everywhere.
 */

var RouterWrapperWithAuth0 = /*#__PURE__*/function (_Component2) {
  _inherits(RouterWrapperWithAuth0, _Component2);

  var _super2 = _createSuper(RouterWrapperWithAuth0);

  function RouterWrapperWithAuth0() {
    var _this2;

    _classCallCheck(this, RouterWrapperWithAuth0);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "_combineProps", function (routerProps) {
      return _objectSpread(_objectSpread({}, _this2.props), routerProps);
    });

    return _this2;
  }

  _createClass(RouterWrapperWithAuth0, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          auth0Config = _this$props4.auth0Config,
          processSignIn = _this$props4.processSignIn,
          routerConfig = _this$props4.routerConfig,
          showAccessTokenError = _this$props4.showAccessTokenError,
          showLoginError = _this$props4.showLoginError;

      var router = /*#__PURE__*/_react.default.createElement(_connectedReactRouter.ConnectedRouter, {
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
        render: function render() {
          return /*#__PURE__*/_react.default.createElement(WebappWithRouter, _this3.props);
        }
      }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route // This route lets new or existing users edit or set up their account.
      , {
        path: '/account',
        component: function component(routerProps) {
          var props = _this3._combineProps(routerProps);

          return /*#__PURE__*/_react.default.createElement(_userAccountScreen.default, props);
        }
      }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: '/savetrip',
        component: function component(routerProps) {
          var props = _this3._combineProps(routerProps);

          return /*#__PURE__*/_react.default.createElement(_savedTripScreen.default, _extends({
            isCreating: true
          }, props));
        }
      }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: '/savedtrips/:id',
        component: function component(routerProps) {
          var props = _this3._combineProps(routerProps);

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
        component: function component(routerProps) {
          var props = _this3._combineProps(routerProps);

          return /*#__PURE__*/_react.default.createElement(_afterSigninScreen.default, props);
        }
      }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: "/print",
        component: function component(routerProps) {
          var props = _this3._combineProps(routerProps);

          return /*#__PURE__*/_react.default.createElement(_printLayout.default, props);
        }
      }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        render: function render() {
          return /*#__PURE__*/_react.default.createElement(WebappWithRouter, _this3.props);
        }
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
  }]);

  return RouterWrapperWithAuth0;
}(_react.Component);

var mapStateToWrapperProps = function mapStateToWrapperProps(state, ownProps) {
  return {
    auth0Config: (0, _auth2.getAuth0Config)(state.otp.config.persistence),
    routerConfig: state.otp.config.reactRouter
  };
};

var mapWrapperDispatchToProps = {
  processSignIn: authActions.processSignIn,
  showAccessTokenError: authActions.showAccessTokenError,
  showLoginError: authActions.showLoginError
};

var _default = (0, _reactRedux.connect)(mapStateToWrapperProps, mapWrapperDispatchToProps)(RouterWrapperWithAuth0);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=responsive-webapp.js