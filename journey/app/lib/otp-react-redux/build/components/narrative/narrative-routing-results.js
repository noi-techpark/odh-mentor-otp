"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _loading = _interopRequireDefault(require("./loading"));

var _tabbedItineraries = _interopRequireDefault(require("./tabbed-itineraries"));

var _errorMessage = _interopRequireDefault(require("../form/error-message"));

var _state = require("../../util/state");

var _ui = require("../../actions/ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NarrativeRoutingResults extends _react.Component {
  componentDidUpdate(prevProps) {
    if ((!prevProps.itineraries || prevProps.itineraries.length === 0) && this.props.itineraries && this.props.itineraries.length > 0) {
      this.props.setMainPanelContent(null);
    }

    if (!prevProps.error && this.props.error) this.props.setMainPanelContent(null);
  }

  render() {
    const {
      error,
      itineraryClass,
      itineraryFooter,
      LegIcon,
      pending,
      itineraries,
      mainPanelContent
    } = this.props;
    if (pending) return /*#__PURE__*/_react.default.createElement(_loading.default, null);
    if (error) return /*#__PURE__*/_react.default.createElement(_errorMessage.default, null);
    if (mainPanelContent) return null;
    return (
      /*#__PURE__*/
      // TODO: If multiple routing types exist, do the check here.
      _react.default.createElement(_tabbedItineraries.default, {
        itineraryClass: itineraryClass,
        itineraryFooter: itineraryFooter,
        itineraries: itineraries,
        LegIcon: LegIcon
      })
    );
  }

}

_defineProperty(NarrativeRoutingResults, "propTypes", {
  itineraryClass: _propTypes.default.func,
  LegIcon: _propTypes.default.elementType.isRequired,
  routingType: _propTypes.default.string
});

const mapStateToProps = (state, ownProps) => {
  const activeSearch = (0, _state.getActiveSearch)(state.otp);
  const pending = activeSearch ? Boolean(activeSearch.pending) : false;
  return {
    mainPanelContent: state.otp.ui.mainPanelContent,
    error: activeSearch && activeSearch.response && activeSearch.response.error,
    itineraries: (0, _state.getActiveItineraries)(state.otp),
    pending,
    routingType: activeSearch && activeSearch.query.routingType
  };
};

const mapDispatchToProps = {
  setMainPanelContent: _ui.setMainPanelContent
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NarrativeRoutingResults);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=narrative-routing-results.js