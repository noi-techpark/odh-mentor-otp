"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var callTakerActions = _interopRequireWildcard(require("../../actions/call-taker"));

var _callRecord = _interopRequireDefault(require("./call-record"));

var _draggableWindow = _interopRequireDefault(require("./draggable-window"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Collects the various draggable windows used in the Call Taker module to
 * display, for example, the call record list and (TODO) the list of field trips.
 */
class CallTakerWindows extends _react.Component {
  render() {
    const {
      callTaker,
      fetchQueries,
      searches
    } = this.props;
    const {
      activeCall,
      callHistory
    } = callTaker;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, callHistory.visible // Active call window
    ?
    /*#__PURE__*/
    _react.default.createElement(_draggableWindow.default, {
      draggableProps: {
        defaultPosition: callHistory.position
      },
      header: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "history"
      }), " Call history"),
      onClickClose: this.props.toggleCallHistory
    }, activeCall ? /*#__PURE__*/_react.default.createElement(_callRecord.default, {
      call: activeCall,
      searches: searches,
      inProgress: true
    }) : null, callHistory.calls.data.length > 0 ? callHistory.calls.data.map((call, i) => /*#__PURE__*/_react.default.createElement(_callRecord.default, {
      key: i,
      index: i,
      call: call,
      fetchQueries: fetchQueries
    })) : /*#__PURE__*/_react.default.createElement("div", null, "No calls in history")) : null);
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    callTaker: state.callTaker,
    currentQuery: state.otp.currentQuery,
    searches: state.otp.searches
  };
};

const {
  fetchQueries,
  toggleCallHistory
} = callTakerActions;
const mapDispatchToProps = {
  fetchQueries,
  toggleCallHistory
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CallTakerWindows);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=call-taker-windows.js