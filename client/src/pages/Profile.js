import React, { useState, useContext, useEffect } from 'react'
import { Mutation } from 'react-apollo'
import Container from '../components/Layout/Container'
import handleError from '../utils/handleError'
import { snackbarMessage } from '../utils/snackbarMessage'
import Context from '../context'
import { UPDATE_USER_MUTATION } from '../graphql/mutations'
import FavoritesList from '../components/Profile/FavoritesList'

import useStyles from '../styles'

import {
  Grid,
  Button,
  Typography,
  Input,
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
          <FavoritesList className={classes.favoritesList} />
        </Grid>
      </Grid>
    </Container>
  )
}
