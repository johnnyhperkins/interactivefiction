import React, { useState, useEffect, useContext } from 'react'
import { Mutation } from 'react-apollo'

import { unstable_Box as Box } from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'

import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider'
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
// import Grid from '@material-ui/core/Grid'

export default function EditPoem ({ match, history }) {
  const classes = useStyles()
  const { dispatch, state: { ui: { drawer: { open } } } } = useContext(Context)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [sections, setSections] = useState([])
  const [editTitle, setEditTitle] = useState(false)

  const { id: poemId } = match.params

  const client = useClient()

  useEffect(() => {
    getPoem()
  }, [])

  const getPoem = async () => {
    try {
      const {
        getPoem: { title, url, sections }
      } = await client.request(GET_POEM_QUERY_STRING, {
        _id: poemId
      })

      setUrl(url)
      setTitle(title)
      setSections(sections)
    } catch (err) {
      handleError(err, dispatch)
    }
  }

  const handleUpdatePoem = updatePoem => {
    return async () => {
      const { errors } = await updatePoem({
        variables: {
          _id: poemId,
          title
        }
      })

      if (errors) return handleError(errors, dispatch)
      setEditTitle(false)
      snackbarMessage('Saved', dispatch)
    }
  }

  const handleCreateSection = (createSection) => {
    return async () => {
      const { errors } = await createSection({
        variables: {
          poemId,
          firstLine: 'New Section',
          stanzas: [{ leadWord: 'New Stanza', body: 'Click here to edit this stanza' }]
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

  const renderTitle = bool => {
    return (
      <div className={classes.editTitle}>
        <Mutation mutation={UPDATE_POEM_MUTATION} errorPolicy='all'>
          {updatePoem => (
            <>
              <Input
                disableUnderline={!bool}
                disabled={!bool}
                className={classes.editTitleField}
                inputProps={{ className: classes.active }}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              {bool && (
                <>
                  <Button onClick={handleUpdatePoem(updatePoem)}>Save</Button>
                  <Button onClick={() => setEditTitle(!editTitle)} color='secondary'>Cancel</Button>
                </>
              )
              }
              {!bool &&
                <>
                  <Tooltip title='Edit poem title'>
                    <EditIcon className={classes.regularIcon} onClick={() => setEditTitle(!editTitle)} />
                  </Tooltip>
                  {Boolean(sections.length) && (
                    <Link to={url} small='true' style={{ marginLeft: '16px' }}>
                      <Eye />
                    </Link>
                  )}
                </>
              }
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
        <Mutation mutation={CREATE_SECTION_MUTATION} errorPolicy='all'>
          {createSection => (
            <Tooltip title='Add Section'>
              <AddIcon onClick={handleCreateSection(createSection)} className={`${classes.largeIcon} pulse`} />
            </Tooltip>
          )}
        </Mutation>
      </Box>
      <Divider className={classes.divider} />
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
