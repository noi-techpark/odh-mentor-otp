"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactBootstrap = require("react-bootstrap");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _bowser = _interopRequireDefault(require("bowser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TripTools = /*#__PURE__*/function (_Component) {
  _inherits(TripTools, _Component);

  var _super = _createSuper(TripTools);

  function TripTools() {
    _classCallCheck(this, TripTools);

    return _super.apply(this, arguments);
  }

  _createClass(TripTools, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          buttonTypes = _this$props.buttonTypes,
          reportConfig = _this$props.reportConfig,
          reactRouterConfig = _this$props.reactRouterConfig;
      var buttonComponents = [];
      buttonTypes.forEach(function (type) {
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
            var startOverUrl = '/';

            if (reactRouterConfig && reactRouterConfig.basename) {
              startOverUrl += reactRouterConfig.basename;
            }

            buttonComponents.push( /*#__PURE__*/_react.default.createElement(LinkButton, {
              icon: "undo",
              text: "Ricomincia",
              url: startOverUrl
            }));
            break;
        }
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "trip-tools"
      }, buttonComponents.map(function (btn, i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "button-container"
        }, btn);
      }));
    }
  }]);

  return TripTools;
}(_react.Component); // Share/Save Dropdown Component -- not used currently

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

var CopyUrlButton = /*#__PURE__*/function (_Component2) {
  _inherits(CopyUrlButton, _Component2);

  var _super2 = _createSuper(CopyUrlButton);

  function CopyUrlButton(props) {
    var _this;

    _classCallCheck(this, CopyUrlButton);

    _this = _super2.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_resetState", function () {
      return _this.setState({
        showCopied: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onClick", function () {
      // If special routerId has been set in session storage, construct copy URL
      // for itinerary with #/start/ prefix to set routerId on page load.
      var routerId = window.sessionStorage.getItem('routerId');
      var url = window.location.href;

      if (routerId) {
        var parts = url.split('#');

        if (parts.length === 2) {
          url = "".concat(parts[0], "#/start/x/x/x/").concat(routerId).concat(parts[1]);
        } else {
          console.warn('URL not formatted as expected, copied URL will not contain session routerId.', routerId);
        }
      }

      (0, _copyToClipboard.default)(url);

      _this.setState({
        showCopied: true
      });

      window.setTimeout(_this._resetState, 2000);
    });

    _this.state = {
      showCopied: false
    };
    return _this;
  }

  _createClass(CopyUrlButton, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        className: "tool-button",
        onClick: this._onClick
      }, this.state.showCopied ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-check"
      }), " Copied") : /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-clipboard"
      }), " Copia Link")));
    }
  }]);

  return CopyUrlButton;
}(_react.Component); // Print Button Component


var PrintButton = /*#__PURE__*/function (_Component3) {
  _inherits(PrintButton, _Component3);

  var _super3 = _createSuper(PrintButton);

  function PrintButton() {
    var _this2;

    _classCallCheck(this, PrintButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super3.call.apply(_super3, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "_onClick", function () {
      // Note: this is designed to work only with hash routing.
      var printUrl = window.location.href.replace('#', '#/print');
      window.open(printUrl, '_blank');
    });

    return _this2;
  }

  _createClass(PrintButton, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        className: "tool-button",
        onClick: this._onClick
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-print"
      }), " Stampa"));
    }
  }]);

  return PrintButton;
}(_react.Component); // Report Issue Button Component


var ReportIssueButton = /*#__PURE__*/function (_Component4) {
  _inherits(ReportIssueButton, _Component4);

  var _super4 = _createSuper(ReportIssueButton);

  function ReportIssueButton() {
    var _this3;

    _classCallCheck(this, ReportIssueButton);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _super4.call.apply(_super4, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this3), "_onClick", function () {
      var _this3$props = _this3.props,
          mailto = _this3$props.mailto,
          subject = _this3$props.subject;
      var bodyLines = ['                       *** INSTRUCTIONS TO USER ***', 'This feature allows you to email a report to site administrators for review.', "Please add any additional feedback for this trip under the 'Additional Comments'", 'section below and send using your regular email program.', '', 'SEARCH DATA:', 'Address: ' + window.location.href, 'Browser: ' + _bowser.default.name + ' ' + _bowser.default.version, 'OS: ' + _bowser.default.osname + ' ' + _bowser.default.osversion, '', 'ADDITIONAL COMMENTS:', ''];
      window.open("mailto:".concat(mailto, "?subject=").concat(subject, "&body=").concat(encodeURIComponent(bodyLines.join('\n'))), '_self');
    });

    return _this3;
  }

  _createClass(ReportIssueButton, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        className: "tool-button",
        onClick: this._onClick
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-flag"
      }), " Segnala");
    }
  }]);

  return ReportIssueButton;
}(_react.Component); // Link to URL Button


_defineProperty(ReportIssueButton, "defaultProps", {
  subject: 'Reporting an Issue with OpenTripPlanner'
});

var LinkButton = /*#__PURE__*/function (_Component5) {
  _inherits(LinkButton, _Component5);

  var _super5 = _createSuper(LinkButton);

  function LinkButton() {
    var _this4;

    _classCallCheck(this, LinkButton);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _super5.call.apply(_super5, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this4), "_onClick", function () {
      window.location.href = _this4.props.url;
    });

    return _this4;
  }

  _createClass(LinkButton, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          icon = _this$props2.icon,
          text = _this$props2.text;
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        className: "tool-button",
        onClick: this._onClick
      }, icon && /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-".concat(icon)
      }), " "), text));
    }
  }]);

  return LinkButton;
}(_react.Component); // Connect main class to redux store


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    reportConfig: state.otp.config.reportIssue,
    reactRouterConfig: state.otp.config.reactRouter
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(TripTools);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=trip-tools.js
