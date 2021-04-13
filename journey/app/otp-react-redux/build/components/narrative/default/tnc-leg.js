"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _currencyFormatter = _interopRequireDefault(require("currency-formatter"));

var _src = _interopRequireDefault(require("../../../otp-ui/core-utils/src"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _api = require("../../../actions/api");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  toSentenceCase
} = _src.default.itinerary;
const {
  formatDuration
} = _src.default.time;
const {
  isMobile
} = _src.default.ui;

class TransportationNetworkCompanyLeg extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {});
  }

  render() {
    const {
      leg,
      legMode,
      LYFT_CLIENT_ID,
      UBER_CLIENT_ID
    } = this.props;
    const universalLinks = {
      'UBER': `https://m.uber.com/${isMobile() ? 'ul/' : ''}?client_id=${UBER_CLIENT_ID}&action=setPickup&pickup[latitude]=${leg.from.lat}&pickup[longitude]=${leg.from.lon}&pickup[nickname]=${encodeURI(leg.from.name)}&dropoff[latitude]=${leg.to.lat}&dropoff[longitude]=${leg.to.lon}&dropoff[nickname]=${encodeURI(leg.to.name)}`,
      'LYFT': `https://lyft.com/ride?id=${defaultTncRideTypes['LYFT']}&partner=${LYFT_CLIENT_ID}&pickup[latitude]=${leg.from.lat}&pickup[longitude]=${leg.from.lon}&destination[latitude]=${leg.to.lat}&destination[longitude]=${leg.to.lon}`
    };
    const {
      tncData
    } = leg;
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, "* estimated travel time does not account for traffic."), /*#__PURE__*/_react.default.createElement("a", {
      className: "btn btn-default",
      href: universalLinks[legMode.label.toUpperCase()],
      style: {
        marginBottom: 15
      },
      target: isMobile() ? '_self' : '_blank'
    }, "Book Ride"), tncData && tncData.estimatedArrival ? /*#__PURE__*/_react.default.createElement("p", null, "ETA for a driver: ", formatDuration(tncData.estimatedArrival)) : /*#__PURE__*/_react.default.createElement("p", null, "Could not obtain eta estimate from ", toSentenceCase(legMode.label), "!"), tncData && tncData.minCost ? /*#__PURE__*/_react.default.createElement("p", null, "Estimated cost: ", `${_currencyFormatter.default.format(tncData.minCost, {
      code: tncData.currency
    })} - ${_currencyFormatter.default.format(tncData.maxCost, {
      code: tncData.currency
    })}`) : /*#__PURE__*/_react.default.createElement("p", null, "Could not obtain ride estimate from ", toSentenceCase(legMode.label), "!"), "}");
  }

}

_defineProperty(TransportationNetworkCompanyLeg, "propTypes", {
  leg: _propTypes.default.object,
  legMode: _propTypes.default.object
});

const defaultTncRideTypes = {
  'LYFT': 'lyft',
  'UBER': 'a6eef2e1-c99a-436f-bde9-fefb9181c0b0'
};

const mapStateToProps = (state, ownProps) => {
  const {
    LYFT_CLIENT_ID,
    UBER_CLIENT_ID
  } = state.otp.config;
  return {
    companies: state.otp.currentQuery.companies,
    tncData: state.otp.tnc,
    LYFT_CLIENT_ID,
    UBER_CLIENT_ID
  };
};

const mapDispatchToProps = {
  getTransportationNetworkCompanyEtaEstimate: _api.getTransportationNetworkCompanyEtaEstimate,
  getTransportationNetworkCompanyRideEstimate: _api.getTransportationNetworkCompanyRideEstimate
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TransportationNetworkCompanyLeg);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=tnc-leg.js