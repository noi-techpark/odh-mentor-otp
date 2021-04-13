"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _viewStopButton = _interopRequireDefault(require("./view-stop-button"));

var _ui = require("../../actions/ui");

var _api = require("../../actions/api");

var _map = require("../../actions/map");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TripViewer extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_backClicked", () => {
      this.props.setViewedTrip(null);
    });
  }

  componentDidMount() {
    const {
      findTrip,
      viewedTrip
    } = this.props;
    const {
      tripId
    } = viewedTrip;
    findTrip({
      tripId
    });
  }

  render() {
    const {
      hideBackButton,
      languageConfig,
      timeFormat,
      tripData,
      viewedTrip
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-viewer"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-viewer-header"
    }, !hideBackButton && /*#__PURE__*/_react.default.createElement("div", {
      className: "back-button-container"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsSize: "small",
      onClick: this._backClicked
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "arrow-left"
    }), "Back")), /*#__PURE__*/_react.default.createElement("div", {
      className: "header-text"
    }, languageConfig.tripViewer || 'Trip Viewer'), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        clear: 'both'
      }
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-viewer-body"
    }, tripData && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "Route: ", /*#__PURE__*/_react.default.createElement("b", null, tripData.route.shortName), " ", tripData.route.longName), /*#__PURE__*/_react.default.createElement("h4", null, tripData.wheelchairAccessible === 1 && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Label, {
      bsStyle: "primary"
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "wheelchair-alt"
    }), " Accessible"), ' ', tripData.bikesAllowed === 1 && /*#__PURE__*/_react.default.createElement(_reactBootstrap.Label, {
      bsStyle: "success"
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "bicycle"
    }), " Allowed"))), tripData && tripData.stops && tripData.stopTimes && tripData.stops.map((stop, i) => {
      // determine whether to use special styling for first/last stop
      let stripMapLineClass = 'strip-map-line';
      if (i === 0) stripMapLineClass = 'strip-map-line-first';else if (i === tripData.stops.length - 1) stripMapLineClass = 'strip-map-line-last'; // determine whether to show highlight in strip map

      let highlightClass;
      if (i === viewedTrip.fromIndex) highlightClass = 'strip-map-highlight-first';else if (i > viewedTrip.fromIndex && i < viewedTrip.toIndex) highlightClass = 'strip-map-highlight';else if (i === viewedTrip.toIndex) highlightClass = 'strip-map-highlight-last';
      return /*#__PURE__*/_react.default.createElement("div", {
        key: i
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-time"
      }, _src.default.time.formatSecondsAfterMidnight(tripData.stopTimes[i].scheduledDeparture, timeFormat)), /*#__PURE__*/_react.default.createElement("div", {
        className: "strip-map-container"
      }, highlightClass && /*#__PURE__*/_react.default.createElement("div", {
        className: highlightClass
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: stripMapLineClass
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "strip-map-icon"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "circle"
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-button-container"
      }, /*#__PURE__*/_react.default.createElement(_viewStopButton.default, {
        stopId: stop.id,
        text: "View"
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "stop-name"
      }, stop.name), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          clear: 'both'
        }
      }));
    })));
  }

}

_defineProperty(TripViewer, "propTypes", {
  hideBackButton: _propTypes.default.bool,
  tripData: _propTypes.default.object,
  viewedTrip: _propTypes.default.object
});

const mapStateToProps = (state, ownProps) => {
  const viewedTrip = state.otp.ui.viewedTrip;
  return {
    languageConfig: state.otp.config.language,
    timeFormat: _src.default.time.getTimeFormat(state.otp.config),
    tripData: state.otp.transitIndex.trips[viewedTrip.tripId],
    viewedTrip
  };
};

const mapDispatchToProps = {
  setViewedTrip: _ui.setViewedTrip,
  findTrip: _api.findTrip,
  setLocation: _map.setLocation
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TripViewer);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trip-viewer.js