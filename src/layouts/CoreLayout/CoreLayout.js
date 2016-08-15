import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog';
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => {
  if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
    return (
      <Dialog
          title="Mobile devices aren't supported yet!"
          modal={false}
          open>
        Sorry! Currently, mobile is not supported. Please try on a desktop device.
      </Dialog>
    )
  }

  return (
    <MuiThemeProvider>
      <div>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </MuiThemeProvider>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
