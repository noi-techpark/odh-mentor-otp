"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionIcon = DirectionIcon;
Object.defineProperty(exports, "CircleClockwise", {
  enumerable: true,
  get: function () {
    return _CircleClockwise.default;
  }
});
Object.defineProperty(exports, "CircleCounterclockwise", {
  enumerable: true,
  get: function () {
    return _CircleCounterclockwise.default;
  }
});
Object.defineProperty(exports, "Elevator", {
  enumerable: true,
  get: function () {
    return _Elevator.default;
  }
});
Object.defineProperty(exports, "HardLeft", {
  enumerable: true,
  get: function () {
    return _HardLeft.default;
  }
});
Object.defineProperty(exports, "HardRight", {
  enumerable: true,
  get: function () {
    return _HardRight.default;
  }
});
Object.defineProperty(exports, "Left", {
  enumerable: true,
  get: function () {
    return _Left.default;
  }
});
Object.defineProperty(exports, "Right", {
  enumerable: true,
  get: function () {
    return _Right.default;
  }
});
Object.defineProperty(exports, "SlightLeft", {
  enumerable: true,
  get: function () {
    return _SlightLeft.default;
  }
});
Object.defineProperty(exports, "SlightRight", {
  enumerable: true,
  get: function () {
    return _SlightRight.default;
  }
});
Object.defineProperty(exports, "Straight", {
  enumerable: true,
  get: function () {
    return _Straight.default;
  }
});
Object.defineProperty(exports, "UTurnLeft", {
  enumerable: true,
  get: function () {
    return _UTurnLeft.default;
  }
});
Object.defineProperty(exports, "UTurnRight", {
  enumerable: true,
  get: function () {
    return _UTurnRight.default;
  }
});

var _react = _interopRequireDefault(require("react"));

var _CircleClockwise = _interopRequireDefault(require("./CircleClockwise"));

var _CircleCounterclockwise = _interopRequireDefault(require("./CircleCounterclockwise"));

var _Elevator = _interopRequireDefault(require("./Elevator"));

var _HardLeft = _interopRequireDefault(require("./HardLeft"));

var _HardRight = _interopRequireDefault(require("./HardRight"));

var _Left = _interopRequireDefault(require("./Left"));

var _Right = _interopRequireDefault(require("./Right"));

var _SlightLeft = _interopRequireDefault(require("./SlightLeft"));

var _SlightRight = _interopRequireDefault(require("./SlightRight"));

var _Straight = _interopRequireDefault(require("./Straight"));

var _UTurnLeft = _interopRequireDefault(require("./UTurnLeft"));

var _UTurnRight = _interopRequireDefault(require("./UTurnRight"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Renders the appropriate direction icon given the OTP relative turn direction
 */


function DirectionIcon({
  relativeDirection
}) {
  if (!relativeDirection) return null;

  switch (relativeDirection.toUpperCase()) {
    case "DEPART":
    case "CONTINUE":
      return /*#__PURE__*/_react.default.createElement(_Straight.default, null);

    case "LEFT":
      return /*#__PURE__*/_react.default.createElement(_Left.default, null);

    case "RIGHT":
      return /*#__PURE__*/_react.default.createElement(_Right.default, null);

    case "SLIGHTLY_LEFT":
      return /*#__PURE__*/_react.default.createElement(_SlightLeft.default, null);

    case "SLIGHTLY_RIGHT":
      return /*#__PURE__*/_react.default.createElement(_SlightRight.default, null);

    case "HARD_LEFT":
      return /*#__PURE__*/_react.default.createElement(_HardLeft.default, null);

    case "HARD_RIGHT":
      return /*#__PURE__*/_react.default.createElement(_HardRight.default, null);

    case "UTURN_LEFT":
      return /*#__PURE__*/_react.default.createElement(_UTurnLeft.default, null);

    case "UTURN_RIGHT":
      return /*#__PURE__*/_react.default.createElement(_UTurnRight.default, null);

    case "CIRCLE_CLOCKWISE":
      return /*#__PURE__*/_react.default.createElement(_CircleClockwise.default, null);

    case "CIRCLE_COUNTERCLOCKWISE":
      return /*#__PURE__*/_react.default.createElement(_CircleCounterclockwise.default, null);

    case "ELEVATOR":
      return /*#__PURE__*/_react.default.createElement(_Elevator.default, null);

    default:
      return null;
  }
}

//# sourceMappingURL=index.js