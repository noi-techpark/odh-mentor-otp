"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../../../otp-ui/core-utils/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _icon = _interopRequireDefault(require("../icon"));

var _viewTripButton = _interopRequireDefault(require("../../viewers/view-trip-button"));

var _viewStopButton = _interopRequireDefault(require("../../viewers/view-stop-button"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  getMapColor
} = _src.default.itinerary;
const {
  formatDuration,
  formatTime
} = _src.default.time;

class TransitLeg extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onClick", () => {
      this.setState({
        expanded: !this.state.expanded
      });
    });

    this.state = {
      expanded: false
    };
  }

  _onLegClick(e, leg, index) {
    if (this.props.active) {
      this.props.setActiveLeg(null);
    } else {
      this.props.setActiveLeg(index, leg);
    }
  }

  render() {
    const {
      active,
      index,
      leg,
      LegIcon
    } = this.props;
    const {
      expanded
    } = this.state;
    const numStops = leg.to.stopIndex - leg.from.stopIndex - 1;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `leg${active ? ' active' : ''} transit-leg`
    }, /*#__PURE__*/_react.default.createElement("button", {
      className: `header`,
      onClick: e => this._onLegClick(e, leg, index)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "mode-icon-container"
    }, /*#__PURE__*/_react.default.createElement(LegIcon, {
      leg: leg
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "route-name"
    }, /*#__PURE__*/_react.default.createElement("div", null, leg.routeShortName && /*#__PURE__*/_react.default.createElement("span", {
      className: "route-short-name"
    }, leg.routeShortName), leg.routeLongName && /*#__PURE__*/_react.default.createElement("span", {
      className: "route-long-name"
    }, leg.routeLongName)), leg.headsign && /*#__PURE__*/_react.default.createElement("div", {
      className: "headsign"
    }, "To ", leg.headsign)), leg.realTime ? /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "rss"
    }) : null), /*#__PURE__*/_react.default.createElement("div", {
      className: "step-by-step"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "transit-leg-body"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "from-row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "time-cell"
    }, formatTime(leg.startTime)), /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-line-cell"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-line-top",
      style: {
        backgroundColor: getMapColor(leg.mode)
      }
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "stop-bubble"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "stop-name-cell"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        float: 'right'
      }
    }, /*#__PURE__*/_react.default.createElement(_viewStopButton.default, {
      stopId: leg.from.stopId
    })), formatLocation(leg.from.name))), /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-details-row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "time-cell"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-line-cell"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-line-middle",
      style: {
        backgroundColor: getMapColor(leg.mode)
      }
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-details-cell"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "intermediate-stops"
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        float: 'right'
      }
    }, /*#__PURE__*/_react.default.createElement(_viewTripButton.default, {
      tripId: leg.tripId,
      fromIndex: leg.from.stopIndex,
      toIndex: leg.to.stopIndex
    })), /*#__PURE__*/_react.default.createElement("button", {
      className: "clear-button-formatting",
      onClick: this._onClick
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: `caret-${expanded ? 'down' : 'right'}`
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "transit-duration"
    }, formatDuration(leg.duration)), ' ', "(", numStops ? `${numStops} stops` : 'non-stop', ")"), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        clear: 'both'
      }
    })), expanded && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "stop-list"
    }, leg.intermediateStops.map((s, i) => /*#__PURE__*/_react.default.createElement("div", {
      key: i,
      className: "stop-item item"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-line-stop",
      style: {
        backgroundColor: getMapColor(leg.mode)
      }
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "stop-name"
    }, formatLocation(s.name))))))), leg.alerts && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "item"
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "exclamation-circle"
    }), " Information"), expanded && /*#__PURE__*/_react.default.createElement("div", null, leg.alerts.map((alert, i) => /*#__PURE__*/_react.default.createElement("div", {
      className: "alert-item item",
      key: i
    }, alert.alertDescriptionText, ' ', alert.alertUrl ? /*#__PURE__*/_react.default.createElement("a", {
      target: "_blank",
      href: alert.alertUrl
    }, "more info") : null)))), /*#__PURE__*/_react.default.createElement("div", {
      className: "item info-item"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "agency-info"
    }, "$_service_$ ", /*#__PURE__*/_react.default.createElement("a", {
      href: leg.agencyUrl
    }, leg.agencyName))))), /*#__PURE__*/_react.default.createElement("div", {
      className: "to-row"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "time-cell"
    }, formatTime(leg.endTime)), /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-line-cell"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-line-bottom",
      style: {
        backgroundColor: getMapColor(leg.mode)
      }
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "stop-bubble"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "stop-name-cell"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        float: 'right'
      }
    }, /*#__PURE__*/_react.default.createElement(_viewStopButton.default, {
      stopId: leg.to.stopId
    })), formatLocation(leg.to.name))))));
  }

}

exports.default = TransitLeg;

_defineProperty(TransitLeg, "propTypes", {
  itinerary: _propTypes.default.object,
  LegIcon: _propTypes.default.elementType.isRequired
});

function formatLocation(str) {
  return str.trim().toLowerCase().replace('/', ' / ').replace('-', ' - ').replace('@', ' @ ').replace('(', '( ').replace('  ', ' ').split(' ').map(s => {
    if (['ne', 'sw', 'nw', 'se'].includes(s)) return s.toUpperCase();
    return capitalizeFirst(s);
  }).join(' ').replace('( ', '(');
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = exports.default;

//# sourceMappingURL=transit-leg.js