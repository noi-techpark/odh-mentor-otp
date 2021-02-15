"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeocodedOptionIcon = GeocodedOptionIcon;
exports.Option = Option;
exports.TransitStopOption = TransitStopOption;
exports.UserLocationIcon = UserLocationIcon;

var _types = require("@opentripplanner/core-utils/lib/types");

var _ui = require("@opentripplanner/core-utils/lib/ui");

var _humanizeDistance = require("@opentripplanner/humanize-distance");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _faSolid = require("styled-icons/fa-solid");

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GeocodedOptionIcon() {
  return /*#__PURE__*/_react.default.createElement(_faSolid.MapPin, {
    size: 13
  });
}

function Option({
  disabled,
  icon,
  isActive,
  onClick,
  title
}) {
  return /*#__PURE__*/_react.default.createElement(Styled.MenuItem, {
    onClick: onClick,
    active: isActive,
    disabled: disabled
  }, (0, _ui.isIE)() ? // In internet explorer 11, some really weird stuff is happening where it
  // is not possible to click the text of the title, but if you click just
  // above it, then it works. So, if using IE 11, just return the title text
  // and avoid all the extra fancy stuff.
  // See https://github.com/ibi-group/trimet-mod-otp/issues/237
  title : /*#__PURE__*/_react.default.createElement(Styled.OptionContainer, null, /*#__PURE__*/_react.default.createElement(Styled.OptionIconContainer, null, icon), /*#__PURE__*/_react.default.createElement(Styled.OptionContent, null, title)));
}

Option.propTypes = {
  disabled: _propTypes.default.bool,
  icon: _propTypes.default.node,
  isActive: _propTypes.default.bool,
  onClick: _propTypes.default.func.isRequired,
  title: _propTypes.default.node
};
Option.defaultProps = {
  disabled: false,
  icon: null,
  isActive: false,
  title: null
};

function TransitStopOption({
  isActive,
  onClick,
  stop,
  stopOptionIcon
}) {
  return /*#__PURE__*/_react.default.createElement(Styled.MenuItem, {
    onClick: onClick,
    active: isActive
  }, /*#__PURE__*/_react.default.createElement(Styled.StopIconAndDistanceContainer, null, stopOptionIcon, /*#__PURE__*/_react.default.createElement(Styled.StopDistance, null, (0, _humanizeDistance.humanizeDistanceStringImperial)(stop.dist, true))), /*#__PURE__*/_react.default.createElement(Styled.StopContentContainer, null, /*#__PURE__*/_react.default.createElement(Styled.StopName, null, stop.name, " (", stop.code, ")"), /*#__PURE__*/_react.default.createElement(Styled.StopRoutes, null, (stop.routes || []).map(route => {
    const name = route.shortName || route.longName;
    return /*#__PURE__*/_react.default.createElement(Styled.RouteName, {
      key: `route-${name}`
    }, name);
  }))), /*#__PURE__*/_react.default.createElement(Styled.ClearBoth, null));
}

TransitStopOption.propTypes = {
  isActive: _propTypes.default.bool,
  onClick: _propTypes.default.func.isRequired,
  stop: _types.transitIndexStopWithRoutes.isRequired,
  stopOptionIcon: _propTypes.default.node.isRequired
};
TransitStopOption.defaultProps = {
  isActive: false
};

function UserLocationIcon({
  userLocation
}) {
  if (userLocation.icon === "work") return /*#__PURE__*/_react.default.createElement(_faSolid.Briefcase, {
    size: 13
  });
  if (userLocation.icon === "home") return /*#__PURE__*/_react.default.createElement(_faSolid.Home, {
    size: 13
  });
  return /*#__PURE__*/_react.default.createElement(_faSolid.MapMarker, {
    size: 13
  });
}

UserLocationIcon.propTypes = {
  userLocation: _types.userLocationType.isRequired
};