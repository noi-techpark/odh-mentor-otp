"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _api = require("../../actions/api");

var _form = require("../../actions/form");

var _map = require("../../actions/map");

var _ui = require("../../actions/ui");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  getDetailText,
  formatStoredPlaceName,
  matchLatLon
} = _src.default.map;
const {
  summarizeQuery
} = _src.default.query;
const BUTTON_WIDTH = 40;

class UserSettings extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_disableTracking", () => {
      const {
        user,
        toggleTracking
      } = this.props;
      if (!user.trackRecent) return;
      const hasRecents = user.recentPlaces.length > 0 || user.recentSearches.length > 0; // If user has recents and does not confirm deletion, return without doing
      // anything.

      if (hasRecents && !window.confirm('You have recent searches and/or places stored. Disabling storage of recent places/searches will remove these items. Continue?')) {
        return;
      } // Disable tracking if we reach this statement.


      toggleTracking(false);
    });

    _defineProperty(this, "_enableTracking", () => !this.props.user.trackRecent && this.props.toggleTracking(true));

    _defineProperty(this, "_getLocations", user => {
      const locations = [...user.locations];

      if (!locations.find(l => l.type === 'work')) {
        locations.push({
          id: 'work',
          type: 'work',
          icon: 'briefcase',
          name: '$_add_$',
          blank: true
        });
      }

      if (!locations.find(l => l.type === 'home')) {
        locations.push({
          id: 'home',
          type: 'home',
          icon: 'home',
          name: '$_add_$',
          blank: true
        });
      }

      return locations;
    });
  }

  render() {
    const {
      storageDisclaimer,
      user
    } = this.props;
    const {
      favoriteStops,
      trackRecent,
      recentPlaces,
      recentSearches
    } = user; // Clone locations in order to prevent blank locations from seeping into the
    // app state/store.

    const locations = this._getLocations(user);

    const order = ['home', 'work', 'suggested', 'stop', 'recent'];
    const sortedLocations = locations.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "user-settings"
    }, /*#__PURE__*/_react.default.createElement("ul", {
      style: {
        padding: 0
      }
    }, sortedLocations.map(location => {
      return /*#__PURE__*/_react.default.createElement(Place, _extends({
        key: location.id,
        location: location
      }, this.props));
    })), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "section-header"
    }, "$_favorite_stops_$"), /*#__PURE__*/_react.default.createElement("ul", {
      style: {
        padding: 0
      }
    }, favoriteStops.length > 0 ? favoriteStops.map(location => {
      return /*#__PURE__*/_react.default.createElement(Place, _extends({
        key: location.id,
        location: location
      }, this.props));
    }) : /*#__PURE__*/_react.default.createElement("small", null, "$_no_favorite_stops_$ ")), trackRecent && recentPlaces.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
      className: "recent-places-container"
    }, /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "section-header"
    }, "Recent places"), /*#__PURE__*/_react.default.createElement("ul", {
      style: {
        padding: 0
      }
    }, recentPlaces.map(location => {
      return /*#__PURE__*/_react.default.createElement(Place, _extends({
        key: location.id,
        location: location
      }, this.props));
    }))), trackRecent && recentSearches.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
      className: "recent-searches-container"
    }, /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "section-header"
    }, "Recent searches"), /*#__PURE__*/_react.default.createElement("ul", {
      style: {
        padding: 0
      }
    }, recentSearches.sort((a, b) => b.timestamp - a.timestamp).map(search => {
      return /*#__PURE__*/_react.default.createElement(RecentSearch, _extends({
        key: search.id,
        search: search
      }, this.props));
    }))), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "remember-settings"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "section-header"
    }, "$_my_preferences_$"), /*#__PURE__*/_react.default.createElement("small", null, "$_save_researches_$"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: this._enableTracking,
      className: trackRecent ? 'active' : '',
      bsSize: "xsmall",
      bsStyle: "link"
    }, "Yes"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: this._disableTracking,
      className: !trackRecent ? 'active' : '',
      bsSize: "xsmall",
      bsStyle: "link"
    }, "No")), storageDisclaimer && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("div", {
      className: "disclaimer"
    }, storageDisclaimer)));
  }

}

