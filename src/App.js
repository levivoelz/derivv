import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Home } from 'routes'
import Dialog, { DialogTitle, DialogContent, DialogContentText } from 'material-ui/Dialog'

class App extends Component {
  render() {
    if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
      return (
        <Dialog
          title='Mobile device support coming soon!'
          open>
          <DialogTitle>Sorry!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Mobile devices are not yet supported. Please try the app out on your desktop computer.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <div className='App'>
        <main>
          <Route exact path='/' component={Home} />
        </main>
      </div>
    );
  }
}

export default App;