import React from 'react';
import { render } from 'react-dom';
import NotFound from './components/App/NotFound';
import Login from './components/Pages/Login';
import Home from './components/Pages/Home';
import Ballot from './components/Pages/Ballot';
import Polling from './components/Pages/Polling';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import './styles/styles.scss';

render((
  <Router>
    <App>
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/Home" component={Home}/>
        <Route path="/Ballot" component={Ballot}/>
        <Route path="/Polling" component={Polling}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
