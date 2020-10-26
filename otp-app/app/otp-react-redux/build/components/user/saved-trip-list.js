"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("regenerator-runtime/runtime");

var _clone = _interopRequireDefault(require("clone"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _useAuth0Hooks = require("use-auth0-hooks");

var uiActions = _interopRequireWildcard(require("../../actions/ui"));

var userActions = _interopRequireWildcard(require("../../actions/user"));

var _desktopNav = _interopRequireDefault(require("../app/desktop-nav"));

var _linkButton = _interopRequireDefault(require("./link-button"));

var _tripSummaryPane = _interopRequireDefault(require("./trip-summary-pane"));

var _withLoggedInUserSupport = _interopRequireDefault(require("./with-logged-in-user-support"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This component displays the list of saved trips for the logged-in user.
 */
var SavedTripList = function SavedTripList(_ref) {
  var trips = _ref.trips;

  // TODO: Improve navigation.
  var accountLink = /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement(_linkButton.default, {
    to: "/account"
  }, "Back to My Account"));

  var content;

  if (!trips || trips.length === 0) {
    content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, accountLink, /*#__PURE__*/_react.default.createElement("h1", null, "You have no saved trips"), /*#__PURE__*/_react.default.createElement("p", null, "Perform a trip search from the map first."));
  } else {
    // Stack the saved trip summaries. When the user clicks on one, they can edit that trip.
    content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, accountLink, /*#__PURE__*/_react.default.createElement("h1", null, "My saved trips"), trips.map(function (trip, index) {
      return /*#__PURE__*/_react.default.createElement(ConnectedTripListItem, {
        key: index,
        trip: trip
      });
    }));
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "otp"
  }, /*#__PURE__*/_react.default.createElement(_desktopNav.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, content));
}; // connect to the redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    trips: state.user.loggedInUserMonitoredTrips
  };
};

var mapDispatchToProps = {};

var _default = (0, _withLoggedInUserSupport.default)((0, _useAuth0Hooks.withLoginRequired)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SavedTripList)), true);
/**
 * This class manages events and rendering for one item in the saved trip list.
 */


exports.default = _default;

var TripListItem = /*#__PURE__*/function (_Component) {
  _inherits(TripListItem, _Component);

  var _super = _createSuper(TripListItem);

  function TripListItem() {
    var _this;

    _classCallCheck(this, TripListItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_handleEditTrip", function () {
      var _this$props = _this.props,
          routeTo = _this$props.routeTo,
          trip = _this$props.trip;
      routeTo("/savedtrips/".concat(trip.id));
    });

    _defineProperty(_assertThisInitialized(_this), "_handlePauseOrResumeMonitoring", function () {
      var _this$props2 = _this.props,
          createOrUpdateUserMonitoredTrip = _this$props2.createOrUpdateUserMonitoredTrip,
          trip = _this$props2.trip;
      var newTrip = (0, _clone.default)(trip);
      newTrip.isActive = !newTrip.isActive; // Silent update of existing trip.

      createOrUpdateUserMonitoredTrip(newTrip, false, true);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleDeleteTrip", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$props3, deleteUserMonitoredTrip, trip;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!confirm('Would you like to remove this trip?')) {
                _context.next = 4;
                break;
              }

              _this$props3 = _this.props, deleteUserMonitoredTrip = _this$props3.deleteUserMonitoredTrip, trip = _this$props3.trip;
              _context.next = 4;
              return deleteUserMonitoredTrip(trip.id);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    return _this;
  }

  _createClass(TripListItem, [{
    key: "render",
    value: function render() {
      var trip = this.props.trip;
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Panel, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Panel.Heading, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Panel.Title, {
        componentClass: "h3"
      }, trip.tripName)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Panel.Body, null, /*#__PURE__*/_react.default.createElement(_tripSummaryPane.default, {
        monitoredTrip: trip
      }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsSize: "small",
        onClick: this._handlePauseOrResumeMonitoring
      }, trip.isActive ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Glyphicon, {
        glyph: "pause"
      }), " Pause") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Glyphicon, {
        glyph: "play"
      }), " Resume")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsSize: "small",
        onClick: this._handleEditTrip
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Glyphicon, {
        glyph: "pencil"
      }), " Edit"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsSize: "small",
        onClick: this._handleDeleteTrip
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Glyphicon, {
        glyph: "trash"
      }), " Delete"))));
    }
  }]);

  return TripListItem;
}(_react.Component); // connect to the redux store


var itemMapStateToProps = function itemMapStateToProps() {};

var itemMapDispatchToProps = {
  createOrUpdateUserMonitoredTrip: userActions.createOrUpdateUserMonitoredTrip,
  deleteUserMonitoredTrip: userActions.deleteUserMonitoredTrip,
  routeTo: uiActions.routeTo
};
var ConnectedTripListItem = (0, _reactRedux.connect)(itemMapStateToProps, itemMapDispatchToProps)(TripListItem);
module.exports = exports.default;

//# sourceMappingURL=saved-trip-list.js