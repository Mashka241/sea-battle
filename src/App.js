import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/header/header'
import Auth from './containers/auth/auth'
import User from './containers/user/user'
import Game from './containers/game/game'
import Statistics from './containers/statistics/statistics'
import HelloPage from './components/hello-page/hello-page'

const App = ({ isAuth = true }) => {
  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/statistics' component={Statistics} />
      <Route path='/' component={HelloPage} />
    </Switch>
  )
  if (isAuth) {
    routes = (
      <Switch>
        <Route path='/game' component={Game} />
        <Route path='/statistics' component={Statistics} />
        <Route path='/' component={User} />
      </Switch>
    )
  }
  return (
    <div className='App'>
      <Header />
      {routes}
    </div>
  )
}

export default App
