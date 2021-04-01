"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var uiActions = _interopRequireWildcard(require("../../actions/ui"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This button provides basic redirecting functionality.
 * FIXME: Replace this component with Link (react-router-dom) or LinkContainer
 *  (react-router-bootstrap).
 */
class LinkButton extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_handleClick", () => {
      this.props.routeTo(this.props.to);
    });
  }

  render() {
    // Default componentClass to react-bootstrap Button (can be overridden
    // with, e.g., 'button')
    const {
      children,
      className,
      componentClass = _reactBootstrap.Button
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(componentClass, {
      children,
      className,
      onClick: this._handleClick
    });
  }

} // connect to the redux store


_defineProperty(LinkButton, "propTypes", {
  className: _propTypes.default.string,
  componentClass: _propTypes.default.string,

  /** The destination url when clicking the button. */
  to: _propTypes.default.string.isRequired
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {
  routeTo: uiActions.routeTo
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LinkButton);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=link-button.js