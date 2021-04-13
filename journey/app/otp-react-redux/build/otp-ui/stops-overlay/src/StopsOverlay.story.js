"use strict";

require("core-js/modules/web.dom.iterable.js");

var _leaflet = require("leaflet");

var _baseMap = _interopRequireDefault(require("@opentripplanner/base-map"));

var _types = require("@opentripplanner/core-utils/src/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _reactLeaflet = require("react-leaflet");

var _addonActions = require("@storybook/addon-actions");

var _addonA11y = require("@storybook/addon-a11y");

var _addonInfo = require("@storybook/addon-info");

var _react2 = require("@storybook/react");

var _faSolid = require("styled-icons/fa-solid");

var _ = _interopRequireDefault(require("."));

var _stops = _interopRequireDefault(require("../__mocks__/stops.json"));

var _stopMarker = _interopRequireDefault(require("./stop-marker"));

require("../../../node_modules/leaflet/dist/leaflet.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const center = [45.523092, -122.671202];
const languageConfig = {
  stopViewer: "View Stop"
};
const refreshStopsAction = (0, _addonActions.action)("refreshStops");

function ExampleMarker({
  stop
}) {
  return /*#__PURE__*/_react.default.createElement(_stopMarker.default, {
    languageConfig: languageConfig,
    setLocation: (0, _addonActions.action)("setLocation"),
    setViewedStop: (0, _addonActions.action)("setViewedStop"),
    stop: stop
  });
}

ExampleMarker.propTypes = {
  stop: _types.stopLayerStopType.isRequired
};

class Example extends _react.Component {
  constructor() {
    super();

    _defineProperty(this, "refreshStops", bounds => {
      const stops = _stops.default.filter(stop => stop.lat < bounds.maxLat && stop.lat > bounds.minLat && stop.lon < bounds.maxLon && stop.lon > bounds.minLon);

      this.setState({
        stops
      });
      refreshStopsAction();
    });

    this.state = {
      stops: []
    };
  }

  render() {
    const {
      StopMarker
    } = this.props;
    const {
      stops
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(_baseMap.default, {
      center: center
    }, /*#__PURE__*/_react.default.createElement(_.default, {
      name: "Transit Stops",
      refreshStops: this.refreshStops,
      StopMarker: StopMarker,
      stops: stops,
      visible: true
    }));
  }

}

Example.propTypes = {
  StopMarker: _propTypes.default.elementType
};
Example.defaultProps = {
  StopMarker: ExampleMarker
};

function CustomMarker({
  stop
}) {
  const iconHtml = _server.default.renderToStaticMarkup(stop.name.indexOf("MAX") > -1 ? /*#__PURE__*/_react.default.createElement(_faSolid.Subway, null) : /*#__PURE__*/_react.default.createElement(_faSolid.Bus, {
    color: "grey"
  }));

  return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Marker, {
    icon: (0, _leaflet.divIcon)({
      html: iconHtml,
      className: ""
    }),
    position: [stop.lat, stop.lon]
  });
}

CustomMarker.propTypes = {
  stop: _types.stopLayerStopType.isRequired
};
(0, _react2.storiesOf)("StopsOverlay", module).addDecorator(_addonA11y.withA11y).addDecorator(_addonInfo.withInfo).add("StopsOverlay with default marker", () => /*#__PURE__*/_react.default.createElement(Example, null)).add("StopsOverlay with custom marker", () => /*#__PURE__*/_react.default.createElement(Example, {
  StopMarker: CustomMarker
}));

//# sourceMappingURL=StopsOverlay.story.js