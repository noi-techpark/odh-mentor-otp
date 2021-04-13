"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AccessLeg;

var _itinerary = require("../../core-utils/src/itinerary");

var _types = require("../../core-utils/src/types");

var _humanizeDistance = require("../../humanize-distance");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function AccessLeg({
  config,
  leg,
  LegIcon
}) {
  return /*#__PURE__*/_react.default.createElement(Styled.Leg, null, /*#__PURE__*/_react.default.createElement(Styled.ModeIcon, null, /*#__PURE__*/_react.default.createElement(LegIcon, {
    leg: leg
  })), /*#__PURE__*/_react.default.createElement(Styled.LegBody, null, /*#__PURE__*/_react.default.createElement(Styled.LegHeader, null, /*#__PURE__*/_react.default.createElement("b", null, (0, _itinerary.getLegModeLabel)(leg)), " ", leg.distance > 0 && /*#__PURE__*/_react.default.createElement("span", null, " ", (0, _humanizeDistance.humanizeDistanceString)(leg.distance)), " $_to_$ ", /*#__PURE__*/_react.default.createElement("b", null, (0, _itinerary.getPlaceName)(leg.to, config.companies))), !leg.hailedCar && /*#__PURE__*/_react.default.createElement(Styled.LegDetails, null, leg.steps.map((step, k) => {
    return /*#__PURE__*/_react.default.createElement(Styled.LegDetail, {
      key: k
    }, (0, _itinerary.getStepDirection)(step), " $_on_$ ", /*#__PURE__*/_react.default.createElement("b", null, (0, _itinerary.getStepStreetName)(step)));
  }))));
}

AccessLeg.propTypes = {
  config: _types.configType.isRequired,
  leg: _types.legType.isRequired,
  LegIcon: _propTypes.default.elementType.isRequired
};
module.exports = exports.default;

//# sourceMappingURL=access-leg.js