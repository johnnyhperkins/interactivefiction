import React, { useState } from 'react'
import { GraphQLClient } from 'graphql-request'

import { ME_QUERY } from '../../graphql/queries'

import { BASE_URL } from '../../client'
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../../graphql/mutations'
import { Mutation } from 'react-apollo'
import processSignIn from '../../utils/processSignIn'
import handleError from '../../utils/handleError'

import { Grid, Divider, withStyles, TextField, Typography, Button } from '@material-ui/core'

const EmailLogin = ({ classes, dispatch }) => {
  const [login, setLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const processLogin = async data => {
    const { token, user } = login ? data.login : data.signup

    // TO DO: set up better error handling for existing user
    if (!user || !token) {
      return setError('This user already exists')
    }

    // TO DO: figure out how to save session tokens somewhere other than localstorage
    sessionStorage.setItem('bbToken', token)

    const client = new GraphQLClient(BASE_URL, {
      headers: {
        authorization: token,
        usertype: 'email'
      }
    })

    const { me } = await client.request(ME_QUERY)

    processSignIn({ me, isLoggedIn: true, isGoogle: false }, dispatch)
  }

  return (
    <>
      <Grid container alignItems='center' direction='column'>
        <Grid item xs={12}>
          {error && (
            <Typography variant='body1' className={classes.error}>
              {error}
            </Typography>
          )}
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              setError('')
              setLogin(!login)
            }}>
            {login ? 'Need to create an account?' : 'Already have an account?'}
          </Button>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container alignItems='center' direction='column'>
        <Typography variant='h4'>{login ? 'Login' : 'Sign Up'}</Typography>
        {!login && (
          <TextField
            required
            className={classes.textField}
            placeholder='Name'
            label='Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        )}
        <TextField
          required
          className={classes.textField}
          placeholder='Email'
          label='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          required
          className={classes.textField}
          placeholder='Password'
          label='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
        />
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{
            email,
            password,
            name
          }}
          onError={err => {
            handleError(err, dispatch)
          }}
          onCompleted={data => {
            return processLogin(data)
          }}>
          {mutation => (
            <div>
              <Button
                className={classes.submitButton}
                variant='outlined'
                onClick={mutation}>
                {login ? 'Login' : 'Create Account'}
              </Button>
            </div>
          )}
        </Mutation>
      </Grid>
    </>
  )
}

const styles = {
  textField: {
    marginTop: 15
  },
  error: {
    color: 'red'
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 30
  },
  divider: {
    margin: '30px 0'
  }
}

export default withStyles(styles)(EmailLogin)
