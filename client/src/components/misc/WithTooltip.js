import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

const WithTooltip = ({ tooltip, children }) => (tooltip
  ? <Tooltip title='Edit Stanza' placement='top'>
    <div>
      {children}
    </div>
  </Tooltip>
  : children
)

export default WithTooltip
