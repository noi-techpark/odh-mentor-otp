"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransitLegSummary = exports.TransitLegFare = exports.TransitLegExpandedBody = exports.TransitLegDetailsHeader = exports.TransitLegDetails = exports.TransitAlertToggle = exports.TransitAlerts = exports.TransitAlertIconContainer = exports.TransitAlertHeader = exports.TransitAlertEffectiveDate = exports.TransitAlertBody = exports.TransitAlert = exports.StopRow = exports.StopName = exports.StopMarker = exports.StopIdSpan = exports.StepStreetName = exports.StepRow = exports.StepIconContainer = exports.StepsHeader = exports.StepDescriptionContainer = exports.Steps = exports.SRHidden = exports.SROnly = exports.RouteBadge = exports.PreviewDiagramTitle = exports.PreviewDiagramElevationLoss = exports.PreviewDiagramElevationGain = exports.PreviewDiagramElevationChange = exports.PreviewDiagram = exports.PlaceSubheader = exports.PlaceName = exports.PlaceHeader = exports.PlaceDetails = exports.MapIcon = exports.MapButtonColumn = exports.MapButton = exports.TimeColumn = exports.PreviewContainer = exports.PlaceRowWrapper = exports.LineColumn = exports.LineBadgeContainer = exports.LegLine = exports.LegIconContainer = exports.LegDescriptionForTransit = exports.LegDescriptionRouteShortName = exports.LegDescriptionRouteLongName = exports.LegDescriptionHeadsignPrefix = exports.LegDescription = exports.LegClickable = exports.LegBody = exports.ItineraryBody = exports.IntermediateStops = exports.InterlineName = exports.InterlineDot = exports.InnerLine = exports.DetailsColumn = exports.Destination = exports.CaretToggle = exports.TNCCost = exports.TNCTravelTime = exports.BookTNCRideButtonContainer = exports.BookTNCRideButton = exports.BookLaterText = exports.BookLaterPointer = exports.BookLaterInnerContainer = exports.BookLaterContainer = exports.AgencyInfo = exports.AccessBadge = exports.ViewerButton = exports.LinkButton = exports.AnchorButton = exports.TransparentButton = exports.LightBorderDiv = exports.ClearButton = void 0;

var _Map = _interopRequireDefault(require("@opentripplanner/icons/lib/trimet/Map"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _faSolid = require("styled-icons/fa-solid");

var _util = require("./util");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // ////////////////////////////////////////////////
// ///////////// Generic components ///////////////
// ////////////////////////////////////////////////


const ClearButton = _styledComponents.default.button.withConfig({
  displayName: "styled__ClearButton",
  componentId: "sc-6hmr57-0"
})(["background:transparent;color:inherit;border:0;text-align:inherit;text-decoration:none;&:focus{background-color:", ";outline:0;}&:hover{background-color:", ";}&:active{background-color:", ";}"], props => props.theme.tertiaryColor, props => props.theme.hoverColor, props => props.theme.activeColor);
/*
  This is needed to give the offset border look to stacked place rows
  Since the value we have access to is "interlineWithPreviousLeg" then we
  have to show/hide the top border of the div and apply a small offset
*/


exports.ClearButton = ClearButton;

const LightBorderDiv = _styledComponents.default.div.withConfig({
  displayName: "styled__LightBorderDiv",
  componentId: "sc-6hmr57-1"
})(["border-top-style:solid;border-top-width:", ";border-top-color:", ";padding-top:", ";padding-bottom:", ";transform:", ";"], props => props.hideBorder === "true" ? "0" : "2px", props => props.theme.borderColor, props => props.hideBorder === "true" ? "0" : "10px", props => props.hideBorder === "true" ? "10px" : "0", props => props.hideBorder === "true" ? "" : "translateY(-12px)");

exports.LightBorderDiv = LightBorderDiv;

const TransparentButton = _styledComponents.default.button.withConfig({
  displayName: "styled__TransparentButton",
  componentId: "sc-6hmr57-2"
})(["background:transparent;border:0;color:inherit;cursor:pointer;font-size:inherit;text-decoration:none;&:focus{}"]);

exports.TransparentButton = TransparentButton;

const AnchorButton = _styledComponents.default.a.withConfig({
  displayName: "styled__AnchorButton",
  componentId: "sc-6hmr57-3"
})(["background-color:#fff;background-image:none;border-radius:4px;border:1px solid #ccc;color:#333;cursor:pointer;display:inline-block;font-size:14px;font-weight:400;padding:4px 6px;text-align:center;text-decoration:none;touch-action:manipulation;user-select:none;white-space:nowrap;&:hover{color:#333;background-color:#e6e6e6;border-color:#adadad;}&:active{color:#333;background-color:#e6e6e6;background-image:none;border-color:#adadad;outline:0;box-shadow:inset 0 3px 5px rgba(0,0,0,0.125);}&:focus{color:#333;background-color:#e6e6e6;border-color:#8c8c8c;}&:active:hover{color:#333;background-color:#d4d4d4;border-color:#8c8c8c;}"]);

exports.AnchorButton = AnchorButton;
const LinkButton = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__LinkButton",
  componentId: "sc-6hmr57-4"
})(["color:#008;cursor:pointer;margin-left:5px;&:hover{text-decoration:underline;}"]);
exports.LinkButton = LinkButton;
const ViewerButton = (0, _styledComponents.default)(LinkButton).withConfig({
  displayName: "styled__ViewerButton",
  componentId: "sc-6hmr57-5"
})(["padding-left:0px;&:before{content:\"|\";color:black;margin-right:5px;}"]); // ////////////////////////////////////////////////
// /////////////// App components /////////////////
// ////////////////////////////////////////////////
// TODO: Can we turn this into a more abstract element to inherit from for other badges?

