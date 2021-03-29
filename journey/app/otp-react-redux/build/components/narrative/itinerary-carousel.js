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

var _reactSwipeableViews = _interopRequireDefault(require("react-swipeable-views"));

var _narrative = require("../../actions/narrative");

var _icon = _interopRequireDefault(require("./icon"));

var _defaultItinerary = _interopRequireDefault(require("./default/default-itinerary"));

var _loading = _interopRequireDefault(require("./loading"));

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ItineraryCarousel extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});

    _defineProperty(this, "_onItineraryClick", () => {
      if (typeof this.props.onClick === 'function') this.props.onClick();
    });

    _defineProperty(this, "_onLeftClick", () => {
      const {
        activeItinerary,
        itineraries,
        setActiveItinerary
      } = this.props;
      setActiveItinerary(activeItinerary === 0 ? itineraries.length - 1 : activeItinerary - 1);
    });

    _defineProperty(this, "_onRightClick", () => {
      const {
        activeItinerary,
        itineraries,
        setActiveItinerary
      } = this.props;
      setActiveItinerary(activeItinerary === itineraries.length - 1 ? 0 : activeItinerary + 1);
    });

    _defineProperty(this, "_onSwipe", (index, indexLatest) => {
      this.props.setActiveItinerary(index);
    });
  }

  render() {
    const {
      activeItinerary,
      itineraries,
      itineraryClass,
      hideHeader,
      pending,
      user
    } = this.props;
    if (pending) return /*#__PURE__*/_react.default.createElement(_loading.default, {
      small: true
    });
    if (!itineraries) return null;
    const views = itineraries.map((itinerary, index) => {
      return /*#__PURE__*/_react.default.createElement(itineraryClass, {
        itinerary,
        index,
        key: index,
        expanded: this.props.expanded,
        onClick: this._onItineraryClick,
        user,
        ...this.props
      });
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "options itinerary"
    }, hideHeader ? null : /*#__PURE__*/_react.default.createElement("div", {
      className: "header carousel-header"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "carousel-left-button carousel-button",
      disabled: activeItinerary === 0,
      onClick: this._onLeftClick
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "arrow-left"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "text-center carousel-header-text"
    }, activeItinerary + 1, " of ", itineraries.length), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      disabled: activeItinerary === itineraries.length - 1,
      className: "pull-right carousel-right-button carousel-button",
      onClick: this._onRightClick
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "arrow-right"
    }))), /*#__PURE__*/_react.default.createElement(_reactSwipeableViews.default, {
      index: activeItinerary,
      onChangeIndex: this._onSwipe
    }, views));
  }

} // connect to the redux store


_defineProperty(ItineraryCarousel, "propTypes", {
  itineraries: _propTypes.default.array,
  pending: _propTypes.default.number,
  activeItinerary: _propTypes.default.number,
  hideHeader: _propTypes.default.bool,
  itineraryClass: _propTypes.default.func,
  onClick: _propTypes.default.func,
  setActiveItinerary: _propTypes.default.func,
  setActiveLeg: _propTypes.default.func,
  setActiveStep: _propTypes.default.func,
  expanded: _propTypes.default.bool,
  companies: _propTypes.default.string
});

_defineProperty(ItineraryCarousel, "defaultProps", {
  itineraryClass: _defaultItinerary.default
});

const mapStateToProps = (state, ownProps) => {
  const activeSearch = (0, _state.getActiveSearch)(state.otp);
  const itineraries = (0, _state.getActiveItineraries)(state.otp);
  return {
    itineraries,
    pending: activeSearch && activeSearch.pending,
    activeItinerary: activeSearch && activeSearch.activeItinerary,
    activeLeg: activeSearch && activeSearch.activeLeg,
    activeStep: activeSearch && activeSearch.activeStep,
    companies: state.otp.currentQuery.companies,
    timeFormat: _coreUtils.default.time.getTimeFormat(state.otp.config),
    user: state.user.loggedInUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setActiveItinerary: index => {
      dispatch((0, _narrative.setActiveItinerary)({
        index
      }));
    },
    setActiveLeg: (index, leg) => {
      dispatch((0, _narrative.setActiveLeg)({
        index,
        leg
      }));
    },
    setActiveStep: (index, step) => {
      dispatch((0, _narrative.setActiveStep)({
        index,
        step
      }));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ItineraryCarousel);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=itinerary-carousel.js