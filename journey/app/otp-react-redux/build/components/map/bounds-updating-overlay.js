"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _leaflet = _interopRequireDefault(require("leaflet"));

var _reactLeaflet = require("react-leaflet");

var _reactRedux = require("react-redux");

var _itinerary = require("../../util/itinerary");

var _state = require("../../util/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Utility to extend input Leaflet bounds to include the list of places.
 */
function extendBoundsByPlaces(bounds, places = []) {
  places.filter(place => place).forEach(place => {
    const coords = [place.lat, place.lon];
    if (_src.default.map.isValidLatLng(coords)) bounds.extend(coords);
  });
}
/**
 * This MapLayer component will automatically update the leaflet bounds
 * depending on what data is in the redux store. This component does not
 * "render" anything on the map.
 */


class BoundsUpdatingOverlay extends _reactLeaflet.MapLayer {
  createLeafletElement() {}

  updateLeafletElement() {}

  componentDidMount() {
    this.updateBounds(null, this.props);
  }

  componentDidUpdate(prevProps) {
    this.updateBounds(prevProps, this.props);
  }

  componentWillUnmount() {}
  /* eslint-disable-next-line complexity */


  updateBounds(oldProps, newProps) {
    // TODO: maybe setting bounds ought to be handled in map props...
    oldProps = oldProps || {};
    newProps = newProps || {}; // Don't auto-fit if popup us active

    if (oldProps.popupLocation || newProps.popupLocation) return;
    const {
      map
    } = newProps.leaflet;
    if (!map) return;
    const padding = [30, 30]; // Fit map to to entire itinerary if active itinerary bounds changed

    const newFrom = newProps.query && newProps.query.from;
    const newItinBounds = newProps.itinerary && (0, _itinerary.getLeafletItineraryBounds)(newProps.itinerary);
    const newTo = newProps.query && newProps.query.to;
    const oldFrom = oldProps.query && oldProps.query.from;
    const oldItinBounds = oldProps.itinerary && (0, _itinerary.getLeafletItineraryBounds)(oldProps.itinerary);
    const oldTo = oldProps.query && oldProps.query.to;
    const fromChanged = !(0, _lodash.default)(oldFrom, newFrom);
    const toChanged = !(0, _lodash.default)(oldTo, newTo);
    const oldIntermediate = oldProps.query && oldProps.query.intermediatePlaces;
    const newIntermediate = newProps.query && newProps.query.intermediatePlaces;
    const intermediateChanged = !(0, _lodash.default)(oldIntermediate, newIntermediate);

    if (!oldItinBounds && newItinBounds || oldItinBounds && newItinBounds && !oldItinBounds.equals(newItinBounds)) {
      map.fitBounds(newItinBounds, {
        padding
      }); // Pan to to itinerary leg if made active (clicked); newly active leg must be non-null
    } else if (newProps.itinerary && newProps.activeLeg !== oldProps.activeLeg && newProps.activeLeg !== null) {
      map.fitBounds((0, _itinerary.getLeafletLegBounds)(newProps.itinerary.legs[newProps.activeLeg]), {
        padding
      }); // If no itinerary update but from/to locations are present, fit to those
    } else if (newFrom && newTo && (fromChanged || toChanged)) {
      // On certain mobile devices (e.g., Android + Chrome), setting from and to
      // locations via the location search component causes issues for this
      // fitBounds invocation. The map does not appear to be visible when these
      // prop changes are detected, so for now we should perhaps just skip this
      // fitBounds on mobile.
      // See https://github.com/opentripplanner/otp-react-redux/issues/133 for
      // more info.
      // TODO: Fix this so mobile devices will also update the bounds to the
      // from/to locations.
      if (!_src.default.ui.isMobile()) {
        const bounds = _leaflet.default.bounds([[newFrom.lat, newFrom.lon], [newTo.lat, newTo.lon]]); // Ensure bounds extend to include intermediatePlaces


        extendBoundsByPlaces(bounds, newIntermediate);
        const {
          x: left,
          y: bottom
        } = bounds.getBottomLeft();
        const {
          x: right,
          y: top
        } = bounds.getTopRight();
        map.fitBounds([[left, bottom], [right, top]], {
          padding
        });
      } // If only from or to is set, pan to that

    } else if (newFrom && fromChanged) {
      map.panTo([newFrom.lat, newFrom.lon]);
    } else if (newTo && toChanged) {
      map.panTo([newTo.lat, newTo.lon]); // If intermediate place is added, extend bounds.
    } else if (newIntermediate && intermediateChanged) {
      const bounds = map.getBounds();
      extendBoundsByPlaces(bounds, newIntermediate);
      map.fitBounds(bounds); // Pan to to itinerary step if made active (clicked)
    } else if (newProps.itinerary && newProps.activeLeg !== null && newProps.activeStep !== null && newProps.activeStep !== oldProps.activeStep) {
      const leg = newProps.itinerary.legs[newProps.activeLeg];
      const step = leg.steps[newProps.activeStep];
      map.panTo([step.lat, step.lon]);
    }
  }

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  const activeSearch = (0, _state.getActiveSearch)(state.otp);
  return {
    activeLeg: activeSearch && activeSearch.activeLeg,
    activeStep: activeSearch && activeSearch.activeStep,
    itinerary: (0, _state.getActiveItinerary)(state.otp),
    popupLocation: state.otp.ui.mapPopupLocation,
    query: state.otp.currentQuery
  };
};

const mapDispatchToProps = {};

var _default = (0, _reactLeaflet.withLeaflet)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BoundsUpdatingOverlay));

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=bounds-updating-overlay.js