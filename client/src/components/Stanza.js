import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const Stanza = ({ stanza: { leadWord, body }, classes }) => {

	return (
		<div>
      <Typography variant="body1" className={classes.leadWord}>{leadWord}</Typography>
      <Typography variant="body1">{body}</Typography>
    </div>
	)
}

const styles = {
	leadWord: {
		marginBottom: 20,
		fontWeight: 'bold'
	}
}

export default withRouter(withStyles(styles)(Stanza))
