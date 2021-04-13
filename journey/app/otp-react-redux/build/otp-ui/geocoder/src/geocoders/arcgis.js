"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lonlat = _interopRequireDefault(require("@conveyal/lonlat"));

var _abstractGeocoder = _interopRequireDefault(require("./abstract-geocoder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Geocoder implementation for the ArcGIS geocoder.
 * See https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm
 *
 * @extends Geocoder
 */
class ArcGISGeocoder extends _abstractGeocoder.default {
  /**
   * Using the given magicKey and text, perform a search query to get detailed
   * address and GPS data. Return data in an application-specific location
   * format.
   */
  getLocationFromGeocodedFeature(feature) {
    // If feature was returned from 'search' query, it will already be
    // structured properly.
    if (feature.geometry) {
      return _abstractGeocoder.default.prototype.getLocationFromGeocodedFeature(feature);
    } // If feature returned from autocomplete, we need to use the magicKey to get
    // the location's coordinates.


    return this.api.search({
      magicKey: feature.magicKey,
      text: feature.text
    }).then(response => {
      const firstFeature = response.features[0];

      const location = _lonlat.default.fromCoordinates(firstFeature.geometry.coordinates);

      location.name = firstFeature.properties.label;
      location.rawGeocodedFeature = firstFeature;
      return location;
    });
  }
  /**
   * Rewrite an autocomplete response into an application specific data format.
   * Also, filter out any results that are collections.
   */


  rewriteAutocompleteResponse(response) {
    return {
      // remove any autocomplete results that are collections
      // (eg multiple Starbucks)
      features: response.features.filter(feature => !feature.isCollection) // add label property so location-field can handle things ok
      .map(feature => ({ ...feature,
        properties: {
          label: feature.text
        }
      }))
    };
  }
  /**
   * Rewrite the response into an application-specific data format using the
   * first feature returned from the geocoder.
   */


  rewriteReverseResponse(response) {
    const {
      features,
      query
    } = response;
    const {
      lat,
      lon
    } = query;
    const firstFeature = features[0];
    return {
      lat,
      lon,
      name: firstFeature.properties.label,
      rawGeocodedFeature: firstFeature
    };
  }

}

exports.default = ArcGISGeocoder;
module.exports = exports.default;

//# sourceMappingURL=arcgis.js