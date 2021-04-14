"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lonlat = _interopRequireDefault(require("@conveyal/lonlat"));

var _abstractGeocoder = _interopRequireDefault(require("./abstract-geocoder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * An implementation that doesn't use an API for geocoding. Merely allows
 * clicking on the map and finding GPS coordinates by typing them in.
 *
 * @extends Geocoder
 */
class NoApiGeocoder extends _abstractGeocoder.default {
  /**
   * Use coordinate string parser.
   */
  autocomplete(query) {
    return this.parseCoordinateString(query.text);
  }
  /**
   * Always return the lat/lon.
   */


  reverse(query) {
    let {
      lat,
      lon
    } = query.point;
    lat = this.roundGPSDecimal(lat);
    lon = this.roundGPSDecimal(lon);
    const feature = {
      lat,
      lon,
      name: `${lat}, ${lon}`
    };
    return Promise.resolve({ ...feature,
      rawGeocodedFeature: feature
    });
  }
  /**
   * Use coordinate string parser.
   */


  search(query) {
    return this.parseCoordinateString(query.text);
  }
  /**
   * Attempt to parse the input as a GPS coordinate. If parseable, return a
   * feature.
   */


  parseCoordinateString(string) {
    let feature;

    try {
      feature = {
        geometry: {
          coordinates: _lonlat.default.toCoordinates(_lonlat.default.fromLatFirstString(string)),
          type: "Point"
        },
        properties: {
          label: string
        }
      };
    } catch (e) {
      return Promise.resolve({
        features: []
      });
    }

    return Promise.resolve({
      features: [feature]
    });
  }

  roundGPSDecimal(number) {
    const roundFactor = 100000;
    return Math.round(number * roundFactor) / roundFactor;
  }

}

exports.default = NoApiGeocoder;
module.exports = exports.default;

//# sourceMappingURL=noapi.js