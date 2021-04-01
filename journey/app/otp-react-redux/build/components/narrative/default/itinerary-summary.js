"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const modeColors = {
  BICYCLE: '#E0C3E2',
  BUS: '#CAC3DF',
  CAR: '#E4CCCC',
  PARK: '#E4CCCC',
  RAIL: '#BDDAC0',
  WALK: '#DFC486'
};
const DEFAULT_COLOR = 'grey';

function getModeColor(mode) {
  if (!mode) return DEFAULT_COLOR;
  let color = modeColors[mode.toUpperCase()];
  if (typeof color === 'undefined') color = DEFAULT_COLOR;
  return color;
}

class ItinerarySummary extends _react.Component {
  render() {
    const {
      itinerary,
      LegIcon
    } = this.props;
    const blocks = [];
    itinerary.legs.forEach((leg, i) => {
      // Skip mid-itinerary walk transfer legs
      if (i > 0 && i < itinerary.legs.length - 1 && !leg.transitLeg && itinerary.legs[i - 1].transitLeg && itinerary.legs[i + 1].transitLeg) {
        return null;
      } // Add the mode icon


      let title = leg.mode;

      if (leg.transitLeg) {
        title = leg.routeShortName ? `${leg.routeShortName}${leg.routeLongName ? ` - ${leg.routeLongName}` : ''}` : leg.routeLongName;
      }

      const style = {
        margin: '0px',
        padding: '3px',
        height: '24px',
        width: '24px',
        backgroundColor: getModeColor(leg.mode)
      };

      if (i === 0) {
        style.borderTopLeftRadius = '4px';
        style.borderBottomLeftRadius = '4px';
      }

      if (i === itinerary.legs.length - 1) {
        style.borderTopRightRadius = '4px';
        style.borderBottomRightRadius = '4px';
      }

      blocks.push( /*#__PURE__*/_react.default.createElement("div", {
        style: style,
        title: title,
        key: blocks.length,
        className: "summary-block mode-block"
      }, /*#__PURE__*/_react.default.createElement(LegIcon, {
        leg: leg
      })));
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "summary"
    }, blocks);
  }

}

exports.default = ItinerarySummary;

_defineProperty(ItinerarySummary, "propTypes", {
  itinerary: _propTypes.default.object,
  LegIcon: _propTypes.default.elementType.isRequired
});

module.exports = exports.default;

//# sourceMappingURL=itinerary-summary.js