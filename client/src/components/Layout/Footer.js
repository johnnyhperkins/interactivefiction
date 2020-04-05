import React from 'react'

import UIAlerts from '../UIAlerts'

import WarningModal from '../WarningModal'
import { Grid } from '@material-ui/core'

const Footer = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <UIAlerts />
        <WarningModal />
      </Grid>
    </Grid>
  )
}

export default Footer
