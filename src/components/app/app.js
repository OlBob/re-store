import React from 'react';
import './app.css';
import withBookstoreService from '../hoc/with-bookstore-service';

import { Route, Switch } from 'react-router-dom';
import ShopHeader from '../shop-header';
import { HomePage, CartPage } from '../pages';

const App = ({ bookstoreService }) => {

  return (
    <main role="main" className="container">
      <ShopHeader />
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
    </main>
  );
};

export default withBookstoreService()(App);
