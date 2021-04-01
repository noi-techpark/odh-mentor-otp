"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _accessLeg = _interopRequireDefault(require("./access-leg"));

var _transitLeg = _interopRequireDefault(require("./transit-leg"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ItineraryDetails extends _react.Component {
  render() {
    const {
      itinerary,
      activeLeg,
      activeStep,
      LegIcon,
      setActiveLeg,
      setActiveStep
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "detail"
    }, itinerary.legs.map((leg, index) => {
      const legIsActive = activeLeg === index;
      return _coreUtils.default.itinerary.isTransit(leg.mode) ? /*#__PURE__*/_react.default.createElement(_transitLeg.default, {
        active: legIsActive,
        index: index,
        key: index,
        leg: leg,
        LegIcon: LegIcon,
        setActiveLeg: setActiveLeg
      }) : /*#__PURE__*/_react.default.createElement(_accessLeg.default, {
        active: legIsActive,
        activeStep: activeStep,
        index: index,
        key: index,
        leg: leg,
        setActiveLeg: setActiveLeg,
        setActiveStep: setActiveStep
      });
    }));
  }

}

exports.default = ItineraryDetails;

_defineProperty(ItineraryDetails, "propTypes", {
  itinerary: _propTypes.default.object,
  LegIcon: _propTypes.default.elementType.isRequired
});

module.exports = exports.default;

//# sourceMappingURL=itinerary-details.js