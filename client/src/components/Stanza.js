import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
// import styles from '../styles' // what the fuck??!?!


const Stanza = ({ stanza: { leadWord, body }, classes }) => {

	return (
		<div>
      <Typography variant="body1" className={classes.leadWord}>{leadWord}</Typography>
      <Typography variant="body1" align="center">{body}</Typography>
    </div>
	)
}

const styles = {
	leadWord: {
		marginBottom: 20,
		fontStyle: 'italic',
		textAlign: 'center'
	},
}

export default withStyles(styles)(Stanza)
