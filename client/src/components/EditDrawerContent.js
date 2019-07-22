import React, { useContext, useState, useEffect } from 'react'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import { useClient } from '../client'
import { UPDATE_STANZA_MUTATION } from '../graphql/mutations'

const EditDrawerContent = ({ classes, sections, setSections, onClose }) => {
  const client = useClient()
  const { dispatch, state: { ui: { drawer } } } = useContext(Context)
  const [leadWord, setLeadWord] = useState('')
  const [body, setBody] = useState('')
  const sectionIdx = sections.findIndex(section => section._id === drawer.sectionId)
  const section = sections[sectionIdx]

  useEffect(() => {
    setLeadWord(drawer.leadWord)
    setBody(drawer.body)
  }, [])

  const handleUpdateStanza = async () => {
    try {
      section.stanzas.splice(drawer.idx, 1, { leadWord, body })
      sections.splice(sectionIdx, 1, section)

      await client.request(UPDATE_STANZA_MUTATION, {
        sectionId: drawer.sectionId,
        stanzas: section.stanzas
      })

      setSections(sections)
      setLeadWord('')
      setBody('')
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
      setBody('')
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

      <TextField
        placeholder='Body'
        className={classes.textField}
        margin='normal'
        value={body}
        multiline
        rows={20}
        onChange={e => setBody(e.target.value)}
      />

      <Button
        variant='outlined'
        className={classes.submitButton}
        onClick={() => handleUpdateStanza()}>
        Update
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
