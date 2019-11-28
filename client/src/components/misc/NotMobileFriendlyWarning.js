import React from 'react'
import useStyles from '../../styles'
import { Grid, Button, AppBar, Typography } from '@material-ui/core'

export default function ({ dispatch }) {
  const classes = useStyles()
  const ignoreWarning = () => {
    return dispatch({
      type: 'IGNORE_WARNING',
      payload: { ignoreMobileWarning: true }
    })
  }

  return (
    <>
      <AppBar position='static'><h2 className={classes.siteTitle} style={{ textAlign: 'center' }}>Interactive Fiction</h2></AppBar>
      <Grid container justify='center' style={{ height: '50vh' }} alignItems='center'>
        <Grid item xs={8} alignContent='center' style={{ textAlign: 'center' }}>
          <Typography variant='display1' align='center' style={{ marginBottom: 25 }}>Sorry, this site is not yet optimized for mobile devices. Please use a browser or tablet.</Typography>
          <Button variant='outlined' color='secondary' onClick={ignoreWarning}>Proceed Anyway</Button>
        </Grid>
      </Grid>
    </>
  )
}
