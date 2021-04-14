"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AlertsBody;

var _moment = _interopRequireDefault(require("moment"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _faSolid = require("@styled-icons/fa-solid");

var Styled = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AlertsBody({
  alerts,
  longDateFormat,
  timeFormat
}) {
  return /*#__PURE__*/_react.default.createElement(Styled.TransitAlerts, null, alerts.sort((a, b) => b.effectiveStartDate - a.effectiveStartDate).map((alert, i) => {
    // If alert is effective as of +/- one day, use today, tomorrow, or
    // yesterday with time. Otherwise, use long date format.
    const dateTimeString = (0, _moment.default)(alert.effectiveStartDate).calendar(null, {
      sameDay: `${timeFormat}, [Today]`,
      nextDay: `${timeFormat}, [Tomorrow]`,
      lastDay: `${timeFormat}, [Yesterday]`,
      lastWeek: `${longDateFormat}`,
      sameElse: `${longDateFormat}`
    });
    const effectiveDateString = `Effective as of ${dateTimeString}`;
    return /*#__PURE__*/_react.default.createElement(Styled.TransitAlert, {
      key: i,
      href: alert.alertUrl
    }, /*#__PURE__*/_react.default.createElement(Styled.TransitAlertIconContainer, null, /*#__PURE__*/_react.default.createElement(_faSolid.ExclamationTriangle, {
      size: 18
    })), alert.alertHeaderText ? /*#__PURE__*/_react.default.createElement(Styled.TransitAlertHeader, null, alert.alertHeaderText) : null, /*#__PURE__*/_react.default.createElement(Styled.TransitAlertBody, null, alert.alertDescriptionText), /*#__PURE__*/_react.default.createElement(Styled.TransitAlertEffectiveDate, null, effectiveDateString));
  }));
}

AlertsBody.propTypes = {
  alerts: _propTypes.default.arrayOf(_propTypes.default.shape({})).isRequired,
  longDateFormat: _propTypes.default.string.isRequired,
  timeFormat: _propTypes.default.string.isRequired
};
module.exports = exports.default;

//# sourceMappingURL=alerts-body.js