exports.ViewerButton = ViewerButton;

const AccessBadge = _styledComponents.default.div.attrs(props => ({
  "aria-label": `Travel by ${props.mode}`
})).withConfig({
  displayName: "styled__AccessBadge",
  componentId: "sc-6hmr57-6"
})(["color:black;background-color:", ";border:2px solid #bbb;text-align:center;width:25px;height:25px;font-size:1.2em;border-radius:50%;display:flex;align-items:center;justify-content:center;padding-left:1px;"], props => (0, _util.toModeColor)(props.mode, props.routeColor));

exports.AccessBadge = AccessBadge;

const AgencyInfo = _styledComponents.default.div.withConfig({
  displayName: "styled__AgencyInfo",
  componentId: "sc-6hmr57-7"
})(["margin-top:5px;a{color:#337ab7;text-decoration:none;}a:hover{text-decoration:underline;}img{margin-left:5px;}"]);

exports.AgencyInfo = AgencyInfo;

const BookLaterContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__BookLaterContainer",
  componentId: "sc-6hmr57-8"
})(["bottom:0;left:110px;position:absolute;right:0;top:0;"]);

exports.BookLaterContainer = BookLaterContainer;

const BookLaterInnerContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__BookLaterInnerContainer",
  componentId: "sc-6hmr57-9"
})(["background-color:#fcf9d3;display:table;height:100%;width:100%;"]);

exports.BookLaterInnerContainer = BookLaterInnerContainer;

const BookLaterPointer = _styledComponents.default.div.withConfig({
  displayName: "styled__BookLaterPointer",
  componentId: "sc-6hmr57-10"
})(["border-bottom:16px solid transparent;border-right:16px solid #fcf9d3;border-top:16px solid transparent;height:0;left:94px;position:absolute;top:0;width:0;"]);

exports.BookLaterPointer = BookLaterPointer;

const BookLaterText = _styledComponents.default.div.withConfig({
  displayName: "styled__BookLaterText",
  componentId: "sc-6hmr57-11"
})(["color:#444;display:table-cell;font-style:italic;line-height:0.95;padding:0px 2px;vertical-align:middle;"]);

exports.BookLaterText = BookLaterText;
const BookTNCRideButton = (0, _styledComponents.default)(AnchorButton).withConfig({
  displayName: "styled__BookTNCRideButton",
  componentId: "sc-6hmr57-12"
})([""]);
exports.BookTNCRideButton = BookTNCRideButton;

const BookTNCRideButtonContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__BookTNCRideButtonContainer",
  componentId: "sc-6hmr57-13"
})(["height:32px;margin-bottom:10px;margin-top:10px;position:relative;"]);

