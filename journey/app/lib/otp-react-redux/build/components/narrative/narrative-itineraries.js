"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom.iterable.js");

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLoadingSkeleton = _interopRequireWildcard(require("react-loading-skeleton"));

var _reactRedux = require("react-redux");

var _narrative = require("../../actions/narrative");

var _defaultItinerary = _interopRequireDefault(require("./default/default-itinerary"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _linkButton = _interopRequireDefault(require("../user/link-button"));

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: move to utils?
function humanReadableMode(modeStr) {
  if (!modeStr) return 'N/A';
  const arr = modeStr.toLowerCase().replace(/_/g, ' ').split(',');

  if (arr.length > 2) {
    const last = arr.pop();
    return arr.join(', ') + ' and ' + last;
  } else {
    return arr.join(' and ');
  }
}

class NarrativeItineraries extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "_toggleDetailedItinerary", () => {
      this.setState({
        showDetails: !this.state.showDetails
      });
    });

    _defineProperty(this, "_saveTrip", () => {
      // FIXME: Replace with new save-trip functionality.
      window.confirm('Are you sure you want to save this trip?');
    });

    _defineProperty(this, "_onFilterChange", evt => {
      const {
        sort,
        updateItineraryFilter
      } = this.props;
      const {
        value
      } = evt.target;
      updateItineraryFilter({
        filter: value,
        sort
      });
    });

    _defineProperty(this, "_onSortChange", evt => {
      const {
        value: type
      } = evt.target;
      const {
        filter,
        sort,
        updateItineraryFilter
      } = this.props;
      updateItineraryFilter({
        filter,
        sort: { ...sort,
          type
        }
      });
    });

    _defineProperty(this, "_onSortDirChange", () => {
      const {
        filter,
        sort,
        updateItineraryFilter
      } = this.props;
      const direction = sort.direction === 'ASC' ? 'DESC' : 'ASC';
      updateItineraryFilter({
        filter,
        sort: { ...sort,
          direction
        }
      });
    });

    _defineProperty(this, "_toggleRealtimeItineraryClick", e => {
      const {
        setUseRealtimeResponse,
        useRealtime
      } = this.props;
      setUseRealtimeResponse({
        useRealtime: !useRealtime
      });
    });

    _defineProperty(this, "_renderLoadingDivs", () => {
      const {
        itineraries,
        modes,
        pending
      } = this.props;
      if (!pending) return null; // Construct loading divs as placeholders while all itineraries load.

      const count = modes.combinations ? modes.combinations.length - itineraries.length : 0;
      return Array.from({
        length: count
      }, (v, i) => /*#__PURE__*/_react.default.createElement("div", {
        key: i,
        className: "option default-itin"
      }, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.SkeletonTheme, {
        color: "#ddd",
        highlightColor: "#eee"
      }, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.default, {
        count: 3
      }))));
    });
  }

  render() {
    const {
      activeItinerary,
      activeSearch,
      containerStyle,
      errors,
      filter,
      itineraries,
      itineraryClass,
      pending,
      persistence,
      realtimeEffects,
      sort,
      useRealtime
    } = this.props;
    if (!activeSearch) return null;
    const itineraryIsExpanded = activeItinerary !== undefined && activeItinerary !== null && this.state.showDetails;
    const showRealtimeAnnotation = realtimeEffects.isAffectedByRealtimeData && (realtimeEffects.exceedsThreshold || realtimeEffects.routesDiffer || !useRealtime);
    const resultText = pending ? 'Finding your options...' : `${itineraries.length} itineraries found.`;
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
    }, /*#__PURE__*/_react.default.createElement("option", {
      value: "ALL"
    }, "All modes"), /*#__PURE__*/_react.default.createElement("option", {
      value: "TRANSIT"
    }, "Transit only"), /*#__PURE__*/_react.default.createElement("option", {
      value: "ACTIVE"
    }, "Active only"), /*#__PURE__*/_react.default.createElement("option", {
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
      className: `fa fa-sort-amount-${sort.direction.toLowerCase()}`
    })), /*#__PURE__*/_react.default.createElement("select", {
      onChange: this._onSortChange,
      value: sort.value
    }, /*#__PURE__*/_react.default.createElement("option", {
      value: "BEST"
    }, "Best option"), /*#__PURE__*/_react.default.createElement("option", {
      value: "DURATION"
    }, "Duration"), /*#__PURE__*/_react.default.createElement("option", {
      value: "ARRIVALTIME"
    }, "Arrival time"), /*#__PURE__*/_react.default.createElement("option", {
      value: "DEPARTURETIME"
    }, "Departure time"), /*#__PURE__*/_react.default.createElement("option", {
      value: "WALKTIME"
    }, "Walk time"), /*#__PURE__*/_react.default.createElement("option", {
      value: "COST"
    }, "Cost"))))), /*#__PURE__*/_react.default.createElement("div", {
      // FIXME: Change to a ul with li children?
      className: "list",
      style: {
        flexGrow: '1',
        overflowY: 'auto'
      }
    }, itineraries.map((itinerary, index) => {
      const active = index === activeItinerary; // Hide non-active itineraries.

      if (!active && itineraryIsExpanded) return null;
      return /*#__PURE__*/_react.default.createElement(itineraryClass, {
        itinerary,
        index,
        key: index,
        active,
        routingType: 'ITINERARY',
        sort,
        expanded: this.state.showDetails,
        onClick: active ? this._toggleDetailedItinerary : undefined,
        showRealtimeAnnotation,
        ...this.props
      });
    }), errors.map((e, i) => {
      const mode = humanReadableMode(e.requestParameters.mode);
      return /*#__PURE__*/_react.default.createElement("div", {
        key: i,
        className: "option default-itin"
      }, /*#__PURE__*/_react.default.createElement("h4", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        className: "text-warning",
        type: "exclamation-triangle"
      }), ' ', "No trip found for ", mode), /*#__PURE__*/_react.default.createElement("div", null, e.error.msg));
    }), this._renderLoadingDivs()));
  }

} // connect to the redux store


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

