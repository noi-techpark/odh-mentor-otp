"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _leaflet = require("leaflet");

var _map = require("@opentripplanner/core-utils/lib/map");

var _types = require("@opentripplanner/core-utils/lib/types");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactLeaflet = require("react-leaflet");

var _server = _interopRequireDefault(require("react-dom/server"));

var _faSolid = require("styled-icons/fa-solid");

var Styled = _interopRequireWildcard(require("./styled"));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function () {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/**
 * These icons are used to render common icons for user locations. These will
 * only show up in applications that allow saving user locations.
 */


function UserLocationIcon({
  type
}) {
  switch (type) {
    case "briefcase":
      return /*#__PURE__*/_react.default.createElement(_faSolid.Briefcase, {
        size: 12
      });

    case "home":
      return /*#__PURE__*/_react.default.createElement(_faSolid.Home, {
        size: 12
      });

    case "map-marker":
      return /*#__PURE__*/_react.default.createElement(_faSolid.MapMarkerAlt, {
        size: 12
      });

    case "refresh":
      return /*#__PURE__*/_react.default.createElement(_faSolid.Sync, {
        size: 12
      });

    case "times":
      return /*#__PURE__*/_react.default.createElement(_faSolid.Times, {
        size: 12
      });

    default:
      return null;
  }
}

UserLocationIcon.propTypes = {
  type: _propTypes.default.string.isRequired
};

class Endpoint extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "rememberAsHome", () => {
      const {
        location: propsLocation,
        rememberPlace
      } = this.props;
      const location = { ...propsLocation
      };
      location.id = "home";
      location.icon = "home";
      location.type = "home";
      rememberPlace({
        type: "home",
        location
      });
    });

    _defineProperty(this, "rememberAsWork", () => {
      const {
        location: propsLocation,
        rememberPlace
      } = this.props;
      const location = { ...propsLocation
      };
      location.id = "work";
      location.icon = "briefcase";
      location.type = "work";
      rememberPlace({
        type: "work",
        location
      });
    });

    _defineProperty(this, "forgetHome", () => {
      const {
        forgetPlace
      } = this.props;
      forgetPlace("home");
    });

    _defineProperty(this, "forgetWork", () => {
      const {
        forgetPlace
      } = this.props;
      forgetPlace("work");
    });

    _defineProperty(this, "clearLocation", () => {
      const {
        clearLocation,
        type
      } = this.props;
      clearLocation({
        type
      });
    });

    _defineProperty(this, "swapLocation", () => {
      const {
        location,
        setLocation,
        type
      } = this.props;
      this.clearLocation();
      const otherType = type === "from" ? "$_destination_$" : "$_origin_$";
      setLocation({
        type: otherType,
        location
      });
    });

    _defineProperty(this, "onDragEnd", e => {
      const {
        setLocation,
        type
      } = this.props;
      const location = (0, _map.constructLocation)(e.target.getLatLng());
      setLocation({
        locationType: type,
        location,
        reverseGeocode: true
      });
    });
  }

  render() {
    const {
      location,
      locations,
      MapMarkerIcon,
      showUserSettings,
      type
    } = this.props;
    const position = location && location.lat && location.lon ? [location.lat, location.lon] : null;
    if (!position) return null;
    const match = locations.find(l => (0, _map.matchLatLon)(l, location));
    const isWork = match && match.type === "work";
    const isHome = match && match.type === "home";

    const iconHtml = _server.default.renderToStaticMarkup( /*#__PURE__*/_react.default.createElement(MapMarkerIcon, {
      location: location,
      type: type
    }));

    const otherType = type === "from" ? "$_destination_$" : "$_origin_$";
    const originalType = type === "from" ? "$_origin_$" : "$_destination_$";
    const icon = isWork ? "briefcase" : isHome ? "home" : "map-marker";
    return /*#__PURE__*/_react.default.createElement(_reactLeaflet.Marker, {
      draggable: true,
      icon: (0, _leaflet.divIcon)({
        html: iconHtml,
        className: ""
      }),
      position: position,
      onDragEnd: this.onDragEnd
    }, showUserSettings && /*#__PURE__*/_react.default.createElement(_reactLeaflet.Popup, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("strong", null, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: icon
    }), " ", location.name), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Styled.Button, {
      disabled: isWork,
      onClick: isHome ? this.forgetHome : this.rememberAsHome
    }, isHome ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "times"
    }), " $_forget_home_$") : /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "home"
    }), " $_save_as_home_$"))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Styled.Button, {
      disabled: isHome,
      onClick: isWork ? this.forgetWork : this.rememberAsWork
    }, isWork ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "times"
    }), " $_forget_work_$") : /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "briefcase"
    }), " $_save_as_work_$"))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Styled.Button, {
      onClick: this.clearLocation
    }, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "times"
    }), " $_remove_as_$ ", originalType, "")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(Styled.Button, {
      onClick: this.swapLocation
    }, /*#__PURE__*/_react.default.createElement(UserLocationIcon, {
      type: "refresh"
    }), " $_change_as_$ ", otherType, " ", "")))));
  }

} // See documenation in main index file for documenation on these props.


exports.default = Endpoint;
Endpoint.propTypes = {
  clearLocation: _propTypes.default.func.isRequired,
  forgetPlace: _propTypes.default.func.isRequired,
  location: _types.locationType,
  locations: _propTypes.default.arrayOf(_types.locationType).isRequired,
  MapMarkerIcon: _propTypes.default.elementType.isRequired,
  rememberPlace: _propTypes.default.func.isRequired,
  setLocation: _propTypes.default.func.isRequired,
  showUserSettings: _propTypes.default.bool.isRequired,
  type: _propTypes.default.string.isRequired
};
Endpoint.defaultProps = {
  location: undefined
};
module.exports = exports.default;

//# sourceMappingURL=endpoint.js