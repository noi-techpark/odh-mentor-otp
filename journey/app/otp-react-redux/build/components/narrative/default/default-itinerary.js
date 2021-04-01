"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireDefault(require("react"));

var _narrativeItinerary = _interopRequireDefault(require("../narrative-itinerary"));

var _connectedItineraryBody = _interopRequireDefault(require("../line-itin/connected-itinerary-body"));

var _itinerarySummary = _interopRequireDefault(require("./itinerary-summary"));

var _simpleRealtimeAnnotation = _interopRequireDefault(require("../simple-realtime-annotation"));

var _state = require("../../../util/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  isBicycle,
  isTransit
} = _coreUtils.default.itinerary;
const {
  formatDuration,
  formatTime
} = _coreUtils.default.time; // FIXME move to core utils

function getItineraryDescription(itinerary) {
  let primaryTransitDuration = 0;
  let mainMode = 'Walk';
  let transitMode;
  itinerary.legs.forEach((leg, i) => {
    const {
      duration,
      mode,
      rentedBike
    } = leg;

    if (isTransit(mode) && duration > primaryTransitDuration) {
      // TODO: convert OTP's TRAM mode to the correct wording for Portland
      primaryTransitDuration = duration;
      transitMode = mode.toLowerCase();
    }

    if (isBicycle(mode)) mainMode = 'Bike';
    if (rentedBike) mainMode = 'Bikeshare';
    if (mode === 'CAR') mainMode = 'Drive';
  });
  let description = mainMode;
  if (transitMode) description += ` $_to_$ ${transitMode}`;
  return description;
}

const ITINERARY_ATTRIBUTES = [{
  alias: 'best',
  id: 'duration',
  order: 0,
  render: (itinerary, options) => formatDuration(itinerary.duration)
}, {
  alias: 'departureTime',
  id: 'arrivalTime',
  order: 1,
  render: (itinerary, options) => {
    if (options.isSelected) {
      if (options.selection === 'ARRIVALTIME') return formatTime(itinerary.endTime, options);else return formatTime(itinerary.startTime, options);
    }

    return /*#__PURE__*/_react.default.createElement("span", null, formatTime(itinerary.startTime, options), "\u2014", formatTime(itinerary.endTime, options));
  }
}, {
  id: 'cost',
  order: 2,
  render: (itinerary, options) => (0, _state.getTotalFareAsString)(itinerary)
}, {
  id: 'walkTime',
  order: 3,
  render: (itinerary, options) => {
    const leg = itinerary.legs[0];
    const {
      LegIcon
    } = options;
    return (
      /*#__PURE__*/
      // FIXME: For CAR mode, walk time considers driving time.
      _react.default.createElement("span", null, formatDuration(itinerary.walkTime), ' ', /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: '20px',
          height: '20px',
          display: 'inline-block',
          paddingLeft: '2px',
          paddingBottom: '6px'
        }
      }, /*#__PURE__*/_react.default.createElement(LegIcon, {
        leg: leg,
        size: 5
      })))
    );
  }
}];

class DefaultItinerary extends _narrativeItinerary.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onMouseEnter", () => {
      const {
        active,
        index,
        setVisibleItinerary,
        visibleItinerary
      } = this.props; // Set this itinerary as visible if not already visible.

      const visibleNotSet = visibleItinerary === null || visibleItinerary === undefined;
      const isVisible = visibleItinerary === index || active === index && visibleNotSet;

      if (typeof setVisibleItinerary === 'function' && !isVisible) {
        setVisibleItinerary({
          index
        });
      }
    });

    _defineProperty(this, "_onMouseLeave", () => {
      const {
        index,
        setVisibleItinerary,
        visibleItinerary
      } = this.props;

      if (typeof setVisibleItinerary === 'function' && visibleItinerary === index) {
        setVisibleItinerary({
          index: null
        });
      }
    });

    _defineProperty(this, "_isSortingOnAttribute", attribute => {
      const {
        sort
      } = this.props;

      if (sort && sort.type) {
        const type = sort.type.toLowerCase();
        return attribute.id.toLowerCase() === type || attribute.alias && attribute.alias.toLowerCase() === type;
      }

      return false;
    });
  }

  render() {
    const {
      active,
      expanded,
      itinerary,
      LegIcon,
      showRealtimeAnnotation,
      timeFormat
    } = this.props;
    const timeOptions = {
      format: timeFormat,
      offset: _coreUtils.default.itinerary.getTimeZoneOffset(itinerary)
    };
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `option default-itin${active ? ' active' : ''}${expanded ? ' expanded' : ''}`,
      role: "presentation" // FIXME: Move style to css
      ,
      style: {
        borderLeft: active && !expanded ? '4px teal solid' : undefined,
        backgroundColor: expanded ? 'white' : undefined
      },
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave
    }, /*#__PURE__*/_react.default.createElement("button", {
      className: "header" // _onHeaderClick comes from super component (NarrativeItinerary).
      ,
      onClick: this._onHeaderClick
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "title"
    }, getItineraryDescription(itinerary)), /*#__PURE__*/_react.default.createElement("ul", {
      className: "list-unstyled itinerary-attributes"
    }, ITINERARY_ATTRIBUTES.sort((a, b) => {
      const aSelected = this._isSortingOnAttribute(a);

      const bSelected = this._isSortingOnAttribute(b);

      if (aSelected) return -1;
      if (bSelected) return 1;else return a.order - b.order;
    }).map(attribute => {
      const isSelected = this._isSortingOnAttribute(attribute);

      const options = attribute.id === 'arrivalTime' ? timeOptions : {};

      if (isSelected) {
        options.isSelected = true;
        options.selection = this.props.sort.type;
      }

      options.LegIcon = LegIcon;
      return /*#__PURE__*/_react.default.createElement("li", {
        key: attribute.id,
        className: `${attribute.id}${isSelected ? ' main' : ''}`
      }, attribute.render(itinerary, options));
    })), /*#__PURE__*/_react.default.createElement(_itinerarySummary.default, {
      itinerary: itinerary,
      LegIcon: LegIcon
    }), active && !expanded && /*#__PURE__*/_react.default.createElement("small", {
      style: {
        clear: 'both',
        textAlign: 'center',
        display: 'block',
        color: 'grey'
      }
    }, "click to view details")), active && expanded && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showRealtimeAnnotation && /*#__PURE__*/_react.default.createElement(_simpleRealtimeAnnotation.default, null), /*#__PURE__*/_react.default.createElement(_connectedItineraryBody.default, {
      timeOptions: timeOptions,
      itinerary: itinerary,
      LegIcon: LegIcon
    })));
  }

}

exports.default = DefaultItinerary;
module.exports = exports.default;

//# sourceMappingURL=default-itinerary.js