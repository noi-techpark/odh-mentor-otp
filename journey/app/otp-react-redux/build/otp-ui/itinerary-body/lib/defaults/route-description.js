"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RouteDescription;

var _types = require("@opentripplanner/core-utils/lib/types");

var _react = _interopRequireDefault(require("react"));

var Styled = _interopRequireWildcard(require("../styled"));

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

function RouteDescription({
  leg
}) {
  const {
    headsign,
    routeLongName,
    routeShortName
  } = leg;
  return /*#__PURE__*/_react.default.createElement(Styled.LegDescriptionForTransit, null, routeShortName && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Styled.LegDescriptionRouteShortName, null, routeShortName)), /*#__PURE__*/_react.default.createElement(Styled.LegDescriptionRouteLongName, null, routeLongName, headsign && /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(Styled.LegDescriptionHeadsignPrefix, null, " $_to_$ "), headsign)));
}

RouteDescription.propTypes = {
  leg: _types.legType.isRequired
};
module.exports = exports.default;

//# sourceMappingURL=route-description.js