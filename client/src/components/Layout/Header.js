import React, { useContext } from 'react'

import Link from '../misc/Link'
import NavMenu from '../Menu/NavMenu'
import Context from '../../context'
import useStyles from '../../styles'

import { AppBar, Toolbar, Grid } from '@material-ui/core'

export default function Header () {
  const classes = useStyles()
  const { state } = useContext(Context)
  const { currentUser, isGoogle } = state
  return (
    <AppBar position='static'>
      <Grid container justify='center' spacing={2}>
        <Grid item sm={7}>
          <Toolbar className={classes.navBar} disableGutters>
            <Link to='/'>
              <h2 className={classes.siteTitle}>Interactive Fiction</h2>
            </Link>
            {currentUser ? (
              <NavMenu currentUser={currentUser} isGoogle={isGoogle} />
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
