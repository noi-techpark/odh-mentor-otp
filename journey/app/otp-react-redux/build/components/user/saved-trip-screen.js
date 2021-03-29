"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _useAuth0Hooks = require("use-auth0-hooks");

var uiActions = _interopRequireWildcard(require("../../actions/ui"));

var userActions = _interopRequireWildcard(require("../../actions/user"));

var _desktopNav = _interopRequireDefault(require("../app/desktop-nav"));

var _savedTripEditor = _interopRequireDefault(require("./saved-trip-editor"));

var _tripBasicsPane = _interopRequireDefault(require("./trip-basics-pane"));

var _tripNotificationsPane = _interopRequireDefault(require("./trip-notifications-pane"));

var _tripSummaryPane = _interopRequireDefault(require("./trip-summary-pane"));

var _monitoredTrip2 = require("../../util/monitored-trip");

var _state = require("../../util/state");

var _withLoggedInUserSupport = _interopRequireDefault(require("./with-logged-in-user-support"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Initializes a monitored trip object from the given query.
 */
function createMonitoredTrip(loggedInUser, queryParams, itinerary) {
  return { ...(0, _monitoredTrip2.arrayToDayFields)(_monitoredTrip2.WEEKDAYS),
    excludeFederalHolidays: true,
    isActive: true,
    itinerary,
    leadTimeInMinutes: 30,
    queryParams,
    tripName: '',
    // FIXME: Handle populating/checking userID from middleware too,
    // so that providing this field is no longer needed.
    userId: loggedInUser.id
  };
}
/**
 * Checks that the maximum allowed number of saved trips has not been reached.
 */


function hasMaxTripCount(trips) {
  // TODO: Obtain the maximum number from a query to middleware (it is currently hard coded there too).
  return trips && trips.length >= 5;
}
/**
 * This screen handles saving a trip from an OTP query, or editing an existing saved trip
 * for the currently logged-in user.
 */


class SavedTripScreen extends _react.Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "_updateMonitoredTripState", newMonitoredTrip => {
      const {
        monitoredTrip
      } = this.state;
      this.setState({
        monitoredTrip: { ...monitoredTrip,
          ...newMonitoredTrip
        }
      });
    });

    _defineProperty(this, "_updateMonitoredTrip", async () => {
      const {
        isCreating,
        createOrUpdateUserMonitoredTrip
      } = this.props;
      const {
        monitoredTrip
      } = this.state;
      await createOrUpdateUserMonitoredTrip(monitoredTrip, isCreating);
    });

    _defineProperty(this, "_goToTripPlanner", () => {
      this.props.routeTo('/');
    });

    _defineProperty(this, "_goToSavedTrips", () => {
      this.props.routeTo('/savedtrips');
    });

    _defineProperty(this, "_handleSaveNewTrip", async () => {
      await this._updateMonitoredTrip();

      this._goToTripPlanner();
    });

    _defineProperty(this, "_handleSaveTripEdits", async () => {
      await this._updateMonitoredTrip();

      this._goToSavedTrips();
    });

    _defineProperty(this, "_hookMonitoredTrip", Pane => props => {
      const {
        monitoredTrip
      } = this.state;
      return /*#__PURE__*/_react.default.createElement(Pane, _extends({
        onMonitoredTripChange: this._updateMonitoredTripState,
        monitoredTrip: monitoredTrip
      }, props));
    });

    _defineProperty(this, "_panes", {
      basics: this._hookMonitoredTrip(_tripBasicsPane.default),
      notifications: this._hookMonitoredTrip(_tripNotificationsPane.default),
      summary: this._hookMonitoredTrip(_tripSummaryPane.default)
    });

    _defineProperty(this, "_getTripToEdit", (props, saveState) => {
      let monitoredTrip;

      if (props.isCreating) {
        const {
          itinerary,
          loggedInUser,
          queryParams
        } = props;
        monitoredTrip = createMonitoredTrip(loggedInUser, queryParams, itinerary);
      } else {
        const {
          match,
          monitoredTrips
        } = props;
        const {
          path,
          url
        } = match;

        if (monitoredTrips && path === '/savedtrips/:id') {
          // Trip id is the portion of url after the second (the last) slash.
          const tripId = url.split('/')[2];
          monitoredTrip = monitoredTrips.find(trip => trip.id === tripId);
        } else {
          monitoredTrip = null;
        }
      }

      if (saveState) {
        this.setState({
          monitoredTrip
        });
      }

      return monitoredTrip;
    });

    const _monitoredTrip = this._getTripToEdit(_props);

    this.state = {
      monitoredTrip: _monitoredTrip
    };
  }
  /**
   * Handles editing events on from all panes.
   */


  componentDidMount() {
    const {
      isCreating,
      monitoredTrips
    } = this.props; // There is a middleware limit of 5 saved trips,
    // so if that limit is already reached, alert, then show editing mode.

    if (isCreating && hasMaxTripCount(monitoredTrips)) {
      alert('You already have reached the maximum of five saved trips.\n' + 'Please remove unused trips from your saved trips, and try again.');

      this._goToSavedTrips();
    } // TODO: Update title bar during componentDidMount.

  }
  /**
   * Gets the trip to edit from the props.
   * Optionally saves the state.
   */


  componentDidUpdate(prevProps) {
    // Update the monitored trip from the new props if the url has changed.
    if (prevProps.match.url !== this.props.match.url) {
      this._getTripToEdit(this.props, true);
    }
  }

  render() {
    const {
      isCreating
    } = this.props;
    const {
      monitoredTrip
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "otp"
    }, /*#__PURE__*/_react.default.createElement(_desktopNav.default, null), /*#__PURE__*/_react.default.createElement("form", {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement(_savedTripEditor.default, {
      isCreating: isCreating,
      monitoredTrip: monitoredTrip,
      onCancel: isCreating ? this._goToTripPlanner : this._goToSavedTrips,
      onComplete: isCreating ? this._handleSaveNewTrip : this._handleSaveTripEdits,
      panes: this._panes
    })));
  }

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  const activeSearch = (0, _state.getActiveSearch)(state.otp);
  const activeItinerary = activeSearch && activeSearch.activeItinerary;
  const itineraries = (0, _state.getActiveItineraries)(state.otp) || [];
  return {
    itinerary: itineraries[activeItinerary],
    loggedInUser: state.user.loggedInUser,
    monitoredTrips: state.user.loggedInUserMonitoredTrips,
    queryParams: state.router.location.search
  };
};

const mapDispatchToProps = {
  createOrUpdateUserMonitoredTrip: userActions.createOrUpdateUserMonitoredTrip,
  routeTo: uiActions.routeTo
};

var _default = (0, _withLoggedInUserSupport.default)((0, _useAuth0Hooks.withLoginRequired)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SavedTripScreen)), true);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=saved-trip-screen.js