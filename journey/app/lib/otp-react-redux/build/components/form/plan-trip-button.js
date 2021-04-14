"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _api = require("../../actions/api");

var _ui = require("../../actions/ui");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PlanTripButton extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClick", () => {
      this.props.routingQuery();
      if (typeof this.props.onClick === 'function') this.props.onClick();
      if (!_src.default.ui.isMobile()) this.props.setMainPanelContent(null);
    });
  }

  render() {
    const {
      currentQuery,
      text
    } = this.props;
    const locationMissing = !currentQuery.from || !currentQuery.to;
    const disabled = locationMissing || this.props.disabled;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "plan-trip-button",
      disabled: disabled,
      onClick: this._onClick
    }, text || '$_plan_trip_$');
  }

}

_defineProperty(PlanTripButton, "propTypes", {
  routingType: _propTypes.default.string,
  text: _propTypes.default.string,
  onClick: _propTypes.default.func,
  planTrip: _propTypes.default.func,
  profileTrip: _propTypes.default.func
});

_defineProperty(PlanTripButton, "defaultProps", {
  disabled: false
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentQuery: state.otp.currentQuery
  };
};

const mapDispatchToProps = {
  routingQuery: _api.routingQuery,
  setMainPanelContent: _ui.setMainPanelContent
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PlanTripButton);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=plan-trip-button.js