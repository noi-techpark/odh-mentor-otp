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

var _reactBootstrap = require("react-bootstrap");

var _defaultMap = _interopRequireDefault(require("./default-map"));

var _legDiagram = _interopRequireDefault(require("./leg-diagram"));

var _stylizedMap = _interopRequireDefault(require("./stylized-map"));

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

var Map = /*#__PURE__*/function (_Component) {
  _inherits(Map, _Component);

  var _super = _createSuper(Map);

  function Map() {
    var _this;

    _classCallCheck(this, Map);

    _this = _super.call(this);
    _this.state = {
      activeViewIndex: 0
    };
    return _this;
  }

  _createClass(Map, [{
    key: "getComponentForView",
    value: function getComponentForView(view) {
      // TODO: allow a 'CUSTOM' type
      switch (view.type) {
        case 'DEFAULT':
          return /*#__PURE__*/_react.default.createElement(_defaultMap.default, null);

        case 'STYLIZED':
          return /*#__PURE__*/_react.default.createElement(_stylizedMap.default, null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          diagramLeg = _this$props.diagramLeg,
          mapConfig = _this$props.mapConfig;
      var showDiagram = diagramLeg; // Use the views defined in the config; if none defined, just show the default map

      var views = mapConfig.views || [{
        type: 'DEFAULT'
      }];
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "map-container"
      }, views.map(function (view, i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "map-container",
          style: {
            visibility: i === _this2.state.activeViewIndex ? 'visible' : 'hidden'
          }
        }, _this2.getComponentForView(view));
      }), views.length > 1 && /*#__PURE__*/_react.default.createElement("div", {
        style: {
          position: 'absolute',
          bottom: 12 + (showDiagram ? 192 : 0),
          left: 12,
          zIndex: 100000
        }
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonGroup, null, views.map(function (view, i) {
        return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
          key: i,
          bsSize: "xsmall",
          bsStyle: i === _this2.state.activeViewIndex ? 'success' : 'default',
          style: {
            padding: '3px 6px'
          },
          onClick: function onClick() {
            _this2.setState({
              activeViewIndex: i
            });
          }
        }, view.text || view.type);
      }))), showDiagram && /*#__PURE__*/_react.default.createElement(_legDiagram.default, {
        leg: diagramLeg
      }));
    }
  }]);

  return Map;
}(_react.Component); // Connect to Redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    diagramLeg: state.otp.ui.diagramLeg,
    mapConfig: state.otp.config.map
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(Map);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=map.js