"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Component that displays the call time (ticking with each second)
 * for an active call (assumes that mount time corresponds with call start).
 */
class CallTimeCounter extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      counterString: 0
    });

    _defineProperty(this, "_formatSeconds", seconds => {
      const date = new Date(0);
      date.setSeconds(seconds);
      return date.toISOString().substr(11, 8);
    });

    _defineProperty(this, "_refreshCounter", () => {
      const counterString = this.state.counterString + 1;
      this.setState({
        counterString
      });
    });

    _defineProperty(this, "_startRefresh", () => {
      // Set refresh to every second.
      const timer = window.setInterval(this._refreshCounter, 1000);
      this.setState({
        timer
      });
    });

    _defineProperty(this, "_stopRefresh", () => {
      window.clearInterval(this.state.timer);
    });
  }

  componentDidMount() {
    this._startRefresh();
  }

  componentWillUnmount() {
    this._stopRefresh();
  }
  /**
   * Formats seconds as hh:mm:ss string.
   */


  render() {
    const {
      className,
      style
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: className,
      style: style
    }, this._formatSeconds(this.state.counterString));
  }

}

exports.default = CallTimeCounter;
module.exports = exports.default;

//# sourceMappingURL=call-time-counter.js