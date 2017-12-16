import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import accountReducer from './accounts/reducer'

export default combineReducers({
  routing: routerReducer,
  accounts: accountReducer
})