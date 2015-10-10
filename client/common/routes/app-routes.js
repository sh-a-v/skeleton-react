import React from 'react';
import { Route } from 'react-router';

import App from 'app/components/app';
import Layout from 'app/components/layout';
import IndexPage from 'app/components/index-page';
import AuthPage from 'app/components/auth-page';

let routes = (
  <Route component={App}>
    <Route path="/" component={IndexPage}/>
    <Route path="auth" component={AuthPage}/>
  </Route>
);

export default routes;
