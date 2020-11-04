"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Styled = _interopRequireWildcard(require("../styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A wrapper that includes an <input type="select" /> control and a <label> for the input control.
 */
class CheckboxSelector extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", evt => {
      const {
        name,
        onChange
      } = this.props;

      if (typeof onChange === "function") {
        onChange({
          [name]: evt.target.checked
        });
      }
    });
  }

  render() {
    const {
      className,
      label,
      name,
      style
    } = this.props;
    const id = `id-query-param-${name}`;
    let {
      value
    } = this.props;
    if (typeof value === "string") value = value === "true";
    return /*#__PURE__*/_react.default.createElement("div", {
      className: className,
      style: style
    }, /*#__PURE__*/_react.default.createElement("input", {
      id: id,
      type: "checkbox",
      checked: value,
      onChange: this.handleChange
    }), /*#__PURE__*/_react.default.createElement(Styled.SettingLabel, {
      htmlFor: id
    }, label));
  }

}

CheckboxSelector.propTypes = {
  /**
   * The CSS class name to apply to this element.
   */
  className: _propTypes.default.string,

  /**
   * A unique name for the setting.
   */
  name: _propTypes.default.string,

  /**
   * The initial value for the contained <input> control.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),

  /**
   * The contents of the contained <label> control.
   */
  label: _propTypes.default.string,

  /**
   * Triggered when the value of the <input> control changes.
   * @param e The data for the HTML checkbox onchange event.
   */
  onChange: _propTypes.default.func
};
CheckboxSelector.defaultProps = {
  className: null,
  name: null,
  value: null,
  label: null,
  onChange: null
};
var _default = CheckboxSelector;
exports.default = _default;