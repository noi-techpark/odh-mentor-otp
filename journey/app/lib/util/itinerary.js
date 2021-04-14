import { latLngBounds } from 'leaflet'
import coreUtils from '../otp-ui/core-utils'

export function getLeafletItineraryBounds (itinerary) {
  return latLngBounds(coreUtils.itinerary.getItineraryBounds(itinerary))
}

/**
 * Return a leaflet LatLngBounds object that encloses the given leg's geometry.
 */
export function getLeafletLegBounds (leg) {
  return latLngBounds(coreUtils.itinerary.getLegBounds(leg))
}
