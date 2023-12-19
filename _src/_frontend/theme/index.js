import { createMuiTheme } from '@material-ui/core/styles'

const green = {
    50: '#ebf5f1',
    100: '#cde6dc',
    200: '#abd6c4',
    300: '#89c5ac',
    400: '#70b89b',
    500: '#57ac89',
    600: '#4fa581',
    700: '#469b76',
    800: '#3c926c',
    900: '#2c8259',
    A100: '#a8e3c5',
    A200: '#abd6c4',
    A400: '#89c5ac',
    A700: '#56ac88',
    'contrastDefaultColor': 'light',
    contrastText: 'white'
}

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

export default theme
