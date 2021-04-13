"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TripDetailSummary = exports.TripDetailsHeader = exports.TripDetailsBody = exports.TripDetails = exports.TripDetailIcon = exports.TripDetailDescription = exports.TripDetail = exports.TransitFare = exports.Timing = exports.TNCFareCompanies = exports.TNCFare = exports.HideButton = exports.Fare = exports.ExpandButton = exports.CaloriesSummary = exports.CaloriesDescription = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BaseButton = _styledComponents.default.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  margin: 0;
  padding: 0;
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
`;
const CaloriesDescription = _styledComponents.default.span``;
exports.CaloriesDescription = CaloriesDescription;
const CaloriesSummary = _styledComponents.default.span``;
exports.CaloriesSummary = CaloriesSummary;
const ExpandButton = (0, _styledComponents.default)(BaseButton)`
  color: #00f;
  font-size: 16px;
  margin-left: 6px;
  margin-top: -2px;
`;
exports.ExpandButton = ExpandButton;
const Fare = _styledComponents.default.span``;
exports.Fare = Fare;
const HideButton = (0, _styledComponents.default)(BaseButton)`
  float: right;
`;
exports.HideButton = HideButton;
const TNCFare = _styledComponents.default.span``;
exports.TNCFare = TNCFare;
const TNCFareCompanies = _styledComponents.default.span`
  text-transform: capitalize;
`;
exports.TNCFareCompanies = TNCFareCompanies;
const Timing = _styledComponents.default.span``;
exports.Timing = Timing;
const TransitFare = _styledComponents.default.span``;
exports.TransitFare = TransitFare;
const TripDetail = _styledComponents.default.div`
  margin-top: 6px;
`;
exports.TripDetail = TripDetail;
const TripDetailDescription = _styledComponents.default.div`
  background-color: #fff;
  border: 1px solid #888;
  font-size: 12px;
  margin-top: 2px;
  padding: 8px;
`;
exports.TripDetailDescription = TripDetailDescription;
const TripDetailIcon = _styledComponents.default.div`
  float: left;
  font-size: 17px;
`;
exports.TripDetailIcon = TripDetailIcon;
const TripDetails = _styledComponents.default.div`
  background-color: #eee;
  border-radius: 6px;
  margin-bottom: 15px;
  margin-top: 16px;
  padding: 10px 16px;
`;
exports.TripDetails = TripDetails;
const TripDetailsBody = _styledComponents.default.div``;
exports.TripDetailsBody = TripDetailsBody;
const TripDetailsHeader = _styledComponents.default.div`
  font-size: 18px;
  font-weight: 600;
`;
exports.TripDetailsHeader = TripDetailsHeader;
const TripDetailSummary = _styledComponents.default.div`
  margin-left: 28px;
  padding-top: 2px;
`;
exports.TripDetailSummary = TripDetailSummary;

//# sourceMappingURL=styled.js