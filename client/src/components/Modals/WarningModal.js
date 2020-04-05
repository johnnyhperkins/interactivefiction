import React, { useContext } from 'react'
import Context from '../../context'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

const WarningModal = () => {
  const {
    state: { warningModal: { modalOpen, title, message, action } },
    dispatch
  } = useContext(Context)

  const handleClose = () => {
    dispatch({
      type: 'TOGGLE_WARNING_MODAL',
      payload: { modalOpen: false, title: '', message: '', action: null }
    })
  }

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>Cancel</Button>
        <Button
          onClick={() => {
            action()
            handleClose()
          }}
          color='primary'
          autoFocus>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default WarningModal
