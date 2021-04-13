"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Styled = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RouteBadge = ({
  color,
  abbreviation,
  name
}) => {
  return /*#__PURE__*/_react.default.createElement(Styled.RouteBadge, {
    routeColor: color
  }, /*#__PURE__*/_react.default.createElement(Styled.SRHidden, null, abbreviation), /*#__PURE__*/_react.default.createElement(Styled.SROnly, null, name));
};

RouteBadge.propTypes = {
  color: _propTypes.default.string,
  abbreviation: _propTypes.default.string,
  name: _propTypes.default.string.isRequired
};
RouteBadge.defaultProps = {
  abbreviation: undefined,
  color: "#084c8d"
};
var _default = RouteBadge;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js