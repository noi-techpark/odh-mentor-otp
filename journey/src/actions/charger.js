import { createAction } from 'redux-actions'
if (typeof (fetch) === 'undefined') require('isomorphic-fetch')

export const receivedChargerLocationsError = createAction('CHARGER_LOCATIONS_ERROR')
export const receivedChargerLocationsResponse = createAction('CHARGER_LOCATIONS_RESPONSE')
export const requestChargerLocationsResponse = createAction('CHARGER_LOCATIONS_REQUEST')

export function chargerLocationsQuery (url) {
  return async function (dispatch, getState) {
    dispatch(requestChargerLocationsResponse())
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
      return dispatch(receivedChargerLocationsError(err))
    }

    dispatch(receivedChargerLocationsResponse(json))
  }
}
