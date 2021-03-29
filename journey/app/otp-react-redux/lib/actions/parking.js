import { createAction } from 'redux-actions'
if (typeof (fetch) === 'undefined') require('isomorphic-fetch')

export const receivedParkingLocationsError = createAction('PARKING_LOCATIONS_ERROR')
export const receivedParkingLocationsResponse = createAction('PARKING_LOCATIONS_RESPONSE')
export const requestParkingLocationsResponse = createAction('PARKING_LOCATIONS_REQUEST')

export function parkingLocationsQuery (url) {
  return async function (dispatch, getState) {
    dispatch(requestParkingLocationsResponse())
    let json
    try {
      const response = await fetch(url)
      if (response.status >= 400) {
        const error = new Error('Received error from server')
        error.response = response
        throw error
      }
      json = await response.json()
    } catch (err) {
      return dispatch(receivedParkingLocationsError(err))
    }

    dispatch(receivedParkingLocationsResponse(json))
  }
}
