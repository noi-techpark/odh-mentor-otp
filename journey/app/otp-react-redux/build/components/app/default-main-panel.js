"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _viewerContainer = _interopRequireDefault(require("../viewers/viewer-container"));

var _defaultSearchForm = _interopRequireDefault(require("../form/default-search-form"));

var _planTripButton = _interopRequireDefault(require("../form/plan-trip-button"));

var _userSettings = _interopRequireDefault(require("../form/user-settings"));

var _narrativeRoutingResults = _interopRequireDefault(require("../narrative/narrative-routing-results"));

var _state = require("../../util/state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class DefaultMainPanel extends _react.Component {
  render() {
    const {
      activeSearch,
      currentQuery,
      itineraryClass,
      itineraryFooter,
      LegIcon,
      mainPanelContent,
      ModeIcon,
      showUserSettings
    } = this.props;
    const showPlanTripButton = mainPanelContent === 'EDIT_DATETIME' || mainPanelContent === 'EDIT_SETTINGS';
    const mostRecentQuery = activeSearch ? activeSearch.query : null;
    const planDisabled = (0, _lodash.default)(currentQuery, mostRecentQuery);
    return /*#__PURE__*/_react.default.createElement(_viewerContainer.default, null, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: showPlanTripButton ? 55 : 0,
        paddingBottom: 15,
        overflow: 'auto'
      }
    }, /*#__PURE__*/_react.default.createElement(_defaultSearchForm.default, {
      ModeIcon: ModeIcon
    }), !activeSearch && !showPlanTripButton && showUserSettings && /*#__PURE__*/_react.default.createElement(_userSettings.default, null), /*#__PURE__*/_react.default.createElement("div", {
      className: "desktop-narrative-container"
    }, /*#__PURE__*/_react.default.createElement(_narrativeRoutingResults.default, {
      itineraryClass: itineraryClass,
      itineraryFooter: itineraryFooter,
      LegIcon: LegIcon
    }))), showPlanTripButton && /*#__PURE__*/_react.default.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 10,
        bottom: 55,
        height: 15
      },
      className: "white-fade"
    }), showPlanTripButton && /*#__PURE__*/_react.default.createElement("div", {
      className: "bottom-fixed"
    }, /*#__PURE__*/_react.default.createElement(_planTripButton.default, {
      disabled: planDisabled
    })));
  }

} // connect to the redux store


const mapStateToProps = (state, ownProps) => {
  const showUserSettings = (0, _state.getShowUserSettings)(state.otp);
  return {
    activeSearch: (0, _state.getActiveSearch)(state.otp),
    currentQuery: state.otp.currentQuery,
    mainPanelContent: state.otp.ui.mainPanelContent,
    showUserSettings
  };
};

const mapDispatchToProps = {};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DefaultMainPanel);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=default-main-panel.js