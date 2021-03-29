"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _connectedLocationField = _interopRequireDefault(require("./connected-location-field"));

var _tabbedFormPanel = _interopRequireDefault(require("./tabbed-form-panel"));

var _switchButton = _interopRequireDefault(require("./switch-button"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DefaultSearchForm extends _react.Component {
  constructor() {
    super();
    this.state = {
      desktopDateTimeExpanded: false,
      desktopSettingsExpanded: false
    };
  }

  render() {
    const {
      mobile,
      ModeIcon
    } = this.props;
    const actionText = mobile ? "$_tap_$" : "$_click_$";
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
      className: "locations"
    }, /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
      inputPlaceholder: `Inserisci partenza o ${actionText} su mappa...`,
      locationType: "from",
      showClearButton: true
    }), /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
      inputPlaceholder: `Inserisci destinazione o ${actionText} su mappa...`,
      locationType: "to",
      showClearButton: !mobile
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "switch-button-container"
    }, /*#__PURE__*/_react.default.createElement(_switchButton.default, {
      content: /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-exchange fa-rotate-90"
      })
    }))), /*#__PURE__*/_react.default.createElement(_tabbedFormPanel.default, {
      ModeIcon: ModeIcon
    }));
  }

}

exports.default = DefaultSearchForm;

_defineProperty(DefaultSearchForm, "propTypes", {
  mobile: _propTypes.default.bool,
  ModeIcon: _propTypes.default.elementType.isRequired
});

_defineProperty(DefaultSearchForm, "defaultProps", {
  showFrom: true,
  showTo: true
});

module.exports = exports.default;

//# sourceMappingURL=default-search-form.js