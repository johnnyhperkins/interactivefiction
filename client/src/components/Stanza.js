import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { safeJsonParse } from '../utils/helpers'
import useStyles from '../styles'
import '../styles/Stanza.css'

// transition classes will be from-left from-right fade-in

export default function Stanza ({ stanza: { leadWord, body: rawBody } }) {
  const classes = useStyles()
  const renderBody = () => {
    const [err, body] = safeJsonParse(rawBody)
    if (err) {
      return (
        <Typography variant='body1'>{rawBody}</Typography>
      )
    } else {
      const contentState = convertFromRaw(body)
      const editorBody = EditorState.createWithContent(contentState)

      return (
        <Editor editorState={editorBody} readOnly />
      )
    }
  }

  return (
    <>
      <Typography
        variant='body1'
        className={classes.leadWord}>{leadWord}</Typography>
      {renderBody()}
    </>
  )
}
