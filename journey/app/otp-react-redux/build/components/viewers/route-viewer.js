"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactBootstrap = require("react-bootstrap");

var _velocityReact = require("velocity-react");

var _reactRedux = require("react-redux");

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _ui = require("../../actions/ui");

var _api = require("../../actions/api");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function operatorIndexForRoute(transitOperators, route) {
  if (!route.agency) return 0;
  const index = transitOperators.findIndex(o => o.id.toLowerCase() === route.agency.id.split(':')[0].toLowerCase());
  if (index !== -1 && typeof transitOperators[index].order !== 'undefined') return transitOperators[index].order;else return 0;
}
/**
 * Determine the appropriate contrast color for text (white or black) based on
 * the input hex string (e.g., '#ff00ff') value.
 *
 * From https://stackoverflow.com/a/11868398/915811
 *
 * TODO: Move to @opentripplanner/core-utils once otp-rr uses otp-ui library.
 */


function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace('#', '');
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '000000' : 'ffffff';
}

class RouteViewer extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_backClicked", () => this.props.setMainPanelContent(null));
  }

  componentDidMount() {
    this.props.findRoutes();
  }

  render() {
    const {
      findRoute,
      hideBackButton,
      languageConfig,
      transitOperators,
      routes,
      setViewedRoute,
      viewedRoute
    } = this.props;
    const sortedRoutes = routes ? Object.values(routes).sort(_coreUtils.default.route.routeComparator) : [];
    const agencySortedRoutes = transitOperators.length > 0 ? sortedRoutes.sort((a, b) => {
      return operatorIndexForRoute(transitOperators, a) - operatorIndexForRoute(transitOperators, b);
    }) : sortedRoutes;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "route-viewer"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "route-viewer-header"
    }, !hideBackButton && /*#__PURE__*/_react.default.createElement("div", {
      className: "back-button-container"
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsSize: "small",
      onClick: this._backClicked
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "arrow-left"
    }), "Back")), /*#__PURE__*/_react.default.createElement("div", {
      className: "header-text"
    }, languageConfig.routeViewer || 'Visualizza Linee'), /*#__PURE__*/_react.default.createElement("div", {
      className: ""
    }, languageConfig.routeViewerDetails), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        clear: 'both'
      }
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "route-viewer-body"
    }, agencySortedRoutes.map(route => {
      // Find operator based on agency_id (extracted from OTP route ID).
      // TODO: re-implement multi-agency logos for route viewer.
      // const operator = operatorForRoute(transitOperators, route) || {}
      return /*#__PURE__*/_react.default.createElement(RouteRow, {
        findRoute: findRoute,
        isActive: viewedRoute && viewedRoute.routeId === route.id,
        key: route.id // operator={operator}
        ,
        route: route,
        setViewedRoute: setViewedRoute
      });
    })));
  }

}

_defineProperty(RouteViewer, "propTypes", {
  hideBackButton: _propTypes.default.bool,
  routes: _propTypes.default.object
});

class RouteRow extends _react.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_onClick", () => {
      const {
        findRoute,
        isActive,
        route,
        setViewedRoute
      } = this.props;

      if (isActive) {
        // Deselect current route if active.
        setViewedRoute({
          routeId: null
        });
      } else {
        // Otherwise, set active and fetch route patterns.
        findRoute({
          routeId: route.id
        });
        setViewedRoute({
          routeId: route.id
        });
      }
    });
  }

  render() {
    const {
      isActive,
      route,
      operator
    } = this.props;
    const {
      defaultRouteColor,
      defaultRouteTextColor,
      longNameSplitter
    } = operator || {};
    const backgroundColor = `#${defaultRouteColor || route.color || 'ffffff'}`; // NOTE: text color is not a part of short response route object, so there
    // is no way to determine from OTP what the text color should be if the
    // background color is, say, black. Instead, determine the appropriate
    // contrast color and use that if no text color is available.

    const contrastColor = getContrastYIQ(backgroundColor);
    const color = `#${defaultRouteTextColor || route.textColor || contrastColor}`; // Default long name is empty string (long name is an optional GTFS value).

    let longName = '';

    if (route.longName) {
      // Attempt to split route name if splitter is defined for operator (to
      // remove short name value from start of long name value).
      const nameParts = route.longName.split(longNameSplitter);
      longName = longNameSplitter && nameParts.length > 1 ? nameParts[1] : route.longName; // If long name and short name are identical, set long name to be an empty
      // string.

      if (longName === route.shortName) longName = '';
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        borderBottom: '1px solid gray',
        backgroundColor: isActive ? '#f6f8fa' : 'white'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      className: "clear-button-formatting",
      style: {
        padding: 8,
        width: '100%'
      },
      onClick: this._onClick
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'inline-block'
      }
    }), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'inline-block',
        marginTop: '2px'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Label, {
      style: {
        backgroundColor: backgroundColor === '#ffffff' ? 'rgba(0,0,0,0)' : backgroundColor,
        fontSize: 'medium',
        fontWeight: 400,
        color
      }
    }, /*#__PURE__*/_react.default.createElement("b", null, route.shortName), " ", longName))), /*#__PURE__*/_react.default.createElement(_velocityReact.VelocityTransitionGroup, {
      enter: {
        animation: 'slideDown'
      },
      leave: {
        animation: 'slideUp'
      }
    }, isActive && /*#__PURE__*/_react.default.createElement("div", {
      style: {
        padding: 8
      }
    }, route.url ? /*#__PURE__*/_react.default.createElement("a", {
      href: route.url,
      target: "_blank"
    }, "Route Details") : 'No route URL provided.')));
  }

} // connect to redux store


const mapStateToProps = (state, ownProps) => {
  return {
    transitOperators: state.otp.config.transitOperators,
    routes: state.otp.transitIndex.routes,
    viewedRoute: state.otp.ui.viewedRoute,
    languageConfig: state.otp.config.language
  };
};

const mapDispatchToProps = {
  findRoute: _api.findRoute,
  findRoutes: _api.findRoutes,
  setMainPanelContent: _ui.setMainPanelContent,
  setViewedRoute: _ui.setViewedRoute
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RouteViewer);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=route-viewer.js