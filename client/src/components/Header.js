import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'

import Link from './misc/Link'
import Context from '../context'
import SignOut from './Auth/Signout'
import useStyles from '../styles'

export default function Header () {
  const classes = useStyles()
  const { state } = useContext(Context)
  const { currentUser, isGoogle } = state
  return (
    <AppBar position='static'>
      <Grid container justify='center' spacing={16}>
        <Grid item sm={6}>
          <Toolbar className={classes.navBar}>
            <Link to='/'>
              <h2 className={classes.siteTitle}>Interactive Fiction</h2>
            </Link>
            {currentUser ? (
              <SignOut currentUser={currentUser} isGoogle={isGoogle} />
            ) : (
              <Link to='/login' color='white'>
            Log In
              </Link>
            )}
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  )
}
