import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import styles from '../styles'
import '../styles/Stanza.css'

const DisplayLeadWords = ({ stanza: { leadWord }, classes, testSlide, selectStanza, idx }) => {
  return (
    <div>
      <Typography variant='body1' className={classes.leadWord} onClick={() => selectStanza(idx)}>{leadWord}</Typography>
    </div>
  )
}

export default withStyles(styles)(DisplayLeadWords)
