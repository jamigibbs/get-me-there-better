import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {UserReducer} from './UserReducer'
import { TransitReducer } from './TransitReducer'

const rootReducer = combineReducers({
  UserReducer,
  TransitReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export * from './UserReducer'
export * from './TransitReducer'
