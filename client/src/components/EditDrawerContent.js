import React, { useContext, useState, useEffect } from 'react'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import { useClient } from '../client'
import { UPDATE_STANZA_MUTATION } from '../graphql/mutations'
import 'draft-js/dist/Draft.css'
import { safeJsonParse } from '../utils/helpers'

const EditDrawerContent = ({ classes, sections, setSections, onClose }) => {
  const client = useClient()
  const { dispatch, state: { ui: { drawer } } } = useContext(Context)
  const [leadWord, setLeadWord] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const sectionIdx = sections.findIndex(section => section._id === drawer.sectionId)
  const section = sections[sectionIdx]

  useEffect(() => {
    setLeadWord(drawer.leadWord)
    const [err, body] = safeJsonParse(drawer.body)
    if (!err) {
      setEditorState(EditorState.createWithContent(convertFromRaw(body)))
    }
  }, [])

  const handleUpdateStanza = async () => {
    const body = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    console.log(body)
    try {
      section.stanzas.splice(drawer.idx, 1, { leadWord, body })
      sections.splice(sectionIdx, 1, section)

      await client.request(UPDATE_STANZA_MUTATION, {
        sectionId: drawer.sectionId,
        stanzas: section.stanzas
      })

      setSections(sections)
      setLeadWord('')
      setEditorState(EditorState.createEmpty())
      onClose()
      snackbarMessage('Stanza Updated', dispatch)
    } catch (err) {
      handleError(err, dispatch)
    }
  }

  const handleDeleteStanza = async () => {
    try {
      section.stanzas.splice(drawer.idx, 1)
      sections.splice(sectionIdx, 1, section)

      await client.request(UPDATE_STANZA_MUTATION, {
        sectionId: drawer.sectionId,
        stanzas: section.stanzas
      })

      setSections(sections)
      setLeadWord('')
      setEditorState(EditorState.createEmpty())
      onClose()
      snackbarMessage('Stanza Removed', dispatch)
    } catch (err) {
      handleError(err, dispatch)
    }
  }

  return (
    <div className={classes.drawer}>
      <Typography component='h2' variant='h5'>
        Stanza
      </Typography>

      <TextField
        placeholder='Lead Word'
        className={classes.textField}
        margin='normal'
        value={leadWord}
        onChange={e => setLeadWord(e.target.value)}
      />

      <Editor editorState={editorState} onChange={setEditorState} />

      <Button
        variant='outlined'
        className={classes.submitButton}
        onClick={() => handleUpdateStanza()}>
        Save
      </Button>
      <Button
        className={classes.deleteButton}
        onClick={() => handleDeleteStanza()}>
        Delete
      </Button>
    </div>
  )
}

export default EditDrawerContent
