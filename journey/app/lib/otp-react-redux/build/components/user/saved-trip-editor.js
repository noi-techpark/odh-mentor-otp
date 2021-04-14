"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _stackedPaneDisplay = _interopRequireDefault(require("./stacked-pane-display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This component handles editing of an existing trip.
 */
const SavedTripEditor = ({
  isCreating,
  monitoredTrip,
  onCancel,
  onComplete,
  panes
}) => {
  if (monitoredTrip) {
    const paneSequence = [{
      pane: panes.basics,
      title: 'Trip information'
    }, {
      pane: panes.notifications,
      title: 'Trip notifications'
    }];
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h1", null, isCreating ? 'Save trip' : monitoredTrip.tripName), /*#__PURE__*/_react.default.createElement(_stackedPaneDisplay.default, {
      onCancel: onCancel,
      onComplete: onComplete,
      paneSequence: paneSequence
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h1", null, "Trip Not Found"), /*#__PURE__*/_react.default.createElement("p", null, "Sorry, the requested trip was not found."));
};

var _default = SavedTripEditor;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=saved-trip-editor.js