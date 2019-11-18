import React, { useState, useContext } from 'react'
import { Query, Mutation } from 'react-apollo'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'

import ReactLoading from 'react-loading'

import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import {
  CREATE_POEM_MUTATION,
  DELETE_POEM_MUTATION
} from '../graphql/mutations'
import { GET_POEMS_QUERY } from '../graphql/queries'
import Feed from '../components/Feed'

import useStyles from '../styles'

export default function Home ({ history, client }) {
  const classes = useStyles()
  const { dispatch } = useContext(Context)
  const [addPoem, setAddPoem] = useState(false)
  const [title, setTitle] = useState('')

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

  const handleCreatePoem = createPoem => {
    return async () => {
      const { errors } = await createPoem({
        variables: { title }
      })
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
          <ListItemText primary={poem.title} onClick={() => handleEditPoem(poem._id)} className={classes.pointer} />
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

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item sm={7}>
          <Typography variant='h5' className={classes.marginBottom30}>My Poems</Typography>
          <List>
            <Query query={GET_POEMS_QUERY}>
              {({ loading, error, data: { getPoems: poems } }) => {
                if (loading) return <ReactLoading color='#2196f3' />
                if (error) {
                  return <Typography>{error.message}</Typography>
                }

                return poems.length ? (
                  renderPoems(poems)
                ) : (
                  <ListItem>
                    <ListItemText primary='Click the plus button to create a poem.' />
                  </ListItem>
                )
              }}
            </Query>
            <ListItem className={classes.addPoemItem}>
              <div className={classes.centerVertical}>
                <ListItemIcon
                  className={classes.pointer}
                  onClick={() => setAddPoem(!addPoem)}>
                  <AddIcon />
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
