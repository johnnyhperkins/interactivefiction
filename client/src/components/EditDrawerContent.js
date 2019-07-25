import React, { useContext, useState, useEffect } from 'react'
import { Editor, EditorState, convertFromRaw, convertToRaw, RichUtils, getDefaultKeyBinding } from 'draft-js'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import BlockStyleControls from './misc/editor/BlockStyleControls'
import InlineStyleControls from './misc/editor/InlineStylesControls'
import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import { useClient } from '../client'
import { UPDATE_STANZA_MUTATION } from '../graphql/mutations'
import { safeJsonParse } from '../utils/helpers'
import '../styles/RichEditor.css'

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

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return true
    }
    return false
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4 /* maxDepth */
      )
      if (newEditorState !== editorState) {
        setEditorState(newEditorState)
      }
      return
    }
    return getDefaultKeyBinding(e)
  }
  const toggleBlockType = (blockType) => {
    setEditorState(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    )
  }

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    )
  }

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

  let className = 'RichEditor-editor'
  var contentState = editorState.getCurrentContent()
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder'
    }
  }

  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2
    }
  }

  function getBlockStyle (block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote'
      default: return null
    }
  }

  return (
    <div className={classes.drawer}>
      <Typography component='h2' variant='h5' className={classes.marginBottom30}>
        Stanza
      </Typography>

      <TextField
        placeholder='Lead Word'
        label='Lead Word'
        className={classes.marginBottom30}
        margin='normal'
        value={leadWord}
        onChange={e => setLeadWord(e.target.value)}
      />
      <div className='RichEditor-root'>
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <div className={className}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={setEditorState}
            spellCheck
          />
        </div>
      </div>

      <Button
        variant='outlined'
        className={classes.submitButton}
        onClick={() => handleUpdateStanza()}>
        Save
      </Button>
      <Button
        variant='outlined'
        onClick={() => onClose()}>
        Cancel
      </Button>
      <Button
        variant='outlined'
        color='secondary'
        className={classes.submitButton}
        onClick={() => handleDeleteStanza()}>
        Delete
      </Button>
    </div>
  )
}

export default EditDrawerContent
