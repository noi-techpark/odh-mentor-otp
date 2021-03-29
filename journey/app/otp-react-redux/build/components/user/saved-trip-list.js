"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clone = _interopRequireDefault(require("clone"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _useAuth0Hooks = require("use-auth0-hooks");

var uiActions = _interopRequireWildcard(require("../../actions/ui"));

var userActions = _interopRequireWildcard(require("../../actions/user"));

var _desktopNav = _interopRequireDefault(require("../app/desktop-nav"));

var _linkButton = _interopRequireDefault(require("./link-button"));

var _tripSummaryPane = _interopRequireDefault(require("./trip-summary-pane"));

var _withLoggedInUserSupport = _interopRequireDefault(require("./with-logged-in-user-support"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This component displays the list of saved trips for the logged-in user.
 */
const SavedTripList = ({
  trips
}) => {
  // TODO: Improve navigation.
  const accountLink = /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement(_linkButton.default, {
    to: "/account"
  }, "Back to My Account"));

  let content;

  if (!trips || trips.length === 0) {
    content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, accountLink, /*#__PURE__*/_react.default.createElement("h1", null, "You have no saved trips"), /*#__PURE__*/_react.default.createElement("p", null, "Perform a trip search from the map first."));
  } else {
    // Stack the saved trip summaries. When the user clicks on one, they can edit that trip.
    content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, accountLink, /*#__PURE__*/_react.default.createElement("h1", null, "My saved trips"), trips.map((trip, index) => /*#__PURE__*/_react.default.createElement(ConnectedTripListItem, {
      key: index,
      trip: trip
    })));
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "otp"
  }, /*#__PURE__*/_react.default.createElement(_desktopNav.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "container"
  }, content));
}; // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  return {
    trips: state.user.loggedInUserMonitoredTrips
  };
};

const mapDispatchToProps = {};

var _default = (0, _withLoggedInUserSupport.default)((0, _useAuth0Hooks.withLoginRequired)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SavedTripList)), true);
/**
 * This class manages events and rendering for one item in the saved trip list.
 */


exports.default = _default;

class TripListItem extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_handleEditTrip", () => {
      const {
        routeTo,
        trip
      } = this.props;
      routeTo(`/savedtrips/${trip.id}`);
    });

    _defineProperty(this, "_handlePauseOrResumeMonitoring", () => {
      const {
        createOrUpdateUserMonitoredTrip,
        trip
      } = this.props;
      const newTrip = (0, _clone.default)(trip);
      newTrip.isActive = !newTrip.isActive; // Silent update of existing trip.

      createOrUpdateUserMonitoredTrip(newTrip, false, true);
    });

    _defineProperty(this, "_handleDeleteTrip", async () => {
      if (confirm('Would you like to remove this trip?')) {
        const {
          deleteUserMonitoredTrip,
          trip
        } = this.props;
        await deleteUserMonitoredTrip(trip.id);
      }
    });
  }

  render() {
    const {
      trip
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Panel, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Panel.Heading, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Panel.Title, {
      componentClass: "h3"
    }, trip.tripName)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Panel.Body, null, /*#__PURE__*/_react.default.createElement(_tripSummaryPane.default, {
      monitoredTrip: trip
    }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonGroup, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsSize: "small",
      onClick: this._handlePauseOrResumeMonitoring
    }, trip.isActive ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Glyphicon, {
      glyph: "pause"
    }), " Pause") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Glyphicon, {
      glyph: "play"
    }), " Resume")), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsSize: "small",
      onClick: this._handleEditTrip
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Glyphicon, {
      glyph: "pencil"
    }), " Edit"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsSize: "small",
      onClick: this._handleDeleteTrip
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Glyphicon, {
      glyph: "trash"
    }), " Delete"))));
  }

} // connect to the redux store


const itemMapStateToProps = () => {};

const itemMapDispatchToProps = {
  createOrUpdateUserMonitoredTrip: userActions.createOrUpdateUserMonitoredTrip,
  deleteUserMonitoredTrip: userActions.deleteUserMonitoredTrip,
  routeTo: uiActions.routeTo
};
const ConnectedTripListItem = (0, _reactRedux.connect)(itemMapStateToProps, itemMapDispatchToProps)(TripListItem);
module.exports = exports.default;

//# sourceMappingURL=saved-trip-list.js