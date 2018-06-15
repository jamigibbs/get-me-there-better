import axios from  'axios'
import app from '../../app.json'

const GOOGLE_DIRECTIONS_URL = 'https://maps.googleapis.com/maps/api/directions/json'
const API_KEY = app.expo.ios.config.googleMapsApiKey
const mode = 'transit'

/**
 * ACTION TYPES
 */

const GET_TRANSIT_TRAVEL_TIME = 'GET_TRANSIT_TRAVEL_TIME'

/**
 * ACTION CREATORS
 */

const gotTravelTime = (time) => {
  return {
    type: GET_TRANSIT_TRAVEL_TIME,
    time
  }
}

/**
 * Thunk CREATORS
 */
export const getTransitTravelTime = (origin, destination) => {
  const currentLat = origin.coords.latitude
  const currentLng = origin.coords.longitude

  const url = `${GOOGLE_DIRECTIONS_URL}?origin=${currentLat},${currentLng}&destination=${destination}&key=${API_KEY}&mode=${mode}`

  return async (dispatch) => {
    const { data } = await axios.get(url)

    let totalDuration = 0;
    const duration = data.routes[0].legs.forEach((leg) => {
      totalDuration += leg.duration.value
    })
    dispatch(gotTravelTime(totalDuration))
  }
}

 /**
 * REDUCER
 */

const initialState = {
  costCents: 250,
  travelTimeSeconds: 0
}

export const TransitReducer = ( state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSIT_TRAVEL_TIME:
      return {...state, travelTimeSeconds: action.time}
    default:
      return state
  }
}