exports.BookTNCRideButtonContainer = BookTNCRideButtonContainer;

const TNCTravelTime = _styledComponents.default.div.withConfig({
  displayName: "styled__TNCTravelTime",
  componentId: "sc-6hmr57-14"
})([""]);

exports.TNCTravelTime = TNCTravelTime;

const TNCCost = _styledComponents.default.div.withConfig({
  displayName: "styled__TNCCost",
  componentId: "sc-6hmr57-15"
})([""]);

exports.TNCCost = TNCCost;

const CaretToggle = ({
  expanded
}) => expanded ? /*#__PURE__*/_react.default.createElement(_faSolid.CaretUp, {
  size: 15
}) : /*#__PURE__*/_react.default.createElement(_faSolid.CaretDown, {
  size: 15
});

exports.CaretToggle = CaretToggle;
CaretToggle.propTypes = {
  expanded: _propTypes.default.bool.isRequired
};

const Destination = _styledComponents.default.div.withConfig({
  displayName: "styled__Destination",
  componentId: "sc-6hmr57-16"
})(["text-align:center;"]);

exports.Destination = Destination;
const DetailsColumn = (0, _styledComponents.default)(LightBorderDiv).withConfig({
  displayName: "styled__DetailsColumn",
  componentId: "sc-6hmr57-17"
})(["flex:2 2 auto;"]);
exports.DetailsColumn = DetailsColumn;

const InnerLine = _styledComponents.default.div.withConfig({
  displayName: "styled__InnerLine",
  componentId: "sc-6hmr57-18"
})(["border-left:", ";height:100%;width:0;position:absolute;left:50%;transform:translateX(-50%);"], props => (0, _util.toModeBorder)(props.mode, props.routeColor));

exports.InnerLine = InnerLine;

const InterlineDot = _styledComponents.default.div.withConfig({
  displayName: "styled__InterlineDot",
  componentId: "sc-6hmr57-19"
})(["color:#fff;flex:0 0 15px;margin-left:-33px;margin-right:18px;position:relative;z-index:30;"]);

exports.InterlineDot = InterlineDot;

const InterlineName = _styledComponents.default.div.withConfig({
  displayName: "styled__InterlineName",
  componentId: "sc-6hmr57-20"
})([""]);

exports.InterlineName = InterlineName;

const IntermediateStops = _styledComponents.default.div.withConfig({
  displayName: "styled__IntermediateStops",
  componentId: "sc-6hmr57-21"
})(["display:block;font-size:13px;"]);

exports.IntermediateStops = IntermediateStops;

const ItineraryBody = _styledComponents.default.div.withConfig({
  displayName: "styled__ItineraryBody",
  componentId: "sc-6hmr57-22"
})([""]);

exports.ItineraryBody = ItineraryBody;

const LegBody = _styledComponents.default.div.withConfig({
  displayName: "styled__LegBody",
  componentId: "sc-6hmr57-23"
})(["color:#999;font-size:13px;padding:12px 0 18px 4px;"]);

exports.LegBody = LegBody;
const LegClickable = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__LegClickable",
  componentId: "sc-6hmr57-24"
})(["cursor:pointer;display:table;padding:0;text-align:center;line-height:31px;"]);
exports.LegClickable = LegClickable;

const LegDescription = _styledComponents.default.div.withConfig({
  displayName: "styled__LegDescription",
  componentId: "sc-6hmr57-25"
})(["display:table;> div{display:table-cell;}"]);

exports.LegDescription = LegDescription;

const LegDescriptionHeadsignPrefix = _styledComponents.default.span.withConfig({
  displayName: "styled__LegDescriptionHeadsignPrefix",
  componentId: "sc-6hmr57-26"
})(["font-weight:200;"]);

exports.LegDescriptionHeadsignPrefix = LegDescriptionHeadsignPrefix;

const LegDescriptionRouteLongName = _styledComponents.default.div.withConfig({
  displayName: "styled__LegDescriptionRouteLongName",
  componentId: "sc-6hmr57-27"
})(["font-size:13px;font-weight:500;line-height:16px;"]);

exports.LegDescriptionRouteLongName = LegDescriptionRouteLongName;

