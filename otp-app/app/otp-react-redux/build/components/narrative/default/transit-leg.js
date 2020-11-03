"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.function.name");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _icon = _interopRequireDefault(require("../icon"));

var _viewTripButton = _interopRequireDefault(require("../../viewers/view-trip-button"));

var _viewStopButton = _interopRequireDefault(require("../../viewers/view-stop-button"));

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

var getMapColor = _coreUtils.default.itinerary.getMapColor;
var _coreUtils$time = _coreUtils.default.time,
    formatDuration = _coreUtils$time.formatDuration,
    formatTime = _coreUtils$time.formatTime;

var TransitLeg = /*#__PURE__*/function (_Component) {
  _inherits(TransitLeg, _Component);

  var _super = _createSuper(TransitLeg);

  function TransitLeg(props) {
    var _this;

    _classCallCheck(this, TransitLeg);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_onClick", function () {
      _this.setState({
        expanded: !_this.state.expanded
      });
    });

    _this.state = {
      expanded: false
    };
    return _this;
  }

  _createClass(TransitLeg, [{
    key: "_onLegClick",
    value: function _onLegClick(e, leg, index) {
      if (this.props.active) {
        this.props.setActiveLeg(null);
      } else {
        this.props.setActiveLeg(index, leg);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          active = _this$props.active,
          index = _this$props.index,
          leg = _this$props.leg,
          LegIcon = _this$props.LegIcon;
      var expanded = this.state.expanded;
      var numStops = leg.to.stopIndex - leg.from.stopIndex - 1;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "leg".concat(active ? ' active' : '', " transit-leg")
      }, /*#__PURE__*/_react.default.createElement("button", {
        className: "header",
        onClick: function onClick(e) {
          return _this2._onLegClick(e, leg, index);
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "mode-icon-container"
      }, /*#__PURE__*/_react.default.createElement(LegIcon, {
        leg: leg
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "route-name"
      }, /*#__PURE__*/_react.default.createElement("div", null, leg.routeShortName && /*#__PURE__*/_react.default.createElement("span", {
        className: "route-short-name"
      }, leg.routeShortName), leg.routeLongName && /*#__PURE__*/_react.default.createElement("span", {
        className: "route-long-name"
      }, leg.routeLongName)), leg.headsign && /*#__PURE__*/_react.default.createElement("div", {
        className: "headsign"
      }, "$_direction_$ ", leg.headsign)), leg.realTime ? /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "rss"
      }) : null), /*#__PURE__*/_react.default.createElement("div", {
        className: "step-by-step"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "transit-leg-body"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "from-row"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "time-cell"
      }, formatTime(leg.startTime)), /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-line-cell"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-line-top",
        style: {
          backgroundColor: getMapColor(leg.mode)
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-bubble"
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-name-cell"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          float: 'right'
        }
      }, /*#__PURE__*/_react.default.createElement(_viewStopButton.default, {
        stopId: leg.from.stopId
      })), formatLocation(leg.from.name))), /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-details-row"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "time-cell"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-line-cell"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-line-middle",
        style: {
          backgroundColor: getMapColor(leg.mode)
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-details-cell"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "intermediate-stops"
      }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          float: 'right'
        }
      }, /*#__PURE__*/_react.default.createElement(_viewTripButton.default, {
        tripId: leg.tripId,
        fromIndex: leg.from.stopIndex,
        toIndex: leg.to.stopIndex
      })), /*#__PURE__*/_react.default.createElement("button", {
        className: "clear-button-formatting",
        onClick: this._onClick
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "caret-".concat(expanded ? 'down' : 'right')
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "transit-duration"
      }, formatDuration(leg.duration)), ' ', "(", numStops ? "".concat(numStops, " stops") : 'non-stop', ")"), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          clear: 'both'
        }
      })), expanded && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-list"
      }, leg.intermediateStops.map(function (s, i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "stop-item item"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "trip-line-stop",
          style: {
            backgroundColor: getMapColor(leg.mode)
          }
        }), /*#__PURE__*/_react.default.createElement("span", {
          className: "stop-name"
        }, formatLocation(s.name)));
      })))), leg.alerts && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "item"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "exclamation-circle"
      }), " Information"), expanded && /*#__PURE__*/_react.default.createElement("div", null, leg.alerts.map(function (alert, i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "alert-item item",
          key: i
        }, alert.alertDescriptionText, ' ', alert.alertUrl ? /*#__PURE__*/_react.default.createElement("a", {
          target: "_blank",
          href: alert.alertUrl
        }, "more info") : null);
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: "item info-item"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "agency-info"
      }, "Servizio svolto da ", /*#__PURE__*/_react.default.createElement("a", {
        href: leg.agencyUrl
      }, leg.agencyName))))), /*#__PURE__*/_react.default.createElement("div", {
        className: "to-row"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "time-cell"
      }, formatTime(leg.endTime)), /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-line-cell"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-line-bottom",
        style: {
          backgroundColor: getMapColor(leg.mode)
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-bubble"
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-name-cell"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          float: 'right'
        }
      }, /*#__PURE__*/_react.default.createElement(_viewStopButton.default, {
        stopId: leg.to.stopId
      })), formatLocation(leg.to.name))))));
    }
  }]);

  return TransitLeg;
}(_react.Component);

exports.default = TransitLeg;

_defineProperty(TransitLeg, "propTypes", {
  itinerary: _propTypes.default.object,
  LegIcon: _propTypes.default.elementType.isRequired
});

function formatLocation(str) {
  return str.trim().toLowerCase().replace('/', ' / ').replace('-', ' - ').replace('@', ' @ ').replace('(', '( ').replace('  ', ' ').split(' ').map(function (s) {
    if (['ne', 'sw', 'nw', 'se'].includes(s)) return s.toUpperCase();
    return capitalizeFirst(s);
  }).join(' ').replace('( ', '(');
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = exports.default;

//# sourceMappingURL=transit-leg.js