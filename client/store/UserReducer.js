import axios from  'axios'
import { Location, Permissions } from 'expo'

/**
 * ACTION TYPES
 */

const LOAD_CURRENT_LOCATION = 'LOAD_CURRENT_LOCATION'
const LOAD_CURRENT_LOCATION_ERROR = 'LOAD_CURRENT_LOCATION_ERROR'
const GET_ROUTE_PRIORITY_TYPE = 'GET_ROUTE_PRIORITY_TYPE'
const GET_DESTINATION = 'GET_DESTINATION'

/**
 * ACTION CREATORS
 */

const gotCurrentLocation = (location) => {
  return {
    type: LOAD_CURRENT_LOCATION,
    location
  }
}

const gotCurrentLocationError = (error) => {
  return {
    type: LOAD_CURRENT_LOCATION_ERROR,
    error
  }
}

export const getRoutePriorityType = (priority) => {
  return {
    type: GET_ROUTE_PRIORITY_TYPE,
    priority
  }
}

export const getDestination = (location) => {
  return {
    type: GET_DESTINATION,
    location
  }
}

/**
 * Thunk CREATORS
 */

// const isSimulator = () => {
//   return DeviceInfo.isEmulator();
// }

const chicagoFSA = {
  coords:  {
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: -1,
    heading: -1,
    latitude: 41.895266,
    longitude: -87.639035,
    speed: -1,
  },
  timestamp: 1528996324016.522
}

export const getCurrentLocation = (simulator) => {
  return async (dispatch) => {
    if (!simulator) {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status !== 'granted') {
        dispatch(gotCurrentLocationError('Permission to access location was denied'))
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(gotCurrentLocation(location))
    } else {
      dispatch(gotCurrentLocation(chicagoFSA))
    }
  }
}

 /**
 * REDUCER
 */

const initialState = {
  currentLocation: {},
  errorMessage: null,
  priority: '',
  destination: {}
}

export const UserReducer = ( state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT_LOCATION:
      return {...state, currentLocation: action.location}
    case LOAD_CURRENT_LOCATION_ERROR:
      return {...state, errorMessage: action.error}
    case GET_ROUTE_PRIORITY_TYPE:
      return {...state, priority: action.priority}
    case GET_DESTINATION:
      return {...state, destination: action.location}
    default:
      return state
  }
}

