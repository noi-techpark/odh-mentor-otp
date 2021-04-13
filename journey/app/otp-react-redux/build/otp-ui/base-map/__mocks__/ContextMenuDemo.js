"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const center = [45.522862, -122.667837];

class ContextMenuDemo extends _react.Component {
  constructor() {
    super();

    _defineProperty(this, "handleContextMenu", e => {
      this.setState({
        location: [e.latlng.lat, e.latlng.lng],
        contents: /*#__PURE__*/_react.default.createElement("h1", null, "Context Popup")
      });
    });

    this.state = {
      location: center,
      contents: ""
    };
  }

  render() {
    const {
      location,
      contents
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_.default, {
      center: center,
      popup: {
        location,
        contents
      },
      onContextMenu: this.handleContextMenu
    }));
  }

}

exports.default = ContextMenuDemo;
module.exports = exports.default;

//# sourceMappingURL=ContextMenuDemo.js