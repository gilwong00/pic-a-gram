import React, { useContext } from 'react';
import { AppContext } from 'Context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from 'Navbar';
import { Login, Register } from 'Auth';
import { Home } from 'Home';
import { Loading } from 'Loader';
import { ProtectedRoute } from 'ProtectedRoute';
import { PostDetails } from 'Post';

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
          <Route path='/register' component={Register} />
          <ProtectedRoute exact path='/post/:id' component={PostDetails} />
          <ProtectedRoute exact path='/' component={Home} />
        </Switch>
      )}
    </Router>
  );
}

export default App;
