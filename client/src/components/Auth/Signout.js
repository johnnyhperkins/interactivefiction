import React from 'react'
import { GoogleLogout } from 'react-google-login'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { Typography } from '@material-ui/core'

import useStyles from '../../styles'

export default function Signout ({ currentUser, isGoogle, onSignout }) {
  const classes = useStyles()

  return isGoogle ? (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={({ onClick }) => (
        <span className={classes.signout} onClick={onClick}>
          <Typography variant='body1'>Signout</Typography>
          <ExitToApp className={classes.buttonIcon} />
        </span>
      )}
    />
  ) : (
    <span className={classes.signout} onClick={onSignout}>
      <Typography variant='body1'>Signout</Typography>
      <ExitToApp className={classes.buttonIcon} />
    </span>
  )
}
