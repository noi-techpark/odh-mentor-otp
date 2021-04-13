"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = require("@opentripplanner/icons");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _itinerary = require("@opentripplanner/core-utils/lib/itinerary");

var _types = require("@opentripplanner/core-utils/lib/types");

var _ModeSelector = _interopRequireDefault(require("../ModeSelector"));

var _SubmodeSelector = _interopRequireDefault(require("../SubmodeSelector"));

var _GeneralSettingsPanel = _interopRequireDefault(require("../GeneralSettingsPanel"));

var Styled = _interopRequireWildcard(require("../styled"));

var _util = require("../util");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * The Settings Selector Panel allows the user to set trip search preferences,
 * such as modes, providers, and speed preferences.
 */


class SettingsSelectorPanel extends _react.Component {
  constructor() {
    super();

    _defineProperty(this, "makeNewQueryParams", queryParam => {
      const {
        queryParams
      } = this.props;
      return { ...queryParams,
        ...queryParam
      };
    });

    _defineProperty(this, "raiseOnQueryParamChange", queryParam => {
      const {
        onQueryParamChange
      } = this.props;

      if (typeof onQueryParamChange === "function") {
        onQueryParamChange(queryParam);
      }
    });

    _defineProperty(this, "handleMainModeChange", id => {
      const {
        supportedModes,
        supportedCompanies
      } = this.props;
      const newModes = id.split("+");

      if (newModes[0] === "TRANSIT") {
        const selectedModes = this.getSelectedModes();
        const activeTransitModes = selectedModes.filter(_itinerary.isTransit);
        let {
          lastTransitModes
        } = this.state;

        if (lastTransitModes.length === 0) {
          const allTransitModes = supportedModes.transitModes.map(modeObj => modeObj.mode);
          lastTransitModes = lastTransitModes.concat(allTransitModes);
        }

        const {
          defaultAccessModeCompany,
          companies,
          nonTransitModes
        } = (0, _util.getCompaniesForModeId)(id, supportedCompanies); // Add previously selected transit modes only if none were active.

        const finalModes = (activeTransitModes.length > 0 ? activeTransitModes : lastTransitModes).concat(nonTransitModes);
        this.handleQueryParamChange({
          mode: finalModes.join(","),
          companies: companies.join(",")
        });
        this.setState({
          defaultAccessModeCompany: defaultAccessModeCompany && defaultAccessModeCompany[0]
        });
      } else {
        this.handleQueryParamChange({
          mode: newModes.join(","),
          companies: "" // New req: Don't list companies with this mode?

        });
      }
    });

    _defineProperty(this, "handleTransitModeChange", id => {
      const selectedModes = this.getSelectedModes();
      this.toggleSubmode("mode", id, selectedModes, _itinerary.isTransit, newModes => {
        this.setState({
          lastTransitModes: newModes.filter(_itinerary.isTransit)
        });
      });
    });

    _defineProperty(this, "handleCompanyChange", id => {
      const selectedCompanies = this.getSelectedCompanies();
      this.toggleSubmode("companies", id, selectedCompanies, undefined, () => {});
    });

    _defineProperty(this, "handleQueryParamChange", queryParam => {
      this.raiseOnQueryParamChange(queryParam);
    });

    _defineProperty(this, "toggleSubmode", (name, id, submodes, filter = o => o, after) => {
      const newSubmodes = [].concat(submodes);
      const idx = newSubmodes.indexOf(id); // If the clicked mode is selected, then unselect it, o/w select it.
      // Leave at least one selected, as in newplanner.trimet.org.

      if (idx >= 0) {
        const subset = newSubmodes.filter(filter);

        if (subset.length >= 2) {
          newSubmodes.splice(idx, 1);
        }
      } else {
        newSubmodes.push(id);
      }

      if (newSubmodes.length !== submodes.length) {
        this.handleQueryParamChange({
          [name]: newSubmodes.join(",")
        });
        if (after) after(newSubmodes);
      }
    });

    this.state = {
      defaultAccessModeCompany: null,
      lastTransitModes: []
    };
  }

  getSelectedCompanies() {
    const {
      queryParams
    } = this.props;
    const {
      companies
    } = queryParams;
    return companies ? companies.split(",") : [];
  }

  getSelectedModes() {
    const {
      queryParams
    } = this.props;
    const {
      mode
    } = queryParams;
    return mode ? mode.split(",") : [];
  }

