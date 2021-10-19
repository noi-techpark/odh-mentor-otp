import { createAction } from 'redux-actions'
if (typeof (fetch) === 'undefined') require('isomorphic-fetch')

export const receivedDrtLocationsError = createAction('DRT_LOCATIONS_ERROR')
export const receivedDrtLocationsResponse = createAction('DRT_LOCATIONS_RESPONSE')
export const requestDrtLocationsResponse = createAction('DRT_LOCATIONS_REQUEST')

export function drtLocationsQuery (url) {
  return async function (dispatch, getState) {
    dispatch(requestDrtLocationsResponse())
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
      return dispatch(receivedDrtLocationsError(err))
    }

    dispatch(receivedDrtLocationsResponse(json))
  }
}
