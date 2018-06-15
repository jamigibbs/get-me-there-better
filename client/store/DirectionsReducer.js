import axios from  'axios'
import app from '../../app.json'

const GOOGLE_DIRECTIONS_URL = 'https://maps.googleapis.com/maps/api/directions/json'
const API_KEY = app.expo.ios.config.googleMapsApiKey

/**
 * ACTION TYPES
 */

const GET_TRANSIT_TRAVEL_TIME = 'GET_TRANSIT_TRAVEL_TIME'
const GET_WALKING_TRAVEL_TIME = 'GET_WALKING_TRAVEL_TIME'

/**
 * ACTION CREATORS
 */

const gotTransitTravelTime = (time) => {
  return {
    type: GET_TRANSIT_TRAVEL_TIME,
    time
  }
}

const gotWalkingTravelTime = (time) => {
  return {
    type: GET_WALKING_TRAVEL_TIME,
    time
  }
}

/**
 * Thunk CREATORS
 */
export const getTravelTime = (origin, destination, mode) => {
  const currentLat = origin.coords.latitude
  const currentLng = origin.coords.longitude

  const url = `${GOOGLE_DIRECTIONS_URL}?origin=${currentLat},${currentLng}&destination=${destination}&key=${API_KEY}&mode=${mode}`

  return async (dispatch) => {
    const { data } = await axios.get(url)

    let totalDuration = 0;
    const duration = data.routes[0].legs.forEach((leg) => {
      totalDuration += leg.duration.value
    })

    if (mode === 'transit'){
      dispatch(gotTransitTravelTime(totalDuration))
    } else if (mode === 'walking'){
      dispatch(gotWalkingTravelTime(totalDuration))
    }

  }
}

 /**
 * REDUCER
 */

const initialState = {
  transit: {
    costCents: 250,
    travelTimeSeconds: 0
  },
  walking: {
    travelTimeSeconds: 0
  }
}

export const DirectionsReducer = ( state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSIT_TRAVEL_TIME:
      return {...state, transit: { ...state.transit, travelTimeSeconds: action.time }}
    case GET_WALKING_TRAVEL_TIME:
      return {...state, walking: {...state.walking, travelTimeSeconds: action.time}}
    default:
      return state
  }
}

