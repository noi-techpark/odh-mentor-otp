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

var _connectedLocationField = _interopRequireDefault(require("../form/connected-location-field"));

var _defaultMap = _interopRequireDefault(require("../map/default-map"));

var _navigationBar = _interopRequireDefault(require("./navigation-bar"));

var _ui = require("../../actions/ui");

var _map = require("../../actions/map");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MobileWelcomeScreen extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_toFieldClicked", () => {
      this.props.setMobileScreen(_ui.MobileScreens.SET_INITIAL_LOCATION);
    });

    _defineProperty(this, "_locationSetFromPopup", selection => {
      // If the tapped location was selected as the 'from' endpoint, set the 'to'
      // endpoint to be the current user location. (If selected as the 'to' point,
      // no action is needed since 'from' is the current location by default.)
      if (selection.type === 'from') {
        this.props.setLocationToCurrent({
          locationType: 'to'
        });
      }
    });
  }

  render() {
    const {
      title
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_container.default, null, /*#__PURE__*/_react.default.createElement(_navigationBar.default, {
      title: title
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "welcome-location mobile-padding"
    }, /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
      inputPlaceholder: "$_where_go_$",
      locationType: "to",
      onTextInputClick: this._toFieldClicked,
      showClearButton: false
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "welcome-map"
    }, /*#__PURE__*/_react.default.createElement(_defaultMap.default, {
      onSetLocation: this._locationSetFromPopup
    })));
  }

} // connect to the redux store


_defineProperty(MobileWelcomeScreen, "propTypes", {
  map: _propTypes.default.element,
  setLocationToCurrent: _propTypes.default.func,
  setMobileScreen: _propTypes.default.func
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {
  setLocationToCurrent: _map.setLocationToCurrent,
  setMobileScreen: _ui.setMobileScreen
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MobileWelcomeScreen);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=welcome-screen.js