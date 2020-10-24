"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.match");

require("regenerator-runtime/runtime");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _useAuth0Hooks = require("use-auth0-hooks");

var uiActions = _interopRequireWildcard(require("../../actions/ui"));

var userActions = _interopRequireWildcard(require("../../actions/user"));

var _desktopNav = _interopRequireDefault(require("../app/desktop-nav"));

var _savedTripEditor = _interopRequireDefault(require("./saved-trip-editor"));

var _tripBasicsPane = _interopRequireDefault(require("./trip-basics-pane"));

var _tripNotificationsPane = _interopRequireDefault(require("./trip-notifications-pane"));

var _tripSummaryPane = _interopRequireDefault(require("./trip-summary-pane"));

var _monitoredTrip2 = require("../../util/monitored-trip");

var _state = require("../../util/state");

var _withLoggedInUserSupport = _interopRequireDefault(require("./with-logged-in-user-support"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Initializes a monitored trip object from the given query.
 */
function createMonitoredTrip(loggedInUser, queryParams, itinerary) {
  return _objectSpread(_objectSpread({}, (0, _monitoredTrip2.arrayToDayFields)(_monitoredTrip2.WEEKDAYS)), {}, {
    excludeFederalHolidays: true,
    isActive: true,
    itinerary: itinerary,
    leadTimeInMinutes: 30,
    queryParams: queryParams,
    tripName: '',
    // FIXME: Handle populating/checking userID from middleware too,
    // so that providing this field is no longer needed.
    userId: loggedInUser.id
  });
}
/**
 * Checks that the maximum allowed number of saved trips has not been reached.
 */


function hasMaxTripCount(trips) {
  // TODO: Obtain the maximum number from a query to middleware (it is currently hard coded there too).
  return trips && trips.length >= 5;
}
/**
 * This screen handles saving a trip from an OTP query, or editing an existing saved trip
 * for the currently logged-in user.
 */


var SavedTripScreen = /*#__PURE__*/function (_Component) {
  _inherits(SavedTripScreen, _Component);

  var _super = _createSuper(SavedTripScreen);

  function SavedTripScreen(_props) {
    var _this;

    _classCallCheck(this, SavedTripScreen);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "_updateMonitoredTripState", function (newMonitoredTrip) {
      var monitoredTrip = _this.state.monitoredTrip;

      _this.setState({
        monitoredTrip: _objectSpread(_objectSpread({}, monitoredTrip), newMonitoredTrip)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_updateMonitoredTrip", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$props, isCreating, createOrUpdateUserMonitoredTrip, monitoredTrip;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, isCreating = _this$props.isCreating, createOrUpdateUserMonitoredTrip = _this$props.createOrUpdateUserMonitoredTrip;
              monitoredTrip = _this.state.monitoredTrip;
              _context.next = 4;
              return createOrUpdateUserMonitoredTrip(monitoredTrip, isCreating);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "_goToTripPlanner", function () {
      _this.props.routeTo('/');
    });

    _defineProperty(_assertThisInitialized(_this), "_goToSavedTrips", function () {
      _this.props.routeTo('/savedtrips');
    });

    _defineProperty(_assertThisInitialized(_this), "_handleSaveNewTrip", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this._updateMonitoredTrip();

            case 2:
              _this._goToTripPlanner();

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _defineProperty(_assertThisInitialized(_this), "_handleSaveTripEdits", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this._updateMonitoredTrip();

            case 2:
              _this._goToSavedTrips();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    _defineProperty(_assertThisInitialized(_this), "_hookMonitoredTrip", function (Pane) {
      return function (props) {
        var monitoredTrip = _this.state.monitoredTrip;
        return /*#__PURE__*/_react.default.createElement(Pane, _extends({
          onMonitoredTripChange: _this._updateMonitoredTripState,
          monitoredTrip: monitoredTrip
        }, props));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "_panes", {
      basics: _this._hookMonitoredTrip(_tripBasicsPane.default),
      notifications: _this._hookMonitoredTrip(_tripNotificationsPane.default),
      summary: _this._hookMonitoredTrip(_tripSummaryPane.default)
    });

    _defineProperty(_assertThisInitialized(_this), "_getTripToEdit", function (props, saveState) {
      var monitoredTrip;

      if (props.isCreating) {
        var itinerary = props.itinerary,
            loggedInUser = props.loggedInUser,
            queryParams = props.queryParams;
        monitoredTrip = createMonitoredTrip(loggedInUser, queryParams, itinerary);
      } else {
        var match = props.match,
            monitoredTrips = props.monitoredTrips;
        var path = match.path,
            url = match.url;

        if (monitoredTrips && path === '/savedtrips/:id') {
          // Trip id is the portion of url after the second (the last) slash.
          var tripId = url.split('/')[2];
          monitoredTrip = monitoredTrips.find(function (trip) {
            return trip.id === tripId;
          });
        } else {
          monitoredTrip = null;
        }
      }

      if (saveState) {
        _this.setState({
          monitoredTrip: monitoredTrip
        });
      }

      return monitoredTrip;
    });

    var _monitoredTrip = _this._getTripToEdit(_props);

    _this.state = {
      monitoredTrip: _monitoredTrip
    };
    return _this;
  }
  /**
   * Handles editing events on from all panes.
   */


  _createClass(SavedTripScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props2 = this.props,
          isCreating = _this$props2.isCreating,
          monitoredTrips = _this$props2.monitoredTrips; // There is a middleware limit of 5 saved trips,
      // so if that limit is already reached, alert, then show editing mode.

      if (isCreating && hasMaxTripCount(monitoredTrips)) {
        alert('You already have reached the maximum of five saved trips.\n' + 'Please remove unused trips from your saved trips, and try again.');

        this._goToSavedTrips();
      } // TODO: Update title bar during componentDidMount.

    }
    /**
     * Gets the trip to edit from the props.
     * Optionally saves the state.
     */

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Update the monitored trip from the new props if the url has changed.
      if (prevProps.match.url !== this.props.match.url) {
        this._getTripToEdit(this.props, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isCreating = this.props.isCreating;
      var monitoredTrip = this.state.monitoredTrip;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "otp"
      }, /*#__PURE__*/_react.default.createElement(_desktopNav.default, null), /*#__PURE__*/_react.default.createElement("form", {
        className: "container"
      }, /*#__PURE__*/_react.default.createElement(_savedTripEditor.default, {
        isCreating: isCreating,
        monitoredTrip: monitoredTrip,
        onCancel: isCreating ? this._goToTripPlanner : this._goToSavedTrips,
        onComplete: isCreating ? this._handleSaveNewTrip : this._handleSaveTripEdits,
        panes: this._panes
      })));
    }
  }]);

  return SavedTripScreen;
}(_react.Component); // connect to the redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  var activeSearch = (0, _state.getActiveSearch)(state.otp);
  var activeItinerary = activeSearch && activeSearch.activeItinerary;
  var itineraries = (0, _state.getActiveItineraries)(state.otp) || [];
  return {
    itinerary: itineraries[activeItinerary],
    loggedInUser: state.user.loggedInUser,
    monitoredTrips: state.user.loggedInUserMonitoredTrips,
    queryParams: state.router.location.search
  };
};

var mapDispatchToProps = {
  createOrUpdateUserMonitoredTrip: userActions.createOrUpdateUserMonitoredTrip,
  routeTo: uiActions.routeTo
};

var _default = (0, _withLoggedInUserSupport.default)((0, _useAuth0Hooks.withLoginRequired)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SavedTripScreen)), true);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=saved-trip-screen.js