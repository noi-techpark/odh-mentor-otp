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

var _reactRedux = require("react-redux");

var callTakerActions = _interopRequireWildcard(require("../../actions/call-taker"));

var _callRecord = _interopRequireDefault(require("./call-record"));

var _draggableWindow = _interopRequireDefault(require("./draggable-window"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

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

/**
 * Collects the various draggable windows used in the Call Taker module to
 * display, for example, the call record list and (TODO) the list of field trips.
 */
var CallTakerWindows = /*#__PURE__*/function (_Component) {
  _inherits(CallTakerWindows, _Component);

  var _super = _createSuper(CallTakerWindows);

  function CallTakerWindows() {
    _classCallCheck(this, CallTakerWindows);

    return _super.apply(this, arguments);
  }

  _createClass(CallTakerWindows, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          callTaker = _this$props.callTaker,
          fetchQueries = _this$props.fetchQueries,
          searches = _this$props.searches;
      var activeCall = callTaker.activeCall,
          callHistory = callTaker.callHistory;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, callHistory.visible // Active call window
      ?
      /*#__PURE__*/
      _react.default.createElement(_draggableWindow.default, {
        draggableProps: {
          defaultPosition: callHistory.position
        },
        header: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
          type: "history"
        }), " Call history"),
        onClickClose: this.props.toggleCallHistory
      }, activeCall ? /*#__PURE__*/_react.default.createElement(_callRecord.default, {
        call: activeCall,
        searches: searches,
        inProgress: true
      }) : null, callHistory.calls.data.length > 0 ? callHistory.calls.data.map(function (call, i) {
        return /*#__PURE__*/_react.default.createElement(_callRecord.default, {
          key: i,
          index: i,
          call: call,
          fetchQueries: fetchQueries
        });
      }) : /*#__PURE__*/_react.default.createElement("div", null, "No calls in history")) : null);
    }
  }]);

  return CallTakerWindows;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    callTaker: state.callTaker,
    currentQuery: state.otp.currentQuery,
    searches: state.otp.searches
  };
};

var fetchQueries = callTakerActions.fetchQueries,
    toggleCallHistory = callTakerActions.toggleCallHistory;
var mapDispatchToProps = {
  fetchQueries: fetchQueries,
  toggleCallHistory: toggleCallHistory
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CallTakerWindows);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=call-taker-windows.js