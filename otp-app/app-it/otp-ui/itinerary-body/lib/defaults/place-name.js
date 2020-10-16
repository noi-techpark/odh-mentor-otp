"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PlaceName;

var _types = require("@opentripplanner/core-utils/lib/types");

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var Styled = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PlaceName({
  config,
  interline,
  place
}) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, interline ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Resta a bordo a ", /*#__PURE__*/_react.default.createElement("b", null, place.name)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (0, _itinerary.getPlaceName)(place, config.companies)), place.stopId && !interline && /*#__PURE__*/_react.default.createElement(Styled.StopIdSpan, null, "ID ", place.stopId.split(":")[1])
  /*
  TODO: There is no explicit stop button on the mocks.
  Have a question out to marketing as to whether the above StopID
  is a button to navigate the user to the arrival list for the stop
  Thats what the button below does
  */

  /* <ViewStopButton stopId={place.stopId} /> */
  );
}

PlaceName.propTypes = {
  config: _types.configType.isRequired,
  interline: _propTypes.default.bool,
  place: _types.placeType.isRequired
};
PlaceName.defaultProps = {
  interline: false
};