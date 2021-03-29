"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _locationField = _interopRequireDefault(require("@opentripplanner/location-field"));

var _styled = require("@opentripplanner/location-field/lib/styled");

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _map = require("../../actions/map");

var _location = require("../../actions/location");

var _api = require("../../actions/api");

var _state = require("../../util/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledLocationField = (0, _styledComponents.default)(_locationField.default)`
  width: 100%;

  ${_styled.DropdownContainer} {
    display: table-cell;
    vertical-align: middle;
    width: 1%;
  }

  ${_styled.FormGroup} {
    display: table;
    padding: 6px 12px;
    width: 100%;
  }

  ${_styled.Input} {
    display: table-cell;
    padding: 6px 12px;
    width: 100%;
  }

  ${_styled.InputGroup} {
    width: 100%;
  }

  ${_styled.InputGroupAddon} {
    display: table-cell;
    vertical-align: middle;
    width: 1%;
  }

  ${_styled.MenuItemA} {
    text-decoration: none;
  }

  ${_styled.MenuItemA}:hover {
    color: #333;
  }
`; // connect to redux store

const mapStateToProps = (state, ownProps) => {
  const {
    config,
    currentQuery,
    location,
    transitIndex,
    user
  } = state.otp;
  const {
    currentPosition,
    nearbyStops,
    sessionSearches
  } = location;
  const activeSearch = (0, _state.getActiveSearch)(state.otp);
  const query = activeSearch ? activeSearch.query : currentQuery;
  return {
    currentPosition,
    geocoderConfig: config.geocoder,
    location: query[ownProps.locationType],
    nearbyStops,
    sessionSearches,
    showUserSettings: (0, _state.getShowUserSettings)(state.otp),
    stopsIndex: transitIndex.stops,
    userLocationsAndRecentPlaces: [...user.locations, ...user.recentPlaces]
  };
};

const mapDispatchToProps = {
  addLocationSearch: _location.addLocationSearch,
  findNearbyStops: _api.findNearbyStops,
  getCurrentPosition: _location.getCurrentPosition,
  onLocationSelected: _map.onLocationSelected,
  clearLocation: _map.clearLocation
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(StyledLocationField);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-location-field.js