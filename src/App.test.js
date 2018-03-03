import React from 'react'
import App from './App'
import renderer from 'react-test-renderer'

describe('Component: App', () => {
  it.skip('matches snapshot', () => {
    // It appears as though this test needs a mock store.
    const tree = renderer.create(<App />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
