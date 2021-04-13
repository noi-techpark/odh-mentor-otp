"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LineColumnContent;

var _src = _interopRequireDefault(require("../../../core-utils/src"));

var _src2 = _interopRequireDefault(require("../../../location-icon/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _faSolid = require("styled-icons/fa-solid");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cssWalk = (0, _styledComponents.css)`
  background: radial-gradient(ellipse at center, #87cefa 40%, transparent 10%);
  background-position: center -5px;
  background-repeat: repeat-y;
  background-size: 12px 12px;
  left: 6px;
  right: 6px;
`;
const cssBicycle = (0, _styledComponents.css)`
  background: repeating-linear-gradient(
    0deg,
    red,
    red 8px,
    white 8px,
    white 12.5px
  );
  left: 7.5px;
  right: 7.5px;
`;
const cssCar = (0, _styledComponents.css)`
  background: repeating-linear-gradient(
    0deg,
    grey,
    grey 8px,
    white 8px,
    white 12.5px
  );
  left: 7.5px;
  right: 7.5px;
`;
const cssMicromobility = (0, _styledComponents.css)`
  background: repeating-linear-gradient(
    0deg,
    #f5a729,
    #f5a729 8px,
    white 8px,
    white 12.5px
  );
  left: 7.5px;
  right: 7.5px;
`;
const cssTransit = (0, _styledComponents.css)`
  background-color: gray;
  left: 5px;
  right: 5px;
`;

function getLegCSS(mode) {
  switch (mode) {
    case "WALK":
      return cssWalk;

    case "BICYCLE":
    case "BICYCLE_RENT":
      return cssBicycle;

    case "CAR":
      return cssCar;

    case "MICROMOBILITY":
    case "MICROMOBILITY_RENT":
      return cssMicromobility;

    default:
      return cssTransit;
  }
}

const IconStacker = _styledComponents.default.span`
  position: absolute;
  width: 100%;
  top: 3px;
  z-index: 20;
`;
const LegLine = _styledComponents.default.div`
  ${props => getLegCSS(props.mode)}
  background-color: ${props => _src.default.itinerary.isTransit(props.mode) ? props.routeColor ? `#${props.routeColor}` : "#008" : undefined};
  bottom: -11px;
  position: absolute;
  top: 11px;
  z-index: 10;
`;
const StackedCircle = (0, _styledComponents.default)(_faSolid.Circle)`
  left: 0;
  line-height: inherit;
  position: absolute;
  text-align: center;
  width: 100%;
`;
const StackedCircleInner = (0, _styledComponents.default)(StackedCircle)`
  top: 3px;
`;
const StyledLocationIcon = (0, _styledComponents.default)(_src2.default)`
  left: 0;
  position: absolute;
  text-align: center;
  width: 100%;
`;

function LineColumnContent({
  interline,
  isDestination,
  lastLeg,
  leg,
  legIndex
}) {
  let legBadge;

  if (interline) {// Interlined. Don't create a leg badge as a stop marker should be inserted
    // from the place name
  } else if (isDestination) {
    // Desitination
    legBadge = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(StackedCircleInner, {
      size: 14,
      color: "white"
    }), /*#__PURE__*/_react.default.createElement(StyledLocationIcon, {
      size: 20,
      type: "to"
    }));
  } else if (legIndex === 0) {
    // Origin
    legBadge = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(StackedCircleInner, {
      size: 14,
      color: "white"
    }), /*#__PURE__*/_react.default.createElement(StyledLocationIcon, {
      size: 20,
      type: "from"
    }));
  } else if (leg.from.bikeShareId || lastLeg.from.bikeShareId && leg.mode === "WALK") {
    // start or end of a bike rental leg (not including origin or
    // destination)
    legBadge = /*#__PURE__*/_react.default.createElement(StackedCircle, {
      size: 17,
      color: "red"
    });
  } else if (leg.from.vertexType === "VEHICLERENTAL" || lastLeg.from.vertexType === "VEHICLERENTAL" && leg.mode === "WALK") {
    // start or end of a vehicle rental leg (not including origin or
    // destination)
    legBadge = /*#__PURE__*/_react.default.createElement(StackedCircle, {
      size: 17,
      color: "#f5a729"
    });
  } else if (leg.mode === "CAR" && lastLeg.mode === "WALK" || lastLeg.mode === "CAR" && leg.mode === "WALK") {
    // start or end of a car rental/TNC/P&R leg (not including origin or
    // destination)
    legBadge = /*#__PURE__*/_react.default.createElement(StackedCircle, {
      size: 17,
      color: "#888"
    });
  } else {
    legBadge = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(StackedCircle, {
      size: 20,
      color: "black"
    }), /*#__PURE__*/_react.default.createElement(StackedCircleInner, {
      size: 14,
      color: "white"
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !isDestination && /*#__PURE__*/_react.default.createElement(LegLine, {
    mode: leg.mode,
    routeColor: leg.routeColor
  }), /*#__PURE__*/_react.default.createElement(IconStacker, null, legBadge));
}

LineColumnContent.propTypes = {
  /** whether this leg is an interlined-transit leg */
  interline: _propTypes.default.bool.isRequired,

  /** whether this place row represents the destination */
  isDestination: _propTypes.default.bool.isRequired,

  /** Contains details about leg object that is being displayed */
  lastLeg: _src.default.types.legType,

  /** Contains details about leg object that is being displayed */
  leg: _src.default.types.legType.isRequired,

  /** the index of the leg in the itinerary leg list */
  legIndex: _propTypes.default.number.isRequired
};
LineColumnContent.defaultProps = {
  /** can be null if it's the first leg */
  lastLeg: null
};
module.exports = exports.default;

//# sourceMappingURL=line-column-content.js