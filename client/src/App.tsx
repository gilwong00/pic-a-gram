import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { PhotoGrid } from './Photo';
import styled from 'styled-components';
import './App.css';

const Viewport = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

const Header = styled.h1`
  font-family: 'billabongregular';
  text-align: center;
  font-weight: 100;
  font-size: 13rem;
  margin: 2rem 0;
  letter-spacing: -1px;
  text-shadow: 0px 4px 0 rgba(18, 86, 136, 0.11);
  & > a {
    color: #552586;
    text-decoration: none !important;
  }
`;

function App() {
  return (
    <Viewport>
      <Router>
        <Header>
          <Link to='/'>Pic-a-gram</Link>
        </Header>
        <Switch>
          <Route path='/' component={PhotoGrid} />
        </Switch>
      </Router>
    </Viewport>
  );
}

export default App;
