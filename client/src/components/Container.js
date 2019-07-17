import React from 'react'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

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

const styles = {
	root: {
		padding: '50px 0 0 0',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'flex-start',
		boxSizing: 'border-box',
	},
}

export default withStyles(styles)(Container)
