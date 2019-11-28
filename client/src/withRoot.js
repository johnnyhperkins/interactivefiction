import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  palette: {
    johnny: {
      main: '#ccc'
    },
    background: {
      default: '#fff'
    },
    primary: {
      main: '#22303b'
    },
    secondary: {
      main: '#ff3d00'
    },
    iconColor: {
      main: '#aaa',
      warning: 'red'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Montserrat',
    disabled: {
      main: '#ccc'
    }
  }
})

function withRoot (Component) {
  function WithRoot (props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

  return WithRoot
}

export default withRoot
