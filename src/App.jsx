import React, { Component } from 'react'
import { Home } from '@/routes'
// import Dialog, { DialogTitle, DialogContent, DialogContentText } from '@material-ui/core/Dialog'

class App extends Component {
  render() {
    if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
      return //(
        // <Dialog
        //   title='Mobile device support coming soon!'
        //   open>
        //   <DialogTitle>Sorry!</DialogTitle>
        //   <DialogContent>
        //     <DialogContentText>
        //       Mobile devices are not yet supported. Please try the app out on your desktop computer.
        //     </DialogContentText>
        //   </DialogContent>
        // </Dialog>
      // )
    }

    return (
      <div className='App'>
        <Home />
      </div>
    )
  }
}

export default App
