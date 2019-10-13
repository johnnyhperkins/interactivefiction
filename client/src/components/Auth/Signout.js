import React, { useContext } from 'react'
import Context from '../../context'
import { withApollo } from 'react-apollo'
import { GoogleLogout } from 'react-google-login'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

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
    localStorage.removeItem('bbToken')
    dispatch({ type: 'SIGNOUT_USER' })
  }

  return isGoogle ? (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={({ onClick }) => (
        <div className={classes.root}>
          {currentUser.picture && (
            <img
              src={currentUser.picture}
              className={classes.picture}
              alt={currentUser.name}
            />
          )}
          <span className={classes.signout} onClick={onClick}>
            <Typography variant='body1' className={classes.white}>
							Signout
            </Typography>
            <ExitToApp className={classes.buttonIcon} />
          </span>
        </div>
      )}
    />
  ) : (
    <div className={classes.root}>
      <span className={classes.signout} onClick={onSignout}>
        <Typography variant='body1' className={classes.white}>
					Signout
        </Typography>
        <ExitToApp className={classes.buttonIcon} />
      </span>
    </div>
  )
}

export default withApollo(Signout)