const LegDescriptionRouteShortName = _styledComponents.default.div.withConfig({
  displayName: "styled__LegDescriptionRouteShortName",
  componentId: "sc-6hmr57-28"
})(["font-weight:800;margin-right:6px;"]);

exports.LegDescriptionRouteShortName = LegDescriptionRouteShortName;
const LegDescriptionForTransit = (0, _styledComponents.default)(LegDescription).withConfig({
  displayName: "styled__LegDescriptionForTransit",
  componentId: "sc-6hmr57-29"
})(["color:rgb(153,153,153);margin-top:5px;"]);
exports.LegDescriptionForTransit = LegDescriptionForTransit;

const LegIconContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__LegIconContainer",
  componentId: "sc-6hmr57-30"
})(["height:24px;width:24px;float:left;margin-right:6px;"]);

exports.LegIconContainer = LegIconContainer;

const LegLine = _styledComponents.default.div.withConfig({
  displayName: "styled__LegLine",
  componentId: "sc-6hmr57-31"
})(["position:relative;left:50%;transform:translateX(-50%);height:100%;"]);

exports.LegLine = LegLine;

const LineBadgeContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__LineBadgeContainer",
  componentId: "sc-6hmr57-32"
})(["width:30px;height:30px;border-radius:50%;position:absolute;left:50%;top:0;transform:translate(-51%,-10%);"]);

exports.LineBadgeContainer = LineBadgeContainer;

const LineColumn = _styledComponents.default.div.withConfig({
  displayName: "styled__LineColumn",
  componentId: "sc-6hmr57-33"
})(["flex:0 0 50px;padding-right:5px;"]);

exports.LineColumn = LineColumn;

const PlaceRowWrapper = _styledComponents.default.div.withConfig({
  displayName: "styled__PlaceRowWrapper",
  componentId: "sc-6hmr57-34"
})(["max-width:500px;display:flex;flex-flow:row;"]);

exports.PlaceRowWrapper = PlaceRowWrapper;

const PreviewContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__PreviewContainer",
  componentId: "sc-6hmr57-35"
})(["background-color:", ";border-color:", ";border-radius:5px;border-style:solid;border-width:1px;display:inline-block;font-style:normal;margin:0 4px;position:relative;text-align:center;text-decoration:none;width:75%;&:hover{border-color:#d1d5da;background-color:#f6f8fa;}"], props => props.active && "#eee", props => props.active ? "#d1d5da" : "#fff");

exports.PreviewContainer = PreviewContainer;

const TimeColumn = _styledComponents.default.div.withConfig({
  displayName: "styled__TimeColumn",
  componentId: "sc-6hmr57-36"
})(["flex:0 0 60px;padding-right:5px;font-size:0.9em;"]);

exports.TimeColumn = TimeColumn;
const MapButton = (0, _styledComponents.default)(LinkButton).withConfig({
  displayName: "styled__MapButton",
  componentId: "sc-6hmr57-37"
})(["padding:3px 10px 3px 10px;border:0;margin-top:-15px;width:35px;height:35px;"]);
exports.MapButton = MapButton;
const MapButtonColumn = (0, _styledComponents.default)(LightBorderDiv).withConfig({
  displayName: "styled__MapButtonColumn",
  componentId: "sc-6hmr57-38"
})(["flex:0 0 25px;"]);
exports.MapButtonColumn = MapButtonColumn;
const MapIcon = (0, _styledComponents.default)(_Map.default).attrs(props => ({
  fill: props.theme.secondaryColor,
  width: 15,
  height: 15,
  role: "img",
  title: "Frame this Itinerary Leg"
})).withConfig({
  displayName: "styled__MapIcon",
  componentId: "sc-6hmr57-39"
})([""]); // export const ModeIcon = styled(BaseModeIcon).attrs(props => ({
//   width: 18,
//   height: 18,
//   title: props.title || "",
//   fill: "black"
// }))``;

exports.MapIcon = MapIcon;

const PlaceDetails = _styledComponents.default.div.withConfig({
  displayName: "styled__PlaceDetails",
  componentId: "sc-6hmr57-40"
})([""]);

exports.PlaceDetails = PlaceDetails;

const PlaceHeader = _styledComponents.default.div.withConfig({
  displayName: "styled__PlaceHeader",
  componentId: "sc-6hmr57-41"
})(["display:flex;font-size:1.2em;"]);

