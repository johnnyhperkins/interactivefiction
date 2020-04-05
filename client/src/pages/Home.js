import React, { useState, useContext } from 'react'
import { Mutation } from 'react-apollo'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Eye from '../components/Icons/Eye'

import ReactLoading from 'react-loading'
import Link from '../components/misc/Link'
import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import { outputLikesText } from '../utils/helpers'
import Context from '../context'
import {
  CREATE_POEM_MUTATION,
  DELETE_POEM_MUTATION,
  UPDATE_POEM_MUTATION
} from '../graphql/mutations'
import { GET_POEMS_QUERY } from '../graphql/queries'
import Feed from '../components/Feed'

import useStyles from '../styles'

import {
  Grid,
  Divider,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip
} from '@material-ui/core'

export default function Home ({ history, client }) {
  const classes = useStyles()
  const { dispatch } = useContext(Context)
  const [addPoem, setAddPoem] = useState(false)
  const [title, setTitle] = useState('')
  const { loading, error, data, refetch } = useQuery(GET_POEMS_QUERY)

  const startDeletePoem = (poemId, deletePoem) => {
    const action = async () => {
      const res = await deletePoem({ variables: { _id: poemId } })
      if (res) {
        snackbarMessage('Poem Deleted', dispatch)
      }
    }

    dispatch({
      type: 'TOGGLE_WARNING_MODAL',
      payload: {
        modalOpen: true,
        title: 'Are you sure you want to delete this poem?',
        message: 'This cannot be undone.',
        action
      }
    })
  }

  const handleEditPoem = id => {
    history.push(`/poem/${id}`)
  }

  const handleUpdatePoem = (updatePoem, poemId, { updatePublished }) => {
    return async () => {
      const { errors } = await updatePoem({
        variables: {
          _id: poemId,
          published: updatePublished
        }
      })

      if (errors) return handleError(errors, dispatch)
      snackbarMessage('Saved', dispatch)
    }
  }

  const handleCreatePoem = createPoem => {
    return async () => {
      const { errors } = await createPoem({
        variables: { title }
      })
      refetch()
      if (errors) return handleError(errors, dispatch)
      setAddPoem(false)
      setTitle('')
      snackbarMessage('Poem added', dispatch)
    }
  }

  const renderPoems = poems => {
    return poems.map(poem => {
      return (
        <ListItem key={poem._id} disableGutters>
          <ListItemText
            primary={poem.title}
            onClick={() => handleEditPoem(poem._id)}
            secondary={`Last updated ${moment(parseInt(poem.updatedAt)).format('MMMM Do YYYY')} ${outputLikesText(poem.likes.length)}`}
            className={classes.pointer} />
          <Mutation
            mutation={UPDATE_POEM_MUTATION}>
            {updatePoem => (
              <Typography
                color={poem.published ? 'primary' : 'error'}
                className={classes.pointer}
                onClick={handleUpdatePoem(updatePoem, poem._id, { updatePublished: !poem.published })}
                style={{ marginRight: 16 }} >
                {poem.published ? 'Published' : 'Not Published'}

              </Typography>
            )}
          </Mutation>
          <Mutation
            mutation={DELETE_POEM_MUTATION}
            onError={err => handleError(err, dispatch)}
            update={(cache, { data: { deletePoem: { _id } } }) => {
              const { getPoems } = cache.readQuery({
                query: GET_POEMS_QUERY
              })

              cache.writeQuery({
                query: GET_POEMS_QUERY,
                data: {
                  getPoems: getPoems.filter(poem => poem._id !== _id)
                }
              })
            }}>
            {deletePoem => (
              <>
                <Link to={poem.url} style={{ marginRight: '16px' }}>
                  <Tooltip title='View Poem'>
                    <Eye />
                  </Tooltip>
                </Link>
                <Tooltip title='Edit Poem'>
                  <EditIcon className={classes.regularIcon} onClick={() => handleEditPoem(poem._id)} style={{ marginRight: 16 }} />
                </Tooltip>
                <Tooltip title='Delete Poem'>
                  <DeleteIcon className={classes.deleteIcon} onClick={() => startDeletePoem(poem._id, deletePoem)} />
                </Tooltip>
              </>
            )}
          </Mutation>
        </ListItem>
      )
    })
  }

  if (loading) return <ReactLoading color='#2196f3' />
  if (error) return <Typography>{error.message}</Typography>

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item sm={7}>
          <List>
            <Typography variant='h5' className={classes.marginBottom30}>Your poems</Typography>
            {data.getPoems.length ? (
              renderPoems(data.getPoems)
            ) : (
              <ListItem disableGutters>
                <ListItemText primary='Click the plus button to create a poem.' />
              </ListItem>
            )}

            <ListItem className={classes.addPoemItem} disableGutters>
              <div className={classes.centerVertical}>
                <ListItemIcon
                  className={classes.pointer}
                  onClick={() => setAddPoem(!addPoem)}>
                  <Tooltip title='Create a Poem'>
                    <AddIcon />
                  </Tooltip>
                </ListItemIcon>
                {addPoem && (
                  <TextField
                    label='Title'
                    variant='outlined'
                    className={classes.textField}
                    margin='none'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                )}
              </div>
              {addPoem && (
                <Mutation
                  mutation={CREATE_POEM_MUTATION}
                  errorPolicy='all'
                  update={(cache, { data: { createPoem } }) => {
                    const { getPoems } = cache.readQuery({
                      query: GET_POEMS_QUERY
                    })
                    cache.writeQuery({
                      query: GET_POEMS_QUERY,
                      data: { getPoems: getPoems.concat([createPoem]) }
                    })
                  }}>
                  {createPoem => (
                    <Button onClick={handleCreatePoem(createPoem)}>
                      Create Poem
                    </Button>
                  )}
                </Mutation>
              )}
            </ListItem>
          </List>
          <Divider className={classes.divider} />
          <Feed />
        </Grid>
      </Grid>
    </div>
  )
}
