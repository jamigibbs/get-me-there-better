import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {UserReducer} from './UserReducer'

const rootReducer = combineReducers({
  UserReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export * from './UserReducer'
