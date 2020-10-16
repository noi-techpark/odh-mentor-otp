"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var arcgis = _interopRequireWildcard(require("@conveyal/geocoder-arcgis-geojson"));

var pelias = _interopRequireWildcard(require("isomorphic-mapzen-search"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _arcgis = _interopRequireDefault(require("./geocoders/arcgis"));

var _noapi = _interopRequireDefault(require("./geocoders/noapi"));

var _pelias = _interopRequireDefault(require("./geocoders/pelias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Create a memoized getter to avoid recreating new geocoders each time.
const getGeocoder = (0, _lodash.default)(geocoderConfig => {
  if (!geocoderConfig || !geocoderConfig.type) {
    return new _noapi.default();
  }

  const {
    type
  } = geocoderConfig;

  switch (type) {
    case "ARCGIS":
      return new _arcgis.default(arcgis, geocoderConfig);

    case "PELIAS":
      return new _pelias.default(pelias, geocoderConfig);

    default:
      console.error(`Unkown geocoder type: "${type}". Using NoApiGeocoder.`);
      return new _noapi.default();
  }
});
var _default = getGeocoder;
exports.default = _default;