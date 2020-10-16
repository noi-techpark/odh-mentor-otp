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

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _viewerContainer = _interopRequireDefault(require("../viewers/viewer-container"));

var _defaultSearchForm = _interopRequireDefault(require("../form/default-search-form"));

var _planTripButton = _interopRequireDefault(require("../form/plan-trip-button"));

var _userSettings = _interopRequireDefault(require("../form/user-settings"));

var _narrativeRoutingResults = _interopRequireDefault(require("../narrative/narrative-routing-results"));

var _state = require("../../util/state");

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

var DefaultMainPanel = /*#__PURE__*/function (_Component) {
  _inherits(DefaultMainPanel, _Component);

  var _super = _createSuper(DefaultMainPanel);

  function DefaultMainPanel() {
    _classCallCheck(this, DefaultMainPanel);

    return _super.apply(this, arguments);
  }

  _createClass(DefaultMainPanel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          activeSearch = _this$props.activeSearch,
          currentQuery = _this$props.currentQuery,
          itineraryClass = _this$props.itineraryClass,
          itineraryFooter = _this$props.itineraryFooter,
          LegIcon = _this$props.LegIcon,
          mainPanelContent = _this$props.mainPanelContent,
          ModeIcon = _this$props.ModeIcon,
          showUserSettings = _this$props.showUserSettings;
      var showPlanTripButton = mainPanelContent === 'EDIT_DATETIME' || mainPanelContent === 'EDIT_SETTINGS';
      var mostRecentQuery = activeSearch ? activeSearch.query : null;
      var planDisabled = (0, _lodash.default)(currentQuery, mostRecentQuery);
      return /*#__PURE__*/_react.default.createElement(_viewerContainer.default, null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: showPlanTripButton ? 55 : 0,
          paddingBottom: 15,
          overflow: 'auto'
        }
      }, /*#__PURE__*/_react.default.createElement(_defaultSearchForm.default, {
        ModeIcon: ModeIcon
      }), !activeSearch && !showPlanTripButton && showUserSettings && /*#__PURE__*/_react.default.createElement(_userSettings.default, null), /*#__PURE__*/_react.default.createElement("div", {
        className: "desktop-narrative-container"
      }, /*#__PURE__*/_react.default.createElement(_narrativeRoutingResults.default, {
        itineraryClass: itineraryClass,
        itineraryFooter: itineraryFooter,
        LegIcon: LegIcon
      }))), showPlanTripButton && /*#__PURE__*/_react.default.createElement("div", {
        style: {
          position: 'absolute',
          left: 0,
          right: 10,
          bottom: 55,
          height: 15
        },
        className: "white-fade"
      }), showPlanTripButton && /*#__PURE__*/_react.default.createElement("div", {
        className: "bottom-fixed"
      }, /*#__PURE__*/_react.default.createElement(_planTripButton.default, {
        disabled: planDisabled
      })));
    }
  }]);

  return DefaultMainPanel;
}(_react.Component); // connect to the redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  var showUserSettings = (0, _state.getShowUserSettings)(state.otp);
  return {
    activeSearch: (0, _state.getActiveSearch)(state.otp),
    currentQuery: state.otp.currentQuery,
    mainPanelContent: state.otp.ui.mainPanelContent,
    showUserSettings: showUserSettings
  };
};

var mapDispatchToProps = {};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DefaultMainPanel);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=default-main-panel.js