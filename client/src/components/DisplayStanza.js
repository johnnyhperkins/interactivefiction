import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import styles from '../styles'

const DisplayStanza = ({ stanza, isHidden, classes, selectStanza, idx }) => {
  console.log(isHidden)
  return (
    <div>
      <Typography variant='body1' className={classes.leadWord} onClick={() => selectStanza(idx)}>{stanza.leadWord}</Typography>
      <Typography variant='body1' align='center'>{!isHidden && stanza.body}</Typography>
    </div>
  )
}

export default withStyles(styles)(DisplayStanza)