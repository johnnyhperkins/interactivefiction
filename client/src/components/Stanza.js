import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import styles from '../styles'

const Stanza = ({ stanza: { leadWord, body }, classes }) => {
  return (
    <div>
      <Typography
        variant='body1'
        className={classes.leadWord}>{leadWord}</Typography>
      <Typography variant='body1' align='center'>{body}</Typography>
    </div>
  )
}

export default withStyles(styles)(Stanza)
