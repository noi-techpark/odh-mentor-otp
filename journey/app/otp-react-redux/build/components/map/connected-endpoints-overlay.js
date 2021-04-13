"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../../otp-ui/endpoints-overlay/src"));

var _reactRedux = require("react-redux");

var _map = require("../../actions/map");

var _state = require("../../util/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// connect to the redux store
const mapStateToProps = (state, ownProps) => {
  // Use query from active search (if a search has been made) or default to
  // current query is no search is available.
  const activeSearch = (0, _state.getActiveSearch)(state.otp);
  const query = activeSearch ? activeSearch.query : state.otp.currentQuery;
  const showUserSettings = (0, _state.getShowUserSettings)(state.otp);
  const {
    from,
    to
  } = query; // Intermediate places doesn't trigger a re-plan, so for now default to
  // current query. FIXME: Determine with TriMet if this is desired behavior.

  const places = state.otp.currentQuery.intermediatePlaces.filter(p => p);
  return {
    fromLocation: from,
    intermediatePlaces: places,
    locations: state.otp.user.locations,
    showUserSettings,
    toLocation: to,
    visible: true
  };
};

const mapDispatchToProps = {
  forgetPlace: _map.forgetPlace,
  rememberPlace: _map.rememberPlace,
  setLocation: _map.setLocation,
  clearLocation: _map.clearLocation
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_src.default);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-endpoints-overlay.js