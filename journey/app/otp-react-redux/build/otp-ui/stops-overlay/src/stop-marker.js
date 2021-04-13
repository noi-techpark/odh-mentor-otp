"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var BaseMapStyled = _interopRequireWildcard(require("../../base-map/src/styled"));

var _types = require("../../core-utils/src/types");

var _src = _interopRequireDefault(require("../../from-to-location-picker/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactLeaflet = require("react-leaflet");

var Styled = _interopRequireWildcard(require("./styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class StopMarker extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClickView", () => {
      const {
        setViewedStop,
        stop
      } = this.props;
      setViewedStop({
        stopId: stop.id
      });
    });

    _defineProperty(this, "onFromClick", () => {
      this.setLocation("from");
    });

    _defineProperty(this, "onToClick", () => {
      this.setLocation("to");
    });
  }

  setLocation(locationType) {
    const {
      setLocation,
      stop
    } = this.props;
    const {
      lat,
      lon,
      name
    } = stop;
    setLocation({
      location: {
        lat,
        lon,
        name
      },
      locationType
    });
  }

  render() {
    const {
      languageConfig,
      leafletPath,
      radius,
      stop
    } = this.props;
    const {
      id,
      name,
      lat,
      lon
    } = stop;
    const idArr = id.split(":");
    const agency = idArr[0];
    const stopId = idArr.pop();
    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.CircleMarker
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    , _extends({}, leafletPath, {
      center: [lat, lon],
      radius: radius
    }), /*#__PURE__*/_react.default.createElement(_reactLeaflet.Popup, null, /*#__PURE__*/_react.default.createElement(BaseMapStyled.MapOverlayPopup, null, /*#__PURE__*/_react.default.createElement(BaseMapStyled.PopupTitle, null, name), /*#__PURE__*/_react.default.createElement(BaseMapStyled.PopupRow, null), /*#__PURE__*/_react.default.createElement(BaseMapStyled.PopupRow, null, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("b", null, "Stop ID:"), " ", stopId), /*#__PURE__*/_react.default.createElement(Styled.ViewStopButton, {
      onClick: this.onClickView
    }, languageConfig.stopViewer || "Fermata")), /*#__PURE__*/_react.default.createElement(BaseMapStyled.PopupRow, null, /*#__PURE__*/_react.default.createElement("b", null, "$_travel_$"), /*#__PURE__*/_react.default.createElement(_src.default, {
      onFromClick: this.onFromClick,
      onToClick: this.onToClick
    })))));
  }

}

exports.default = StopMarker;
StopMarker.propTypes = {
  languageConfig: _types.languageConfigType.isRequired,
  leafletPath: _types.leafletPathType,
  radius: _propTypes.default.number,
  setLocation: _propTypes.default.func.isRequired,
  setViewedStop: _propTypes.default.func.isRequired,
  stop: _types.stopLayerStopType.isRequired
};
StopMarker.defaultProps = {
  leafletPath: {
    color: "#000",
    fillColor: "#FFF",
    fillOpacity: 1,
    weight: 1
  },
  radius: 5
};
module.exports = exports.default;

//# sourceMappingURL=stop-marker.js