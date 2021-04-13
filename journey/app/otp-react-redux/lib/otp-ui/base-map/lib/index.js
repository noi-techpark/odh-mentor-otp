"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLeaflet = require("react-leaflet");

var _coreUtils = _interopRequireDefault(require("@opentripplanner/core-utils"));

var _leaflet = _interopRequireDefault(require("leaflet"));

var _util = _interopRequireDefault(require("./util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * panToOffset will allow you to pan the map and adjust for something like a floating
 * left nav bar, or a page header with an offset center
 *
 * @note adapted from Peter's code: https://gist.github.com/missinglink/7620340
 *
 * @param latlng
 * @param offsetX & offsetY: defaults to [0, 0] ([X, Y] pixel offsets center) a positive x
 * offset to shift the center to the right, and a positive y offset to shift the center to the
 * bottom. Negatives will move to the center point left and top.
 * @param options: pan options https://leafletjs.com/reference.html#pan-options
 * @return return value from a call to https://leafletjs.com/reference.html#map-panto
 */
_leaflet.default.Map.prototype.panToOffset = function (latlng, offsetX, offsetY, options) {
  const x = this.latLngToContainerPoint(latlng).x - (parseInt(offsetX, 10) || 0);
  const y = this.latLngToContainerPoint(latlng).y - (parseInt(offsetY, 10) || 0);
  const point = this.containerPointToLatLng([x, y]);
  /* eslint-disable-next-line no-underscore-dangle */

  return this.setView(point, this._zoom, {
    pan: options
  });
}; // eslint-disable-next-line func-names


_leaflet.default.Evented.addInitHook(function () {
  if (this) this.singleClickTimeout = null;
  this.on("click", this.scheduleSingleClick, this);
  this.on("dblclick dragstart zoomstart", this.cancelSingleClick, this);
});

_leaflet.default.Evented.include({
  cancelSingleClick() {
    // This timeout is key to workaround an issue where double-click events
    // are fired in this order on some touch browsers: ['click', 'dblclick', 'click']
    // instead of ['click', 'click', 'dblclick']
    setTimeout(this.clearSingleClickTimeout.bind(this), 0);
  },

  scheduleSingleClick(e) {
    this.clearSingleClickTimeout();
    this.singleClickTimeout = setTimeout(this.fireSingleClick.bind(this, e), this.options.singleClickTimeout || 500);
  },

  fireSingleClick(e) {
    // eslint-disable-next-line no-underscore-dangle
    if (!e.originalEvent._stopped) {
      this.fire("singleclick", _leaflet.default.Util.extend(e, {
        type: "singleclick"
      }));
    }
  },

  clearSingleClickTimeout() {
    if (this.singleClickTimeout !== null) {
      clearTimeout(this.singleClickTimeout);
      this.singleClickTimeout = null;
    }
  }

});
/**
 * The base OpenTripPlanner map on which everything else is rendered.
 */


class BaseMap extends _react.Component {
  constructor(props) {
    super(props); // Default active base layer index to zero (first layer).
    // TODO: derive layerIndex from props?

    _defineProperty(this, "overlays", []);

    _defineProperty(this, "showMapboxWordmark", () => {
      const {
        baseLayers
      } = this.props;
      const {
        layerIndex
      } = this.state; // Get current layer and check its URL.

      const activeLayer = baseLayers[layerIndex];
      return activeLayer && activeLayer.url.startsWith("//api.mapbox.com");
    });

    _defineProperty(this, "onLeftClick", e => {
      const {
        onClick
      } = this.props;
      (0, _util.default)(onClick)(e);
    });

    _defineProperty(this, "forwardOne", (eventName, e) => {
      // Call the event handler, if implemented, on the layer for which this event applies.
      const layer = this.overlays.find(child => child.props.name === e.name);
      if (layer) (0, _util.default)(layer[eventName])(e); // Call the event handler on this control's parent element.
      // eslint-disable-next-line react/destructuring-assignment

      (0, _util.default)(this.props[eventName])(e);
    });

    _defineProperty(this, "forwardAll", (eventName, e) => {
      // Call the event handler, if implemented, on each registered overlay.
      this.overlays.forEach(layer => {
        (0, _util.default)(layer[eventName])(e);
      }); // Call the event handler on this control's parent element.
      // eslint-disable-next-line react/destructuring-assignment

      (0, _util.default)(this.props[eventName])(e);
    });

    _defineProperty(this, "handleBaseLayerChange", e => {
      const {
        baseLayers,
        onBaseLayerChange
      } = this.props; // Find layer index

      const index = baseLayers.findIndex(l => l.name === e.name);
      const layer = baseLayers[index]; // Call prop if exists.

      if (typeof onBaseLayerChange === "function") {
        onBaseLayerChange({
          index,
          layer
        });
      } // Update active index in state.


      this.setState({
        layerIndex: index
      });
    });

    _defineProperty(this, "handleOverlayAdded", e => {
      this.forwardOne("onOverlayAdded", e);
    });

    _defineProperty(this, "handleOverlayRemoved", e => {
      this.forwardOne("onOverlayRemoved", e);
    });

    _defineProperty(this, "handleViewportChanged", e => {
      this.forwardAll("onViewportChanged", e);
    });

    _defineProperty(this, "registerOverlay", overlay => {
      this.overlays.push(overlay);
    });

    this.state = {
      layerIndex: 0
    };
  }

  componentDidMount() {
    // register single click event
    const lmap = this.refs.map.leafletElement;
    lmap.options.singleClickTimeout = 250;
    lmap.on("singleclick", this.onLeftClick);
  }

  componentDidUpdate() {} // remove custom overlays on unmount
  // TODO: Is this needed? It may have something to do with mobile vs desktop views


  componentWillUnmount() {
    const lmap = this.refs.map.leafletElement;
    lmap.eachLayer(layer => {
      // Do not inline, there is a 'this' implied.
      lmap.removeLayer(layer);
    });
  }
  /**
   * Returns whether to show the Mapbox wordmark (if the current layer's URL is
   * a Mapbox url).
   */


  render() {
    const {
      baseLayers,
      center,
      children,
      maxZoom,
      popup,
      onContextMenu,
      onPopupClosed,
      zoom
    } = this.props;
    const {
      layerIndex
    } = this.state; // Separate overlay layers into user-controlled (those with a checkbox in
    // the layer control) and those that are needed by the app (e.g., stop viewer
    // and itinerary overlay).

    const userControlledOverlays = [];
    const fixedOverlays = [];

    _react.default.Children.toArray(children).forEach(child => {
      if (child.props.name) {
        const newChild = /*#__PURE__*/_react.default.cloneElement(child, {
          // Inject registerOverlay prop to each custom overlay.
          registerOverlay: this.registerOverlay
        });

        userControlledOverlays.push(newChild);
      } else fixedOverlays.push(child);
    });

    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Map, {
      ref: "map",
      className: "map",
      center: center,
      zoom: zoom,
      maxZoom: maxZoom // onClick={this.onLeftClick}
      // Note: Map-click is handled via single-click plugin, set up in componentDidMount()
      ,
      onContextMenu: onContextMenu,
      onOverlayAdd: this.handleOverlayAdded,
      onBaseLayerChange: this.handleBaseLayerChange,
      onOverlayRemove: this.handleOverlayRemoved,
      onViewportChanged: this.handleViewportChanged
    }, this.showMapboxWordmark() && /*#__PURE__*/_react.default.createElement("a", {
      href: "http://mapbox.com/about/maps",
      className: "mapbox-wordmark",
      target: "_blank noopener noreferrer"
    }, "Mapbox"), /*#__PURE__*/_react.default.createElement(_reactLeaflet.LayersControl, {
      position: "topright"
    }, baseLayers && baseLayers.map((layer, i) => {
      return /*#__PURE__*/_react.default.createElement(_reactLeaflet.LayersControl.BaseLayer, {
        name: layer.name,
        checked: i === layerIndex,
        key: i
      }, layer.retina ? /*#__PURE__*/_react.default.createElement(_reactLeaflet.TileLayer, {
        url: layer.url,
        attribution: layer.attribution,
        retina: layer.retina,
        maxZoom: layer.maxZoom,
        tileSize: 512,
        zoomOffset: -1,
        detectRetina: layer.detectRetina
      }) : /*#__PURE__*/_react.default.createElement(_reactLeaflet.TileLayer, {
        url: layer.url,
        attribution: layer.attribution,
        maxZoom: layer.maxZoom,
        detectRetina: layer.detectRetina
      }));
    }), userControlledOverlays.map((child, i) => /*#__PURE__*/_react.default.createElement(_reactLeaflet.LayersControl.Overlay, {
      key: i,
      name: child.props.name,
      checked: child.props.visible
    }, child))), fixedOverlays, popup && popup.location && popup.contents && /*#__PURE__*/_react.default.createElement(_reactLeaflet.Popup, {
      position: popup.location,
      onClose: onPopupClosed
    }, popup.contents));
  }

}

BaseMap.propTypes = {
  /**
   * Zero, one, or multiple components that extend { MapLayer } from 'react-leaflet'.
   * Children can be overlays or loose markers.
   */
  children: _propTypes.default.oneOfType([// Ideally, the types below should be MapLayer,
  // however, during type validation in the browser,
  // MapLayer components all seem to resolve to Object.
  _propTypes.default.node, _propTypes.default.arrayOf(_propTypes.default.node)]),

  /**
   * The base (background) layers for the map.
   */
  baseLayers: _propTypes.default.arrayOf(_propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    url: _propTypes.default.string.isRequired,
    subdomains: _propTypes.default.string,
    attribution: _propTypes.default.string,
    maxZoom: _propTypes.default.number,
    hasRetinaSupport: _propTypes.default.bool
  })),

  /**
   * The center of the map, as a [lat, lng] array.
   */
  center: _coreUtils.default.types.latlngType.isRequired,

  /**
   * The maximum zoom level allowed on the map.
   */
  maxZoom: _propTypes.default.number,

  /**
   * Triggered when the user changes the active base layer.
   * See https://leafletjs.com/reference-1.7.1.html#map-baselayerchange
   */
  onBaseLayerChange: _propTypes.default.func,

  /**
   * Triggered when the user clicks on the map.
   * See https://leafletjs.com/reference-1.6.0.html#map-click for details.
   */
  onClick: _propTypes.default.func,

  /**
   * Triggered when the user right-clicks on the map or, on a mobile device, presses the map for a second ("long-press").
   * See https://leafletjs.com/reference-1.6.0.html#map-contextmenu for details.
   */
  onContextMenu: _propTypes.default.func,

  /**
   * Triggered when the user makes an overlay visible using the map's layers control.
   * See https://leafletjs.com/reference-1.6.0.html#map-overlayadd for details.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  onOverlayAdded: _propTypes.default.func,

  /**
   * Triggered when the user hides an overlay using the map's layers control.
   * See https://leafletjs.com/reference-1.6.0.html#map-overlayremove for details.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  onOverlayRemoved: _propTypes.default.func,

  /**
   * Triggered when the user closes the popup (if `popupLocation` and `popupContent` have been set).
   */
  onPopupClosed: _propTypes.default.func,

  /**
   * Triggered when the user pans the map or changes zoom level.
   * See https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/viewport.js for more details.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  onViewportChanged: _propTypes.default.func,

  /**
   * The contents and location (in [lat, lng] format) of the popup to display, or null if no popup is displayed.
   */
  popup: _propTypes.default.shape({
    contents: _propTypes.default.node.isRequired,
    location: _coreUtils.default.types.latlngType.isRequired
  }),

  /**
   * The zoom level of the map.
   */
  zoom: _propTypes.default.number
};
BaseMap.defaultProps = {
  children: null,
  baseLayers: [{
    name: "Streets",
    url: "//cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png",
    attribution: 'Map tiles: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 20 // FIXME?? CartoDB displays characters proportionally too large
    // on regular monitors (1080p or lower) when using the "retina" parameters below.
    // (That does not happen on "retina" displays such as Macbook or mobile phones.)
    // url:
    //  "//cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{retina}.png",
    // retina: "@2x",
    // detectRetina: true

  }],
  maxZoom: 20,
  onBaseLayerChange: null,
  onClick: null,
  onContextMenu: null,
  onOverlayAdded: null,
  onOverlayRemoved: null,
  onPopupClosed: null,
  onViewportChanged: null,
  popup: null,
  zoom: 13
};
var _default = BaseMap;
exports.default = _default;