"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _src2 = _interopRequireDefault(require("../../otp-ui/location-icon/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _defaultMap = _interopRequireDefault(require("../map/default-map"));

var _errorMessage = _interopRequireDefault(require("../form/error-message"));

var _itineraryCarousel = _interopRequireDefault(require("../narrative/itinerary-carousel"));

var _container = _interopRequireDefault(require("./container"));

var _navigationBar = _interopRequireDefault(require("./navigation-bar"));

var _ui = require("../../actions/ui");

var _narrative = require("../../actions/narrative");

var _form = require("../../actions/form");

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const LocationContainer = _styledComponents.default.div`
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const LocationSummaryContainer = _styledComponents.default.div`
  height: 50px;
  left: 0;
  padding-right: 10px;
  position: fixed;
  right: 0;
  top: 50px;
`;
const LocationsSummaryColFromTo = (0, _styledComponents.default)(_reactBootstrap.Col)`
  font-size: 1.1em;
  line-height: 1.2em;
`;
const LocationsSummaryRow = (0, _styledComponents.default)(_reactBootstrap.Row)`
  padding: 4px 8px;
`;
const StyledLocationIcon = (0, _styledComponents.default)(_src2.default)`
  margin: 3px;
`;

class MobileResultsScreen extends _react.Component {
  constructor() {
    super();

    _defineProperty(this, "_editSearchClicked", () => {
      this.props.clearActiveSearch();
      this.props.setMobileScreen(_ui.MobileScreens.SEARCH_FORM);
    });

    _defineProperty(this, "_optionClicked", () => {
      this._setExpanded(!this.state.expanded);
    });

    _defineProperty(this, "_toggleRealtime", () => this.props.setUseRealtimeResponse({
      useRealtime: !this.props.useRealtime
    }));

    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    // Get the target element that we want to persist scrolling for
    // FIXME Do we need to add something that removes the listeners when
    // component unmounts?
    _src.default.ui.enableScrollForSelector('.mobile-narrative-container');
  }

  componentDidUpdate(prevProps) {
    // Check if the active leg changed
    if (this.props.activeLeg !== prevProps.activeLeg) {
      this._setExpanded(false);
    }
  }

  _setExpanded(expanded) {
    this.setState({
      expanded
    });
    this.refs['narrative-container'].scrollTop = 0;
  }

  render() {
    const {
      activeItineraryIndex,
      error,
      itineraryClass,
      itineraryFooter,
      LegIcon,
      query,
      realtimeEffects,
      resultCount,
      useRealtime
    } = this.props;
    const {
      expanded
    } = this.state;
    const narrativeContainerStyle = expanded ? {
      top: 140,
      overflowY: 'auto'
    } : {
      height: 80,
      overflowY: 'hidden'
    }; // Ensure that narrative covers map.

    narrativeContainerStyle.backgroundColor = 'white';
    let headerAction = null;
    const showRealtimeAnnotation = realtimeEffects.isAffectedByRealtimeData && (realtimeEffects.exceedsThreshold || realtimeEffects.routesDiffer || !useRealtime);
    /* Old navbar alert
    if (showRealtimeAnnotation) {
      headerAction = (
        <RealtimeAnnotation
          componentClass='popover'
          toggleRealtime={this._toggleRealtime}
          realtimeEffects={realtimeEffects}
          useRealtime={useRealtime}
        />
      )
    */

    const locationsSummary = /*#__PURE__*/_react.default.createElement(LocationSummaryContainer, null, /*#__PURE__*/_react.default.createElement(LocationsSummaryRow, {
      className: "locations-summary"
    }, /*#__PURE__*/_react.default.createElement(LocationsSummaryColFromTo, {
      xs: 8,
      sm: 11
    }, /*#__PURE__*/_react.default.createElement(LocationContainer, null, /*#__PURE__*/_react.default.createElement(StyledLocationIcon, {
      type: "from"
    }), " ", query.from ? query.from.name : ''), /*#__PURE__*/_react.default.createElement(LocationContainer, {
      style: {
        marginTop: 2
      }
    }, /*#__PURE__*/_react.default.createElement(StyledLocationIcon, {
      type: "to"
    }), " ", query.to ? query.to.name : '')), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      xs: 4,
      sm: 1
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "edit-search-button pull-right",
      onClick: this._editSearchClicked
    }, "Edit"))));

    if (error) {
      return /*#__PURE__*/_react.default.createElement(_container.default, null, /*#__PURE__*/_react.default.createElement(_navigationBar.default, {
        headerText: "Nessun viaggio trovato"
      }), locationsSummary, /*#__PURE__*/_react.default.createElement("div", {
        className: "results-error-map"
      }, /*#__PURE__*/_react.default.createElement(_defaultMap.default, null)), /*#__PURE__*/_react.default.createElement("div", {
        className: "results-error-message"
      }, /*#__PURE__*/_react.default.createElement(_errorMessage.default, {
        error: error
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "options-lower-tray mobile-padding"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        className: "back-to-search-button",
        onClick: this._editSearchClicked,
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-arrow-left"
      }), " Back to Search"))));
    } // Construct the 'dots'


    const dots = [];

    for (let i = 0; i < resultCount; i++) {
      dots.push( /*#__PURE__*/_react.default.createElement("div", {
        key: i,
        className: `dot${activeItineraryIndex === i ? ' active' : ''}`
      }));
    }

    return /*#__PURE__*/_react.default.createElement(_container.default, null, /*#__PURE__*/_react.default.createElement(_navigationBar.default, {
      headerText: resultCount ? `$_found_$ ${resultCount} ${resultCount > 1 ? '$_options_$' : '$_option_$'}` : 'Attendi...',
      headerAction: headerAction
    }), locationsSummary, /*#__PURE__*/_react.default.createElement("div", {
      className: "results-map"
    }, this.props.map), /*#__PURE__*/_react.default.createElement("div", {
      className: "mobile-narrative-header",
      style: {
        bottom: expanded ? null : 100,
        top: expanded ? 100 : null
      },
      onClick: this._optionClicked
    }, "Option ", activeItineraryIndex + 1, /*#__PURE__*/_react.default.createElement("i", {
      className: `fa fa-caret-${expanded ? 'down' : 'up'}`,
      style: {
        marginLeft: 8
      }
    })), /*#__PURE__*/_react.default.createElement("div", {
      ref: "narrative-container",
      className: "mobile-narrative-container",
      style: narrativeContainerStyle
    }, /*#__PURE__*/_react.default.createElement(_itineraryCarousel.default, {
      itineraryClass: itineraryClass,
      itineraryFooter: itineraryFooter,
      hideHeader: true,
      expanded: this.state.expanded,
      onClick: this._optionClicked,
      showRealtimeAnnotation: showRealtimeAnnotation,
      LegIcon: LegIcon
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "dots-container",
      style: {
        padding: 'none'
      }
    }, dots));
  }

} // connect to the redux store


_defineProperty(MobileResultsScreen, "propTypes", {
  activeItineraryIndex: _propTypes.default.number,
  map: _propTypes.default.element,
  query: _propTypes.default.object,
  resultCount: _propTypes.default.number,
  setMobileScreen: _propTypes.default.func
});

const mapStateToProps = (state, ownProps) => {
  const activeSearch = (0, _state.getActiveSearch)(state.otp);
  const {
    useRealtime
  } = state.otp;
  const response = !activeSearch ? null : useRealtime ? activeSearch.response : activeSearch.nonRealtimeResponse;
  const realtimeEffects = (0, _state.getRealtimeEffects)(state.otp);
  const itineraries = (0, _state.getActiveItineraries)(state.otp);
  return {
    query: state.otp.currentQuery,
    realtimeEffects,
    error: response && response.error,
    resultCount: response ? activeSearch.query.routingType === 'ITINERARY' ? itineraries.length : response.otp.profile.length : null,
    useRealtime,
    activeItineraryIndex: activeSearch ? activeSearch.activeItinerary : null,
    activeLeg: activeSearch ? activeSearch.activeLeg : null
  };
};

const mapDispatchToProps = {
  clearActiveSearch: _form.clearActiveSearch,
  setMobileScreen: _ui.setMobileScreen,
  setUseRealtimeResponse: _narrative.setUseRealtimeResponse
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MobileResultsScreen);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=results-screen.js