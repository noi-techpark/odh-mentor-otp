"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var itinerary = _interopRequireWildcard(require("./itinerary"));

var map = _interopRequireWildcard(require("./map"));

var profile = _interopRequireWildcard(require("./profile"));

var query = _interopRequireWildcard(require("./query"));

var queryParams = _interopRequireWildcard(require("./query-params"));

var storage = _interopRequireWildcard(require("./storage"));

var time = _interopRequireWildcard(require("./time"));

var types = _interopRequireWildcard(require("./types"));

var ui = _interopRequireWildcard(require("./ui"));

var route = _interopRequireWildcard(require("./route"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const core = {
  itinerary,
  map,
  profile,
  query,
  queryParams,
  storage,
  time,
  types,
  ui,
  route
};
var _default = core;
exports.default = _default;