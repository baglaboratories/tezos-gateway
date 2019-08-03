import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'containers/home/home.route';

const RootRoute = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);

export default RootRoute;
