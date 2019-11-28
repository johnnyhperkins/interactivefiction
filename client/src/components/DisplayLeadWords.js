import React from 'react'
import useStyles from '../styles'
import '../styles/Stanza.css'
import { Typography } from '@material-ui/core'

export default function DisplayLeadWords ({ stanza: { leadWord }, testSlide, selectStanza, idx }) {
  const classes = useStyles()
  return (
    <div>
      <Typography variant='body1' className={classes.leadWord} onClick={() => selectStanza(idx)}>{leadWord}</Typography>
    </div>
  )
}
