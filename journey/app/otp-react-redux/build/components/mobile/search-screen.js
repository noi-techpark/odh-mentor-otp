"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactBootstrap = require("react-bootstrap");

var _dateTimePreview = _interopRequireDefault(require("../form/date-time-preview"));

var _defaultMap = _interopRequireDefault(require("../map/default-map"));

var _connectedLocationField = _interopRequireDefault(require("../form/connected-location-field"));

var _planTripButton = _interopRequireDefault(require("../form/plan-trip-button"));

var _settingsPreview = _interopRequireDefault(require("../form/settings-preview"));

var _switchButton = _interopRequireDefault(require("../form/switch-button"));

var _container = _interopRequireDefault(require("./container"));

var _navigationBar = _interopRequireDefault(require("./navigation-bar"));

var _ui = require("../../actions/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MobileSearchScreen extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_fromFieldClicked", () => {
      this.props.setMobileScreen(_ui.MobileScreens.SET_FROM_LOCATION);
    });

    _defineProperty(this, "_toFieldClicked", () => {
      this.props.setMobileScreen(_ui.MobileScreens.SET_TO_LOCATION);
    });

    _defineProperty(this, "_expandDateTimeClicked", () => {
      this.props.setMobileScreen(_ui.MobileScreens.SET_DATETIME);
    });

    _defineProperty(this, "_expandOptionsClicked", () => {
      this.props.setMobileScreen(_ui.MobileScreens.SET_OPTIONS);
    });

    _defineProperty(this, "_planTripClicked", () => {
      this.props.setMobileScreen(_ui.MobileScreens.RESULTS_SUMMARY);
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_container.default, null, /*#__PURE__*/_react.default.createElement(_navigationBar.default, {
      headerText: "$_plan_trip_$"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "search-settings mobile-padding"
    }, /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
      locationType: "from",
      onTextInputClick: this._fromFieldClicked,
      showClearButton: false
    }), /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
      locationType: "to",
      onTextInputClick: this._toFieldClicked,
      showClearButton: false
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "switch-button-container-mobile"
    }, /*#__PURE__*/_react.default.createElement(_switchButton.default, {
      content: /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-exchange fa-rotate-90"
      })
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, {
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      xs: 6,
      style: {
        borderRight: '2px solid #ccc'
      }
    }, /*#__PURE__*/_react.default.createElement(_dateTimePreview.default, {
      onClick: this._expandDateTimeClicked,
      compressed: true
    })), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
      xs: 6
    }, /*#__PURE__*/_react.default.createElement(_settingsPreview.default, {
      onClick: this._expandOptionsClicked,
      compressed: true
    }))), /*#__PURE__*/_react.default.createElement(_planTripButton.default, {
      onClick: this._planTripClicked
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "search-map"
    }, /*#__PURE__*/_react.default.createElement(_defaultMap.default, null)));
  }

} // connect to the redux store


_defineProperty(MobileSearchScreen, "propTypes", {
  map: _propTypes.default.element,
  setMobileScreen: _propTypes.default.func
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {
  setMobileScreen: _ui.setMobileScreen
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MobileSearchScreen);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=search-screen.js