"use strict";

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledSubmodeSelector = void 0;

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _time = require("@opentripplanner/core-utils/lib/time");

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _storage = require("@opentripplanner/core-utils/lib/storage");

var _tripForm = require("@opentripplanner/trip-form");

var TripFormClasses = _interopRequireWildcard(require("@opentripplanner/trip-form/lib/styled"));

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _reactSelect = _interopRequireDefault(require("react-select"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var apiActions = _interopRequireWildcard(require("../../actions/api"));

var formActions = _interopRequireWildcard(require("../../actions/form"));

var _intermediatePlaceField = _interopRequireDefault(require("../form/intermediate-place-field"));

var _connectedLocationField = _interopRequireDefault(require("../form/connected-location-field"));

var _styled2 = require("../form/styled");

var _switchButton = _interopRequireDefault(require("../form/switch-button"));

var _userSettings = _interopRequireDefault(require("../form/user-settings"));

var _narrativeItineraries = _interopRequireDefault(require("../narrative/narrative-itineraries"));

var _state = require("../../util/state");

var _viewerContainer = _interopRequireDefault(require("../viewers/viewer-container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", " {\n    > * {\n      padding: 3px 5px 3px 0px;\n    }\n    > :last-child {\n      padding-right: 0px;\n    }\n    ", " {\n      padding: 6px 12px;\n    }\n    svg,\n    img {\n      margin-left: 0px;\n    }\n  }\n  ", " {\n    margin: -3px 0px;\n  }\n\n  ", " {\n      ", "\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// FIXME: move to styled.js?
var StyledSubmodeSelector = (0, _styledComponents.default)(_tripForm.SubmodeSelector)(_templateObject(), TripFormClasses.SubmodeSelector.Row, TripFormClasses.ModeButton.Button, TripFormClasses.SubmodeSelector.InlineRow, TripFormClasses.SubmodeSelector, _styled2.modeButtonButtonCss);
exports.StyledSubmodeSelector = StyledSubmodeSelector;
var departureOptions = [{
  // Default option.
  value: 'NOW',
  children: "$_now_$"
}, {
  value: 'DEPART',
  children: 'Partenza alle'
}, {
  value: 'ARRIVE',
  children: 'Arrivo alle'
}];
var modeOptions = [{
  // Default option.
  value: 'TRANSIT',
  children: 'Tresporto Pubblico'
}, {
  value: 'WALK',
  children: 'A Piedi'
}, {
  value: 'BICYCLE',
  children: 'In Bici'
}, {
  value: 'BICYCLE,TRANSIT',
  children: 'Bike & Ride'
}];

var metersToMiles = function metersToMiles(meters) {
  return Math.round(meters * 0.000621371 * 100) / 100;
};

var milesToMeters = function milesToMeters(miles) {
  return miles / 0.000621371;
};
/**
 * This is the main panel/sidebar for the Call Taker/Field Trip module. It
 * currently also serves as the main panel for the FDOT RMCE trip comparison view
 * which depends on the BATCH trip planning mode.
 */


var CallTakerPanel = /*#__PURE__*/function (_Component) {
  _inherits(CallTakerPanel, _Component);

  var _super = _createSuper(CallTakerPanel);

  function CallTakerPanel(props) {
    var _this;

    _classCallCheck(this, CallTakerPanel);

    _this = _super.call(this, props);

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

    _defineProperty(_assertThisInitialized(_this), "_setBannedRoutes", function (options) {
      var bannedRoutes = options ? options.map(function (o) {
        return o.value;
      }).join(',') : '';

      _this.props.setQueryParam({
        bannedRoutes: bannedRoutes
      });
    });

    _defineProperty(_assertThisInitialized(_this), "modeToOptionValue", function (mode) {
      var isTransit = (0, _itinerary.hasTransit)(mode);
      var isBike = (0, _itinerary.hasBike)(mode);
      if (isTransit && isBike) return 'BICYCLE,TRANSIT';else if (isTransit) return 'TRANSIT'; // Currently handles bicycle
      else return mode;
    });

    _defineProperty(_assertThisInitialized(_this), "_addPlace", function (result, index) {
      var intermediatePlaces = _toConsumableArray(_this.props.currentQuery.intermediatePlaces) || [];

      if (result && index !== undefined) {
        // If adding an actual intermediate place with location. Overwrite the
        // placeholder with the new value.
        intermediatePlaces.splice(index, 1, result.location);
      } else {
        // Otherwise, we're just adding a dummy place.
        intermediatePlaces.push({});
      }

      _this.props.setQueryParam({
        intermediatePlaces: intermediatePlaces
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_removePlace", function (_ref) {
      var index = _ref.index;
      var intermediatePlaces = _toConsumableArray(_this.props.currentQuery.intermediatePlaces) || [];
      intermediatePlaces.splice(index, 1);

      _this.props.setQueryParam({
        intermediatePlaces: intermediatePlaces
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_setMode", function (evt) {
      var mode = evt.target.value;
      var transitIsSelected = mode.indexOf('TRANSIT') !== -1;

      if (transitIsSelected) {
        // Collect transit modes and selected access mode.
        var accessMode = mode === 'TRANSIT' ? 'WALK' : 'BICYCLE'; // If no transit is selected, selected all available. Otherwise, default
        // to state.

        var transitModes = _this.state.transitModes.length > 0 ? _this.state.transitModes : _this.props.modes.transitModes.map(function (m) {
          return m.mode;
        });
        var newModes = [accessMode].concat(_toConsumableArray(transitModes)).join(',');

        _this.setState({
          transitModes: transitModes
        });

        _this.props.setQueryParam({
          mode: newModes
        });
      } else {
        _this.props.setQueryParam({
          mode: mode
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onHideAdvancedClick", function () {
      var expandAdvanced = !_this.state.expandAdvanced; // FIXME move logic to action

      (0, _storage.storeItem)('expandAdvanced', expandAdvanced);

      _this.setState({
        expandAdvanced: expandAdvanced
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleFormKeyDown", function (evt) {
      switch (evt.keyCode) {
        case 13:
          // Enter
          evt.preventDefault(); // Submit routing query.

          _this._planTrip();

          break;

        default:
          // Do nothing.
          break;
      }
    });

    _this.state = {
      expandAdvanced: props.expandAdvanced,
      transitModes: props.modes.transitModes.map(function (m) {
        return m.mode;
      })
    };
    return _this;
  }

  _createClass(CallTakerPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          activeSearch = _this$props2.activeSearch,
          currentQuery = _this$props2.currentQuery,
          itineraryFooter = _this$props2.itineraryFooter,
          LegIcon = _this$props2.LegIcon,
          mainPanelContent = _this$props2.mainPanelContent,
          mobile = _this$props2.mobile,
          modes = _this$props2.modes,
          ModeIcon = _this$props2.ModeIcon,
          routes = _this$props2.routes,
          setQueryParam = _this$props2.setQueryParam,
          showUserSettings = _this$props2.showUserSettings; // FIXME: Remove showPlanTripButton

      var showPlanTripButton = mainPanelContent === 'EDIT_DATETIME' || mainPanelContent === 'EDIT_SETTINGS'; // const mostRecentQuery = activeSearch ? activeSearch.query : null
      // const planDisabled = isEqual(currentQuery, mostRecentQuery)

      var departArrive = currentQuery.departArrive,
          date = currentQuery.date,
          from = currentQuery.from,
          intermediatePlaces = currentQuery.intermediatePlaces,
          mode = currentQuery.mode,
          time = currentQuery.time,
          to = currentQuery.to;
      var actionText = mobile ? "$_tap_$" : "$_click_$";
      var expandAdvanced = this.state.expandAdvanced;
      var advancedSearchStyle = {
        zIndex: 99999,
        background: 'white',
        position: 'absolute',
        right: '0px',
        left: '0px',
        padding: '0px 8px 5px',
        display: expandAdvanced ? 'none' : undefined
      }; // Only permit adding intermediate place if from/to is defined.

      var maxPlacesDefined = intermediatePlaces.length >= 3;
      var addIntermediateDisabled = !from || !to || maxPlacesDefined;
      return /*#__PURE__*/_react.default.createElement(_viewerContainer.default, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "main-panel",
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: showPlanTripButton ? 55 : 0,
          paddingBottom: 15,
          overflow: 'hidden',
          padding: '10px'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "form"
      }, /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
        inputPlaceholder: "$_insert_departure_$ ".concat(actionText, " $_on_map_$..."),
        locationType: "from",
        showClearButton: true
      }), Array.isArray(intermediatePlaces) && intermediatePlaces.map(function (place, i) {
        return /*#__PURE__*/_react.default.createElement(_intermediatePlaceField.default, {
          key: i,
          index: i,
          location: place,
          onLocationCleared: _this2._removePlace // FIXME: function def
          ,
          onLocationSelected: function onLocationSelected(result) {
            return _this2._addPlace(result, i);
          } // FIXME: allow intermediate location type.
          ,
          locationType: "to",
          inputPlaceholder: "Enter intermediate destination",
          showClearButton: !mobile
        });
      }), /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
        inputPlaceholder: "$_insert_arrive_$ ".concat(actionText, " $_on_map_$..."),
        locationType: "to",
        showClearButton: !mobile
      }), /*#__PURE__*/_react.default.createElement("div", {
        // FIXME
        style: {
          top: '20px'
        },
        className: "switch-button-container"
      }, /*#__PURE__*/_react.default.createElement(_switchButton.default, {
        content: /*#__PURE__*/_react.default.createElement("i", {
          className: "fa fa-exchange fa-rotate-90"
        })
      })), /*#__PURE__*/_react.default.createElement("button", {
        className: "clear-button-formatting",
        style: {
          marginBottom: '5px',
          marginLeft: '10px'
        },
        disabled: addIntermediateDisabled,
        onClick: this._addPlace
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-plus-circle"
      }), ' ', maxPlacesDefined ? 'Maximum intermediate places reached' : addIntermediateDisabled ? 'Define origin/destination to add intermediate places' : 'Add place'), /*#__PURE__*/_react.default.createElement("div", {
        className: "search-options",
        style: {
          height: '30px'
        }
      }, /*#__PURE__*/_react.default.createElement(DateTimeOptions, {
        date: date,
        onKeyDown: this._handleFormKeyDown,
        departArrive: departArrive,
        setQueryParam: setQueryParam,
        time: time
      }), /*#__PURE__*/_react.default.createElement("select", {
        onBlur: this._setMode,
        onKeyDown: this._handleFormKeyDown,
        value: this.modeToOptionValue(mode),
        style: {
          position: 'absolute',
          right: '50px'
        },
        onChange: this._setMode
      }, modeOptions.map(function (o) {
        return /*#__PURE__*/_react.default.createElement("Option", _extends({
          key: o.value
        }, o));
      })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsStyle: "default",
        bsSize: "small",
        onClick: this._planTrip,
        style: {
          position: 'absolute',
          right: '0px'
        }
      }, "Plan")), /*#__PURE__*/_react.default.createElement("div", {
        className: "advanced-search-options-container"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        className: "hide-button clear-button-formatting",
        onClick: this._onHideAdvancedClick
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-caret-".concat(expandAdvanced ? 'up' : 'down')
      }), " Advanced options"), /*#__PURE__*/_react.default.createElement("div", {
        className: "advanced-search-options",
        style: advancedSearchStyle
      }, /*#__PURE__*/_react.default.createElement(CallTakerAdvancedOptions, {
        modes: modes,
        ModeIcon: ModeIcon,
        routes: routes,
        findRoutes: this.props.findRoutes,
        setQueryParam: setQueryParam,
        currentQuery: currentQuery
      })))), !activeSearch && !showPlanTripButton && showUserSettings && /*#__PURE__*/_react.default.createElement(_userSettings.default, null), /*#__PURE__*/_react.default.createElement("div", {
        className: "desktop-narrative-container"
      }, /*#__PURE__*/_react.default.createElement(_narrativeItineraries.default, {
        containerStyle: {
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          // FIXME: This top pixel value can be variable dependent on
          // height of the form above. It may need to be specified differently
          top: 193 + intermediatePlaces.length * 45,
          right: '0',
          left: '0',
          bottom: '0'
        },
        itineraryFooter: itineraryFooter,
        LegIcon: LegIcon
      }))));
    }
  }]);

  return CallTakerPanel;
}(_react.Component);

