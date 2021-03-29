"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printableItinerary = _interopRequireDefault(require("@opentripplanner/printable-itinerary"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _form = require("../../actions/form");

var _api = require("../../actions/api");

var _defaultMap = _interopRequireDefault(require("../map/default-map"));

var _connectedTripDetails = _interopRequireDefault(require("../narrative/connected-trip-details"));

var _state = require("../../util/state");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PrintLayout extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_toggleMap", () => {
      this.setState({
        mapVisible: !this.state.mapVisible
      });
    });

    _defineProperty(this, "_print", () => {
      window.print();
    });

    this.state = {
      mapVisible: true
    };
  }

  componentDidMount() {
    const {
      location,
      parseUrlQueryString
    } = this.props; // Add print-view class to html tag to ensure that iOS scroll fix only applies
    // to non-print views.

    const root = document.getElementsByTagName('html')[0];
    root.setAttribute('class', 'print-view'); // Parse the URL query parameters, if present

    if (location && location.search) {
      parseUrlQueryString();
    }
  }
  /**
   * Remove class attribute from html tag on clean up.
   */


  componentWillUnmount() {
    const root = document.getElementsByTagName('html')[0];
    root.removeAttribute('class');
  }

  render() {
    const {
      config,
      itinerary,
      LegIcon
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "otp print-layout"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "header"
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        float: 'right'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsSize: "small",
      onClick: this._toggleMap
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-map"
    }), " Toggle Map"), ' ', /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsSize: "small",
      onClick: this._print
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "fa fa-print"
    }), " Print")), "Itinerary"), this.state.mapVisible && /*#__PURE__*/_react.default.createElement("div", {
      className: "map-container"
    }, /*#__PURE__*/_react.default.createElement(_defaultMap.default, null)), itinerary && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_printableItinerary.default, {
      config: config,
      itinerary: itinerary,
      LegIcon: LegIcon
    }), /*#__PURE__*/_react.default.createElement(_connectedTripDetails.default, {
      itinerary: itinerary
    })));
  }

} // connect to the redux store


_defineProperty(PrintLayout, "propTypes", {
  itinerary: _propTypes.default.object,
  LegIcon: _propTypes.default.elementType.isRequired,
  parseUrlQueryString: _propTypes.default.func
});

const mapStateToProps = (state, ownProps) => {
  return {
    config: state.otp.config,
    itinerary: (0, _state.getActiveItinerary)(state.otp)
  };
};

const mapDispatchToProps = {
  parseUrlQueryString: _form.parseUrlQueryString,
  routingQuery: _api.routingQuery
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PrintLayout);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=print-layout.js