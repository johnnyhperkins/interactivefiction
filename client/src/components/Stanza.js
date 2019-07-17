import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const Stanza = ({ stanza: { leadWord, body }, classes }) => {

	return (
		<div>
      <Typography variant="body1" className={classes.marginBottom}>{leadWord}</Typography>
      <Typography variant="body1">{body}</Typography>
    </div>
	)
}

const styles = {
	marginBottom: {
		marginBottom: 20
	}
}

export default withRouter(withStyles(styles)(Stanza))
