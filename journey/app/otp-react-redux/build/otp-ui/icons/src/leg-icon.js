"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _biketownIcon = _interopRequireDefault(require("./companies/biketown-icon"));

var _birdIcon = _interopRequireDefault(require("./companies/bird-icon"));

var _boltIcon = _interopRequireDefault(require("./companies/bolt-icon"));

var _car2goIcon = _interopRequireDefault(require("./companies/car2go-icon"));

var _gruvIcon = _interopRequireDefault(require("./companies/gruv-icon"));

var _limeIcon = _interopRequireDefault(require("./companies/lime-icon"));

var _lyftIcon = _interopRequireDefault(require("./companies/lyft-icon"));

var _razorIcon = _interopRequireDefault(require("./companies/razor-icon"));

var _sharedIcon = _interopRequireDefault(require("./companies/shared-icon"));

var _spinIcon = _interopRequireDefault(require("./companies/spin-icon"));

var _uberIcon = _interopRequireDefault(require("./companies/uber-icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const companyLookup = {
  biketown: _biketownIcon.default,
  bird: _birdIcon.default,
  bolt: _boltIcon.default,
  car2go: _car2goIcon.default,
  gruv: _gruvIcon.default,
  lime: _limeIcon.default,
  lyft: _lyftIcon.default,
  razor: _razorIcon.default,
  shared: _sharedIcon.default,
  spin: _spinIcon.default,
  uber: _uberIcon.default
};

function getCompanyIcon(name) {
  return companyLookup[name.toLowerCase()];
}

const LegIcon = ({
  leg,
  ModeIcon,
  ...props
}) => {
  let iconStr = leg.mode;

  if (iconStr === "CAR" && leg.rentedCar) {
    iconStr = leg.from.networks[0];
  } else if (iconStr === "CAR" && leg.tncData) {
    iconStr = leg.tncData.company;
  } else if (iconStr === "BICYCLE" && leg.rentedBike && leg.from.networks) {
    iconStr = leg.from.networks[0];
  } else if (iconStr === "MICROMOBILITY" && leg.rentedVehicle && leg.from.networks) {
    iconStr = leg.from.networks[0];
  } // try to see if the iconStr has a matching company icon. If so, return that.


  const CompanyIcon = getCompanyIcon(iconStr);
  if (CompanyIcon) return /*#__PURE__*/_react.default.createElement(CompanyIcon, props); // Do this for P&R, K&R and TNC trips without company icon

  if (iconStr && iconStr.startsWith("CAR")) iconStr = "CAR";
  return /*#__PURE__*/_react.default.createElement(ModeIcon, _extends({
    mode: iconStr
  }, props));
};

LegIcon.propTypes = {
  leg: _types.legType.isRequired,
  ModeIcon: _propTypes.default.elementType.isRequired
};
var _default = LegIcon;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=leg-icon.js