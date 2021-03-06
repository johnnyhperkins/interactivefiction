import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Splash from './pages/Splash'
import DisplayPoem from './pages/DisplayPoem'
import EditPoem from './pages/EditPoem'
import withRoot from './withRoot'
import Home from './pages/Home'
import Profile from './pages/Profile'
import './styles/Base.css'

import { ProtectedRoute, PublicRoute } from './utils/routeUtils'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path='/poem/:id' component={EditPoem} />
        <ProtectedRoute exact path='/profile/:user_id' component={Profile} />
        <ProtectedRoute exact path='/' component={Home} />
        <PublicRoute exact path='/poems/:username/:poem_id' component={DisplayPoem} />
        <PublicRoute path='/login' component={Splash} />
      </Switch>
    </Router>
  )
}

export default withRoot(AppRouter)
