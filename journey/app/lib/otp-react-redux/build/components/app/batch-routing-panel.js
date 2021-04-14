"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var apiActions = _interopRequireWildcard(require("../../actions/api"));

var _connectedLocationField = _interopRequireDefault(require("../form/connected-location-field"));

var _userSettings = _interopRequireDefault(require("../form/user-settings"));

var _icon = _interopRequireDefault(require("../narrative/icon"));

var _narrativeItineraries = _interopRequireDefault(require("../narrative/narrative-itineraries"));

var _state = require("../../util/state");

var _viewerContainer = _interopRequireDefault(require("../viewers/viewer-container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Main panel for the batch/trip comparison form.
 * @extends Component
 */
class BatchRoutingPanel extends _react.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_planTrip", () => {
      const {
        currentQuery,
        routingQuery
      } = this.props;
      const issues = [];
      if (!(0, _state.hasValidLocation)(currentQuery, 'from')) issues.push('from');
      if (!(0, _state.hasValidLocation)(currentQuery, 'to')) issues.push('to');

      if (issues.length > 0) {
        // TODO: replace with less obtrusive validation.
        window.alert(`Please define the following fields to $_travel_$ ${issues.join(', ')}`);
        return;
      }

      routingQuery();
    });
  }

  render() {
    const {
      activeSearch,
      itineraryFooter,
      LegIcon,
      mobile,
      showUserSettings
    } = this.props;
    const actionText = mobile ? "$_tap_$" : "$_click_$";
    return /*#__PURE__*/_react.default.createElement(_viewerContainer.default, null, /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
      inputPlaceholder: `Inserisci partenza o ${actionText} su mappa...`,
      locationType: "from",
      showClearButton: true
    }), /*#__PURE__*/_react.default.createElement(_connectedLocationField.default, {
      inputPlaceholder: `Inserisci destinazione o ${actionText} su mappa...`,
      locationType: "to",
      showClearButton: !mobile
    }), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
      },
      className: "comparison-form"
    }, /*#__PURE__*/_react.default.createElement("button", {
      style: {
        height: '50px',
        width: '50px',
        margin: '0px',
        marginRight: '5px'
      }
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "cog",
      className: "fa-2x"
    })), /*#__PURE__*/_react.default.createElement("button", {
      style: {
        height: '50px',
        width: '100px',
        margin: '0px',
        fontSize: 'small',
        textAlign: 'left'
      }
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "calendar"
    }), " Today", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "clock-o"
    }), " Now", /*#__PURE__*/_react.default.createElement("br", null)), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
      bsStyle: "default",
      bsSize: "small",
      onClick: this._planTrip,
      style: {
        height: '50px',
        width: '50px',
        margin: '0px',
        marginLeft: 'auto',
        backgroundColor: '#F5F5A7'
      }
    }, /*#__PURE__*/_react.default.createElement(_icon.default, {
      type: "search",
      className: "fa-2x"
    }))), !activeSearch && showUserSettings && /*#__PURE__*/_react.default.createElement(_userSettings.default, null), /*#__PURE__*/_react.default.createElement("div", {
      className: "desktop-narrative-container"
    }, /*#__PURE__*/_react.default.createElement(_narrativeItineraries.default, {
      containerStyle: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '218px',
        // This is variable dependent on height of the form above.
        right: '0',
        left: '0',
        bottom: '0'
      },
      itineraryFooter: itineraryFooter,
      LegIcon: LegIcon
    })));
  }

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  const showUserSettings = (0, _state.getShowUserSettings)(state.otp);
  return {
    activeSearch: (0, _state.getActiveSearch)(state.otp),
    currentQuery: state.otp.currentQuery,
    expandAdvanced: state.otp.user.expandAdvanced,
    showUserSettings
  };
};

const mapDispatchToProps = {
  routingQuery: apiActions.routingQuery
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BatchRoutingPanel);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=batch-routing-panel.js