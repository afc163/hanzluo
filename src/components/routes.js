import React from 'react'
import { Switch, Route } from 'react-router'
import Home from './home/home'
import Resume from './resume/resume'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/resume" component={Resume} />
  </Switch>
)

export default Routes
