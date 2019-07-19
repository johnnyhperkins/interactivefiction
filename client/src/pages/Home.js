import React, { useState, useContext, useEffect } from 'react'
import { Query, Mutation } from 'react-apollo'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/DeleteTwoTone'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import ReactLoading from 'react-loading'

import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import {
  CREATE_POEM_MUTATION,
  DELETE_POEM_MUTATION
} from '../graphql/mutations'
import { GET_POEMS_QUERY } from '../graphql/queries'

import styles from '../styles'

const Home = ({ classes, history, client }) => {
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

  const handleClick = id => {
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
        <ListItem key={poem._id}>
          <ListItemIcon
            className={classes.pointer}
            onClick={() => handleClick(poem._id)}>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={poem.title} />
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
              <Button onClick={() => startDeletePoem(poem._id, deletePoem)}>
                <DeleteIcon className={classes.deleteIcon} />
              </Button>
            )}
          </Mutation>
        </ListItem>
      )
    })
  }

  return (
    <div className={classes.root}>
      <Grid container justify='center'>
        <Grid item sm={6}>
          <Typography variant='h5'>My Poems</Typography>
          <Divider className={classes.divider} />
          <List>
            <Query query={GET_POEMS_QUERY}>
              {({ loading, error, data: { getPoems: poems } }) => {
                if (loading) return <ReactLoading color='#2196f3' />
                if (error) {
                  return <Typography>{error.message}</Typography>
                }
                console.log(poems)
                return poems.length ? (
                  renderPoems(poems)
                ) : (
                  <ListItem>
                    <ListItemText primary='Click the plus button to create a poem.' />
                  </ListItem>
                )
              }}
            </Query>
            <Divider className={classes.divider} />
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
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Home)
