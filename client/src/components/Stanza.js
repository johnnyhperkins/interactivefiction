import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import styles from '../styles'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { safeJsonParse } from '../utils/helpers'

const Stanza = ({ stanza: { leadWord, body: rawBody }, classes }) => {
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
    <div>
      <Typography
        variant='body1'
        className={classes.leadWord}>{leadWord}</Typography>
      {renderBody()}
    </div>
  )
}

export default withStyles(styles)(Stanza)
