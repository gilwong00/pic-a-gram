import React, { useContext } from 'react';
import { AppContext } from 'Context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from 'Navbar';
import { Login } from 'Auth';
import { Home } from 'Home';
import { Loading } from 'Loader';
import { ProtectedRoute } from 'ProtectedRoute';

function App() {
  const { loading } = useContext(AppContext);

  return (
    <Router>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <Switch>
          <Route path='/login' component={Login} />
          <ProtectedRoute exact path='/' component={Home} />
        </Switch>
      )}
    </Router>
  );
}

export default App;
