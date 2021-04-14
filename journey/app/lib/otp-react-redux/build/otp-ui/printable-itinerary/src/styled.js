"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrintableItinerary = exports.ModeIcon = exports.LegHeader = exports.LegDetails = exports.LegDetail = exports.LegBody = exports.CollapsedTop = exports.Leg = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Leg = _styledComponents.default.div`
  margin-bottom: 10px;
  border-top: 1px solid grey;
  padding-top: 18px;
`;
exports.Leg = Leg;
const CollapsedTop = (0, _styledComponents.default)(Leg)`
  border-top: none;
  padding-top: 0;
`;
exports.CollapsedTop = CollapsedTop;
const LegBody = _styledComponents.default.div`
  margin-left: 40px;
`;
exports.LegBody = LegBody;
const LegDetail = _styledComponents.default.div`
  font-size: 14px;
  margin-top: 3px;
`;
exports.LegDetail = LegDetail;
const LegDetails = _styledComponents.default.div`
  margin-top: 5px;
`;
exports.LegDetails = LegDetails;
const LegHeader = _styledComponents.default.div`
  font-size: 18px;
`;
exports.LegHeader = LegHeader;
const ModeIcon = _styledComponents.default.div`
  float: left;
  width: 32px;
  height: 32px;
`;
exports.ModeIcon = ModeIcon;
const PrintableItinerary = _styledComponents.default.div``;
exports.PrintableItinerary = PrintableItinerary;

//# sourceMappingURL=styled.js