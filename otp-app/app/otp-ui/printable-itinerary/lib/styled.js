"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrintableItinerary = exports.ModeIcon = exports.LegHeader = exports.LegDetails = exports.LegDetail = exports.LegBody = exports.CollapsedTop = exports.Leg = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Leg = _styledComponents.default.div.withConfig({
  displayName: "styled__Leg",
  componentId: "sc-1w8qzv8-0"
})(["margin-bottom:10px;border-top:1px solid grey;padding-top:18px;"]);

exports.Leg = Leg;
const CollapsedTop = (0, _styledComponents.default)(Leg).withConfig({
  displayName: "styled__CollapsedTop",
  componentId: "sc-1w8qzv8-1"
})(["border-top:none;padding-top:0;"]);
exports.CollapsedTop = CollapsedTop;

const LegBody = _styledComponents.default.div.withConfig({
  displayName: "styled__LegBody",
  componentId: "sc-1w8qzv8-2"
})(["margin-left:40px;"]);

exports.LegBody = LegBody;

const LegDetail = _styledComponents.default.div.withConfig({
  displayName: "styled__LegDetail",
  componentId: "sc-1w8qzv8-3"
})(["font-size:14px;margin-top:3px;"]);

exports.LegDetail = LegDetail;

const LegDetails = _styledComponents.default.div.withConfig({
  displayName: "styled__LegDetails",
  componentId: "sc-1w8qzv8-4"
})(["margin-top:5px;"]);

exports.LegDetails = LegDetails;

const LegHeader = _styledComponents.default.div.withConfig({
  displayName: "styled__LegHeader",
  componentId: "sc-1w8qzv8-5"
})(["font-size:18px;"]);

exports.LegHeader = LegHeader;

const ModeIcon = _styledComponents.default.div.withConfig({
  displayName: "styled__ModeIcon",
  componentId: "sc-1w8qzv8-6"
})(["float:left;width:32px;height:32px;"]);

exports.ModeIcon = ModeIcon;

const PrintableItinerary = _styledComponents.default.div.withConfig({
  displayName: "styled__PrintableItinerary",
  componentId: "sc-1w8qzv8-7"
})([""]);

exports.PrintableItinerary = PrintableItinerary;