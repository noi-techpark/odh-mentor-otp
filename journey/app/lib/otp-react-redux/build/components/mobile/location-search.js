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

var _connectedLocationField = _interopRequireDefault(require("../form/connected-location-field"));

var _ui = require("../../actions/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class MobileLocationSearch extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_locationSelected", () => {
      this.props.setMobileScreen(_ui.MobileScreens.SEARCH_FORM);
    });
  }

  render() {
    const {
      backScreen,
      location,
      locationType,
      otherLocation
    } = this.props;
    const suppressNearby = otherLocation && otherLocation.category === 'CURRENT_LOCATION';
    return /*#__PURE__*/_react.default.createElement(_container.default, null, /*#__PURE__*/_react.default.createElement(_navigationBar.default, {
      headerText: `Imposta ${locationType === 'to' ? 'Destinazione' : 'Origine'}`,
      showBackButton: true,
      backScreen: backScreen
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "location-search mobile-padding"
    }, /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
      hideExistingValue: true,
      inputPlaceholder: location ? location.name : '$_type_location_$',
      locationType: locationType,
      onLocationSelected: this._locationSelected,
      static: true,
      suppressNearby: suppressNearby
    })));
  }

} // connect to the redux store


_defineProperty(MobileLocationSearch, "propTypes", {
  backScreen: _propTypes.default.number,
  locationType: _propTypes.default.string
});

const mapStateToProps = (state, ownProps) => {
  return {
    location: state.otp.currentQuery[ownProps.locationType],
    otherLocation: ownProps.type === 'from' ? state.otp.currentQuery.to : state.otp.currentQuery.from
  };
};

const mapDispatchToProps = {
  setMobileScreen: _ui.setMobileScreen
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MobileLocationSearch);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=location-search.js