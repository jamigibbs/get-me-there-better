import axios from  'axios'
import geolib from 'geolib'
import app from '../../app.json'

const GOOGLE_DIRECTIONS_URL = 'https://maps.googleapis.com/maps/api/directions/json'
const GOOGLE_PLACES_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
const API_KEY = app.expo.ios.config.googleMapsApiKey

/**
 * ACTION TYPES
 */

const GET_TRANSIT_TRAVEL_TIME = 'GET_TRANSIT_TRAVEL_TIME'
const GET_WALKING_TRAVEL_TIME = 'GET_WALKING_TRAVEL_TIME'
const GET_NEAREST_DIVVY = 'GET_NEAREST_DIVVY'
const GET_BIKING_TRAVEL_TIME = 'GET_BIKING_TRAVEL_TIME'

/**
 * ACTION CREATORS
 */

const gotTransitTravelTime = (time) => {
  return {
    type: GET_TRANSIT_TRAVEL_TIME,
    time
  }
}

const gotWalkingTravelTime = (time, divvy = false) => {
  return {
    type: GET_WALKING_TRAVEL_TIME,
    time,
    divvy
  }
}

const gotNearestDivvyStation = (station) => {
  return {
    type: GET_NEAREST_DIVVY,
    station
  }
}

const gotBikingTravelTime = (time, divvy = false) => {
  return {
    type: GET_BIKING_TRAVEL_TIME,
    time,
    divvy
  }
}

/**
 * Thunk CREATORS
 * destination: address
 * origin: coordinates
 */
export const getTravelTime = (origin, destination, mode, divvy = false) => {

  if (!divvy) {
    origin = `${origin.coords.latitude}, ${origin.coords.longitude}`
  }

  // from origin to divvy station
  if (divvy && mode === 'walking') {
    origin = `${origin.coords.latitude}, ${origin.coords.longitude}`
    destination = `${destination.lat},${destination.lng}`
  }

  // from divvy station to destination
  if (divvy && mode === 'biking') {
    origin = `${origin.lat},${origin.lng}`
    console.log('from divvy station to destination', destination)
  }

  let url = `${GOOGLE_DIRECTIONS_URL}?origin=${origin}&destination=${destination}&key=${API_KEY}&mode=${mode}`

  return async (dispatch) => {
    const { data } = await axios.get(url)

    let totalDuration = 0;
    const duration = data.routes[0].legs.forEach((leg) => {
      totalDuration += leg.duration.value
    })

    if (mode === 'transit'){
      dispatch(gotTransitTravelTime(totalDuration))
    } else if (!divvy && mode === 'walking') {
      dispatch(gotWalkingTravelTime(totalDuration))
    } else if (divvy && mode === 'walking'){
      dispatch(gotWalkingTravelTime(totalDuration, true))
    } else if (divvy && mode === 'biking') {
      dispatch(gotBikingTravelTime(totalDuration, true))
    }

  }
}

export const getNearestDivvyStation = (lat, lng) => {
  const url = `${GOOGLE_PLACES_URL}?location=${lat},${lng}&radius=1000&type=point_of_interest&keyword=divvy&key=${API_KEY}`

  return async (dispatch) => {
    const { data } = await axios.get(url)

    const current = {lat, lng}

    const coords = data.results.map((station) => {
      return station.geometry.location
    })

    const closest = coords.map((coord) => {
      return { coord, dist: geolib.getDistance(current, coord) }
    })
    .sort( (a, b) => a.dist - b.dist )[0]

    dispatch(gotNearestDivvyStation(closest))
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
  },
  biking: {
    nearestDivvy: {},
    timeToStation: 0,
    travelTimeSeconds: 0
  }
}

export const DirectionsReducer = ( state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSIT_TRAVEL_TIME:
      return {...state, transit: { ...state.transit, travelTimeSeconds: action.time }}
    case GET_WALKING_TRAVEL_TIME: {
      if (action.divvy) {
        return {...state, biking: {...state.biking, timeToStation: action.time}}
      } else {
        return {...state, walking: {...state.walking, travelTimeSeconds: action.time}}
      }
    }
    case GET_BIKING_TRAVEL_TIME : {
      return {...state, biking: {...state.biking, travelTimeSeconds: action.time}}
    }
    case GET_NEAREST_DIVVY:
      return {...state, biking: {...state.biking, nearestDivvy: action.station}}
    default:
      return state
  }
}

