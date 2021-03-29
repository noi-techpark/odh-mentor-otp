"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RealtimeAnnotation extends _react.Component {
  render() {
    const {
      componentClass,
      realtimeEffects,
      toggleRealtime,
      useRealtime
    } = this.props; // Keep only the unique route IDs (so that duplicates are not listed).

    const filteredRoutes = realtimeEffects.normalRoutes.filter((routeId, index, self) => self.indexOf(routeId) === index); // FIXME: there are some weird css things happening in desktop vs. mobile,
    // so I removed the divs with classNames and opted for h4 and p for now

    const innerContent = /*#__PURE__*/_react.default.createElement("div", {
      className: "realtime-alert"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "content"
    }, /*#__PURE__*/_react.default.createElement("h3", null, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-exclamation-circle"
    }), " Service update"), /*#__PURE__*/_react.default.createElement("p", null, useRealtime ? /*#__PURE__*/_react.default.createElement("span", {
      className: "small"
    }, "Your trip results have been adjusted based on real-time information. Under normal conditions, this trip would take", ' ', /*#__PURE__*/_react.default.createElement("b", null, _coreUtils.default.time.formatDuration(realtimeEffects.normalDuration), " "), "using the following routes:", ' ', filteredRoutes.map((route, idx) => /*#__PURE__*/_react.default.createElement("span", {
      key: idx
    }, /*#__PURE__*/_react.default.createElement("b", null, route), filteredRoutes.length - 1 > idx && ', ')), ".") : /*#__PURE__*/_react.default.createElement("span", {
      className: "small"
    }, "Your trip results are currently being affected by service delays. These delays do not factor into travel times shown below.")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      block: componentClass === 'popover' // display as block in popover
      ,
      className: "toggle-realtime",
      onClick: toggleRealtime
    }, useRealtime ? `Ignore` : `Apply`, " service delays"))));

    if (componentClass === 'popover') {
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.OverlayTrigger, {
        trigger: "click",
        placement: "bottom" // container={this}
        // containerPadding={40}
        ,
        overlay: /*#__PURE__*/_react.default.createElement(_reactBootstrap.Popover, {
          style: {
            maxWidth: '300px'
          },
          id: "popover-positioned-bottom"
        }, innerContent)
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        bsStyle: "link"
      }, /*#__PURE__*/_react.default.createElement("i", {
        className: "fa fa-2x fa-exclamation-circle"
      })));
    } else {
      return innerContent;
    }
  }

}

exports.default = RealtimeAnnotation;

_defineProperty(RealtimeAnnotation, "propTypes", {
  realtimeEffects: _propTypes.default.object,
  toggleRealtime: _propTypes.default.func,
  useRealtime: _propTypes.default.bool
});

module.exports = exports.default;

//# sourceMappingURL=realtime-annotation.js