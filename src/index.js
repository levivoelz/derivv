import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import bugsnag from 'bugsnag-js'
import createPlugin from 'bugsnag-react'
import registerServiceWorker from './registerServiceWorker';

import store, { history } from './store'
import App from './App'

const bugsnagClient = bugsnag('c8e71c39cee3a9318f39dcd5132abe6d')
const ErrorBoundary = bugsnagClient.use(createPlugin(React))
const target = document.querySelector('#root')

render(
  <ErrorBoundary>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ErrorBoundary>,
  target
)

registerServiceWorker()