exports.PlaceHeader = PlaceHeader;

const PlaceName = _styledComponents.default.div.withConfig({
  displayName: "styled__PlaceName",
  componentId: "sc-6hmr57-42"
})(["font-weight:bold;height:1.2em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1 1 auto;"]);

exports.PlaceName = PlaceName;

const PlaceSubheader = _styledComponents.default.div.withConfig({
  displayName: "styled__PlaceSubheader",
  componentId: "sc-6hmr57-43"
})(["color:grey;font-weight:300;padding-left:4px;padding-top:1px;"]);

exports.PlaceSubheader = PlaceSubheader;
const PreviewDiagram = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__PreviewDiagram",
  componentId: "sc-6hmr57-44"
})(["padding:2px;width:100%;"]);
exports.PreviewDiagram = PreviewDiagram;

const PreviewDiagramElevationChange = _styledComponents.default.span.withConfig({
  displayName: "styled__PreviewDiagramElevationChange",
  componentId: "sc-6hmr57-45"
})(["font-size:xx-small;"]);

exports.PreviewDiagramElevationChange = PreviewDiagramElevationChange;
const PreviewDiagramElevationGain = (0, _styledComponents.default)(PreviewDiagramElevationChange).withConfig({
  displayName: "styled__PreviewDiagramElevationGain",
  componentId: "sc-6hmr57-46"
})(["color:red;"]);
exports.PreviewDiagramElevationGain = PreviewDiagramElevationGain;
const PreviewDiagramElevationLoss = (0, _styledComponents.default)(PreviewDiagramElevationChange).withConfig({
  displayName: "styled__PreviewDiagramElevationLoss",
  componentId: "sc-6hmr57-47"
})(["color:green;"]);
exports.PreviewDiagramElevationLoss = PreviewDiagramElevationLoss;

const PreviewDiagramTitle = _styledComponents.default.div.withConfig({
  displayName: "styled__PreviewDiagramTitle",
  componentId: "sc-6hmr57-48"
})(["font-size:small;"]);

exports.PreviewDiagramTitle = PreviewDiagramTitle;

const RouteBadge = _styledComponents.default.div.withConfig({
  displayName: "styled__RouteBadge",
  componentId: "sc-6hmr57-49"
})(["text-align:center;min-width:30px;min-height:30px;font-size:1.2em;background-color:", ";color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;padding-left:1px;border:1px solid ", ";user-select:none;cursor:default;"], props => (0, _util.toSafeRouteColor)(props.routeColor) || props.theme.mainColor, props => props.theme.badgeBorderColor);

exports.RouteBadge = RouteBadge;

const SROnly = _styledComponents.default.span.withConfig({
  displayName: "styled__SROnly",
  componentId: "sc-6hmr57-50"
})(["position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;"]);

exports.SROnly = SROnly;

const SRHidden = _styledComponents.default.span.attrs({
  "aria-hidden": true
}).withConfig({
  displayName: "styled__SRHidden",
  componentId: "sc-6hmr57-51"
})([""]);

exports.SRHidden = SRHidden;

const Steps = _styledComponents.default.div.withConfig({
  displayName: "styled__Steps",
  componentId: "sc-6hmr57-52"
})(["display:block;"]);

exports.Steps = Steps;

const StepDescriptionContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__StepDescriptionContainer",
  componentId: "sc-6hmr57-53"
})(["margin-left:24px;line-height:1.25em;padding-top:1px;"]);

exports.StepDescriptionContainer = StepDescriptionContainer;
const StepsHeader = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__StepsHeader",
  componentId: "sc-6hmr57-54"
})(["color:#999;display:inline-block;font-size:13px;font-style:normal;margin-top:10px;vertical-align:bottom;"]);
exports.StepsHeader = StepsHeader;

const StepIconContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__StepIconContainer",
  componentId: "sc-6hmr57-55"
})(["fill:#999999;float:left;height:16px;width:16px;"]);

exports.StepIconContainer = StepIconContainer;

const StepRow = _styledComponents.default.div.withConfig({
  displayName: "styled__StepRow",
  componentId: "sc-6hmr57-56"
})(["font-size:13px;margin-top:8px;color:#999;font-style:normal;"]);

