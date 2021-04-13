"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _d3Selection = require("d3-selection");

var _d3Zoom = require("d3-zoom");

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _transitiveJs = _interopRequireDefault(require("transitive-js"));

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STYLES = {};
STYLES.places = {
  display: function (display, place) {
    if (place.getId() !== 'from' && place.getId() !== 'to' && !_src.default.map.isBikeshareStation(place)) {
      return 'none';
    }
  },
  fill: '#fff',
  stroke: '#000',
  'stroke-width': 2,
  r: 8
};
STYLES.stops_merged = {
  r: function (display, data, index, utils) {
    return 6;
  }
};

class StylizedMap extends _react.Component {
  componentDidMount() {
    const el = document.getElementById('trn-canvas');
    this._transitive = new _transitiveJs.default({
      el,
      display: 'svg',
      styles: STYLES,
      gridCellSize: 200,
      zoomFactors: [{
        minScale: 0,
        gridCellSize: 300,
        internalVertexFactor: 1000000,
        angleConstraint: 45,
        mergeVertexThreshold: 200
      }]
    });

    this._transitive.render();

    (0, _d3Selection.select)(el).call((0, _d3Zoom.zoom)().scaleExtent([1 / 2, 4]).on('zoom', () => {
      this._transitive.setTransform(_d3Selection.event.transform);
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.transitiveData !== this.props.transitiveData) {
      this._transitive.updateData(this.props.transitiveData, true);

      this._transitive.render();
    }

    if ( // this block only applies for profile trips where active option changed
    this.props.routingType === 'PROFILE' && prevProps.activeItinerary !== this.props.activeItinerary) {
      if (this.props.activeItinerary == null) {
        // no option selected; clear focus
        this._transitive.focusJourney(null);

        this._transitive.render();
      } else if (this.props.transitiveData) {
        this._transitive.focusJourney(this.props.transitiveData.journeys[this.props.activeItinerary].journey_id);

        this._transitive.render();
      }
    }
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      id: "trn-canvas",
      style: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    });
  }

} // connect to the redux store


_defineProperty(StylizedMap, "propTypes", {
  activeItinerary: _propTypes.default.number,
  routingType: _propTypes.default.string,
  toggleLabel: _propTypes.default.element,
  transitiveData: _propTypes.default.object
});

_defineProperty(StylizedMap, "defaultProps", {
  toggleName: 'Stylized'
});

const mapStateToProps = (state, ownProps) => {
  const activeSearch = (0, _state.getActiveSearch)(state.otp);
  let transitiveData = null;

  if (activeSearch && activeSearch.query.routingType === 'ITINERARY' && activeSearch.response && activeSearch.response.plan) {
    const itins = (0, _state.getActiveItineraries)(state.otp);
    const visibleItinerary = itins[activeSearch.activeItinerary];
    if (visibleItinerary) transitiveData = _src.default.map.itineraryToTransitive(visibleItinerary);
  } else if (activeSearch && activeSearch.response && activeSearch.response.otp) {
    transitiveData = activeSearch.response.otp;
  }

  return {
    transitiveData,
    activeItinerary: activeSearch && activeSearch.activeItinerary,
    routingType: activeSearch && activeSearch.query && activeSearch.query.routingType
  };
};

const mapDispatchToProps = {};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(StylizedMap);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=stylized-map.js