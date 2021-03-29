"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactBootstrap = require("react-bootstrap");

var _defaultMap = _interopRequireDefault(require("./default-map"));

var _legDiagram = _interopRequireDefault(require("./leg-diagram"));

var _stylizedMap = _interopRequireDefault(require("./stylized-map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Map extends _react.Component {
  constructor() {
    super();
    this.state = {
      activeViewIndex: 0
    };
  }

  getComponentForView(view) {
    // TODO: allow a 'CUSTOM' type
    switch (view.type) {
      case 'DEFAULT':
        return /*#__PURE__*/_react.default.createElement(_defaultMap.default, null);

      case 'STYLIZED':
        return /*#__PURE__*/_react.default.createElement(_stylizedMap.default, null);
    }
  }

  render() {
    const {
      diagramLeg,
      mapConfig
    } = this.props;
    const showDiagram = diagramLeg; // Use the views defined in the config; if none defined, just show the default map

    const views = mapConfig.views || [{
      type: 'DEFAULT'
    }];
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "map-container"
    }, views.map((view, i) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: i,
        className: "map-container",
        style: {
          visibility: i === this.state.activeViewIndex ? 'visible' : 'hidden'
        }
      }, this.getComponentForView(view));
    }), views.length > 1 && /*#__PURE__*/_react.default.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 12 + (showDiagram ? 192 : 0),
        left: 12,
        zIndex: 100000
      }
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.ButtonGroup, null, views.map((view, i) => {
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
        key: i,
        bsSize: "xsmall",
        bsStyle: i === this.state.activeViewIndex ? 'success' : 'default',
        style: {
          padding: '3px 6px'
        },
        onClick: () => {
          this.setState({
            activeViewIndex: i
          });
        }
      }, view.text || view.type);
    }))), showDiagram && /*#__PURE__*/_react.default.createElement(_legDiagram.default, {
      leg: diagramLeg
    }));
  }

} // Connect to Redux store


const mapStateToProps = (state, ownProps) => {
  return {
    diagramLeg: state.otp.ui.diagramLeg,
    mapConfig: state.otp.config.map
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(Map);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=map.js