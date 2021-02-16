"use strict";

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

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLoadingSkeleton = _interopRequireWildcard(require("react-loading-skeleton"));

var _reactRedux = require("react-redux");

var _narrative = require("../../actions/narrative");

var _defaultItinerary = _interopRequireDefault(require("./default/default-itinerary"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _linkButton = _interopRequireDefault(require("../user/link-button"));

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// TODO: move to utils?
function humanReadableMode(modeStr) {
  if (!modeStr) return 'N/A';
  var arr = modeStr.toLowerCase().replace(/_/g, ' ').split(',');

  if (arr.length > 2) {
    var last = arr.pop();
    return arr.join(', ') + ' and ' + last;
  } else {
    return arr.join(' and ');
  }
}

var NarrativeItineraries = /*#__PURE__*/function (_Component) {
  _inherits(NarrativeItineraries, _Component);

  var _super = _createSuper(NarrativeItineraries);

  function NarrativeItineraries() {
    var _this;

    _classCallCheck(this, NarrativeItineraries);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "_toggleDetailedItinerary", function () {
      _this.setState({
        showDetails: !_this.state.showDetails
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_saveTrip", function () {
      // FIXME: Replace with new save-trip functionality.
      window.confirm('Are you sure you want to save this trip?');
    });

    _defineProperty(_assertThisInitialized(_this), "_onFilterChange", function (evt) {
      var _this$props = _this.props,
          sort = _this$props.sort,
          updateItineraryFilter = _this$props.updateItineraryFilter;
      var value = evt.target.value;
      updateItineraryFilter({
        filter: value,
        sort: sort
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onSortChange", function (evt) {
      var type = evt.target.value;
      var _this$props2 = _this.props,
          filter = _this$props2.filter,
          sort = _this$props2.sort,
          updateItineraryFilter = _this$props2.updateItineraryFilter;
      updateItineraryFilter({
        filter: filter,
        sort: _objectSpread(_objectSpread({}, sort), {}, {
          type: type
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onSortDirChange", function () {
      var _this$props3 = _this.props,
          filter = _this$props3.filter,
          sort = _this$props3.sort,
          updateItineraryFilter = _this$props3.updateItineraryFilter;
      var direction = sort.direction === 'ASC' ? 'DESC' : 'ASC';
      updateItineraryFilter({
        filter: filter,
        sort: _objectSpread(_objectSpread({}, sort), {}, {
          direction: direction
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_toggleRealtimeItineraryClick", function (e) {
      var _this$props4 = _this.props,
          setUseRealtimeResponse = _this$props4.setUseRealtimeResponse,
          useRealtime = _this$props4.useRealtime;
      setUseRealtimeResponse({
        useRealtime: !useRealtime
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_renderLoadingDivs", function () {
      var _this$props5 = _this.props,
          itineraries = _this$props5.itineraries,
          modes = _this$props5.modes,
          pending = _this$props5.pending;
      if (!pending) return null; // Construct loading divs as placeholders while all itineraries load.

      var count = modes.combinations ? modes.combinations.length - itineraries.length : 0;
      return Array.from({
        length: count
      }, function (v, i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "option default-itin"
        }, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.SkeletonTheme, {
          color: "#ddd",
          highlightColor: "#eee"
        }, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
          count: 3
        })));
      });
    });

    return _this;
  }

  _createClass(NarrativeItineraries, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props6 = this.props,
          activeItinerary = _this$props6.activeItinerary,
          activeSearch = _this$props6.activeSearch,
          containerStyle = _this$props6.containerStyle,
          errors = _this$props6.errors,
          filter = _this$props6.filter,
          itineraries = _this$props6.itineraries,
          itineraryClass = _this$props6.itineraryClass,
          pending = _this$props6.pending,
          persistence = _this$props6.persistence,
          realtimeEffects = _this$props6.realtimeEffects,
          sort = _this$props6.sort,
          useRealtime = _this$props6.useRealtime;
      if (!activeSearch) return null;
      var itineraryIsExpanded = activeItinerary !== undefined && activeItinerary !== null && this.state.showDetails;
      var showRealtimeAnnotation = realtimeEffects.isAffectedByRealtimeData && (realtimeEffects.exceedsThreshold || realtimeEffects.routesDiffer || !useRealtime);
      var resultText = pending ? 'Finding your options...' : "".concat(itineraries.length, " itineraries found.");
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "options itinerary",
        style: containerStyle
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "options header",
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          flexGrow: '0'
        }
      }, itineraryIsExpanded ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
        className: "clear-button-formatting",
        onClick: this._toggleDetailedItinerary
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-arrow-left"
      }), " View all options"), persistence && persistence.enabled ? /*#__PURE__*/_react.default.createElement(_linkButton.default, {
        componentClass: "button",
        className: "clear-button-formatting",
        to: "/savetrip"
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-plus-circle"
      }), " Save trip") : null) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        title: resultText,
        style: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }, resultText),
      /*#__PURE__*/
      // FIXME: Enable only when ITINERARY/BATCH routing type enabled.
      _react.default.createElement("select", {
        onChange: this._onFilterChange,
        value: filter
      }, /*#__PURE__*/_react.default.createElement("Option", {
        value: "ALL"
      }, "All modes"), /*#__PURE__*/_react.default.createElement("Option", {
        value: "TRANSIT"
      }, "Transit only"), /*#__PURE__*/_react.default.createElement("Option", {
        value: "ACTIVE"
      }, "Active only"), /*#__PURE__*/_react.default.createElement("Option", {
        value: "CAR"
      }, "Uses car")), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: 'inherit'
        },
        className: "sort-options"
      }, /*#__PURE__*/_react.default.createElement("button", {
        onClick: this._onSortDirChange,
        className: "clear-button-formatting",
        style: {
          marginRight: '5px'
        }
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-sort-amount-".concat(sort.direction.toLowerCase())
      })), /*#__PURE__*/_react.default.createElement("select", {
        onChange: this._onSortChange,
        value: sort.value
      }, /*#__PURE__*/_react.default.createElement("Option", {
        value: "BEST"
      }, "Best option"), /*#__PURE__*/_react.default.createElement("Option", {
        value: "DURATION"
      }, "Duration"), /*#__PURE__*/_react.default.createElement("Option", {
        value: "ARRIVALTIME"
      }, "Arrival time"), /*#__PURE__*/_react.default.createElement("Option", {
        value: "DEPARTURETIME"
      }, "Departure time"), /*#__PURE__*/_react.default.createElement("Option", {
        value: "WALKTIME"
      }, "Walk time"), /*#__PURE__*/_react.default.createElement("Option", {
        value: "COST"
      }, "Cost"))))), /*#__PURE__*/_react.default.createElement("div", {
        // FIXME: Change to a ul with li children?
        className: "list",
        style: {
          flexGrow: '1',
          overflowY: 'auto'
        }
      }, itineraries.map(function (itinerary, index) {
        var active = index === activeItinerary; // Hide non-active itineraries.

        if (!active && itineraryIsExpanded) return null;
        return /*#__PURE__*/_react.default.createElement(itineraryClass, _objectSpread({
          itinerary: itinerary,
          index: index,
          key: index,
          active: active,
          routingType: 'ITINERARY',
          sort: sort,
          expanded: _this2.state.showDetails,
          onClick: active ? _this2._toggleDetailedItinerary : undefined,
          showRealtimeAnnotation: showRealtimeAnnotation
        }, _this2.props));
      }), errors.map(function (e, i) {
        var mode = humanReadableMode(e.requestParameters.mode);
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "option default-itin"
        }, /*#__PURE__*/_react.default.createElement("h4", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
          className: "text-warning",
          type: "exclamation-triangle"
        }), ' ', "No trip found for ", mode), /*#__PURE__*/_react.default.createElement("div", null, e.error.msg));
      }), this._renderLoadingDivs()));
    }
  }]);

  return NarrativeItineraries;
}(_react.Component); // connect to the redux store


