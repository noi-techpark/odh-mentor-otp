"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var callTakerActions = _interopRequireWildcard(require("../../actions/call-taker"));

var _api = require("../../actions/api");

var _ui = require("../../actions/ui");

var _callTimeCounter = _interopRequireDefault(require("./call-time-counter"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const RED = '#C35134';
const BLUE = '#1C4D89';
const GREEN = '#6B931B';
/**
 * This component displays the controls for the Call Taker/Field Trip modules,
 * including:
 *  - start/end call button
 *  - view call list
 *  TODO
 *  - view field trip list
 */

class CallTakerControls extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClickCall", () => {
      if (this._callInProgress()) this.props.endCall();else this.props.beginCall();
    });

    _defineProperty(this, "_renderCallButton", () => {
      // Show stop button if call not in progress.
      if (this._callInProgress()) {
        return /*#__PURE__*/_react.default.createElement(_icon.default, {
          type: "stop",
          style: {
            marginLeft: '3px'
          },
          className: "fa-3x"
        });
      } // No call is in progress.


      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "plus",
        style: {
          position: 'absolute',
          marginLeft: '17px',
          marginTop: '6px'
        }
      }), /*#__PURE__*/_react.default.createElement(_icon.default, {
        type: "phone",
        className: "fa-4x fa-flip-horizontal"
      }));
    });

    _defineProperty(this, "_onToggleCallHistory", () => this.props.toggleCallHistory());

    _defineProperty(this, "_callInProgress", () => Boolean(this.props.activeCall));
  }

  componentWillReceiveProps(nextProps) {
    const {
      session
    } = nextProps; // Once session is available, fetch calls.

    if (session && !this.props.session) {
      this.props.fetchCalls();
    }
  }

  render() {
    const {
      session
    } = this.props; // If no valid session is found, do not show calltaker controls.

    if (!session) return null; // FIXME: styled component

    const circleButtonStyle = {
      position: 'absolute',
      zIndex: 999999,
      color: 'white',
      borderRadius: '50%',
      border: 'none',
      boxShadow: '2px 2px 4px #000000'
    };
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
      style: { ...circleButtonStyle,
        top: '154px',
        backgroundColor: this._callInProgress() ? RED : BLUE,
        height: '80px',
        width: '80px',
        marginLeft: '-8px'
      },
      className: "call-taker-button",
      onClick: this._onClickCall
    }, this._renderCallButton()), this._callInProgress() ? /*#__PURE__*/_react.default.createElement(_callTimeCounter.default, {
      style: {
        display: 'inline',
        position: 'absolute',
        zIndex: 999999,
        top: '241px',
        borderRadius: '20px',
        backgroundColor: BLUE,
        boxShadow: '2px 2px 4px #000000',
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        width: '80px',
        marginLeft: '-8px'
      }
    }) : null, /*#__PURE__*/_react.default.createElement("button", {
      style: { ...circleButtonStyle,
        top: '140px',
        backgroundColor: GREEN,
        height: '40px',
        width: '40px',
        marginLeft: '69px'
      },
      className: "call-taker-button",
      onClick: this._onToggleCallHistory
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "history",
      className: "fa-2x",
      style: {
        marginLeft: '-3px'
      }
    })));
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    activeCall: state.callTaker.activeCall,
    session: state.callTaker.session
  };
};

const {
  beginCall,
  endCall,
  fetchCalls,
  toggleCallHistory
} = callTakerActions;
const mapDispatchToProps = {
  beginCall,
  endCall,
  fetchCalls,
  routingQuery: _api.routingQuery,
  setMainPanelContent: _ui.setMainPanelContent,
  toggleCallHistory
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CallTakerControls);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=call-taker-controls.js