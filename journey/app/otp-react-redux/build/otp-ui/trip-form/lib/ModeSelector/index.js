"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _types = require("@opentripplanner/core-utils/lib/types");

var Styled = _interopRequireWildcard(require("../styled"));

var _ModeButton = _interopRequireDefault(require("../ModeButton"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * ModeSelector is the control container where the OTP user selects
 * the transportation modes for a trip query, e.g. transit+bike, walk, micromobility...
 */


const ModeSelector = props => {
  const {
    className,
    modes,
    onChange,
    style
  } = props;
  const {
    primary,
    secondary,
    tertiary
  } = modes || {
    primary: null,
    secondary: null,
    tertiary: null
  };

  const handleClick = option => {
    if (!option.selected && typeof onChange === "function") {
      onChange(option.id);
    }
  };

  const makeButton = option => /*#__PURE__*/_react.default.createElement(_ModeButton.default, {
    key: option.id,
    selected: option.selected,
    showTitle: option.showTitle,
    title: option.title,
    onClick: () => handleClick(option)
  }, option.text);

  return /*#__PURE__*/_react.default.createElement(Styled.ModeSelector, {
    className: className,
    style: style
  }, primary && /*#__PURE__*/_react.default.createElement(Styled.ModeSelector.MainRow, null, makeButton(primary)), secondary && /*#__PURE__*/_react.default.createElement(Styled.ModeSelector.SecondaryRow, null, secondary.map(makeButton)), tertiary && /*#__PURE__*/_react.default.createElement(Styled.ModeSelector.TertiaryRow, null, tertiary.map(makeButton)));
};

ModeSelector.propTypes = {
  /**
   * The CSS class name to apply to this element.
   */
  className: _propTypes.default.string,

  /**
   * An object that defines the primary mode, and secondary and tertiary modes for the trip query.
   */
  modes: _types.modeSelectorOptionsType,

  /**
   * Triggered when the user selects a different mode.
   * @param id The id of the new option clicked.
   */
  onChange: _propTypes.default.func
};
ModeSelector.defaultProps = {
  className: null,
  modes: null,
  onChange: null
};
var _default = ModeSelector;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js