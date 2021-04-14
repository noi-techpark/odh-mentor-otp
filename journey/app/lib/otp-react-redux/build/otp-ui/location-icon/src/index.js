"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LocationIcon = ({
  className,
  size = 10,
  title,
  type
}) => {
  switch (type) {
    case "from":
      return /*#__PURE__*/_react.default.createElement(Styled.FromIcon, {
        className: className,
        size: size,
        title: title || "From Location Icon"
      });

    case "to":
      return /*#__PURE__*/_react.default.createElement(Styled.ToIcon, {
        className: className,
        size: size,
        title: title || "To Location Icon"
      });

    default:
      throw new Error("invalid type");
  }
};

LocationIcon.propTypes = {
  className: _propTypes.default.string,

  /**
   * Can be either a number or a string.
   * See https://github.com/jacobwgillespie/styled-icons#props
   */
  size: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Title as used by styled-icons. If left blank defaults to either
   * `From Location Icon` or `To Location Icon`.
   * See https://github.com/jacobwgillespie/styled-icons#props
   */
  title: _propTypes.default.string,

  /**
   * Either `from` or `to`
   */
  type: _propTypes.default.oneOf(["from", "to"]).isRequired
};
var _default = LocationIcon;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js