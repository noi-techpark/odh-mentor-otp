"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icon = _interopRequireDefault(require("./icon"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ModeIcon extends _react.Component {
  render() {
    const {
      mode,
      defaultToText
    } = this.props;

    switch (mode) {
      case 'BICYCLE':
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "mode-icon"
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          title: 'bicycle',
          type: "bicycle"
        }));

      case 'BUS':
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "mode-icon"
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          title: 'bus',
          type: "bus"
        }));

      case 'CAR':
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "mode-icon"
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          title: 'car',
          type: "car"
        }));

      case 'TRAM':
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "mode-icon"
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          title: 'tram',
          type: "train"
        }));

      case 'SUBWAY':
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "mode-icon"
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          title: 'subway',
          type: "subway"
        }));

      case 'WALK':
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "mode-icon"
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          title: 'walk',
          type: "male"
        }));

      case 'MICROMOBILITY':
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "mode-icon"
        }, /*#__PURE__*/_react.default.createElement(_icon.default, {
          title: 'micromobility',
          type: "flash"
        }));

      default:
        return defaultToText ? /*#__PURE__*/_react.default.createElement("span", null, mode) : null;
    }
  }

}

exports.default = ModeIcon;

_defineProperty(ModeIcon, "propTypes", {
  mode: _propTypes.default.string
});

module.exports = exports.default;

//# sourceMappingURL=mode-icon.js