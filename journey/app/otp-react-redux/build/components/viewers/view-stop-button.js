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

var _ui = require("../../actions/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ViewStopButton extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClick", () => {
      this.props.setMainPanelContent(null);
      this.props.setViewedStop({
        stopId: this.props.stopId
      });
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsSize: "xsmall",
      className: "view-stop-button",
      onClick: this._onClick
    }, this.props.text || this.props.languageConfig.stopViewer || 'Fermata');
  }

}

_defineProperty(ViewStopButton, "propTypes", {
  stopId: _propTypes.default.string,
  text: _propTypes.default.string
});

const mapStateToProps = (state, ownProps) => {
  return {
    languageConfig: state.otp.config.language
  };
};

const mapDispatchToProps = {
  setMainPanelContent: _ui.setMainPanelContent,
  setViewedStop: _ui.setViewedStop
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ViewStopButton);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=view-stop-button.js