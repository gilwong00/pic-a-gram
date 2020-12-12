import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from 'Navbar';
import { Login } from 'Auth';
import { Home } from 'Home';
import { ProtectedRoute } from 'ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/login' component={Login} />
        <ProtectedRoute exact path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
