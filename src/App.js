import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Home } from 'routes'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Route exact path="/" component={Home} />
        </main>
      </div>
    );
  }
}

export default App;
