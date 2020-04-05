import React from 'react'
import { Grid } from '@material-ui/core'

import UIAlerts from '../UIAlerts'
import WarningModal from '../Modals/WarningModal'
import InfoModal from '../Modals/InfoModal'

const Footer = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <UIAlerts />
        <WarningModal />
        <InfoModal />
      </Grid>
    </Grid>
  )
}

export default Footer
