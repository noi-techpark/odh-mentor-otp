"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledSubmodeSelector = void 0;

var _time = require("../../otp-ui/core-utils/src/time");

var _itinerary = require("../../otp-ui/core-utils/src/itinerary");

var _storage = require("../../otp-ui/core-utils/src/storage");

var _src = require("../../otp-ui/trip-form/src");

var TripFormClasses = _interopRequireWildcard(require("../../otp-ui/trip-form/src/styled"));

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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// FIXME: move to styled.js?
const StyledSubmodeSelector = (0, _styledComponents.default)(_src.SubmodeSelector)`
  ${TripFormClasses.SubmodeSelector.Row} {
    > * {
      padding: 3px 5px 3px 0px;
    }
    > :last-child {
      padding-right: 0px;
    }
    ${TripFormClasses.ModeButton.Button} {
      padding: 6px 12px;
    }
    svg,
    img {
      margin-left: 0px;
    }
  }
  ${TripFormClasses.SubmodeSelector.InlineRow} {
    margin: -3px 0px;
  }

  ${TripFormClasses.SubmodeSelector} {
      ${_styled2.modeButtonButtonCss}
  }
`;
exports.StyledSubmodeSelector = StyledSubmodeSelector;
const departureOptions = [{
  // Default option.
  value: 'NOW',
  children: '$_now_$'
}, {
  value: 'DEPART',
  children: '$_depart_at_$'
}, {
  value: 'ARRIVE',
  children: '$_arrive_at_$'
}];
const modeOptions = [{
  // Default option.
  value: 'TRANSIT',
  children: '$_tpl_$'
}, {
  value: 'WALK',
  children: '$_by_walk_$'
}, {
  value: 'BICYCLE',
  children: 'Solo Bicicletta'
}, {
  value: 'BICYCLE,TRANSIT',
  children: 'Bike & Ride'
}];

const metersToMiles = meters => Math.round(meters * 0.000621371 * 100) / 100;

const milesToMeters = miles => miles / 0.000621371;
/**
 * This is the main panel/sidebar for the Call Taker/Field Trip module. It
 * currently also serves as the main panel for the FDOT RMCE trip comparison view
 * which depends on the BATCH trip planning mode.
 */


