/* globals fetch */
/*
customize from ORIGINAL pkg:
  "version": "1.5.1"
  "name": "isomorphic-mapzen-search",
  "description": "Isomorphic Mapzen search for reuse across our libraries.",
  "homepage": "https://github.com/conveyal/isomorphic-mapzen-search",
  "dependencies": {
    "@conveyal/lonlat": "^1.1.2",
    "isomorphic-fetch": "^2.2.1",
    "qs": "^6.3.0"
  },
*/
import lonlat from '@conveyal/lonlat'
import qs from 'qs'

if (typeof (fetch) === 'undefined') {
  require('isomorphic-fetch')
}

const mapzenUrl = 'https://search.mapzen.com/v1'
const autocompleteUrl = `${mapzenUrl}/autocomplete`
const reverseUrl = `${mapzenUrl}/reverse`
const searchUrl = `${mapzenUrl}/search`

/**
 * Search for and address using
 * Mapzen's {@link https://mapzen.com/documentation/search/autocomplete/|Autocomplete}
 * service.
 *
 * @param {Object} $0
 * @param  {string} $0.apiKey                     The Mapzen API key
 * @param  {Object} $0.boundary
 * @param  {Object} $0.focusPoint
 * @param  {boolean} $0.format
 * @param  {string} $0.layers                     a comma-separated list of
 *   {@link https://mapzen.com/documentation/search/autocomplete/#layers|layer types}
 * @param  {Object} $0.options                    options to pass to fetch (e.g., custom headers)
 * @param  {string} [$0.sources='gn,oa,osm,wof']
 * @param  {string} $0.text                       query text
 * @param {string} [$0.url='https://search.mapzen.com/v1/autocomplete']                       optional URL to override Mapzen autocomplete endpoint
 * @return {Promise}                              A Promise that'll get resolved with the autocomplete result
 */
export function autocomplete ({
  apiKey,
  boundary,
  focusPoint,
  format,
  layers,
  options,
  sources = 'gn,oa,osm,wof',
  text,
  lang,
  url = autocompleteUrl
}) {
  // build query
  const query = {
    api_key: apiKey,
    text,
    lang
  }

  if (sources && sources.length > 0) query.sources = sources

  if (layers) {
    query.layers = layers
  }

  if (focusPoint) {
    const {lat, lon} = lonlat(focusPoint)
    query['focus.point.lat'] = lat
    query['focus.point.lon'] = lon
  }

  if (boundary) {
    if (boundary.country) query['boundary.country'] = boundary.country
    if (boundary.rect) {
      query['boundary.rect.min_lat'] = boundary.rect.minLat
      query['boundary.rect.min_lon'] = boundary.rect.minLon
      query['boundary.rect.max_lat'] = boundary.rect.maxLat
      query['boundary.rect.max_lon'] = boundary.rect.maxLon
    }
    /* Circle currently not supported in autocomplete
    if (boundary.circle) {
      const {lat, lon} = lonlat(boundary.circle.centerPoint)
      query['boundary.circle.lat'] = lat
      query['boundary.circle.lon'] = lon
      query['boundary.circle.radius'] = boundary.circle.radius
    }
    */
  }

  return run({
    format,
    options,
    query,
    url
  })
}

/**
 * Search for an address using
 * Mapzen's {@link https://mapzen.com/documentation/search/search/|Search}
 * service.
 *
 * @param {Object} $0
 * @param {string} $0.apiKey                    The Mapzen API key
 * @param {Object} $0.boundary
 * @param {Object} $0.focusPoint
 * @param {boolean} $0.format
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @param {number} [$0.size=10]
 * @param {string} [$0.sources='gn,oa,osm,wof']
 * @param {string} $0.text                      The address text to query for
 * @param {string} [$0.url='https://search.mapzen.com/v1/search']                     optional URL to override Mapzen search endpoint
 * @return {Promise}                            A Promise that'll get resolved with search result
 */
export function search ({
  apiKey,
  boundary,
  focusPoint,
  format,
  options,
  size = 10,
  sources = 'gn,oa,osm,wof',
  text,
  lang,
  url = searchUrl
}) {
  if (!text) return Promise.resolve([])

  const query = {
    api_key: apiKey,
    size,
    text,
    lang
  }

  if (sources && sources.length > 0) query.sources = sources

  if (focusPoint) {
    const {lat, lon} = lonlat(focusPoint)
    query['focus.point.lat'] = lat
    query['focus.point.lon'] = lon
  }

  if (boundary) {
    if (boundary.country) query['boundary.country'] = boundary.country
    if (boundary.rect) {
      query['boundary.rect.min_lat'] = boundary.rect.minLat
      query['boundary.rect.min_lon'] = boundary.rect.minLon
      query['boundary.rect.max_lat'] = boundary.rect.maxLat
      query['boundary.rect.max_lon'] = boundary.rect.maxLon
    }
    if (boundary.circle) {
      const {lat, lon} = lonlat(boundary.circle.centerPoint)
      query['boundary.circle.lat'] = lat
      query['boundary.circle.lon'] = lon
      query['boundary.circle.radius'] = boundary.circle.radius
    }
  }

  return run({format, options, query, url})
}

/**
 * Reverse geocode using
 * Mapzen's {@link https://mapzen.com/documentation/search/reverse/|Reverse geocoding}
 * service.
 *
 * @param {Object} $0
 * @param {string} $0.apiKey                    The Mapzen API key
 * @param {boolean} $0.format
 * @param  {Object} $0.options                  options to pass to fetch (e.g., custom headers)
 * @param {{lat: number, lon: number}} $0.point Point to reverse geocode
 * @param {string} [$0.url='https://search.mapzen.com/v1/reverse']                     optional URL to override Mapzen reverse endpoint
 * @return {Promise}                            A Promise that'll get resolved with reverse geocode result
 */
export function reverse ({
  apiKey,
  format,
  options,
  point,
  url = reverseUrl
}) {
  const {lon, lat} = lonlat(point)
  return run({
    format,
    options,
    query: {
      api_key: apiKey,
      'point.lat': lat,
      'point.lon': lon
    },
    url
  })
}

function run ({
  format = false,
  options,
  query,
  url = searchUrl
}) {
  return fetch(`${url}?${qs.stringify(query)}`, options)
    .then((res) => res.json())
    .then((json) => {
      let jsonResponse = json
      if (json && json.features && format) {
        jsonResponse = json.features.map(split)
      }

      jsonResponse.isomorphicMapzenSearchQuery = query

      return jsonResponse
    })
}

function split ({
  geometry,
  properties
}) {
  return Object.assign({}, properties, {
    address: `${properties.label}${properties.postalcode ? ' ' + properties.postalcode : ''}`,
    latlng: lonlat.fromCoordinates(geometry.coordinates)
  })
}
