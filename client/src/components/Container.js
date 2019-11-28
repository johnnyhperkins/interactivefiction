import React from 'react'
import useStyles from '../styles'
import { Grid } from '@material-ui/core'

export default function Container ({ children, ...rest }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container {...rest}>
        <Grid item sm={7}>
          {children}
        </Grid>
      </Grid>
    </div>
  )
}