class CallTakerPanel extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_planTrip", () => {
      const {
        currentQuery,
        routingQuery
      } = this.props;
      const issues = [];
      if (!(0, _state.hasValidLocation)(currentQuery, 'from')) issues.push('from');
      if (!(0, _state.hasValidLocation)(currentQuery, 'to')) issues.push('to');

      if (issues.length > 0) {
        // TODO: replace with less obtrusive validation.
        window.alert(`Please define the following fields to $_travel_$ ${issues.join(', ')}`);
        return;
      }

      routingQuery();
    });

    _defineProperty(this, "_setBannedRoutes", options => {
      const bannedRoutes = options ? options.map(o => o.value).join(',') : '';
      this.props.setQueryParam({
        bannedRoutes
      });
    });

    _defineProperty(this, "modeToOptionValue", mode => {
      const isTransit = (0, _itinerary.hasTransit)(mode);
      const isBike = (0, _itinerary.hasBike)(mode);
      if (isTransit && isBike) return 'BICYCLE,TRANSIT';else if (isTransit) return 'TRANSIT'; // Currently handles bicycle
      else return mode;
    });

    _defineProperty(this, "_addPlace", (result, index) => {
      const intermediatePlaces = [...this.props.currentQuery.intermediatePlaces] || [];

      if (result && index !== undefined) {
        // If adding an actual intermediate place with location. Overwrite the
        // placeholder with the new value.
        intermediatePlaces.splice(index, 1, result.location);
      } else {
        // Otherwise, we're just adding a dummy place.
        intermediatePlaces.push({});
      }

      this.props.setQueryParam({
        intermediatePlaces
      });
    });

    _defineProperty(this, "_removePlace", ({
      index
    }) => {
      const intermediatePlaces = [...this.props.currentQuery.intermediatePlaces] || [];
      intermediatePlaces.splice(index, 1);
      this.props.setQueryParam({
        intermediatePlaces
      });
    });

    _defineProperty(this, "_setMode", evt => {
      const {
        value: mode
      } = evt.target;
      const transitIsSelected = mode.indexOf('TRANSIT') !== -1;

      if (transitIsSelected) {
        // Collect transit modes and selected access mode.
        const accessMode = mode === 'TRANSIT' ? 'WALK' : 'BICYCLE'; // If no transit is selected, selected all available. Otherwise, default
        // to state.

        const transitModes = this.state.transitModes.length > 0 ? this.state.transitModes : this.props.modes.transitModes.map(m => m.mode);
        const newModes = [accessMode, ...transitModes].join(',');
        this.setState({
          transitModes
        });
        this.props.setQueryParam({
          mode: newModes
        });
      } else {
        this.props.setQueryParam({
          mode
        });
      }
    });

    _defineProperty(this, "_onHideAdvancedClick", () => {
      const expandAdvanced = !this.state.expandAdvanced; // FIXME move logic to action

      (0, _storage.storeItem)('expandAdvanced', expandAdvanced);
      this.setState({
        expandAdvanced
      });
    });

    _defineProperty(this, "_handleFormKeyDown", evt => {
      switch (evt.keyCode) {
        case 13:
          // Enter
          evt.preventDefault(); // Submit routing query.

          this._planTrip();

          break;

        default:
          // Do nothing.
          break;
      }
    });

    this.state = {
      expandAdvanced: props.expandAdvanced,
      transitModes: props.modes.transitModes.map(m => m.mode)
    };
  }

  render() {
    const {
      activeSearch,
      currentQuery,
      itineraryFooter,
      LegIcon,
      mainPanelContent,
      mobile,
      modes,
      ModeIcon,
      routes,
      setQueryParam,
      showUserSettings
    } = this.props; // FIXME: Remove showPlanTripButton

    const showPlanTripButton = mainPanelContent === 'EDIT_DATETIME' || mainPanelContent === 'EDIT_SETTINGS'; // const mostRecentQuery = activeSearch ? activeSearch.query : null
    // const planDisabled = isEqual(currentQuery, mostRecentQuery)

    const {
      departArrive,
      date,
      from,
      intermediatePlaces,
      mode,
      time,
      to
    } = currentQuery;
    const actionText = mobile ? "$_tap_$" : "$_click_$";
    const {
      expandAdvanced
    } = this.state;
    const advancedSearchStyle = {
      zIndex: 99999,
      background: 'white',
      position: 'absolute',
      right: '0px',
      left: '0px',
      padding: '0px 8px 5px',
      display: expandAdvanced ? 'none' : undefined
    }; // Only permit adding intermediate place if from/to is defined.

    const maxPlacesDefined = intermediatePlaces.length >= 3;
    const addIntermediateDisabled = !from || !to || maxPlacesDefined;
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
      inputPlaceholder: `Inserisci partenza o ${actionText} su mappa...`,
      locationType: "from",
      showClearButton: true
    }), Array.isArray(intermediatePlaces) && intermediatePlaces.map((place, i) => {
      return /*#__PURE__*/_react.default.createElement(_intermediatePlaceField.default, {
        key: i,
        index: i,
        location: place,
        onLocationCleared: this._removePlace // FIXME: function def
        ,
        onLocationSelected: result => this._addPlace(result, i) // FIXME: allow intermediate location type.
        ,
        locationType: "to",
        inputPlaceholder: `Enter intermediate destination`,
        showClearButton: !mobile
      });
    }), /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
      inputPlaceholder: `Inserisci destinazione o ${actionText} su mappa...`,
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
    }, modeOptions.map(o => /*#__PURE__*/_react.default.createElement("option", _extends({
      key: o.value
    }, o)))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
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
      className: `fa fa-caret-${expandAdvanced ? 'up' : 'down'}`
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

}

