"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDraggable = _interopRequireDefault(require("react-draggable"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const noop = () => {};

class DraggableWindow extends _react.Component {
  render() {
    const {
      children,
      draggableProps,
      header
    } = this.props;
    const GREY_BORDER = '#777 1.3px solid';
    return /*#__PURE__*/_react.default.createElement(_reactDraggable.default, _extends({
      handle: ".handle"
    }, draggableProps), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        position: 'absolute',
        zIndex: 9999999,
        width: '350px',
        backgroundColor: 'white',
        borderRadius: '5%',
        padding: '10px',
        boxShadow: '2px 2px 8px',
        border: GREY_BORDER
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "handle",
      style: {
        borderBottom: GREY_BORDER,
        cursor: 'move',
        fontSize: 'large',
        paddingBottom: '5px'
      }
    }, /*#__PURE__*/_react.default.createElement("button", {
      onClick: this.props.onClickClose,
      className: "clear-button-formatting pull-right"
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "times"
    })), header), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: '275px',
        overflowY: 'scroll'
      }
    }, children)));
  }

}

exports.default = DraggableWindow;
DraggableWindow.defaultProps = {
  onClickClose: noop
};
module.exports = exports.default;

//# sourceMappingURL=draggable-window.js