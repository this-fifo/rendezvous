import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import PageNotFound from './pages/404'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  )
}

export default App