const mapStateToProps = (state, ownProps) => {
  const activeSearch = (0, _state.getActiveSearch)(state.otp);
  const {
    persistence
  } = state.otp.config;
  const {
    modes
  } = state.otp.config;
  const {
    filter,
    sort
  } = state.otp.filter;
  const pending = activeSearch ? Boolean(activeSearch.pending) : false;
  const itineraries = (0, _state.getActiveItineraries)(state.otp);
  const realtimeEffects = (0, _state.getRealtimeEffects)(state.otp);
  const useRealtime = state.otp.useRealtime;
  return {
    activeSearch,
    errors: (0, _state.getActiveErrors)(state.otp),
    // swap out realtime itineraries with non-realtime depending on boolean
    itineraries,
    pending,
    realtimeEffects,
    activeItinerary: activeSearch && activeSearch.activeItinerary,
    activeLeg: activeSearch && activeSearch.activeLeg,
    activeStep: activeSearch && activeSearch.activeStep,
    filter,
    modes,
    persistence,
    sort,
    timeFormat: _src.default.time.getTimeFormat(state.otp.config),
    useRealtime,
    visibleItinerary: activeSearch && activeSearch.visibleItinerary
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // FIXME: update signature of these methods,
  // so that only one argument is passed,
  // e.g. setActiveLeg({ index, leg })
  return {
    setActiveItinerary: payload => dispatch((0, _narrative.setActiveItinerary)(payload)),
    // FIXME
    setActiveLeg: (index, leg) => {
      dispatch((0, _narrative.setActiveLeg)({
        index,
        leg
      }));
    },
    // FIXME
    setActiveStep: (index, step) => {
      dispatch((0, _narrative.setActiveStep)({
        index,
        step
      }));
    },
    setUseRealtimeResponse: payload => dispatch((0, _narrative.setUseRealtimeResponse)(payload)),
    setVisibleItinerary: payload => dispatch((0, _narrative.setVisibleItinerary)(payload)),
    updateItineraryFilter: payload => dispatch((0, _narrative.updateItineraryFilter)(payload))
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NarrativeItineraries);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=narrative-itineraries.js