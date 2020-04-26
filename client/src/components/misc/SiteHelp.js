import React, {
  // useState,
  useContext } from 'react'

import HelpIcon from '@material-ui/icons/Help'
import Context from '../../context'
import helpMapInfo from './constants/helpMapInfo'
import useStyles from '../../styles'

export default function NavMenu ({ history }) {
  const classes = useStyles()
  const path = history?.location?.pathname
  const helpType = path && path.split('/')[1]
  const { dispatch, state } = useContext(Context)
  const { name } = state.currentUser

  const handleHelp = () => {
    dispatch({
      type: 'TOGGLE_INFO_MODAL',
      payload: {
        modalOpen: true,
        ...helpMapInfo(helpType)
      }
    })
  }

  return helpMapInfo(helpType) && <HelpIcon onClick={handleHelp} className={classes.pointer} />
}
