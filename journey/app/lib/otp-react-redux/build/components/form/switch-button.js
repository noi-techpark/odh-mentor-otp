"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _map = require("../../actions/map");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SwitchButton extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClick", () => {
      this.props.switchLocations();
    });
  }

  render() {
    const {
      content
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "switch-button",
      title: "Switch locations",
      onClick: this._onClick || this.props.onClick
    }, content);
  }

}

_defineProperty(SwitchButton, "propTypes", {
  onClick: _propTypes.default.func,
  switchLocations: _propTypes.default.func
});

_defineProperty(SwitchButton, "defaultProps", {
  content: 'Switch'
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    switchLocations: () => {
      dispatch((0, _map.switchLocations)());
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SwitchButton);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=switch-button.js