"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vehicleRentalOverlay = _interopRequireDefault(require("@opentripplanner/vehicle-rental-overlay"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _map = require("../../actions/map");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ConnectedVehicleRentalOverlay extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onOverlayAdded", () => {
      this.setState({
        visible: true
      });
    });

    _defineProperty(this, "onOverlayRemoved", () => {
      this.setState({
        visible: false
      });
    });

    this.state = {
      visible: props.visible
    };
  }

  componentDidMount() {
    this.props.registerOverlay(this);
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_vehicleRentalOverlay.default, _extends({}, this.props, {
      visible: this.state.visible
    }));
  }

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  return {
    configCompanies: state.otp.config.companies,
    zoom: state.otp.config.map.initZoom
  };
};

const mapDispatchToProps = {
  setLocation: _map.setLocation
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConnectedVehicleRentalOverlay);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-vehicle-rental-overlay.js