"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _formNavigationButtons = _interopRequireDefault(require("./form-navigation-buttons"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Styles.
// TODO: Improve layout.
const PaneContainer = _styledComponents.default.div`
  min-height: 20em;
`;
/**
 * This component handles the flow between screens for new OTP user accounts.
 */

class SequentialPaneDisplay extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_handleToNextPane", () => {
      const {
        onComplete,
        paneSequence
      } = this.props;
      const {
        activePaneId
      } = this.state;
      const nextId = paneSequence[activePaneId].nextId;

      if (nextId) {
        this.setState({
          activePaneId: nextId
        });
      } else if (onComplete) {
        onComplete();
      }
    });

    _defineProperty(this, "_handleToPrevPane", () => {
      const {
        paneSequence
      } = this.props;
      const {
        activePaneId
      } = this.state;
      this.setState({
        activePaneId: paneSequence[activePaneId].prevId
      });
    });

    this.state = {
      activePaneId: props.initialPaneId
    };
  }

  render() {
    const {
      paneSequence
    } = this.props;
    const {
      activePaneId
    } = this.state;
    const activePane = paneSequence[activePaneId];
    const {
      disableNext,
      nextId,
      pane: Pane,
      prevId,
      props,
      title
    } = activePane;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h1", null, title), /*#__PURE__*/_react.default.createElement(PaneContainer, null, /*#__PURE__*/_react.default.createElement(Pane, props)), /*#__PURE__*/_react.default.createElement(_formNavigationButtons.default, {
      backButton: prevId && {
        onClick: this._handleToPrevPane,
        text: 'Back'
      },
      okayButton: {
        disabled: disableNext,
        onClick: this._handleToNextPane,
        text: nextId ? 'Next' : 'Finish'
      }
    }));
  }

}

_defineProperty(SequentialPaneDisplay, "propTypes", {
  initialPaneId: _propTypes.default.string.isRequired,
  onComplete: _propTypes.default.func.isRequired,
  paneSequence: _propTypes.default.object.isRequired
});

var _default = SequentialPaneDisplay;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=sequential-pane-display.js