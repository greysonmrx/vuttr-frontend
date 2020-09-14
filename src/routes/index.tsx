import React from 'react';
import { Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Tools from '../pages/Tools';
import Profile from '../pages/Profile';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/register" component={Register} />

    <Route path="/tools" component={Tools} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