  render() {
    const {
      className,
      ModeIcon,
      queryParams,
      supportedModes,
      supportedCompanies,
      style
    } = this.props;
    const {
      defaultAccessModeCompany
    } = this.state;
    const selectedModes = this.getSelectedModes();
    const selectedCompanies = this.getSelectedCompanies();
    const modeOptions = (0, _util.getModeOptions)(ModeIcon, supportedModes, selectedModes, selectedCompanies, supportedCompanies);
    const transitModes = (0, _util.getTransitSubmodeOptions)(ModeIcon, supportedModes, selectedModes);
    const nonTransitModes = selectedModes.filter(m => !(0, _itinerary.isTransit)(m));
    const companies = (0, _util.getCompaniesOptions)(supportedCompanies.filter(comp => defaultAccessModeCompany ? comp.id === defaultAccessModeCompany : true), nonTransitModes, selectedCompanies);
    const bikeModes = (0, _util.getBicycleOrMicromobilityModeOptions)(ModeIcon, supportedModes.bicycleModes, selectedModes);
    const scooterModes = (0, _util.getBicycleOrMicromobilityModeOptions)(ModeIcon, supportedModes.micromobilityModes, selectedModes);
    return /*#__PURE__*/_react.default.createElement(Styled.SettingsSelectorPanel, {
      className: className,
      style: style
    }, /*#__PURE__*/_react.default.createElement(_ModeSelector.default, {
      modes: modeOptions,
      onChange: this.handleMainModeChange,
      style: {
        margin: "0px -5px",
        paddingBottom: "8px"
      }
    }), /*#__PURE__*/_react.default.createElement(Styled.SettingsHeader, null, "$_preferences_$"), selectedModes.some(_itinerary.isTransit) && transitModes.length >= 2 && /*#__PURE__*/_react.default.createElement(_SubmodeSelector.default, {
      label: "$_mode_$",
      modes: transitModes,
      onChange: this.handleTransitModeChange
    }), selectedModes.some(_util.isBike) && !selectedModes.some(_itinerary.isTransit) && /*#__PURE__*/_react.default.createElement(_SubmodeSelector.default, {
      label: "$_mode_$",
      inline: true,
      modes: bikeModes,
      onChange: this.handleMainModeChange
    }), selectedModes.some(_itinerary.isMicromobility) && !selectedModes.some(_itinerary.isTransit) && /*#__PURE__*/_react.default.createElement(_SubmodeSelector.default, {
      label: "$_mode_$",
      inline: true,
      modes: scooterModes,
      onChange: this.handleMainModeChange
    }), companies.length >= 2 && /*#__PURE__*/_react.default.createElement(_SubmodeSelector.default, {
      label: "Use companies",
      modes: companies,
      onChange: this.handleCompanyChange
    }), /*#__PURE__*/_react.default.createElement(_GeneralSettingsPanel.default, {
      query: queryParams,
      supportedModes: supportedModes,
      onQueryParamChange: this.handleQueryParamChange
    }));
  }

}

exports.default = SettingsSelectorPanel;
SettingsSelectorPanel.propTypes = {
  /**
   * The CSS class name to apply to this element.
   */
  className: _propTypes.default.string,

  /**
   * The icon component for rendering mode icons. Defaults to the OPT-UI TriMetModeIcon component.
   */
  ModeIcon: _propTypes.default.elementType,

  /**
   * Triggered when a query parameter is changed.
   * @param params An object that contains the new values for the parameter(s) that has (have) changed.
   */
  onQueryParamChange: _propTypes.default.func,

  /**
   * An object {parameterName: value, ...} whose attributes correspond to query parameters.
   * For query parameter names and value formats,
   * see https://github.com/opentripplanner/otp-ui/blob/master/packages/core-utils/src/__tests__/query.js#L14
   */
  // Disable type check because the only use of queryParams is to be passed to
  // method getQueryParamProperty from "@opentripplanner/core-utils/lib/query".
  // eslint-disable-next-line react/forbid-prop-types
  queryParams: _propTypes.default.any,

  /**
   * An array of supported companies that will be displayed as options where applicable.
   */
  supportedCompanies: _propTypes.default.arrayOf(_types.configuredCompanyType),

  /**
   * An array of supported modes that will be displayed as options.
   */
  supportedModes: _types.configuredModesType.isRequired
};
SettingsSelectorPanel.defaultProps = {
  className: null,
  ModeIcon: _icons.TriMetModeIcon,
  onQueryParamChange: null,
  queryParams: null,
  supportedCompanies: []
};
module.exports = exports.default;

//# sourceMappingURL=index.js