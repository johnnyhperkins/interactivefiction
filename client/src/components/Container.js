import React from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import styles from '../styles'

const Container = ({ classes, children, ...rest }) => {
  return (
    <div className={classes.root}>
      <Grid container {...rest}>
        <Grid item sm={6}>
          {children}
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Container)
