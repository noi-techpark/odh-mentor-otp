"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var narrativeActions = _interopRequireWildcard(require("../../actions/narrative"));

var _defaultItinerary = _interopRequireDefault(require("./default/default-itinerary"));

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  calculateFares,
  calculatePhysicalActivity,
  getTimeZoneOffset
} = _coreUtils.default.itinerary;
const {
  formatDuration,
  formatTime,
  getTimeFormat
} = _coreUtils.default.time;

class TabbedItineraries extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_toggleRealtimeItineraryClick", e => {
      const {
        setUseRealtimeResponse,
        useRealtime
      } = this.props;
      setUseRealtimeResponse({
        useRealtime: !useRealtime
      });
    });
  }

  render() {
    const {
      activeItinerary,
      itineraries,
      itineraryClass,
      realtimeEffects,
      setActiveItinerary,
      timeFormat,
      useRealtime,
      ...itineraryClassProps
    } = this.props;
    if (!itineraries) return null;
    /* TODO: should this be moved? */

    const showRealtimeAnnotation = realtimeEffects.isAffectedByRealtimeData && (realtimeEffects.exceedsThreshold || realtimeEffects.routesDiffer || !useRealtime);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "options itinerary tabbed-itineraries"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "tab-row"
    }, itineraries.map((itinerary, index) => {
      return /*#__PURE__*/_react.default.createElement(TabButton, {
        index: index,
        isActive: index === activeItinerary,
        itinerary: itinerary,
        onClick: setActiveItinerary,
        timeFormat: timeFormat
      });
    })), itineraries.length > 0 && activeItinerary >= 0 ? /*#__PURE__*/_react.default.createElement(itineraryClass, {
      itinerary: itineraries[activeItinerary],
      index: activeItinerary,
      key: activeItinerary,
      active: true,
      expanded: true,
      routingType: 'ITINERARY',
      showRealtimeAnnotation,
      ...itineraryClassProps
    }) : null);
  }

} // connect to the redux store


_defineProperty(TabbedItineraries, "propTypes", {
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

_defineProperty(TabbedItineraries, "defaultProps", {
  itineraryClass: _defaultItinerary.default
});

const mapStateToProps = (state, ownProps) => {
  const activeSearch = (0, _state.getActiveSearch)(state.otp); // const { activeItinerary, activeLeg, activeStep } = activeSearch ? activeSearch.activeItinerary : {}

  const pending = activeSearch ? activeSearch.pending : false;
  const realtimeEffects = (0, _state.getRealtimeEffects)(state.otp);
  const useRealtime = state.otp.useRealtime;
  return {
    // swap out realtime itineraries with non-realtime depending on boolean
    pending,
    realtimeEffects,
    activeItinerary: activeSearch && activeSearch.activeItinerary,
    activeLeg: activeSearch && activeSearch.activeLeg,
    activeStep: activeSearch && activeSearch.activeStep,
    useRealtime,
    companies: state.otp.currentQuery.companies,
    tnc: state.otp.tnc,
    timeFormat: getTimeFormat(state.otp.config),
    user: state.user.loggedInUser
  };
};

class TabButton extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClick", () => {
      const {
        index,
        onClick
      } = this.props; // FIXME: change signature once actions resolved with otp-ui

      onClick(index);
    });
  }

  render() {
    const {
      index,
      isActive,
      itinerary,
      timeFormat
    } = this.props;
    const timeOptions = {
      format: timeFormat,
      offset: getTimeZoneOffset(itinerary)
    };
    const classNames = ['tab-button', 'clear-button-formatting'];
    const {
      caloriesBurned
    } = calculatePhysicalActivity(itinerary);
    const {
      centsToString,
      maxTNCFare,
      minTNCFare,
      transitFare
    } = calculateFares(itinerary); // TODO: support non-USD

    const minTotalFare = minTNCFare * 100 + transitFare;
    const plus = maxTNCFare && maxTNCFare > minTNCFare ? '+' : '';
    if (isActive) classNames.push('selected');
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      key: `tab-button-${index}`,
      className: classNames.join(' '),
      onClick: this._onClick
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "title"
    }, /*#__PURE__*/_react.default.createElement("span", null, "Option ", index + 1)), /*#__PURE__*/_react.default.createElement("div", {
      className: "details"
    }, formatDuration(itinerary.duration), /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("br", null), formatTime(itinerary.startTime, timeOptions), " - ", formatTime(itinerary.endTime, timeOptions)), /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("br", null), minTotalFare ? /*#__PURE__*/_react.default.createElement("span", null, `${centsToString(minTotalFare)}${plus}`, " \u2022 ") : '', Math.round(caloriesBurned), " Cal"), itinerary.transfers > 0 && /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("br", null), itinerary.transfers, " cambi", itinerary.transfers > 1 ? '' : 'o')));
  }

}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    setActiveItinerary,
    setActiveLeg,
    setActiveStep,
    setUseRealtimeResponse
  } = narrativeActions;
  return {
    // FIXME
    setActiveItinerary: index => {
      dispatch(setActiveItinerary({
        index
      }));
    },
    // FIXME
    setActiveLeg: (index, leg) => {
      dispatch(setActiveLeg({
        index,
        leg
      }));
    },
    // FIXME
    setActiveStep: (index, step) => {
      dispatch(setActiveStep({
        index,
        step
      }));
    },
    // FIXME
    setUseRealtimeResponse: ({
      useRealtime
    }) => {
      dispatch(setUseRealtimeResponse({
        useRealtime
      }));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TabbedItineraries);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=tabbed-itineraries.js