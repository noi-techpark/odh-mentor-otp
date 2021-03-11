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

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

var _callTimeCounter = _interopRequireDefault(require("./call-time-counter"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _queryRecord = _interopRequireDefault(require("./query-record"));

var _callTaker = require("../../util/call-taker");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * Displays information for a particular call record in the Call Taker window.
 */
var CallRecord = /*#__PURE__*/function (_Component) {
  _inherits(CallRecord, _Component);

  var _super = _createSuper(CallRecord);

  function CallRecord() {
    var _this;

    _classCallCheck(this, CallRecord);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      expanded: false
    });

    _defineProperty(_assertThisInitialized(_this), "_toggleExpanded", function () {
      var _this$props = _this.props,
          call = _this$props.call,
          fetchQueries = _this$props.fetchQueries;
      var expanded = _this.state.expanded;
      if (!expanded) fetchQueries(call.id);

      _this.setState({
        expanded: !expanded
      });
    });

    return _this;
  }

  _createClass(CallRecord, [{
    key: "render",
    value: function render() {
      // FIXME: consolidate red color with call taker controls
      var RED = '#C35134';
      var _this$props2 = this.props,
          call = _this$props2.call,
          index = _this$props2.index,
          inProgress = _this$props2.inProgress,
          searches = _this$props2.searches;
      var expanded = this.state.expanded;
      if (!call) return null;

      if (inProgress) {
        // Map search IDs made during active call to queries.
        var activeQueries = call.searches.map(function (searchId) {
          return (0, _callTaker.searchToQuery)(searches[searchId], call, {});
        });
        return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
          className: "pull-right"
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          style: {
            color: RED,
            fontSize: '8px',
            verticalAlign: '2px'
          },
          type: "circle",
          className: "animate-flicker"
        }), /*#__PURE__*/_react.default.createElement(_callTimeCounter.default, {
          style: {
            display: 'inline'
          }
        })), /*#__PURE__*/_react.default.createElement(_icon.default, {
          type: "phone",
          className: "fa-flip-horizontal"
        }), ' ', "[Active call]", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("small", {
          style: {
            marginLeft: '20px'
          }
        }, "In progress... click ", /*#__PURE__*/_react.default.createElement(_icon.default, {
          type: "stop"
        }), " to save", ' ', "(", call.searches.length, " searches)"), /*#__PURE__*/_react.default.createElement("div", null, activeQueries.length > 0 ? activeQueries.map(function (query, i) {
          return /*#__PURE__*/_react.default.createElement(_queryRecord.default, {
            key: i,
            query: query,
            index: i
          });
        }) : 'No queries recorded.'));
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          margin: '5px 0'
        }
      }, /*#__PURE__*/_react.default.createElement("button", {
        style: {
          width: '100%'
        },
        className: "clear-button-formatting",
        onClick: this._toggleExpanded
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "phone",
        className: "fa-flip-horizontal"
      }), "Call ", index, " (", (0, _moment.default)(call.endTime).fromNow(), ")"), expanded ? /*#__PURE__*/_react.default.createElement("ul", {
        className: "list-unstyled"
      }, call.queries && call.queries.length > 0 ? call.queries.map(function (query, i) {
        return /*#__PURE__*/_react.default.createElement(_queryRecord.default, {
          key: i,
          query: query,
          index: i
        });
      }) : 'No queries recorded.') : null);
    }
  }]);

  return CallRecord;
}(_react.Component);

exports.default = CallRecord;
module.exports = exports.default;

//# sourceMappingURL=call-record.js