class Place extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onSelect", () => {
      const {
        location,
        query,
        setLocation
      } = this.props;

      if (location.blank) {
        window.alert(`Enter origin/destination in the form (or set via map click) and click the resulting marker to set as ${location.type} location.`);
      } else {
        // If 'to' not set and 'from' does not match location, set as 'to'.
        if (!query.to && (!query.from || !matchLatLon(location, query.from))) {
          setLocation({
            locationType: 'to',
            location
          });
        } else if ( // Vice versa for setting as 'from'.
        !query.from && !matchLatLon(location, query.to)) {
          setLocation({
            locationType: 'from',
            location
          });
        }
      }
    });

    _defineProperty(this, "_onView", () => {
      const {
        location,
        setViewedStop
      } = this.props;
      setViewedStop({
        stopId: location.id
      });
    });

    _defineProperty(this, "_onForget", () => {
      const {
        forgetPlace,
        forgetStop,
        location
      } = this.props;
      if (location.type === 'stop') forgetStop(location.id);else forgetPlace(location.id);
    });

    _defineProperty(this, "_isViewable", () => this.props.location.type === 'stop');

    _defineProperty(this, "_isForgettable", () => ['stop', 'home', 'work', 'recent'].indexOf(this.props.location.type) !== -1);
  }

  render() {
    const {
      location
    } = this.props;
    const {
      blank,
      icon
    } = location;

    const showView = this._isViewable();

    const showForget = this._isForgettable() && !blank; // Determine how much to offset width of main button (based on visibility of
    // other buttons sharing the same line).

    let offset = 0;
    if (showView) offset += BUTTON_WIDTH;
    if (showForget) offset += BUTTON_WIDTH;
    return /*#__PURE__*/_react.default.createElement("li", {
      className: "place-item"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsStyle: "link",
      title: formatStoredPlaceName(location),
      className: "place-button",
      style: {
        width: `calc(100% - ${offset}px)`
      },
      onClick: this._onSelect
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "place-text"
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: icon
    }), " ", formatStoredPlaceName(location, false)), /*#__PURE__*/_react.default.createElement("span", {
      className: "place-detail"
    }, getDetailText(location))), showView && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: this._onView,
      className: "place-view",
      bsSize: "xsmall",
      title: "View stop",
      style: {
        width: `${BUTTON_WIDTH}px`
      },
      bsStyle: "link"
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "search"
    })), showForget && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: this._onForget,
      className: "place-clear",
      bsSize: "xsmall",
      style: {
        width: `${BUTTON_WIDTH}px`
      },
      bsStyle: "link"
    }, "Clear"));
  }

}

class RecentSearch extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onSelect", () => {
      const {
        search,
        setQueryParam
      } = this.props; // Update query params and initiate search.

      setQueryParam(search.query, search.id);
    });

    _defineProperty(this, "_onForget", () => this.props.forgetSearch(this.props.search.id));
  }

  render() {
    const {
      search,
      user
    } = this.props;
    const {
      query,
      timestamp
    } = search;
    const name = summarizeQuery(query, user.locations);
    return /*#__PURE__*/_react.default.createElement("li", {
      className: "place-item"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsStyle: "link",
      title: `${name} (${(0, _moment.default)(timestamp).fromNow()})`,
      style: {
        padding: '5px 0 0 0',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
        width: `calc(100% - ${BUTTON_WIDTH}px)`
      },
      onClick: this._onSelect
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "place-text"
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "clock-o"
    }), " ", name, " "), /*#__PURE__*/_react.default.createElement("span", {
      className: "place-detail"
    }, (0, _moment.default)(timestamp).fromNow())), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      onClick: this._onForget,
      bsSize: "xsmall",
      style: {
        paddingTop: '6px',
        width: `${BUTTON_WIDTH}px`
      },
      bsStyle: "link"
    }, "Clear"));
  }

} // connect to redux store


const mapStateToProps = (state, ownProps) => {
  return {
    config: state.otp.config,
    currentPosition: state.otp.location.currentPosition,
    nearbyStops: state.otp.location.nearbyStops,
    query: state.otp.currentQuery,
    sessionSearches: state.otp.location.sessionSearches,
    stopsIndex: state.otp.transitIndex.stops,
    storageDisclaimer: state.otp.config.language.storageDisclaimer,
    user: state.otp.user
  };
};

const mapDispatchToProps = {
  forgetStop: _map.forgetStop,
  forgetPlace: _map.forgetPlace,
  forgetSearch: _api.forgetSearch,
  setLocation: _map.setLocation,
  setQueryParam: _form.setQueryParam,
  setViewedStop: _ui.setViewedStop,
  toggleTracking: _api.toggleTracking
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserSettings);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=user-settings.js