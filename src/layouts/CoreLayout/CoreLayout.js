import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
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

  // https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js
  const theme = getMuiTheme({
    palette: {
      primary1Color: '#57ac89',
      primary2Color: '#ccc',
      primary3Color: '#ccc',
      textColor: '#575756',
      secondaryTextColor: '#333',
      alternateTextColor: '#fff'
    }
  });

  return (
    <MuiThemeProvider muiTheme={theme}>
      <div className={classes.content}>
        {children}
      </div>
    </MuiThemeProvider>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
