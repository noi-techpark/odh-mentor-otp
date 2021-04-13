"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = _interopRequireDefault(require("../../otp-ui/core-utils/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _messages = require("../../util/messages");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SettingsPreview extends _react.Component {
  render() {
    const {
      caret,
      config,
      query,
      editButtonText
    } = this.props;
    const messages = (0, _messages.mergeMessages)(SettingsPreview.defaultProps, this.props); // Show dot indicator if the current query differs from the default query.

    let showDot = _src.default.query.isNotDefaultQuery(query, config);

    const button = /*#__PURE__*/_react.default.createElement("div", {
      className: "button-container"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      "aria-label": messages.label.replace('\n', ' '),
      onClick: this.props.onClick
    }, editButtonText, caret && /*#__PURE__*/_react.default.createElement("span", null, " ", /*#__PURE__*/_react.default.createElement("i", {
      className: `fa fa-caret-${caret}`
    }))), showDot && /*#__PURE__*/_react.default.createElement("div", {
      className: "dot"
    })); // Add tall class to account for vertical centering if there is only
    // one line in the label (default is 2).


    const addClass = messages.label.match(/\n/) ? '' : ' tall';
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "settings-preview",
      onClick: this.props.onClick
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `summary${addClass}`
    }, messages.label), button, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        clear: 'both'
      }
    }));
  }

}

_defineProperty(SettingsPreview, "propTypes", {
  // component props
  caret: _propTypes.default.string,
  compressed: _propTypes.default.bool,
  editButtonText: _propTypes.default.element,
  showCaret: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  // application state
  companies: _propTypes.default.string,
  modeGroups: _propTypes.default.array,
  queryModes: _propTypes.default.array
});

_defineProperty(SettingsPreview, "defaultProps", {
  editButtonText: /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-pencil"
  }),
  messages: {
    label: '$_settings_$'
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    config: state.otp.config,
    messages: state.otp.config.language.settingsPreview,
    query: state.otp.currentQuery
  };
};

const mapDispatchToProps = {};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SettingsPreview);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=settings-preview.js