"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _linkButton = _interopRequireDefault(require("./link-button"));

var _stackedPaneDisplay = _interopRequireDefault(require("./stacked-pane-display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * This component handles the existing account display.
 */
class ExistingAccountDisplay extends _react.Component {
  render() {
    const {
      onCancel,
      onComplete,
      panes
    } = this.props;
    const paneSequence = [{
      pane: () => /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement(_linkButton.default, {
        to: "/savedtrips"
      }, "Edit my trips")),
      title: 'My trips'
    }, {
      pane: panes.terms,
      props: {
        disableCheckTerms: true
      },
      title: 'Terms'
    }, {
      pane: panes.notifications,
      title: 'Notifications'
    }, {
      pane: panes.locations,
      title: 'My locations'
    }];
    return /*#__PURE__*/_react.default.createElement(_stackedPaneDisplay.default, {
      onCancel: onCancel,
      onComplete: onComplete,
      paneSequence: paneSequence,
      title: "My Account"
    });
  }

}

var _default = ExistingAccountDisplay;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=existing-account-display.js