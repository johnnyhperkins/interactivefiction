import React, { useContext } from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Context from '../context'
import { makeStyles } from '@material-ui/styles'

import { Snackbar, IconButton } from '@material-ui/core'

const useStyles = makeStyles({
  snackbarMessage: {
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
})

export default function UIAlerts () {
  const classes = useStyles()
  const {
    dispatch,
    state: { ui: { snackbar: { open, message } } }
  } = useContext(Context)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch({
      type: 'SNACKBAR',
      payload: {
        open: false,
        message: ''
      }
    })
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={
        <span id='message-id' className={classes.snackbarMessage}>
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.close}
          onClick={handleClose}>
          <CheckCircleIcon />
        </IconButton>
      ]}
    />
  )
}
