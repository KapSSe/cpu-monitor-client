import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import { DashboardPage, RegisterPage, LoginPage } from './pages'
import { ProtectedRoute } from './helpers'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={ DashboardPage }/>
      <Route path='/register' component={ RegisterPage }/>
      <ProtectedRoute path='/dashboard' component={ DashboardPage }/>
      <Route path='/*' component={ LoginPage }/>
    </Switch>
  );
}

export default App;
