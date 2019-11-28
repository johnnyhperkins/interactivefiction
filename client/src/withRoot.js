import React from 'react'
import { MuiThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff'
    },
    primary: {
      main: '#22303b'
    },
    secondary: {
      main: '#ff3d00'
    }
  },
  typography: {
    fontFamily: 'Montserrat'
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
