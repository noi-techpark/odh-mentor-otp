"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NarrativeItinerary extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onHeaderClick", () => {
      const {
        active,
        index,
        onClick,
        setActiveItinerary
      } = this.props;

      if (onClick) {
        onClick();
      } else if (!active) {
        setActiveItinerary && setActiveItinerary({
          index
        });
      } else {
        setActiveItinerary && setActiveItinerary({
          index: null
        });
      }
    });
  }

  render() {
    throw new Error('render() called on abstract class NarrativeItinerary');
  }

}

exports.default = NarrativeItinerary;

_defineProperty(NarrativeItinerary, "propTypes", {
  active: _propTypes.default.bool,
  activeLeg: _propTypes.default.number,
  activeStep: _propTypes.default.number,
  expanded: _propTypes.default.bool,
  index: _propTypes.default.number,
  itinerary: _propTypes.default.object,
  onClick: _propTypes.default.func,
  routingType: _propTypes.default.string,
  setActiveItinerary: _propTypes.default.func,
  setActiveLeg: _propTypes.default.func,
  setActiveStep: _propTypes.default.func,
  setVisibleItinerary: _propTypes.default.func
});

module.exports = exports.default;

//# sourceMappingURL=narrative-itinerary.js