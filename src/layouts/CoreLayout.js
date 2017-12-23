import React from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import Dialog from 'material-ui/Dialog'
import theme from 'theme'

export const CoreLayout = ({ children }) => {
  if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
    return (
      <Dialog
        title='Mobile device support coming soon!'
        modal={false}
        open>
        Sorry! Currently, mobile devices are not yet supported. Please try the app out on your desktop computer.
      </Dialog>
    )
  }

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}

export default CoreLayout
