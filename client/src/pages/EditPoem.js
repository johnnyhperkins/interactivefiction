import React, { useState, useEffect, useContext } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import Typography from '@material-ui/core/Typography'
import { unstable_Box as Box } from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import Drawer from '@material-ui/core/Drawer'

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

export default function EditPoem ({ match, history }) {
  const classes = useStyles()
  const { dispatch, state: { ui: { drawer: { open } } } } = useContext(Context)
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState(null)
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

  useEffect(() => {
    getPoem()
  }, [])

  const getPoem = async () => {
    try {
      const {
        getPoem: { title, url, sections, published }
      } = await client.request(GET_POEM_QUERY_STRING, {
        _id: poemId
      })
      setPublished(published)
      setUrl(url)
      setTitle(title)
      setSections(sections)
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
      if (updatePublished) payload.published = updatePublished

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
      <div className={classes.editTitle}>
        <Mutation mutation={UPDATE_POEM_MUTATION} errorPolicy='all'>
          {updatePoem => (
            <>
              <Input
                disableUnderline={!editMode}
                disabled={!editMode}
                className={classes.editTitleField}
                inputProps={{ className: classes.active }}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />

              <Typography
                color={published ? 'error' : 'default'}
                className={classes.pointer}
                onClick={handleUpdatePoem(updatePoem, { updatePublished: !published })} >
                {published ? 'Published' : 'Not Published'}
              </Typography>

              {editMode && (
                <>
                  <Button onClick={handleUpdatePoem(updatePoem, { updateTitle: title })}>Save</Button>
                  <Button onClick={() => setEditTitle(!editTitle)} color='secondary'>Cancel</Button>
                </>
              )}
            </>
          )}
        </Mutation>
      </div>
    )
  }

  return sections && (
    <Container justify='center'>
      <Box justifyContent='space-between' display='flex'>
        <div>
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
