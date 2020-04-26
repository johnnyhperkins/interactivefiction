import React, { useState, useContext } from 'react'
import { withApollo } from 'react-apollo'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Link from '../../components/misc/Link'
import Context from '../../context'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import SiteHelp from '../misc/SiteHelp'

import useStyles from '../../styles'
import SignOut from '../Auth/Signout'

const NavMenu = ({ currentUser, isGoogle, client, history }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const { dispatch } = useContext(Context)
  const onSignout = () => {
    client.cache.reset()
    window.sessionStorage.removeItem('bbToken')
    dispatch({ type: 'SIGNOUT_USER' })
  }

  const openInfoModal = () => {
    dispatch({
      type: 'TOGGLE_INFO_MODAL',
      payload: {
        modalOpen: true,
        title: 'What is Interactive Fiction?',
        message: 'Interactive fiction is a form of choose-your-own-adventure poetry created by Hala Alyan. This website aims to foster the creation of this form of poetry by providing a tool to create, edit, publish and ultimately interact with the finalized work.'
      }
    })
  }

  const handleNavClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <SiteHelp history={history} />
      {isGoogle ? (
        <img
          onClick={handleNavClick}
          src={currentUser.picture}
          className={classes.picture}
          alt={currentUser.name}
        />)
        : <AccountCircleIcon onClick={handleNavClick} />}
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><Link to={`/profile/${currentUser._id}`}>Profile</Link></MenuItem>
        <MenuItem onClick={() => {
          openInfoModal()
          handleClose()
        }}
        >About
        </MenuItem>
        <MenuItem onClick={handleClose}><SignOut currentUser={currentUser} isGoogle={isGoogle} onSignout={onSignout} /></MenuItem>
      </Menu>
    </>
  )
}

export default withApollo(NavMenu)
