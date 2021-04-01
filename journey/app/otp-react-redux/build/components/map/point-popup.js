"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MapPopup;

var _react = _interopRequireDefault(require("react"));

var _fromToLocationPicker = _interopRequireDefault(require("@opentripplanner/from-to-location-picker"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PopupContainer = _styledComponents.default.div`
  width: 240px;
`;
const PopupTitle = _styledComponents.default.div`
  font-size: 14px;
  margin-bottom: 6px;
`;

function MapPopup({
  mapPopupLocation,
  onSetLocationFromPopup
}) {
  return /*#__PURE__*/_react.default.createElement(PopupContainer, null, /*#__PURE__*/_react.default.createElement(PopupTitle, null, mapPopupLocation.name.split(',').length > 3 ? mapPopupLocation.name.split(',').splice(0, 3).join(',') : mapPopupLocation.name), /*#__PURE__*/_react.default.createElement("div", null, "$_travel_$", /*#__PURE__*/_react.default.createElement(_fromToLocationPicker.default, {
    location: mapPopupLocation,
    setLocation: onSetLocationFromPopup
  })));
}

module.exports = exports.default;

//# sourceMappingURL=point-popup.js