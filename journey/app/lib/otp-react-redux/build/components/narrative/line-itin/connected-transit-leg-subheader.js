"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _transitLegSubheader = _interopRequireDefault(require("../../../otp-ui/itinerary-body/src/otp-react-redux/transit-leg-subheader"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _ui = require("../../../actions/ui");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ConnectedTransitLegSubheader extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onClick", payload => {
      const {
        setMainPanelContent,
        setViewedStop
      } = this.props;
      setMainPanelContent(null);
      setViewedStop(payload);
    });
  }

  render() {
    const {
      languageConfig,
      leg
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_transitLegSubheader.default, {
      languageConfig: languageConfig,
      leg: leg,
      onStopClick: this.onClick
    });
  }

}

const mapDispatchToProps = {
  setMainPanelContent: _ui.setMainPanelContent,
  setViewedStop: _ui.setViewedStop
};

var _default = (0, _reactRedux.connect)(null, mapDispatchToProps)(ConnectedTransitLegSubheader);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=connected-transit-leg-subheader.js