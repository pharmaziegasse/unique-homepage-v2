//> React
// Contains all the functionality necessary to define React components
import React from 'react';
// DOM bindings for React Router
import { Route, Switch } from 'react-router-dom';

//> Components
/**
 * HomePage: A basic template page
 */
import {
  HomePage,
  PrivacyPage,
  AboutPage,
} from './components/pages';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/privacy' component={PrivacyPage} />
        <Route exact path='/about' component={AboutPage} />
          
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;

/** 
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Werbeagentur Christian Aichner
 */
