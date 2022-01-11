import Geocoder from "./abstract-geocoder";
import { getItem } from "../../core-utils/storage";

/**
 * Geocoder implementation for the Pelias geocoder.
 * See https://pelias.io
 *
 * @extends Geocoder
 */
export default class PeliasGeocoder extends Geocoder {
  /**
   * Generate an autocomplete query specifically for the Pelias API. The
   * `sources` parameter is a Pelias-specific option.
   */
  getAutocompleteQuery(query) {

    const {
      apiKey,
      baseUrl,
      boundary,
      focusPoint,
      options,
      sources
    } = this.geocoderConfig;

    query.lang = getItem('lang');

    return {
      apiKey,
      boundary: boundary || {rect: getItem('mapBounds') },
      focusPoint,
      options,
      // explicitly send over null for sources if provided sources is not truthy
      // in order to avoid default isomorphic-mapzen-search sources form being
      // applied
      sources: sources || null,
      url: baseUrl ? `${baseUrl}/v1/autocomplete` : undefined,
      ...query
    };
  }

  /**
   * Default reverse query generator
   */
  getReverseQuery(query) {
    const { apiKey, baseUrl, options } = this.geocoderConfig;
    return {
      apiKey,
      format: true,
      options,
      url: baseUrl ? `${baseUrl}/v1/reverse` : undefined,
      ...query
    };
  }
  /**
   * Generate a search query specifically for the Pelias API. The
   * `sources` parameter is a Pelias-specific option.
   */
  getSearchQuery(query) {

    const {
      apiKey,
      baseUrl,
      boundary,
      focusPoint,
      options,
      sources
    } = this.geocoderConfig;

    query.lang = getItem('lang');

    return {
      apiKey,
      boundary: boundary || {rect: getItem('mapBounds') },
      focusPoint,
      options,
      // explicitly send over null for sources if provided sources is not truthy
      // in order to avoid default isomorphic-mapzen-search sources form being
      // applied
      sources: sources || null,
      url: baseUrl ? `${baseUrl}/v1/search` : undefined,
      format: false, // keep as returned GeoJSON,
      ...query
    };
  }

  /**
   * Rewrite the response into an application-specific data format using the
   * first feature returned from the geocoder.
   */
  rewriteReverseResponse(response) {

    const {
      "point.lat": lat,
      "point.lon": lon
    } = response.isomorphicMapzenSearchQuery;
    const firstFeature = response[0];
    return {
      lat,
      lon,
      name: firstFeature.label,
      rawGeocodedFeature: firstFeature
    };
  }
}
