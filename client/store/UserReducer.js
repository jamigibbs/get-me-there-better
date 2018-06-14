import axios from  'axios'


/**
 * ACTION TYPES
 */

const LOAD_CURRENT_LOCATION = 'LOAD_CURRENT_LOCATION'


/**
 * ACTION CREATORS
 */

const gotCurrentLocation = () => {
  return {
    type: LOAD_CURRENT_LOCATION
  }
}

/**
 * Thunk CREATORS
 */


 /**
 * REDUCER
 */
