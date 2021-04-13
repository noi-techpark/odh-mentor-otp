"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _legIcon = _interopRequireDefault(require("./leg-icon"));

var _trimetModeIcon = _interopRequireDefault(require("./trimet-mode-icon"));

var _biketownIcon = _interopRequireDefault(require("./companies/biketown-icon"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const TriMetLegIcon = ({
  leg,
  ...props
}) => {
  // Custom TriMet icon logic.
  if (leg.routeLongName && leg.routeLongName.startsWith("Portland Streetcar")) {
    return /*#__PURE__*/_react.default.createElement(_trimetModeIcon.default, _extends({
      mode: "STREETCAR"
    }, props));
  }

  if (leg.rentedBike) {
    if (leg.from.networks && leg.from.networks[0] === "GBFS") {
      return /*#__PURE__*/_react.default.createElement(_biketownIcon.default, props);
    }

    return /*#__PURE__*/_react.default.createElement(_trimetModeIcon.default, _extends({
      mode: "BICYCLE"
    }, props));
  }

  return /*#__PURE__*/_react.default.createElement(_legIcon.default, _extends({
    leg: leg,
    ModeIcon: _trimetModeIcon.default
  }, props));
};

var _default = TriMetLegIcon;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trimet-leg-icon.js