class CallTakerAdvancedOptions extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_setPreferredRoutes", options => {
      const preferredRoutes = options ? options.map(o => o.value).join(',') : '';
      this.props.setQueryParam({
        preferredRoutes
      });
    });

    _defineProperty(this, "_isBannedRouteOptionDisabled", option => {
      // Disable routes that are preferred already.
      const preferredRoutes = this.getRouteList('preferredRoutes');
      return preferredRoutes && preferredRoutes.find(o => o.value === option.value);
    });

    _defineProperty(this, "_isPreferredRouteOptionDisabled", option => {
      // Disable routes that are banned already.
      const bannedRoutes = this.getRouteList('bannedRoutes');
      return bannedRoutes && bannedRoutes.find(o => o.value === option.value);
    });

    _defineProperty(this, "getDistanceStep", distanceInMeters => {
      // Determine step for max walk/bike based on current value. Increment by a
      // quarter mile if dealing with small values, whatever number will round off
      // the number if it is not an integer, or default to one mile.
      return metersToMiles(distanceInMeters) <= 2 ? '.25' : metersToMiles(distanceInMeters) % 1 !== 0 ? `${metersToMiles(distanceInMeters) % 1}` : '1';
    });

    _defineProperty(this, "_onSubModeChange", changedMode => {
      // Get previous transit modes from state and all modes from query.
      const transitModes = [...this.state.transitModes];
      const allModes = this.props.currentQuery.mode.split(',');
      const index = transitModes.indexOf(changedMode);

      if (index === -1) {
        // If submode was not selected, add it.
        transitModes.push(changedMode);
        allModes.push(changedMode);
      } else {
        // Otherwise, remove it.
        transitModes.splice(index, 1);
        const i = allModes.indexOf(changedMode);
        allModes.splice(i, 1);
      } // Update transit modes in state.


      this.setState({
        transitModes
      }); // Update all modes in query (set to walk if all transit modes inactive).

      this.props.setQueryParam({
        mode: allModes.join(',') || 'WALK'
      });
    });

    _defineProperty(this, "_setMaxWalkDistance", evt => {
      this.props.setQueryParam({
        maxWalkDistance: milesToMeters(evt.target.value)
      });
    });

    _defineProperty(this, "getRouteList", key => {
      const routesParam = this.props.currentQuery[key];
      const idList = routesParam ? routesParam.split(',') : [];

      if (this.state.routeOptions) {
        return this.state.routeOptions.filter(o => idList.indexOf(o.value) !== -1);
      } else {
        // If route list is not available, default labels to route IDs.
        return idList.map(id => ({
          value: id,
          label: id
        }));
      }
    });

    _defineProperty(this, "routeToOption", route => {
      if (!route) return null;
      const {
        id,
        longName,
        shortName
      } = route; // For some reason the OTP API expects route IDs in this double
      // underscore format
      // FIXME: This replace is flimsy! What if there are more colons?

      const value = id.replace(':', '__');
      const label = shortName ? `${shortName}${longName ? ` - ${longName}` : ''}` : longName;
      return {
        value,
        label
      };
    });

    this.state = {
      expandAdvanced: props.expandAdvanced,
      routeOptions: [],
      transitModes: props.modes.transitModes.map(m => m.mode)
    };
  }

  componentWillMount() {
    // Fetch routes for banned/preferred routes selectors.
    this.props.findRoutes();
  }

  componentWillReceiveProps(nextProps) {
    const {
      routes
    } = nextProps; // Once routes are available, map them to the route options format.

    if (routes && !this.props.routes) {
      const routeOptions = Object.values(routes).map(this.routeToOption);
      this.setState({
        routeOptions
      });
    }
  }

  render() {
    const {
      currentQuery,
      modes,
      ModeIcon
    } = this.props;
    const {
      maxBikeDistance,
      maxWalkDistance,
      mode
    } = currentQuery;
    const bannedRoutes = this.getRouteList('bannedRoutes');
    const preferredRoutes = this.getRouteList('preferredRoutes');
    const transitModes = modes.transitModes.map(modeObj => {
      const modeStr = modeObj.mode || modeObj;
      return {
        id: modeStr,
        selected: this.state.transitModes.indexOf(modeStr) !== -1,
        text: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(ModeIcon, {
          mode: modeStr
        })),
        title: modeObj.label
      };
    }); // FIXME: Set units via config.

    const unitsString = '(mi.)';
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

}

const TIME_FORMATS = ['HH:mm:ss', 'h:mm:ss a', 'h:mm:ssa', 'h:mm a', 'h:mma', 'h:mm', 'HHmm', 'hmm', 'ha', 'h', 'HH:mm'].map(format => `YYYY-MM-DDT${format}`);

class DateTimeOptions extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_setDepartArrive", evt => {
      const {
        value: departArrive
      } = evt.target;

      if (departArrive === 'NOW') {
        this.props.setQueryParam({
          departArrive,
          date: (0, _moment.default)().format(_time.OTP_API_DATE_FORMAT),
          time: (0, _moment.default)().format(_time.OTP_API_TIME_FORMAT)
        });
      } else {
        this.props.setQueryParam({
          departArrive
        });
      }
    });

    _defineProperty(this, "handleDateChange", evt => {
      this.props.setQueryParam({
        date: evt.target.value
      });
    });

    _defineProperty(this, "handleTimeChange", evt => {
      const timeInput = evt.target.value;
      console.log(timeInput);
      const date = (0, _moment.default)().startOf('day').format('YYYY-MM-DD');
      const time = (0, _moment.default)(date + 'T' + timeInput, TIME_FORMATS);
      this.props.setQueryParam({
        time: time.format(_time.OTP_API_TIME_FORMAT)
      });
    });
  }

  render() {
    const {
      date,
      departArrive,
      time
    } = this.props;
    const leaveNow = departArrive === 'NOW' && !date && !time;
    const dateTime = (0, _moment.default)(`${date} ${time}`);
    const cleanDate = dateTime.format('YYYY-MM-DD');
    const cleanTime = dateTime.format('HH:mm');
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("select", {
      onBlur: this._setDepartArrive,
      onKeyDown: this.props.onKeyDown,
      value: departArrive,
      onChange: this._setDepartArrive
    }, departureOptions.map(o => /*#__PURE__*/_react.default.createElement("option", _extends({
      key: o.value
    }, o)))), leaveNow ? null : /*#__PURE__*/_react.default.createElement("span", {
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

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  const showUserSettings = (0, _state.getShowUserSettings)(state.otp);
  return {
    activeSearch: (0, _state.getActiveSearch)(state.otp),
    currentQuery: state.otp.currentQuery,
    expandAdvanced: state.otp.user.expandAdvanced,
    mainPanelContent: state.otp.ui.mainPanelContent,
    modes: state.otp.config.modes,
    routes: state.otp.transitIndex.routes,
    showUserSettings
  };
};

const mapDispatchToProps = {
  findRoutes: apiActions.findRoutes,
  routingQuery: apiActions.routingQuery,
  setQueryParam: formActions.setQueryParam
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CallTakerPanel);

exports.default = _default;

//# sourceMappingURL=call-taker-panel.js