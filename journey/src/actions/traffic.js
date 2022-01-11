import { createAction } from 'redux-actions'
if (typeof (fetch) === 'undefined') require('isomorphic-fetch')

export const receivedTrafficLocationsError = createAction('TRAFFIC_LOCATIONS_ERROR')
export const receivedTrafficLocationsResponse = createAction('TRAFFIC_LOCATIONS_RESPONSE')
export const requestTrafficLocationsResponse = createAction('TRAFFIC_LOCATIONS_REQUEST')

export function trafficLocationsQuery (url) {
  return async function (dispatch, getState) {
    dispatch(requestTrafficLocationsResponse())
    let json
    try {
      const response = await fetch(url)
      if (response.status >= 400) {
        const error = new Error('Received error from server')
        error.response = response
        throw error
      }
      json = await response.json();
    } catch (err) {
      return dispatch(receivedTrafficLocationsError(err))
    }

    dispatch(receivedTrafficLocationsResponse(json))
  }
}
