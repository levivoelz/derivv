import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Dialog from 'material-ui/Dialog';
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => {
  if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
    return (
      <Dialog
          title="Mobile device support coming soon!"
          modal={false}
          open>
        Sorry! Currently, mobile devices are not supported. Please try the app out on your desktop computer.
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
