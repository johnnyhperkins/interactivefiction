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

const InfoModal = () => {
  const {
    state: { infoModal: { modalOpen, title, message } },
    dispatch
  } = useContext(Context)

  const handleClose = () => {
    dispatch({
      type: 'TOGGLE_INFO_MODAL',
      payload: { modalOpen: false, title: '', message: '' }
    })
  }

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color='primary'
          autoFocus
        >Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InfoModal
