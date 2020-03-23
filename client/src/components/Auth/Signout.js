import React, { useContext } from 'react'
import { withApollo } from 'react-apollo'
import { GoogleLogout } from 'react-google-login'

import ExitToApp from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import Link from '../../components/misc/Link'
import Context from '../../context'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignContent: 'flex-end',
    alignItems: 'center'
  },
  signout: {
    cursor: 'pointer',
    display: 'flex'
  },
  buttonIcon: {
    marginLeft: '5px'
  },
  white: {
    color: 'white'
  },
  picture: {
    height: '40px',
    borderRadius: '90%',
    marginRight: 40
  }
})

const Signout = ({ currentUser, isGoogle, client }) => {
  const classes = useStyles()
  const { dispatch } = useContext(Context)
  const onSignout = () => {
    client.cache.reset()
    window.sessionStorage.removeItem('bbToken')
    dispatch({ type: 'SIGNOUT_USER' })
  }

  const handleProfileClick = (id) => {

  }

  return isGoogle ? (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={({ onClick }) => (
        <div className={classes.root}>
          {currentUser.picture && (
            <Link to={`/profile/${currentUser._id}`}>
              <img
                onClick={handleProfileClick}
                src={currentUser.picture}
                className={classes.picture}
                alt={currentUser.name}
              />
            </Link>
          )}
          <span className={classes.signout} onClick={onClick}>
            <Typography variant='body1' className={classes.white}>Signout</Typography>
            <ExitToApp className={classes.buttonIcon} />
          </span>
        </div>
      )}
    />
  ) : (
    <div className={classes.root}>
      <Link to={`/profile/${currentUser._id}`}>
        <AccountCircleIcon />
      </Link>
      <span className={classes.signout} onClick={onSignout}>
        <Typography variant='body1' className={classes.white}>Signout</Typography>
        <ExitToApp className={classes.buttonIcon} />
      </span>
    </div>
  )
}

export default withApollo(Signout)
