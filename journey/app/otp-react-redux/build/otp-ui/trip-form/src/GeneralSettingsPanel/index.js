"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _queryParams = _interopRequireDefault(require("@opentripplanner/core-utils/lib/query-params"));

var _query = require("@opentripplanner/core-utils/lib/query");

var _types = require("@opentripplanner/core-utils/lib/types");

var _CheckboxSelector = _interopRequireDefault(require("../CheckboxSelector"));

var _DropdownSelector = _interopRequireDefault(require("../DropdownSelector"));

var Styled = _interopRequireWildcard(require("../styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The general settings panel for setting speed and routing optimization controls.
 */
class GeneralSettingsPanel extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChange", queryParam => {
      const {
        onQueryParamChange
      } = this.props;

      if (typeof onQueryParamChange === "function") {
        onQueryParamChange(queryParam);
      }
    });
  }

  render() {
    const {
      className,
      paramNames,
      query,
      style,
      supportedModes
    } = this.props;
    const configWrapper = {
      modes: supportedModes
    };
    return /*#__PURE__*/_react.default.createElement(Styled.GeneralSettingsPanel, {
      className: className,
      style: style
    }, paramNames.map(param => {
      const paramInfo = _queryParams.default.find(qp => qp.name === param); // Check that the parameter applies to the specified routingType


      if (!paramInfo.routingTypes.includes(query.routingType)) return null; // Check that the applicability test (if provided) is satisfied

      if (typeof paramInfo.applicable === "function" && !paramInfo.applicable(query, configWrapper)) {
        return null;
      } // Create the UI component based on the selector type


      switch (paramInfo.selector) {
        case "DROPDOWN":
          return /*#__PURE__*/_react.default.createElement(_DropdownSelector.default, {
            key: paramInfo.name,
            name: paramInfo.name,
            value: query[paramInfo.name] || paramInfo.default,
            label: (0, _query.getQueryParamProperty)(paramInfo, "label", query),
            options: (0, _query.getQueryParamProperty)(paramInfo, "options", query),
            onChange: this.handleChange
          });

        case "CHECKBOX":
          return /*#__PURE__*/_react.default.createElement(_CheckboxSelector.default, {
            key: paramInfo.label,
            name: paramInfo.name,
            value: query[paramInfo.name],
            label: (0, _query.getQueryParamProperty)(paramInfo, "label", query),
            onChange: this.handleChange
          });

        default:
          return null;
      }
    }));
  }

}

GeneralSettingsPanel.propTypes = {
  /**
   * The CSS class name to apply to this element.
   */
  className: _propTypes.default.string,

  /**
   * An object {parameterName: value, ...} whose attributes correspond to query parameters.
   * For query parameter names and value formats,
   * see https://github.com/opentripplanner/otp-ui/blob/master/packages/core-utils/src/__tests__/query.js#L14
   */
  // Disable type check because the only use of queryParams is to be passed to
  // method getQueryParamProperty from "@opentripplanner/core-utils/lib/query".
  // eslint-disable-next-line react/forbid-prop-types
  query: _propTypes.default.any,

  /**
   * An array of parameter names to support in the settings panel.
   * See the `query` parameter for more on query parameter names.
   */
  paramNames: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * Triggered when the value of a trip setting is changed by the user.
   * @param arg The data {name: value} of the changed trip setting.
   */
  onQueryParamChange: _propTypes.default.func,

  /**
   * An array of supported modes that will be displayed as options.
   */
  supportedModes: _types.configuredModesType.isRequired
};
GeneralSettingsPanel.defaultProps = {
  className: null,
  query: null,
  paramNames: _query.defaultParams,
  onQueryParamChange: null
};
var _default = GeneralSettingsPanel;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js