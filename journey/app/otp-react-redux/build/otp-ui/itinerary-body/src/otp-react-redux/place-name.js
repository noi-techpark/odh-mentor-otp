"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlaceName;

var _types = require("@opentripplanner/core-utils/lib/types");

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PlaceName({
  config,
  interline,
  place
}) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, interline ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Stay on Board at ", /*#__PURE__*/_react.default.createElement("b", null, place.name)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (0, _itinerary.getPlaceName)(place, config.companies)));
}

PlaceName.propTypes = {
  config: _types.configType.isRequired,
  interline: _propTypes.default.bool,
  place: _types.placeType.isRequired
};
PlaceName.defaultProps = {
  interline: false
};
module.exports = exports.default;

//# sourceMappingURL=place-name.js