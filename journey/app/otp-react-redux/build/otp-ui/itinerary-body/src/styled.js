"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransitLegSummary = exports.TransitLegFare = exports.TransitLegExpandedBody = exports.TransitLegDetailsHeader = exports.TransitLegDetails = exports.TransitAlertToggle = exports.TransitAlerts = exports.TransitAlertIconContainer = exports.TransitAlertHeader = exports.TransitAlertEffectiveDate = exports.TransitAlertBody = exports.TransitAlert = exports.StopRow = exports.StopName = exports.StopMarker = exports.StopIdSpan = exports.StepStreetName = exports.StepRow = exports.StepIconContainer = exports.StepsHeader = exports.StepDescriptionContainer = exports.Steps = exports.SRHidden = exports.SROnly = exports.RouteBadge = exports.PreviewDiagramTitle = exports.PreviewDiagramElevationLoss = exports.PreviewDiagramElevationGain = exports.PreviewDiagramElevationChange = exports.PreviewDiagram = exports.PlaceSubheader = exports.PlaceName = exports.PlaceHeader = exports.PlaceDetails = exports.MapIcon = exports.MapButtonColumn = exports.MapButton = exports.TimeColumn = exports.PreviewContainer = exports.PlaceRowWrapper = exports.LineColumn = exports.LineBadgeContainer = exports.LegLine = exports.LegIconContainer = exports.LegDescriptionForTransit = exports.LegDescriptionRouteShortName = exports.LegDescriptionRouteLongName = exports.LegDescriptionHeadsignPrefix = exports.LegDescription = exports.LegClickable = exports.LegBody = exports.ItineraryBody = exports.IntermediateStops = exports.InterlineName = exports.InterlineDot = exports.InnerLine = exports.DetailsColumn = exports.Destination = exports.CaretToggle = exports.TNCCost = exports.TNCTravelTime = exports.BookTNCRideButtonContainer = exports.BookTNCRideButton = exports.BookLaterText = exports.BookLaterPointer = exports.BookLaterInnerContainer = exports.BookLaterContainer = exports.AgencyInfo = exports.AccessBadge = exports.ViewerButton = exports.LinkButton = exports.AnchorButton = exports.TransparentButton = exports.LightBorderDiv = exports.ClearButton = void 0;