exports.StepRow = StepRow;

const StepStreetName = _styledComponents.default.span.withConfig({
  displayName: "styled__StepStreetName",
  componentId: "sc-6hmr57-57"
})(["font-weight:500;"]);

exports.StepStreetName = StepStreetName;

const StopIdSpan = _styledComponents.default.span.withConfig({
  displayName: "styled__StopIdSpan",
  componentId: "sc-6hmr57-58"
})(["font-weight:200;font-size:0.9em;margin-left:10px;"]);

exports.StopIdSpan = StopIdSpan;

const StopMarker = _styledComponents.default.div.withConfig({
  displayName: "styled__StopMarker",
  componentId: "sc-6hmr57-59"
})(["float:left;margin-left:-36px;color:#fff;"]);

exports.StopMarker = StopMarker;

const StopName = _styledComponents.default.div.withConfig({
  displayName: "styled__StopName",
  componentId: "sc-6hmr57-60"
})(["color:#999;margin-top:3px;"]);

exports.StopName = StopName;

const StopRow = _styledComponents.default.div.withConfig({
  displayName: "styled__StopRow",
  componentId: "sc-6hmr57-61"
})(["z-index:30;position:relative;"]);

exports.StopRow = StopRow;

const TransitAlert = _styledComponents.default.a.withConfig({
  displayName: "styled__TransitAlert",
  componentId: "sc-6hmr57-62"
})(["background-color:#eee;border-radius:4px;color:#000;display:block;margin-top:5px;padding:8px;text-decoration:none;"]);

exports.TransitAlert = TransitAlert;

const TransitAlertBody = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitAlertBody",
  componentId: "sc-6hmr57-63"
})(["font-size:12px;margin-left:30px;white-space:pre-wrap;"]);

exports.TransitAlertBody = TransitAlertBody;

const TransitAlertEffectiveDate = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitAlertEffectiveDate",
  componentId: "sc-6hmr57-64"
})(["margin-top:5px;margin-left:30px;font-size:12px;font-style:italic;"]);

exports.TransitAlertEffectiveDate = TransitAlertEffectiveDate;

const TransitAlertHeader = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitAlertHeader",
  componentId: "sc-6hmr57-65"
})(["font-size:14px;margin-left:30px;font-weight:600;"]);

exports.TransitAlertHeader = TransitAlertHeader;

const TransitAlertIconContainer = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitAlertIconContainer",
  componentId: "sc-6hmr57-66"
})(["float:left;font-size:18px;"]);

exports.TransitAlertIconContainer = TransitAlertIconContainer;

const TransitAlerts = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitAlerts",
  componentId: "sc-6hmr57-67"
})(["display:block;margin-top:3px;"]);

exports.TransitAlerts = TransitAlerts;
const TransitAlertToggle = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__TransitAlertToggle",
  componentId: "sc-6hmr57-68"
})(["color:#d14727;cursor:pointer;display:inline-block;font-weight:400;margin-top:8px;padding:0;"]);
exports.TransitAlertToggle = TransitAlertToggle;

const TransitLegDetails = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitLegDetails",
  componentId: "sc-6hmr57-69"
})(["margin-top:5px;"]);

exports.TransitLegDetails = TransitLegDetails;

const TransitLegDetailsHeader = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitLegDetailsHeader",
  componentId: "sc-6hmr57-70"
})(["color:#999999;"]);

exports.TransitLegDetailsHeader = TransitLegDetailsHeader;

const TransitLegExpandedBody = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitLegExpandedBody",
  componentId: "sc-6hmr57-71"
})(["font-size:14px;"]);

exports.TransitLegExpandedBody = TransitLegExpandedBody;

const TransitLegFare = _styledComponents.default.div.withConfig({
  displayName: "styled__TransitLegFare",
  componentId: "sc-6hmr57-72"
})([""]);

exports.TransitLegFare = TransitLegFare;
const TransitLegSummary = (0, _styledComponents.default)(TransparentButton).withConfig({
  displayName: "styled__TransitLegSummary",
  componentId: "sc-6hmr57-73"
})(["padding:0;"]);
exports.TransitLegSummary = TransitLegSummary;

//# sourceMappingURL=styled.js