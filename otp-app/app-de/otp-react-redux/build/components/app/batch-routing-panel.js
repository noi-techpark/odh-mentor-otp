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

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var apiActions = _interopRequireWildcard(require("../../actions/api"));

var _connectedLocationField = _interopRequireDefault(require("../form/connected-location-field"));

var _userSettings = _interopRequireDefault(require("../form/user-settings"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _narrativeItineraries = _interopRequireDefault(require("../narrative/narrative-itineraries"));

var _state = require("../../util/state");

var _viewerContainer = _interopRequireDefault(require("../viewers/viewer-container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

/**
 * Main panel for the batch/trip comparison form.
 * @extends Component
 */
var BatchRoutingPanel = /*#__PURE__*/function (_Component) {
  _inherits(BatchRoutingPanel, _Component);

  var _super = _createSuper(BatchRoutingPanel);

  function BatchRoutingPanel() {
    var _this;

    _classCallCheck(this, BatchRoutingPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_planTrip", function () {
      var _this$props = _this.props,
          currentQuery = _this$props.currentQuery,
          routingQuery = _this$props.routingQuery;
      var issues = [];
      if (!(0, _state.hasValidLocation)(currentQuery, 'from')) issues.push('from');
      if (!(0, _state.hasValidLocation)(currentQuery, 'to')) issues.push('to');

      if (issues.length > 0) {
        // TODO: replace with less obtrusive validation.
        window.alert("Please define the following fields to Viaggia: ".concat(issues.join(', ')));
        return;
      }

      routingQuery();
    });

    return _this;
  }

  _createClass(BatchRoutingPanel, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          activeSearch = _this$props2.activeSearch,
          itineraryFooter = _this$props2.itineraryFooter,
          LegIcon = _this$props2.LegIcon,
          mobile = _this$props2.mobile,
          showUserSettings = _this$props2.showUserSettings;
      var actionText = mobile ? "$_tap_$" : "$_click_$";
      return /*#__PURE__*/_react.default.createElement(_viewerContainer.default, null, /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
        inputPlaceholder: "$_insert_departure_$ ".concat(actionText, " $_on_map_$..."),
        locationType: "from",
        showClearButton: true
      }), /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
        inputPlaceholder: "$_insert_arrive_$ ".concat(actionText, " $_on_map_$..."),
        locationType: "to",
        showClearButton: !mobile
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center'
        },
        className: "comparison-form"
      }, /*#__PURE__*/_react.default.createElement("button", {
        style: {
          height: '50px',
          width: '50px',
          margin: '0px',
          marginRight: '5px'
        }
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "cog",
        className: "fa-2x"
      })), /*#__PURE__*/_react.default.createElement("button", {
        style: {
          height: '50px',
          width: '100px',
          margin: '0px',
          fontSize: 'small',
          textAlign: 'left'
        }
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "calendar"
      }), " Today", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "clock-o"
      }), " Now", /*#__PURE__*/_react.default.createElement("br", null)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsStyle: "default",
        bsSize: "small",
        onClick: this._planTrip,
        style: {
          height: '50px',
          width: '50px',
          margin: '0px',
          marginLeft: 'auto',
          backgroundColor: '#F5F5A7'
        }
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "search",
        className: "fa-2x"
      }))), !activeSearch && showUserSettings && /*#__PURE__*/_react.default.createElement(_userSettings.default, null), /*#__PURE__*/_react.default.createElement("div", {
        className: "desktop-narrative-container"
      }, /*#__PURE__*/_react.default.createElement(_narrativeItineraries.default, {
        containerStyle: {
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '218px',
          // This is variable dependent on height of the form above.
          right: '0',
          left: '0',
          bottom: '0'
        },
        itineraryFooter: itineraryFooter,
        LegIcon: LegIcon
      })));
    }
  }]);

  return BatchRoutingPanel;
}(_react.Component); // connect to the redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  var showUserSettings = (0, _state.getShowUserSettings)(state.otp);
  return {
    activeSearch: (0, _state.getActiveSearch)(state.otp),
    currentQuery: state.otp.currentQuery,
    expandAdvanced: state.otp.user.expandAdvanced,
    showUserSettings: showUserSettings
  };
};

var mapDispatchToProps = {
  routingQuery: apiActions.routingQuery
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BatchRoutingPanel);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=batch-routing-panel.js
