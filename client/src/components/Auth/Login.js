import React, { useContext } from 'react'
import { GraphQLClient } from 'graphql-request'
import { GoogleLogin } from 'react-google-login'

import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Container from '../Container'

import { ME_QUERY } from '../../graphql/queries'
import { BASE_URL } from '../../client'
import EmailLogin from './EmailLogin'
import processSignIn from '../../utils/processSignIn'
import handleError from '../../utils/handleError'
import Typography from '@material-ui/core/Typography'

import Context from '../../context'

const useStyles = makeStyles({
  root: {
    padding: '50px 0 0 0'
  },
  marginBottom: {
    marginBottom: 15
  },
  divider: {
    margin: '15px 0'
  }
})

export default function Login () {
  const classes = useStyles()
  const { dispatch } = useContext(Context)

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token
      const client = new GraphQLClient(BASE_URL, {
        headers: {
          authorization: idToken,
          usertype: 'google'
        }
      })

      const { me } = await client.request(ME_QUERY)
      const isLoggedIn = googleUser.isSignedIn()

      processSignIn({ isLoggedIn, me, isGoogle: true }, dispatch)
    } catch (error) {
      dispatch({
        type: 'IS_LOGGED_IN',
        payload: false
      })
      handleError(error, dispatch)
    }
  }

  const onFailure = err => {
    console.error('Error logging in ', err)
  }
  return (
    <Container justify='center' spacing={16}>
      <EmailLogin dispatch={dispatch} />
      <Divider className={classes.divider} />
      <Grid container justify='center' style={{ textAlign: 'center' }} direction='column'>
        <Grid item sm={12}>
          <Typography className={classes.marginBottom} variant='body1'>
            Or
          </Typography>
          <GoogleLogin
            onSuccess={onSuccess}
            isSignedIn
            onFailure={onFailure}
            buttonText='Login with Google'
            theme='dark'
            clientId='739229287262-ibkp5mgk5matdci2l5n599gpbqvp5nsj.apps.googleusercontent.com'
          />
        </Grid>
      </Grid>
    </Container>
  )
}
