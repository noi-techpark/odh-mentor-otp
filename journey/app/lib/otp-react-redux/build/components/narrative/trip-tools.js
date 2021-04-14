"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactBootstrap = require("react-bootstrap");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _bowser = _interopRequireDefault(require("bowser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TripTools extends _react.Component {
  render() {
    const {
      buttonTypes,
      reportConfig,
      reactRouterConfig
    } = this.props;
    const buttonComponents = [];
    buttonTypes.forEach(type => {
      switch (type) {
        case 'COPY_URL':
          buttonComponents.push( /*#__PURE__*/_react.default.createElement(CopyUrlButton, null));
          break;

        case 'PRINT':
          buttonComponents.push( /*#__PURE__*/_react.default.createElement(PrintButton, null));
          break;

        case 'REPORT_ISSUE':
          if (!reportConfig || !reportConfig.mailto) break;
          buttonComponents.push( /*#__PURE__*/_react.default.createElement(ReportIssueButton, reportConfig));
          break;

        case 'START_OVER':
          // Determine "home" URL
          let startOverUrl = '/';

          if (reactRouterConfig && reactRouterConfig.basename) {
            startOverUrl += reactRouterConfig.basename;
          }

          buttonComponents.push( /*#__PURE__*/_react.default.createElement(LinkButton, {
            icon: "undo",
            text: "$_restart_$",
            url: startOverUrl
          }));
          break;
      }
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "trip-tools"
    }, buttonComponents.map((btn, i) => /*#__PURE__*/_react.default.createElement("div", {
      key: i,
      className: "button-container"
    }, btn)));
  }

} // Share/Save Dropdown Component -- not used currently

/*
class ShareSaveDropdownButton extends Component {
  _onCopyToClipboardClick = () => {
    copyToClipboard(window.location.href)
  }

  render () {
    return (
      <DropdownButton
        className='tool-button'
        title={<span><i className='fa fa-share' /> Share/Save</span>}
        id={'tool-share-dropdown'}
      >
        <MenuItem onClick={this._onCopyToClipboardClick}>
          <i className='fa fa-clipboard' /> Copy Link to Clipboard
        </MenuItem>
      </DropdownButton>
    )
  }
}
*/
// Copy URL Button


_defineProperty(TripTools, "defaultProps", {
  buttonTypes: ['COPY_URL', 'PRINT', 'REPORT_ISSUE', 'START_OVER']
});

class CopyUrlButton extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_resetState", () => this.setState({
      showCopied: false
    }));

    _defineProperty(this, "_onClick", () => {
      // If special routerId has been set in session storage, construct copy URL
      // for itinerary with #/start/ prefix to set routerId on page load.
      const routerId = window.sessionStorage.getItem('routerId');
      let url = window.location.href;

      if (routerId) {
        const parts = url.split('#');

        if (parts.length === 2) {
          url = `${parts[0]}#/start/x/x/x/${routerId}${parts[1]}`;
        } else {
          console.warn('URL not formatted as expected, copied URL will not contain session routerId.', routerId);
        }
      }

      (0, _copyToClipboard.default)(url);
      this.setState({
        showCopied: true
      });
      window.setTimeout(this._resetState, 2000);
    });

    this.state = {
      showCopied: false
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "tool-button",
      onClick: this._onClick
    }, this.state.showCopied ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-check"
    }), " Copied") : /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-clipboard"
    }), " Copy Link")));
  }

} // Print Button Component


class PrintButton extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClick", () => {
      // Note: this is designed to work only with hash routing.
      const printUrl = window.location.href.replace('#', '#/print');
      window.open(printUrl, '_blank');
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "tool-button",
      onClick: this._onClick
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-print"
    }), " Print"));
  }

} // Report Issue Button Component


class ReportIssueButton extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClick", () => {
      const {
        mailto,
        subject
      } = this.props;
      const bodyLines = ['                       *** INSTRUCTIONS TO USER ***', 'This feature allows you to email a report to site administrators for review.', `Please add any additional feedback for this trip under the 'Additional Comments'`, 'section below and send using your regular email program.', '', 'SEARCH DATA:', 'Address: ' + window.location.href, 'Browser: ' + _bowser.default.name + ' ' + _bowser.default.version, 'OS: ' + _bowser.default.osname + ' ' + _bowser.default.osversion, '', 'ADDITIONAL COMMENTS:', ''];
      window.open(`mailto:${mailto}?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`, '_self');
    });
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "tool-button",
      onClick: this._onClick
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-flag"
    }), " Report Issue");
  }

} // Link to URL Button


_defineProperty(ReportIssueButton, "defaultProps", {
  subject: 'Reporting an Issue with OpenTripPlanner'
});

class LinkButton extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClick", () => {
      window.location.href = this.props.url;
    });
  }

  render() {
    const {
      icon,
      text
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "tool-button",
      onClick: this._onClick
    }, icon && /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("i", {
      className: `fa fa-${icon}`
    }), " "), text));
  }

} // Connect main class to redux store


const mapStateToProps = (state, ownProps) => {
  return {
    reportConfig: state.otp.config.reportIssue,
    reactRouterConfig: state.otp.config.reactRouter
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(TripTools);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trip-tools.js