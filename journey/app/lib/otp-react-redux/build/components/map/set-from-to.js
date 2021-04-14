"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _src = _interopRequireDefault(require("../../otp-ui/from-to-location-picker/src"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SetFromToButtons extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_setLocation", type => {
      this.props.setLocation({
        type,
        location: this.props.location,
        reverseGeocode: false
      });
      this.props.map.closePopup();
    });

    _defineProperty(this, "_setFromClicked", () => {
      this._setLocation('from');
    });

    _defineProperty(this, "_setToClicked", () => {
      this._setLocation('to');
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_src.default, {
      onFromClick: this._setFromClicked,
      onToClick: this._setToClicked
    });
  }

}

exports.default = SetFromToButtons;
module.exports = exports.default;

//# sourceMappingURL=set-from-to.js