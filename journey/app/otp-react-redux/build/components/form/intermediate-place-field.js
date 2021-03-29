"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _locationField = _interopRequireDefault(require("@opentripplanner/location-field"));

var _styled = require("@opentripplanner/location-field/lib/styled");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _map = require("../../actions/map");

var _location = require("../../actions/location");

var _api = require("../../actions/api");

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const StyledIntermediatePlace = (0, _styledComponents.default)(_locationField.default)`
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
`;
/**
 * Component that leverages LocationField to allow selecting an intermediate
 * place (e.g., stopover on the way from origin to the destination).
 * TODO: move this to otp-ui?
 */

class IntermediatePlaceField extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_removeIntermediatePlace", () => {
      const {
        index,
        location,
        onLocationCleared
      } = this.props;
      onLocationCleared && onLocationCleared({
        location,
        index
      });
    });
  }

  render() {
    const {
      index
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(StyledIntermediatePlace, _extends({}, this.props, {
      locationType: `intermediate-place-${index}`,
      clearLocation: this._removeIntermediatePlace
    }));
  }

} // connect to redux store


const mapStateToProps = (state, ownProps) => {
  const {
    config,
    location,
    transitIndex,
    user
  } = state.otp;
  const {
    currentPosition,
    nearbyStops,
    sessionSearches
  } = location;
  return {
    currentPosition,
    geocoderConfig: config.geocoder,
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
  clearLocation: _map.clearLocation
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(IntermediatePlaceField);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=intermediate-place-field.js