var _Map = _interopRequireDefault(require("../../icons/src/trimet/Map"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _faSolid = require("@styled-icons/fa-solid");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ////////////////////////////////////////////////
// ///////////// Generic components ///////////////
// ////////////////////////////////////////////////
const ClearButton = _styledComponents.default.button`
  background: transparent;
  color: inherit;
  border: 0;
  text-align: inherit;
  text-decoration: none;

  &:focus {
    /* What's our hover color for the     se? */
    background-color: ${props => props.theme.tertiaryColor};
    outline: 0;
  }

  &:hover {
    background-color: ${props => props.theme.hoverColor};
  }

  &:active {
    background-color: ${props => props.theme.activeColor};
  }
`;
/*
  This is needed to give the offset border look to stacked place rows
  Since the value we have access to is "interlineWithPreviousLeg" then we
  have to show/hide the top border of the div and apply a small offset
*/

exports.ClearButton = ClearButton;
const LightBorderDiv = _styledComponents.default.div`
  border-top-style: solid;
  border-top-width: ${props => props.hideBorder === "true" ? "0" : "2px"};
  border-top-color: ${props => props.theme.borderColor};
  padding-top: ${props => props.hideBorder === "true" ? "0" : "10px"};
  padding-bottom: ${props => props.hideBorder === "true" ? "10px" : "0"};
  transform: ${props => props.hideBorder === "true" ? "" : "translateY(-12px)"};
`;
exports.LightBorderDiv = LightBorderDiv;
const TransparentButton = _styledComponents.default.button`
  background: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  text-decoration: none;
  &:focus {
    /*
      TODO: Add outline for keyboard tabbing only:
      https://stackoverflow.com/a/45191208/915811
    */
  }
`;
exports.TransparentButton = TransparentButton;
const AnchorButton = _styledComponents.default.a`
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: #333;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  padding: 4px 6px;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  white-space: nowrap;

  &:hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }

  &:active {
    color: #333;
    background-color: #e6e6e6;
    background-image: none;
    border-color: #adadad;
    outline: 0;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }

  &:focus {
    color: #333;
    background-color: #e6e6e6;
    border-color: #8c8c8c;
  }

  &:active:hover {
    color: #333;
    background-color: #d4d4d4;
    border-color: #8c8c8c;
  }
`;
exports.AnchorButton = AnchorButton;
const LinkButton = (0, _styledComponents.default)(TransparentButton)`
  color: #008;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;
exports.LinkButton = LinkButton;
const ViewerButton = (0, _styledComponents.default)(LinkButton)`
  padding-left: 0px;

  &:before {
    content: "|";
    color: black;
    margin-right: 5px;
  }
`; // ////////////////////////////////////////////////
// /////////////// App components /////////////////
// ////////////////////////////////////////////////
// TODO: Can we turn this into a more abstract element to inherit from for other badges?

exports.ViewerButton = ViewerButton;
const AccessBadge = _styledComponents.default.div.attrs(props => ({
  "aria-label": `Travel by ${props.mode}`
}))`
  color: black;
  background-color: ${props => (0, _util.toModeColor)(props.mode, props.routeColor)};
  border: 2px solid #bbb;
  text-align: center;
  width: 25px;
  height: 25px;
  font-size: 1.2em;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1px;
  /* Add in border for dark mode */
`;
exports.AccessBadge = AccessBadge;
const AgencyInfo = _styledComponents.default.div`
  margin-top: 5px;

  a {
    color: #337ab7;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    margin-left: 5px;
  }
`;
exports.AgencyInfo = AgencyInfo;
const BookLaterContainer = _styledComponents.default.div`
  bottom: 0;
  left: 110px;
  position: absolute;
  right: 0;
  top: 0;
`;
exports.BookLaterContainer = BookLaterContainer;
const BookLaterInnerContainer = _styledComponents.default.div`
  background-color: #fcf9d3;
  display: table;
  height: 100%;
  width: 100%;
`;
exports.BookLaterInnerContainer = BookLaterInnerContainer;
const BookLaterPointer = _styledComponents.default.div`
  border-bottom: 16px solid transparent;
  border-right: 16px solid #fcf9d3;
  border-top: 16px solid transparent;
  height: 0;
  left: 94px;
  position: absolute;
  top: 0;
  width: 0;
`;
exports.BookLaterPointer = BookLaterPointer;
const BookLaterText = _styledComponents.default.div`
  color: #444;
  display: table-cell;
  font-style: italic;
  line-height: 0.95;
  padding: 0px 2px;
  vertical-align: middle;
`;
exports.BookLaterText = BookLaterText;
const BookTNCRideButton = (0, _styledComponents.default)(AnchorButton)``;
exports.BookTNCRideButton = BookTNCRideButton;
const BookTNCRideButtonContainer = _styledComponents.default.div`
  height: 32px;
  margin-bottom: 10px;
  margin-top: 10px;
  position: relative;
`;
exports.BookTNCRideButtonContainer = BookTNCRideButtonContainer;
const TNCTravelTime = _styledComponents.default.div`
  /* no styling */
`;
exports.TNCTravelTime = TNCTravelTime;
const TNCCost = _styledComponents.default.div`
  /* no styling */
`;
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
const Destination = _styledComponents.default.div`
  text-align: center;
`;
exports.Destination = Destination;
const DetailsColumn = (0, _styledComponents.default)(LightBorderDiv)`
  /* flexbox column -- remaining space */
  flex: 2 2 auto;
  /* overflow: hidden; this is commented out in order to show Intermediate Stop Markers */
`;
exports.DetailsColumn = DetailsColumn;
const InnerLine = _styledComponents.default.div`
  /* the actual line element */
  border-left: ${props => (0, _util.toModeBorder)(props.mode, props.routeColor)};
  height: 100%;
  width: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
exports.InnerLine = InnerLine;
const InterlineDot = _styledComponents.default.div`
  color: #fff;
  flex: 0 0 15px;
  margin-left: -33px;
  margin-right: 18px;
  position: relative;
  z-index: 30;
`;
exports.InterlineDot = InterlineDot;
const InterlineName = _styledComponents.default.div`
  /* special messaging, not sure yet */
`;
exports.InterlineName = InterlineName;
const IntermediateStops = _styledComponents.default.div`
  display: block;
  font-size: 13px;
`;
exports.IntermediateStops = IntermediateStops;
const ItineraryBody = _styledComponents.default.div``;
exports.ItineraryBody = ItineraryBody;
const LegBody = _styledComponents.default.div`
  color: #999;
  font-size: 13px;
  padding: 12px 0 18px 4px;
`;
exports.LegBody = LegBody;
const LegClickable = (0, _styledComponents.default)(TransparentButton)`
  cursor: pointer;
  display: table;
  padding: 0;
  text-align: center;
  line-height: 31px;
  /* line-height: 18px; */
`;
exports.LegClickable = LegClickable;
const LegDescription = _styledComponents.default.div`
  display: table;

  > div {
    display: table-cell;
  }
`;
exports.LegDescription = LegDescription;
const LegDescriptionHeadsignPrefix = _styledComponents.default.span`
  font-weight: 200;
`;
exports.LegDescriptionHeadsignPrefix = LegDescriptionHeadsignPrefix;
const LegDescriptionRouteLongName = _styledComponents.default.div`
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
`;
exports.LegDescriptionRouteLongName = LegDescriptionRouteLongName;
const LegDescriptionRouteShortName = _styledComponents.default.div`
  font-weight: 800;
  margin-right: 6px;
`;
exports.LegDescriptionRouteShortName = LegDescriptionRouteShortName;
const LegDescriptionForTransit = (0, _styledComponents.default)(LegDescription)`
  color: rgb(153, 153, 153);
  margin-top: 5px;
`;
exports.LegDescriptionForTransit = LegDescriptionForTransit;
const LegIconContainer = _styledComponents.default.div`
  height: 24px;
  width: 24px;
  float: left;
  margin-right: 6px;
`;
exports.LegIconContainer = LegIconContainer;
const LegLine = _styledComponents.default.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
`;
exports.LegLine = LegLine;
const LineBadgeContainer = _styledComponents.default.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-51%, -10%);
`;
exports.LineBadgeContainer = LineBadgeContainer;
const LineColumn = _styledComponents.default.div`
  /* flexbox column */
  flex: 0 0 50px;
  padding-right: 5px;
`;
exports.LineColumn = LineColumn;
const PlaceRowWrapper = _styledComponents.default.div`
  /* needs to be a flexbox row */
  max-width: 500px;
  display: flex;
  flex-flow: row;
`;
exports.PlaceRowWrapper = PlaceRowWrapper;
const PreviewContainer = _styledComponents.default.div`
  background-color: ${props => props.active && "#eee"};
  border-color: ${props => props.active ? "#d1d5da" : "#fff"};
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  display: inline-block;
  font-style: normal;
  margin: 0 4px;
  position: relative;
  text-align: center;
  text-decoration: none;
  width: 75%;

  &:hover {
    border-color: #d1d5da;
    background-color: #f6f8fa;
  }
`;
exports.PreviewContainer = PreviewContainer;
const TimeColumn = _styledComponents.default.div`
  /* flexbox column */
  flex: 0 0 60px;
  padding-right: 5px;
  font-size: 0.9em;
`;
exports.TimeColumn = TimeColumn;
const MapButton = (0, _styledComponents.default)(LinkButton)`
  padding: 3px 10px 3px 10px;
  border: 0;
  margin-top: -15px;
  width: 35px;
  height: 35px;
`;
exports.MapButton = MapButton;
const MapButtonColumn = (0, _styledComponents.default)(LightBorderDiv)`
  flex: 0 0 25px;
`;
exports.MapButtonColumn = MapButtonColumn;
const MapIcon = (0, _styledComponents.default)(_Map.default).attrs(props => ({
  fill: props.theme.secondaryColor,
  width: 15,
  height: 15,
  role: "img",
  title: "Frame this Itinerary Leg"
}))``; // export const ModeIcon = styled(BaseModeIcon).attrs(props => ({
//   width: 18,
//   height: 18,
//   title: props.title || "",
//   fill: "black"
// }))``;

exports.MapIcon = MapIcon;
const PlaceDetails = _styledComponents.default.div`
  /* container for Leg details */
  /* padding: 15px 0 15px 15px; */
  /* padding-bottom: 15px; */
`;
exports.PlaceDetails = PlaceDetails;
const PlaceHeader = _styledComponents.default.div`
  display: flex;
  font-size: 1.2em;
`;
exports.PlaceHeader = PlaceHeader;
const PlaceName = _styledComponents.default.div`
  /* text styling */
  font-weight: bold;
  height: 1.2em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1 1 auto;
`;
exports.PlaceName = PlaceName;
const PlaceSubheader = _styledComponents.default.div`
  color: grey;
  font-weight: 300;
  padding-left: 4px;
  padding-top: 1px;
`;
exports.PlaceSubheader = PlaceSubheader;
const PreviewDiagram = (0, _styledComponents.default)(TransparentButton)`
  padding: 2px;
  width: 100%;
`;
exports.PreviewDiagram = PreviewDiagram;
const PreviewDiagramElevationChange = _styledComponents.default.span`
  font-size: xx-small;
`;
exports.PreviewDiagramElevationChange = PreviewDiagramElevationChange;
const PreviewDiagramElevationGain = (0, _styledComponents.default)(PreviewDiagramElevationChange)`
  color: red;
`;
exports.PreviewDiagramElevationGain = PreviewDiagramElevationGain;
const PreviewDiagramElevationLoss = (0, _styledComponents.default)(PreviewDiagramElevationChange)`
  color: green;
`;
exports.PreviewDiagramElevationLoss = PreviewDiagramElevationLoss;
const PreviewDiagramTitle = _styledComponents.default.div`
  font-size: small;
`;
exports.PreviewDiagramTitle = PreviewDiagramTitle;
const RouteBadge = _styledComponents.default.div`
  text-align: center;
  min-width: 30px;
  min-height: 30px;
  font-size: 1.2em;
  background-color: ${props => (0, _util.toSafeRouteColor)(props.routeColor) || props.theme.mainColor};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1px;
  /* Add in border for dark mode */
  border: 1px solid ${props => props.theme.badgeBorderColor};
  user-select: none;
  cursor: default;
`;
exports.RouteBadge = RouteBadge;
const SROnly = _styledComponents.default.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
exports.SROnly = SROnly;
const SRHidden = _styledComponents.default.span.attrs({
  "aria-hidden": true
})``;
exports.SRHidden = SRHidden;
const Steps = _styledComponents.default.div`
  display: block;
`;
exports.Steps = Steps;
const StepDescriptionContainer = _styledComponents.default.div`
  margin-left: 24px;
  line-height: 1.25em;
  padding-top: 1px;
`;
exports.StepDescriptionContainer = StepDescriptionContainer;
const StepsHeader = (0, _styledComponents.default)(TransparentButton)`
  color: #999;
  display: inline-block;
  font-size: 13px;
  font-style: normal;
  margin-top: 10px;
  vertical-align: bottom;
`;
exports.StepsHeader = StepsHeader;
const StepIconContainer = _styledComponents.default.div`
  fill: #999999;
  float: left;
  height: 16px;
  width: 16px;
`;
exports.StepIconContainer = StepIconContainer;
const StepRow = _styledComponents.default.div`
  font-size: 13px;
  margin-top: 8px;
  color: #999;
  font-style: normal;
`;
exports.StepRow = StepRow;
const StepStreetName = _styledComponents.default.span`
  font-weight: 500;
`;
exports.StepStreetName = StepStreetName;
const StopIdSpan = _styledComponents.default.span`
  font-weight: 200;
  font-size: 0.9em;
  margin-left: 10px;
`;
exports.StopIdSpan = StopIdSpan;
const StopMarker = _styledComponents.default.div`
  float: left;
  margin-left: -36px;
  color: #fff;
`;
exports.StopMarker = StopMarker;
const StopName = _styledComponents.default.div`
  color: #999;
  margin-top: 3px;
`;
exports.StopName = StopName;
const StopRow = _styledComponents.default.div`
  z-index: 30;
  position: relative;
`;
exports.StopRow = StopRow;
const TransitAlert = _styledComponents.default.a`
  background-color: #eee;
  border-radius: 4px;
  color: #000;
  display: block;
  margin-top: 5px;
  padding: 8px;
  text-decoration: none;
`;
exports.TransitAlert = TransitAlert;
const TransitAlertBody = _styledComponents.default.div`
  font-size: 12px;
  margin-left: 30px;
  white-space: pre-wrap;
`;
exports.TransitAlertBody = TransitAlertBody;
const TransitAlertEffectiveDate = _styledComponents.default.div`
  margin-top: 5px;
  margin-left: 30px;
  font-size: 12px;
  font-style: italic;
`;
exports.TransitAlertEffectiveDate = TransitAlertEffectiveDate;
const TransitAlertHeader = _styledComponents.default.div`
  font-size: 14px;
  margin-left: 30px;
  font-weight: 600;
`;
exports.TransitAlertHeader = TransitAlertHeader;
const TransitAlertIconContainer = _styledComponents.default.div`
  float: left;
  font-size: 18px;
`;
exports.TransitAlertIconContainer = TransitAlertIconContainer;
const TransitAlerts = _styledComponents.default.div`
  display: block;
  margin-top: 3px;
`;
exports.TransitAlerts = TransitAlerts;
const TransitAlertToggle = (0, _styledComponents.default)(TransparentButton)`
  color: #d14727;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  margin-top: 8px;
  padding: 0;
`;
exports.TransitAlertToggle = TransitAlertToggle;
const TransitLegDetails = _styledComponents.default.div`
  margin-top: 5px;
`;
exports.TransitLegDetails = TransitLegDetails;
const TransitLegDetailsHeader = _styledComponents.default.div`
  color: #999999;
`;
exports.TransitLegDetailsHeader = TransitLegDetailsHeader;
const TransitLegExpandedBody = _styledComponents.default.div`
  font-size: 14px;
`;
exports.TransitLegExpandedBody = TransitLegExpandedBody;
const TransitLegFare = _styledComponents.default.div`
  /* no styling */
`;
exports.TransitLegFare = TransitLegFare;
const TransitLegSummary = (0, _styledComponents.default)(TransparentButton)`
  padding: 0;
`;
exports.TransitLegSummary = TransitLegSummary;

//# sourceMappingURL=styled.js