var CallTakerAdvancedOptions = /*#__PURE__*/function (_Component2) {
  _inherits(CallTakerAdvancedOptions, _Component2);

  var _super2 = _createSuper(CallTakerAdvancedOptions);

  function CallTakerAdvancedOptions(props) {
    var _this3;

    _classCallCheck(this, CallTakerAdvancedOptions);

    _this3 = _super2.call(this, props);

    _defineProperty(_assertThisInitialized(_this3), "_setPreferredRoutes", function (options) {
      var preferredRoutes = options ? options.map(function (o) {
        return o.value;
      }).join(',') : '';

      _this3.props.setQueryParam({
        preferredRoutes: preferredRoutes
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "_isBannedRouteOptionDisabled", function (option) {
      // Disable routes that are preferred already.
      var preferredRoutes = _this3.getRouteList('preferredRoutes');

      return preferredRoutes && preferredRoutes.find(function (o) {
        return o.value === option.value;
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "_isPreferredRouteOptionDisabled", function (option) {
      // Disable routes that are banned already.
      var bannedRoutes = _this3.getRouteList('bannedRoutes');

      return bannedRoutes && bannedRoutes.find(function (o) {
        return o.value === option.value;
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "getDistanceStep", function (distanceInMeters) {
      // Determine step for max walk/bike based on current value. Increment by a
      // quarter mile if dealing with small values, whatever number will round off
      // the number if it is not an integer, or default to one mile.
      return metersToMiles(distanceInMeters) <= 2 ? '.25' : metersToMiles(distanceInMeters) % 1 !== 0 ? "".concat(metersToMiles(distanceInMeters) % 1) : '1';
    });

    _defineProperty(_assertThisInitialized(_this3), "_onSubModeChange", function (changedMode) {
      // Get previous transit modes from state and all modes from query.
      var transitModes = _toConsumableArray(_this3.state.transitModes);

      var allModes = _this3.props.currentQuery.mode.split(',');

      var index = transitModes.indexOf(changedMode);

      if (index === -1) {
        // If submode was not selected, add it.
        transitModes.push(changedMode);
        allModes.push(changedMode);
      } else {
        // Otherwise, remove it.
        transitModes.splice(index, 1);
        var i = allModes.indexOf(changedMode);
        allModes.splice(i, 1);
      } // Update transit modes in state.


      _this3.setState({
        transitModes: transitModes
      }); // Update all modes in query (set to walk if all transit modes inactive).


      _this3.props.setQueryParam({
        mode: allModes.join(',') || 'WALK'
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "_setMaxWalkDistance", function (evt) {
      _this3.props.setQueryParam({
        maxWalkDistance: milesToMeters(evt.target.value)
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "getRouteList", function (key) {
      var routesParam = _this3.props.currentQuery[key];
      var idList = routesParam ? routesParam.split(',') : [];

      if (_this3.state.routeOptions) {
        return _this3.state.routeOptions.filter(function (o) {
          return idList.indexOf(o.value) !== -1;
        });
      } else {
        // If route list is not available, default labels to route IDs.
        return idList.map(function (id) {
          return {
            value: id,
            label: id
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this3), "routeToOption", function (route) {
      if (!route) return null;
      var id = route.id,
          longName = route.longName,
          shortName = route.shortName; // For some reason the OTP API expects route IDs in this double
      // underscore format
      // FIXME: This replace is flimsy! What if there are more colons?

      var value = id.replace(':', '__');
      var label = shortName ? "".concat(shortName).concat(longName ? " - ".concat(longName) : '') : longName;
      return {
        value: value,
        label: label
      };
    });

    _this3.state = {
      expandAdvanced: props.expandAdvanced,
      routeOptions: [],
      transitModes: props.modes.transitModes.map(function (m) {
        return m.mode;
      })
    };
    return _this3;
  }

  _createClass(CallTakerAdvancedOptions, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      // Fetch routes for banned/preferred routes selectors.
      this.props.findRoutes();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var routes = nextProps.routes; // Once routes are available, map them to the route options format.

      if (routes && !this.props.routes) {
        var routeOptions = Object.values(routes).map(this.routeToOption);
        this.setState({
          routeOptions: routeOptions
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          currentQuery = _this$props3.currentQuery,
          modes = _this$props3.modes,
          ModeIcon = _this$props3.ModeIcon;
      var maxBikeDistance = currentQuery.maxBikeDistance,
          maxWalkDistance = currentQuery.maxWalkDistance,
          mode = currentQuery.mode;
      var bannedRoutes = this.getRouteList('bannedRoutes');
      var preferredRoutes = this.getRouteList('preferredRoutes');
      var transitModes = modes.transitModes.map(function (modeObj) {
        var modeStr = modeObj.mode || modeObj;
        return {
          id: modeStr,
          selected: _this4.state.transitModes.indexOf(modeStr) !== -1,
          text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(ModeIcon, {
            mode: modeStr
          })),
          title: modeObj.label
        };
      }); // FIXME: Set units via config.

      var unitsString = '(mi.)';
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between'
        }
      }, /*#__PURE__*/_react.default.createElement("label", {
        style: {
          fontWeight: '400'
        }
      }, "Max walk ", unitsString, /*#__PURE__*/_react.default.createElement("input", {
        onChange: this._setMaxWalkDistance,
        onKeyDown: this._handleFormKeyDown,
        step: this.getDistanceStep(maxWalkDistance),
        min: "0",
        style: {
          display: 'block',
          marginRight: '10px',
          width: '60px'
        },
        value: metersToMiles(maxWalkDistance),
        type: "number"
      })), (0, _itinerary.hasBike)(mode) ? /*#__PURE__*/_react.default.createElement("label", {
        style: {
          fontWeight: '400'
        }
      }, "Max bike ", unitsString, /*#__PURE__*/_react.default.createElement("input", {
        onChange: this._setMaxBikeDistance,
        onKeyDown: this._handleFormKeyDown,
        step: this.getDistanceStep(maxBikeDistance),
        min: "0",
        style: {
          display: 'block',
          marginRight: '10px',
          width: '60px'
        },
        value: metersToMiles(maxBikeDistance),
        type: "number"
      })) : null, /*#__PURE__*/_react.default.createElement(StyledSubmodeSelector, {
        modes: transitModes,
        onChange: this._onSubModeChange // FIXME: Need to pass onKeyDown to children buttons in
        // otp-ui.
        ,
        onKeyDown: this._handleFormKeyDown
      })), /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
        value: preferredRoutes,
        id: "preferredRoutes",
        isMulti: true,
        isOptionDisabled: this._isPreferredRouteOptionDisabled,
        options: this.state.routeOptions,
        onChange: this._setPreferredRoutes,
        placeholder: "Select preferred routes..."
      }), /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
        value: bannedRoutes,
        id: "bannedRoutes",
        isMulti: true,
        isOptionDisabled: this._isBannedRouteOptionDisabled,
        options: this.state.routeOptions,
        onChange: this._setBannedRoutes,
        placeholder: "Select banned routes..."
      }));
    }
  }]);

  return CallTakerAdvancedOptions;
}(_react.Component);

var TIME_FORMATS = ['HH:mm:ss', 'h:mm:ss a', 'h:mm:ssa', 'h:mm a', 'h:mma', 'h:mm', 'HHmm', 'hmm', 'ha', 'h', 'HH:mm'].map(function (format) {
  return "YYYY-MM-DDT".concat(format);
});

var DateTimeOptions = /*#__PURE__*/function (_Component3) {
  _inherits(DateTimeOptions, _Component3);

  var _super3 = _createSuper(DateTimeOptions);

  function DateTimeOptions() {
    var _this5;

    _classCallCheck(this, DateTimeOptions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this5 = _super3.call.apply(_super3, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this5), "_setDepartArrive", function (evt) {
      var departArrive = evt.target.value;

      if (departArrive === 'NOW') {
        _this5.props.setQueryParam({
          departArrive: departArrive,
          date: (0, _moment.default)().format(_time.OTP_API_DATE_FORMAT),
          time: (0, _moment.default)().format(_time.OTP_API_TIME_FORMAT)
        });
      } else {
        _this5.props.setQueryParam({
          departArrive: departArrive
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this5), "handleDateChange", function (evt) {
      _this5.props.setQueryParam({
        date: evt.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this5), "handleTimeChange", function (evt) {
      var timeInput = evt.target.value;
      console.log(timeInput);
      var date = (0, _moment.default)().startOf('day').format('YYYY-MM-DD');
      var time = (0, _moment.default)(date + 'T' + timeInput, TIME_FORMATS);

      _this5.props.setQueryParam({
        time: time.format(_time.OTP_API_TIME_FORMAT)
      });
    });

    return _this5;
  }

  _createClass(DateTimeOptions, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          date = _this$props4.date,
          departArrive = _this$props4.departArrive,
          time = _this$props4.time;
      var leaveNow = departArrive === 'NOW' && !date && !time;
      var dateTime = (0, _moment.default)("".concat(date, " ").concat(time));
      var cleanDate = dateTime.format('YYYY-MM-DD');
      var cleanTime = dateTime.format('HH:mm');
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("select", {
        onBlur: this._setDepartArrive,
        onKeyDown: this.props.onKeyDown,
        value: departArrive,
        onChange: this._setDepartArrive
      }, departureOptions.map(function (o) {
        return /*#__PURE__*/_react.default.createElement("Option", _extends({
          key: o.value
        }, o));
      })), leaveNow ? null : /*#__PURE__*/_react.default.createElement("span", {
        style: {
          display: 'inline-flex'
        }
      }, /*#__PURE__*/_react.default.createElement("span", null, cleanTime), /*#__PURE__*/_react.default.createElement("input", {
        style: {
          width: '50px'
        },
        onKeyDown: this.props.onKeyDown,
        required: true,
        onChange: this.handleTimeChange
      })), leaveNow ? null : /*#__PURE__*/_react.default.createElement("input", {
        onKeyDown: this.props.onKeyDown,
        type: "date",
        value: cleanDate,
        style: {
          position: 'absolute',
          left: '180px',
          width: '124px',
          border: 'none',
          outline: 'none'
        },
        required: true,
        onChange: this.handleDateChange
      }));
    }
  }]);

  return DateTimeOptions;
}(_react.Component); // connect to the redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  var showUserSettings = (0, _state.getShowUserSettings)(state.otp);
  return {
    activeSearch: (0, _state.getActiveSearch)(state.otp),
    currentQuery: state.otp.currentQuery,
    expandAdvanced: state.otp.user.expandAdvanced,
    mainPanelContent: state.otp.ui.mainPanelContent,
    modes: state.otp.config.modes,
    routes: state.otp.transitIndex.routes,
    showUserSettings: showUserSettings
  };
};

var mapDispatchToProps = {
  findRoutes: apiActions.findRoutes,
  routingQuery: apiActions.routingQuery,
  setQueryParam: formActions.setQueryParam
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CallTakerPanel);

exports.default = _default;

//# sourceMappingURL=call-taker-panel.js