_defineProperty(NarrativeItineraries, "propTypes", {
  itineraries: _propTypes.default.array,
  itineraryClass: _propTypes.default.func,
  pending: _propTypes.default.number,
  activeItinerary: _propTypes.default.number,
  setActiveItinerary: _propTypes.default.func,
  setActiveLeg: _propTypes.default.func,
  setActiveStep: _propTypes.default.func,
  setUseRealtimeResponse: _propTypes.default.func,
  useRealtime: _propTypes.default.bool
});

_defineProperty(NarrativeItineraries, "defaultProps", {
  itineraryClass: _defaultItinerary.default
});

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var activeSearch = (0, _state.getActiveSearch)(state.otp);
  var persistence = state.otp.config.persistence;
  var modes = state.otp.config.modes;
  var _state$otp$filter = state.otp.filter,
      filter = _state$otp$filter.filter,
      sort = _state$otp$filter.sort;
  var pending = activeSearch ? Boolean(activeSearch.pending) : false;
  var itineraries = (0, _state.getActiveItineraries)(state.otp);
  var realtimeEffects = (0, _state.getRealtimeEffects)(state.otp);
  var useRealtime = state.otp.useRealtime;
  return {
    activeSearch: activeSearch,
    errors: (0, _state.getActiveErrors)(state.otp),
    // swap out realtime itineraries with non-realtime depending on boolean
    itineraries: itineraries,
    pending: pending,
    realtimeEffects: realtimeEffects,
    activeItinerary: activeSearch && activeSearch.activeItinerary,
    activeLeg: activeSearch && activeSearch.activeLeg,
    activeStep: activeSearch && activeSearch.activeStep,
    filter: filter,
    modes: modes,
    persistence: persistence,
    sort: sort,
    timeFormat: _coreUtils.default.time.getTimeFormat(state.otp.config),
    useRealtime: useRealtime,
    visibleItinerary: activeSearch && activeSearch.visibleItinerary
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  // FIXME: update signature of these methods,
  // so that only one argument is passed,
  // e.g. setActiveLeg({ index, leg })
  return {
    setActiveItinerary: function setActiveItinerary(payload) {
      return dispatch((0, _narrative.setActiveItinerary)(payload));
    },
    // FIXME
    setActiveLeg: function setActiveLeg(index, leg) {
      dispatch((0, _narrative.setActiveLeg)({
        index: index,
        leg: leg
      }));
    },
    // FIXME
    setActiveStep: function setActiveStep(index, step) {
      dispatch((0, _narrative.setActiveStep)({
        index: index,
        step: step
      }));
    },
    setUseRealtimeResponse: function setUseRealtimeResponse(payload) {
      return dispatch((0, _narrative.setUseRealtimeResponse)(payload));
    },
    setVisibleItinerary: function setVisibleItinerary(payload) {
      return dispatch((0, _narrative.setVisibleItinerary)(payload));
    },
    updateItineraryFilter: function updateItineraryFilter(payload) {
      return dispatch((0, _narrative.updateItineraryFilter)(payload));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NarrativeItineraries);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=narrative-itineraries.js