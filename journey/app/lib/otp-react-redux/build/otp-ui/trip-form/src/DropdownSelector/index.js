"use strict";

require("core-js/modules/web.dom.iterable.js");

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
 * A wrapper that includes a <select> dropdown control and a <label> for the dropdown control.
 */
class DropdownSelector extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", evt => {
      const val = evt.target.value;
      const {
        name,
        onChange
      } = this.props;

      if (typeof onChange === "function") {
        const floatVal = parseFloat(val);
        onChange({
          [name]: Number.isNaN(floatVal) ? val : floatVal
        });
      }
    });
  }

  render() {
    const {
      className,
      label,
      name,
      options,
      style,
      value
    } = this.props;
    const id = `id-query-param-${name}`;
    return /*#__PURE__*/_react.default.createElement(Styled.DropdownSelector, {
      className: className,
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Styled.SettingLabel, {
      htmlFor: id
    }, label)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("select", {
      id: id,
      value: value,
      onChange: this.handleChange
    }, options && options.map((o, i) => /*#__PURE__*/_react.default.createElement("option", {
      key: i,
      value: o.value
    }, o.text)))));
  }

}

DropdownSelector.propTypes = {
  /**
   * The CSS class name to apply to this element.
   */
  className: _propTypes.default.string,

  /**
   * A unique name for the setting.
   */
  name: _propTypes.default.string,

  /**
   * The initially-selected value for the contained <select> control.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * The contents of the contained <label> control.
   */
  label: _propTypes.default.string,

  /**
   * A list of {text, value} options for the <select> control.
   */
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    text: _propTypes.default.string,
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
  })),

  /**
   * Triggered when the value of the <select> control changes.
   * @param arg The data {name: value} for the selected option.
   */
  onChange: _propTypes.default.func
};
DropdownSelector.defaultProps = {
  className: null,
  name: null,
  value: null,
  label: null,
  options: null,
  onChange: null
};
var _default = DropdownSelector;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js