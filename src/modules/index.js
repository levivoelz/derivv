import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import configuration from './configuration'
import derivative from './derivative'
import originalImage from './originalImage'


export default combineReducers({
  routing: routerReducer,
  configuration,
  derivative,
  originalImage
})
