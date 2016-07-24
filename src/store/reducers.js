import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import file from 'modules/file'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    file,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
