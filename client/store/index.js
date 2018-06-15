import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {UserReducer} from './UserReducer'
import { DirectionsReducer } from './DirectionsReducer'

const rootReducer = combineReducers({
  UserReducer,
  DirectionsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export * from './UserReducer'
export * from './DirectionsReducer'
