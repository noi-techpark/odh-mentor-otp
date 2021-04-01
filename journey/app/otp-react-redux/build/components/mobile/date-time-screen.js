"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _container = _interopRequireDefault(require("./container"));

var _navigationBar = _interopRequireDefault(require("./navigation-bar"));

var _dateTimeModal = _interopRequireDefault(require("../form/date-time-modal"));

var _planTripButton = _interopRequireDefault(require("../form/plan-trip-button"));

var _ui = require("../../actions/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MobileDateTimeScreen extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_planTripClicked", () => {
      this.props.setMobileScreen(_ui.MobileScreens.RESULTS_SUMMARY);
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_container.default, null, /*#__PURE__*/_react.default.createElement(_navigationBar.default, {
      headerText: "$_set_time_$",
      showBackButton: true,
      backScreen: _ui.MobileScreens.SEARCH_FORM
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "options-main-content mobile-padding"
    }, /*#__PURE__*/_react.default.createElement(_dateTimeModal.default, null)), /*#__PURE__*/_react.default.createElement("div", {
      className: "options-lower-tray mobile-padding"
    }, /*#__PURE__*/_react.default.createElement(_planTripButton.default, {
      onClick: this._planTripClicked
    })));
  }

} // connect to the redux store


_defineProperty(MobileDateTimeScreen, "propTypes", {
  setMobileScreen: _propTypes.default.func
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {
  setMobileScreen: _ui.setMobileScreen
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MobileDateTimeScreen);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=date-time-screen.js