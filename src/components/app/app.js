import React from 'react';
import './app.css';
import withBookstoreService from '../hoc/with-bookstore-service';

import { Route, Switch } from 'react-router-dom';
import { HomePage, CartPage } from '../pages';

const App = ({ bookstoreService }) => {

  return (
    <Switch>
      <Route
        path='/'
        component={HomePage}
        exact
      />
      <Route
        path='/cart'
        component={CartPage}
      />
    </Switch>
  );
};

export default withBookstoreService()(App);
