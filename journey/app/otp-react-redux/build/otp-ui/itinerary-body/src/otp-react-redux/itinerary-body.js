"use strict";

require("core-js/modules/web.dom.iterable.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ = _interopRequireDefault(require(".."));

var ItineraryBodyClasses = _interopRequireWildcard(require("../styled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledItineraryBody = (0, _styledComponents.default)(_.default)`
  font-size: 16px;

  * {
    box-sizing: border-box;
    font-family: Hind, sans-serif;
    vertical-align: middle;
  }

  ${ItineraryBodyClasses.DetailsColumn} {
    border: 0;
    display: table-cell;
    font-size: 13px;
    padding-bottom: 0;
    padding-top: 4px;
    transform: inherit;
  }

  ${ItineraryBodyClasses.InterlineDot} {
    margin-left: -18px;
    margin-right: 3px;
  }

  ${ItineraryBodyClasses.LegDescriptionRouteShortName} {
    background-color: rgb(15, 106, 172);
    border-color: white;
    border-image: initial;
    border-radius: 12px;
    border-style: solid;
    border-width: 1px;
    box-shadow: rgb(0, 0, 0) 0px 0px 0.25em;
    color: white;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    height: 24px;
    line-height: 1.5;
    margin-right: 8px;
    min-width: 24px;
    padding: 2px 3px;
    text-align: center;
  }

  ${ItineraryBodyClasses.LineColumn} {
    display: table-cell;
    max-width: 20px;
    width: 20px;
    padding: 0;
    position: relative;
  }

  ${ItineraryBodyClasses.PlaceHeader} {
    color: #000;
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    padding-left: 4px;
  }

  ${ItineraryBodyClasses.PlaceName} {
    height: inherit;
    white-space: normal;
  }

  ${ItineraryBodyClasses.PlaceRowWrapper} {
    display: table;
    width: 100%;
  }

  ${ItineraryBodyClasses.StopMarker} {
    margin-left: -17px;
  }

  ${ItineraryBodyClasses.TimeColumn} {
    color: #999;
    display: table-cell;
    font-size: 14px;
    padding-right: 4px;
    padding-top: 1px;
    text-align: right;
    vertical-align: top;
    width: 60px;
  }
`;
var _default = StyledItineraryBody;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=itinerary-body.js