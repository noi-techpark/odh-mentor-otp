"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupTitle = exports.PopupRow = exports.MapOverlayPopup = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MapOverlayPopup = _styledComponents.default.div`
  font-size: 12px;
  line-height: 1.5;
  min-width: 250px;
`;
exports.MapOverlayPopup = MapOverlayPopup;
const PopupRow = _styledComponents.default.div`
  margin-top: 6px;
`;
exports.PopupRow = PopupRow;
const PopupTitle = _styledComponents.default.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 6px;
`;
exports.PopupTitle = PopupTitle;

//# sourceMappingURL=styled.js