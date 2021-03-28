import React from 'react';
import Home from './views/home';
import Box from './views/box';
import Navbar from './components/Navbar';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/box" component={Box} />
      </Switch>
    </div>
  );
};
