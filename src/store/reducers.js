import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import originalImage from 'modules/originalImage'
import configuration from 'modules/configuration'
import derivative from 'modules/derivative'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    configuration,
    originalImage,
    derivative,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
