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

require("core-js/modules/es6.function.name");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _viewStopButton = _interopRequireDefault(require("./view-stop-button"));

var _ui = require("../../actions/ui");

var _api = require("../../actions/api");

var _map = require("../../actions/map");

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

var TripViewer = /*#__PURE__*/function (_Component) {
  _inherits(TripViewer, _Component);

  var _super = _createSuper(TripViewer);

  function TripViewer() {
    var _this;

    _classCallCheck(this, TripViewer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_backClicked", function () {
      _this.props.setViewedTrip(null);
    });

    return _this;
  }

  _createClass(TripViewer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          findTrip = _this$props.findTrip,
          viewedTrip = _this$props.viewedTrip;
      var tripId = viewedTrip.tripId;
      findTrip({
        tripId: tripId
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          hideBackButton = _this$props2.hideBackButton,
          languageConfig = _this$props2.languageConfig,
          timeFormat = _this$props2.timeFormat,
          tripData = _this$props2.tripData,
          viewedTrip = _this$props2.viewedTrip;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-viewer"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-viewer-header"
      }, !hideBackButton && /*#__PURE__*/_react.default.createElement("div", {
        className: "back-button-container"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsSize: "small",
        onClick: this._backClicked
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "arrow-left"
      }), "Indietro")), /*#__PURE__*/_react.default.createElement("div", {
        className: "header-text"
      }, languageConfig.tripViewer || 'Trip Viewer'), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          clear: 'both'
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-viewer-body"
      }, tripData && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "Route: ", /*#__PURE__*/_react.default.createElement("b", null, tripData.route.shortName), " ", tripData.route.longName), /*#__PURE__*/_react.default.createElement("h4", null, tripData.wheelchairAccessible === 1 && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Label, {
        bsStyle: "primary"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "wheelchair-alt"
      }), " Accessibile"), ' ', tripData.bikesAllowed === 1 && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Label, {
        bsStyle: "success"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "bicycle"
      }), " Permessa"))), tripData && tripData.stops && tripData.stopTimes && tripData.stops.map(function (stop, i) {
        // determine whether to use special styling for first/last stop
        var stripMapLineClass = 'strip-map-line';
        if (i === 0) stripMapLineClass = 'strip-map-line-first';else if (i === tripData.stops.length - 1) stripMapLineClass = 'strip-map-line-last'; // determine whether to show highlight in strip map

        var highlightClass;
        if (i === viewedTrip.fromIndex) highlightClass = 'strip-map-highlight-first';else if (i > viewedTrip.fromIndex && i < viewedTrip.toIndex) highlightClass = 'strip-map-highlight';else if (i === viewedTrip.toIndex) highlightClass = 'strip-map-highlight-last';
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "stop-time"
        }, _coreUtils.default.time.formatSecondsAfterMidnight(tripData.stopTimes[i].scheduledDeparture, timeFormat)), /*#__PURE__*/_react.default.createElement("div", {
          className: "strip-map-container"
        }, highlightClass && /*#__PURE__*/_react.default.createElement("div", {
          className: highlightClass
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: stripMapLineClass
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "strip-map-icon"
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          type: "circle"
        }))), /*#__PURE__*/_react.default.createElement("div", {
          className: "stop-button-container"
        }, /*#__PURE__*/_react.default.createElement(_viewStopButton.default, {
          stopId: stop.id,
          text: "Vedi"
        })), /*#__PURE__*/_react.default.createElement("div", {
          className: "stop-name"
        }, stop.name), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            clear: 'both'
          }
        }));
      })));
    }
  }]);

  return TripViewer;
}(_react.Component);

_defineProperty(TripViewer, "propTypes", {
  hideBackButton: _propTypes.default.bool,
  tripData: _propTypes.default.object,
  viewedTrip: _propTypes.default.object
});

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var viewedTrip = state.otp.ui.viewedTrip;
  return {
    languageConfig: state.otp.config.language,
    timeFormat: _coreUtils.default.time.getTimeFormat(state.otp.config),
    tripData: state.otp.transitIndex.trips[viewedTrip.tripId],
    viewedTrip: viewedTrip
  };
};

var mapDispatchToProps = {
  setViewedTrip: _ui.setViewedTrip,
  findTrip: _api.findTrip,
  setLocation: _map.setLocation
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TripViewer);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trip-viewer.js