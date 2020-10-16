"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TripDetailSummary = exports.TripDetailsHeader = exports.TripDetailsBody = exports.TripDetails = exports.TripDetailIcon = exports.TripDetailDescription = exports.TripDetail = exports.TransitFare = exports.Timing = exports.TNCFareCompanies = exports.TNCFare = exports.HideButton = exports.Fare = exports.ExpandButton = exports.CaloriesSummary = exports.CaloriesDescription = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BaseButton = _styledComponents.default.button.withConfig({
  displayName: "styled__BaseButton",
  componentId: "sr23bt-0"
})(["background:transparent;border:0;cursor:pointer;display:inline-block;font-size:14px;font-weight:400;line-height:1.42857143;margin:0;padding:0;text-decoration:none;touch-action:manipulation;user-select:none;vertical-align:middle;white-space:nowrap;"]);

const CaloriesDescription = _styledComponents.default.span.withConfig({
  displayName: "styled__CaloriesDescription",
  componentId: "sr23bt-1"
})([""]);

exports.CaloriesDescription = CaloriesDescription;

const CaloriesSummary = _styledComponents.default.span.withConfig({
  displayName: "styled__CaloriesSummary",
  componentId: "sr23bt-2"
})([""]);

exports.CaloriesSummary = CaloriesSummary;
const ExpandButton = (0, _styledComponents.default)(BaseButton).withConfig({
  displayName: "styled__ExpandButton",
  componentId: "sr23bt-3"
})(["color:#00f;font-size:16px;margin-left:6px;margin-top:-2px;"]);
exports.ExpandButton = ExpandButton;

const Fare = _styledComponents.default.span.withConfig({
  displayName: "styled__Fare",
  componentId: "sr23bt-4"
})([""]);

exports.Fare = Fare;
const HideButton = (0, _styledComponents.default)(BaseButton).withConfig({
  displayName: "styled__HideButton",
  componentId: "sr23bt-5"
})(["float:right;"]);
exports.HideButton = HideButton;

const TNCFare = _styledComponents.default.span.withConfig({
  displayName: "styled__TNCFare",
  componentId: "sr23bt-6"
})([""]);

exports.TNCFare = TNCFare;

const TNCFareCompanies = _styledComponents.default.span.withConfig({
  displayName: "styled__TNCFareCompanies",
  componentId: "sr23bt-7"
})(["text-transform:capitalize;"]);

exports.TNCFareCompanies = TNCFareCompanies;

const Timing = _styledComponents.default.span.withConfig({
  displayName: "styled__Timing",
  componentId: "sr23bt-8"
})([""]);

exports.Timing = Timing;

const TransitFare = _styledComponents.default.span.withConfig({
  displayName: "styled__TransitFare",
  componentId: "sr23bt-9"
})([""]);

exports.TransitFare = TransitFare;

const TripDetail = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetail",
  componentId: "sr23bt-10"
})(["margin-top:6px;"]);

exports.TripDetail = TripDetail;

const TripDetailDescription = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetailDescription",
  componentId: "sr23bt-11"
})(["background-color:#fff;border:1px solid #888;font-size:12px;margin-top:2px;padding:8px;"]);

exports.TripDetailDescription = TripDetailDescription;

const TripDetailIcon = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetailIcon",
  componentId: "sr23bt-12"
})(["float:left;font-size:17px;"]);

exports.TripDetailIcon = TripDetailIcon;

const TripDetails = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetails",
  componentId: "sr23bt-13"
})(["background-color:#eee;border-radius:6px;margin-bottom:15px;margin-top:16px;padding:10px 16px;"]);

exports.TripDetails = TripDetails;

const TripDetailsBody = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetailsBody",
  componentId: "sr23bt-14"
})([""]);

exports.TripDetailsBody = TripDetailsBody;

const TripDetailsHeader = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetailsHeader",
  componentId: "sr23bt-15"
})(["font-size:18px;font-weight:600;"]);

exports.TripDetailsHeader = TripDetailsHeader;

const TripDetailSummary = _styledComponents.default.div.withConfig({
  displayName: "styled__TripDetailSummary",
  componentId: "sr23bt-16"
})(["margin-left:28px;padding-top:2px;"]);

exports.TripDetailSummary = TripDetailSummary;