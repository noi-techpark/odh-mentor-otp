"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _stopViewer = _interopRequireDefault(require("./stop-viewer"));

var _tripViewer = _interopRequireDefault(require("./trip-viewer"));

var _routeViewer = _interopRequireDefault(require("./route-viewer"));

var _ui = require("../../actions/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ViewerContainer extends _react.Component {
  render() {
    const {
      uiState
    } = this.props; // check for main panel content

    if (uiState.mainPanelContent === _ui.MainPanelContent.ROUTE_VIEWER) {
      return /*#__PURE__*/_react.default.createElement(_routeViewer.default, null);
    } // check for stop viewer


    if (uiState.viewedStop) {
      return /*#__PURE__*/_react.default.createElement(_stopViewer.default, null);
    }

    if (uiState.viewedTrip) {
      return /*#__PURE__*/_react.default.createElement(_tripViewer.default, null);
    } // check for trip viewer
    // otherwise, return default content


    return /*#__PURE__*/_react.default.createElement("div", null, this.props.children);
  }

} // connect to the redux store


_defineProperty(ViewerContainer, "propTypes", {
  uiState: _propTypes.default.object
});

const mapStateToProps = (state, ownProps) => {
  return {
    uiState: state.otp.ui
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(ViewerContainer);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=viewer-container.js