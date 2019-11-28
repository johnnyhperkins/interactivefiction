import React, { useState, useEffect, useContext } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import { unstable_Box as Box } from '@material-ui/core/Box'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import Eye from '../components/Icons/Eye'

import Link from '../components/misc/Link'
import handleError from '../utils/handleError'
import Container from '../components/Container'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import { useClient } from '../client'
import Sections from '../components/Sections'
import EditDrawerContent from '../components/EditDrawerContent'
import '../styles/Base.css'
import {
  GET_POEM_QUERY_STRING
} from '../graphql/queries'
import {
  UPDATE_POEM_MUTATION,
  CREATE_SECTION_MUTATION
} from '../graphql/mutations'

import useStyles from '../styles'

import { Typography, Tooltip, Switch, Input, Button, Drawer } from '@material-ui/core'

export default function EditPoem ({ match, history }) {
  const classes = useStyles()
  const { dispatch, state: { ui: { drawer: { open } } } } = useContext(Context)
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState(false)
  const [url, setUrl] = useState('')
  const [sections, setSections] = useState([])
  const [editTitle, setEditTitle] = useState(false)

  const { id: poemId } = match.params

  const client = useClient()

  const AddSectionContainer = styled.div`
    display: flex;
    padding: 25px 0;
    justify-content: center;
  `
  const PublishControls = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `

  useEffect(() => {
    async function getPoem () {
      try {
        const {
          getPoem: { title, url, sections, published }
        } = await client.request(GET_POEM_QUERY_STRING, {
          _id: poemId
        })
        setUrl(url)
        setTitle(title)
        setSections(sections)
        setPublished(published)
      } catch (err) {
        handleError(err, dispatch)
      }
    }
    getPoem()
  }, [])

  const getPoem = async () => {
    try {
      const {
        getPoem: { title, url, sections, published }
      } = await client.request(GET_POEM_QUERY_STRING, {
        _id: poemId
      })
      setUrl(url)
      setTitle(title)
      setSections(sections)
      setPublished(published)
    } catch (err) {
      handleError(err, dispatch)
    }
  }

  const handleUpdatePoem = (updatePoem, { updateTitle, updatePublished }) => {
    return async () => {
      const payload = {
        _id: poemId
      }
      if (updateTitle) payload.title = updateTitle
      if (updatePublished !== undefined) payload.published = updatePublished

      const { errors } = await updatePoem({
        variables: payload
      })

      if (errors) return handleError(errors, dispatch)
      setEditTitle(false)
      setPublished(updatePublished)
      snackbarMessage('Saved', dispatch)
    }
  }

  const handleCreateSection = (createSection) => {
    return async () => {
      const { errors } = await createSection({
        variables: {
          poemId,
          firstLine: 'New Section\'s First line',
          stanzas: [{ leadWord: 'New Stanza\'s lead word', body: 'Click here to edit this stanza' }]
        }
      })

      if (errors) return handleError(errors, dispatch)
      getPoem()
      snackbarMessage('Section Created', dispatch)
    }
  }

  const onClose = () => {
    return dispatch({
      type: 'TOGGLE_DRAWER',
      payload: {
        open: false,
        label: '',
        type: '',
        _id: ''
      }
    })
  }

  const renderTitle = editMode => {
    return (
      <Mutation mutation={UPDATE_POEM_MUTATION} errorPolicy='all'>
        {updatePoem => (
          <>
            <Input
              disableUnderline={!editMode}
              disabled={!editMode}
              className={classes.editTitleField}
              inputProps={{ className: classes.editTitleFieldInput }}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            {!editMode && (
              <PublishControls>
                <Switch
                  checked={published}
                  onChange={handleUpdatePoem(updatePoem, { updatePublished: !published })}
                  color='primary'
                />
                <Typography
                  color={published ? 'primary' : 'error'}
                  className={classes.pointer}
                  onClick={handleUpdatePoem(updatePoem, { updatePublished: !published })} >
                  {published ? 'Published' : 'Not Published'}
                </Typography>
              </PublishControls>)}

            {editMode && (
              <div style={{ marginTop: 10 }}>
                <Button variant='outlined' onClick={handleUpdatePoem(updatePoem, { updateTitle: title })}>Save</Button>
                <Button onClick={() => setEditTitle(!editTitle)} color='secondary'>Cancel</Button>
              </div>
            )}
          </>
        )}
      </Mutation>
    )
  }

  return sections && (
    <Container justify='center'>
      <Box justifyContent='space-between' display='flex'>
        <div className={classes.editTitle}>
          {renderTitle(editTitle)}
        </div>
        <div>
          {!editTitle &&
          <Tooltip title='Edit poem title'>
            <EditIcon className={classes.regularIcon} onClick={() => setEditTitle(!editTitle)} />
          </Tooltip>}
          {Boolean(sections.length) && (
            <Link to={url} small='true' style={{ marginLeft: '16px' }}>
              <Eye />
            </Link>
          )}
        </div>
      </Box>
      <AddSectionContainer>
        <Mutation mutation={CREATE_SECTION_MUTATION} errorPolicy='all'>
          {createSection => (
            <Tooltip title='Add Section'>
              <AddIcon onClick={handleCreateSection(createSection)} className={`${classes.largeIcon} pulse`} />
            </Tooltip>
          )}
        </Mutation>
      </AddSectionContainer>
      {Boolean(sections.length) &&
      <Sections sections={sections} setSections={setSections} poemId={poemId} />
      }

      <Drawer open={open} anchor='right' onClose={onClose}>
        <EditDrawerContent
          classes={classes}
          sections={sections}
          setSections={setSections}
          onClose={onClose}
        />
      </Drawer>
    </Container>
  )
}
