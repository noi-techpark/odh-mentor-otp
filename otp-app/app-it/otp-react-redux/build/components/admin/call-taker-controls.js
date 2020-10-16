"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var callTakerActions = _interopRequireWildcard(require("../../actions/call-taker"));

var _api = require("../../actions/api");

var _ui = require("../../actions/ui");

var _callTimeCounter = _interopRequireDefault(require("./call-time-counter"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var RED = '#C35134';
var BLUE = '#1C4D89';
var GREEN = '#6B931B';
/**
 * This component displays the controls for the Call Taker/Field Trip modules,
 * including:
 *  - start/end call button
 *  - view call list
 *  TODO
 *  - view field trip list
 */

var CallTakerControls = /*#__PURE__*/function (_Component) {
  _inherits(CallTakerControls, _Component);

  var _super = _createSuper(CallTakerControls);

  function CallTakerControls() {
    var _this;

    _classCallCheck(this, CallTakerControls);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_onClickCall", function () {
      if (_this._callInProgress()) _this.props.endCall();else _this.props.beginCall();
    });

    _defineProperty(_assertThisInitialized(_this), "_renderCallButton", function () {
      // Show stop button if call not in progress.
      if (_this._callInProgress()) {
        return /*#__PURE__*/_react.default.createElement(_icon.default, {
          type: "stop",
          style: {
            marginLeft: '3px'
          },
          className: "fa-3x"
        });
      } // No call is in progress.


      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "plus",
        style: {
          position: 'absolute',
          marginLeft: '17px',
          marginTop: '6px'
        }
      }), /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "phone",
        className: "fa-4x fa-flip-horizontal"
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_onToggleCallHistory", function () {
      return _this.props.toggleCallHistory();
    });

    _defineProperty(_assertThisInitialized(_this), "_callInProgress", function () {
      return Boolean(_this.props.activeCall);
    });

    return _this;
  }

  _createClass(CallTakerControls, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var session = nextProps.session; // Once session is available, fetch calls.

      if (session && !this.props.session) {
        this.props.fetchCalls();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var session = this.props.session; // If no valid session is found, do not show calltaker controls.

      if (!session) return null; // FIXME: styled component

      var circleButtonStyle = {
        position: 'absolute',
        zIndex: 999999,
        color: 'white',
        borderRadius: '50%',
        border: 'none',
        boxShadow: '2px 2px 4px #000000'
      };
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
        style: _objectSpread(_objectSpread({}, circleButtonStyle), {}, {
          top: '154px',
          backgroundColor: this._callInProgress() ? RED : BLUE,
          height: '80px',
          width: '80px',
          marginLeft: '-8px'
        }),
        className: "call-taker-button",
        onClick: this._onClickCall
      }, this._renderCallButton()), this._callInProgress() ? /*#__PURE__*/_react.default.createElement(_callTimeCounter.default, {
        style: {
          display: 'inline',
          position: 'absolute',
          zIndex: 999999,
          top: '241px',
          borderRadius: '20px',
          backgroundColor: BLUE,
          boxShadow: '2px 2px 4px #000000',
          color: 'white',
          fontWeight: '600',
          textAlign: 'center',
          width: '80px',
          marginLeft: '-8px'
        }
      }) : null, /*#__PURE__*/_react.default.createElement("button", {
        style: _objectSpread(_objectSpread({}, circleButtonStyle), {}, {
          top: '140px',
          backgroundColor: GREEN,
          height: '40px',
          width: '40px',
          marginLeft: '69px'
        }),
        className: "call-taker-button",
        onClick: this._onToggleCallHistory
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "history",
        className: "fa-2x",
        style: {
          marginLeft: '-3px'
        }
      })));
    }
  }]);

  return CallTakerControls;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    activeCall: state.callTaker.activeCall,
    session: state.callTaker.session
  };
};

var beginCall = callTakerActions.beginCall,
    endCall = callTakerActions.endCall,
    fetchCalls = callTakerActions.fetchCalls,
    toggleCallHistory = callTakerActions.toggleCallHistory;
var mapDispatchToProps = {
  beginCall: beginCall,
  endCall: endCall,
  fetchCalls: fetchCalls,
  routingQuery: _api.routingQuery,
  setMainPanelContent: _ui.setMainPanelContent,
  toggleCallHistory: toggleCallHistory
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CallTakerControls);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=call-taker-controls.js