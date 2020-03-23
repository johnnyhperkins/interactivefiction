import React, { useState, useContext, useEffect } from 'react'
import { Mutation } from 'react-apollo'
// import { useQuery } from '@apollo/react-hooks'
// import DeleteIcon from '@material-ui/icons/Delete'
// import Eye from '../components/Icons/Eye'
import Container from '../components/Container'

// import ReactLoading from 'react-loading'
// import Link from '../components/misc/Link'
import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import { UPDATE_USER_MUTATION } from '../graphql/mutations'
// import { GET_POEMS_QUERY } from '../graphql/queries'

import useStyles from '../styles'

import {
  Grid,
  // Divider,
  Button,
  Typography,
  // TextField,
  Input,
  // List,
  // ListItem,
  // ListItemText,
  // ListItemIcon,
  Divider,
  Tooltip
} from '@material-ui/core'

export default function Profile ({ history, client }) {
  const classes = useStyles()
  const { dispatch, state } = useContext(Context)
  const { currentUser, isGoogle } = state
  const [editUsername, setEditUsername] = useState(false)
  const [username, setUsername] = useState('')

  const handleUpdateUser = (updateUser, username) => {
    return async () => {
      const payload = { name: username }

      const { errors } = await updateUser({
        variables: payload
      })

      if (errors) return handleError(errors, dispatch)
      dispatch({
        type: 'UPDATE_USER',
        payload
      })
      setEditUsername(false)
      snackbarMessage('Saved', dispatch)
    }
  }

  const handleCancelEditUsername = () => {
    setUsername(currentUser.name)
    setEditUsername(!editUsername)
  }

  useEffect(() => {
    console.log('currentUser', currentUser)
    setUsername(currentUser.name)
  }, [])

  const renderUsername = editMode => {
    return (
      <Mutation mutation={UPDATE_USER_MUTATION} errorPolicy='all'>
        {updateUser => (
          <>
            {editMode ? (
              <Input
                className={classes.editUsernameField}
                inputProps={{ className: classes.editUsernameFieldInput }}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            )
              : (
                <Tooltip title='Click to edit'>
                  <Input
                    disableUnderline
                    disabled
                    onClick={() => setEditUsername(!editUsername)}
                    className={classes.editUsernameField}
                    inputProps={{ className: classes.editUsernameFieldInput }}
                    value={`${username}'s Profile`}
                  />
                </Tooltip>
              )

            }

            {editMode && (
              <div style={{ marginTop: 10 }}>
                <Button variant='outlined' onClick={handleUpdateUser(updateUser, username)}>Save</Button>
                <Button onClick={handleCancelEditUsername} color='secondary'>Cancel</Button>
              </div>
            )}
          </>
        )}
      </Mutation>
    )
  }

  return (
    <Container justify='center' spacing={2}>
      <Grid container spacing={0} justify='space-between'>
        <Grid item xs={10}>
          {isGoogle ? (
            <Typography variant='h4'>{currentUser.name} Profile</Typography>
          ) : (
            renderUsername(editUsername)
          )}
        </Grid>
        <Grid item xs={10}>
          <Divider className={classes.divider} />
          <Typography variant='h5'>Favorited Poems</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
