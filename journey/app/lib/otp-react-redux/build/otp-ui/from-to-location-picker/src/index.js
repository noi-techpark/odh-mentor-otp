"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _types = require("../../core-utils/src/types");

var _src = _interopRequireDefault(require("../../location-icon/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _styled = require("./styled");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const iconSize = "0.9em";

class FromToLocationPicker extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onFromClick", () => {
      const {
        location,
        onFromClick,
        setLocation
      } = this.props;

      if (onFromClick) {
        onFromClick();
        return;
      }

      setLocation({
        location,
        locationType: "from",
        reverseGeocode: false
      });
    });

    _defineProperty(this, "onToClick", () => {
      const {
        location,
        onToClick,
        setLocation
      } = this.props;

      if (onToClick) {
        onToClick();
        return;
      }

      setLocation({
        location,
        locationType: "to",
        reverseGeocode: false
      });
    });
  }

  render() {
    const {
      fromText,
      showIcons,
      toText
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_styled.FromToPickerSpan, null, /*#__PURE__*/_react.default.createElement(_styled.LocationPickerSpan, null, showIcons && /*#__PURE__*/_react.default.createElement(_src.default, {
      type: "from",
      size: iconSize
    }), /*#__PURE__*/_react.default.createElement(_styled.Button, {
      onClick: this.onFromClick
    }, fromText)), /*#__PURE__*/_react.default.createElement(_styled.LocationPickerSpan, null, showIcons && /*#__PURE__*/_react.default.createElement(_src.default, {
      type: "to",
      size: iconSize
    }), /*#__PURE__*/_react.default.createElement(_styled.Button, {
      onClick: this.onToClick
    }, toText)));
  }

}

FromToLocationPicker.propTypes = {
  /**
   * The text to display on the "from" button for setting the origin of a trip.
   */
  fromText: _propTypes.default.string,

  /**
   * A specific location to associate with this. This is only used when combined
   * with the setLocation prop.
   */
  location: _types.locationType,

  /**
   * Triggered when the user clicks on the "from" button.
   */
  onFromClick: _propTypes.default.func,

  /**
   * Triggered when the user clicks on the "to" button.
   */
  onToClick: _propTypes.default.func,

  /**
   * The text to display on the "to" button for setting the destination of a trip.
   */
  toText: _propTypes.default.string,

  /**
   * Triggered when the user clicks either the "from" or "to" button and there
   * are no from/to specific handler functions defined as props.
   *
   * Passes an argument as follows:
   * { locationType: "from/to", location, reverseGeocode: false }
   */
  setLocation: _propTypes.default.func,

  /**
   * Determines whether icons are shown on the "from" and "to" buttons.
   */
  showIcons: _propTypes.default.bool
};
FromToLocationPicker.defaultProps = {
  fromText: "$_from_here_$",
  location: null,
  onFromClick: null,
  onToClick: null,
  setLocation: null,
  showIcons: true,
  toText: "$_to_here_$"
};
var _default = FromToLocationPicker;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js