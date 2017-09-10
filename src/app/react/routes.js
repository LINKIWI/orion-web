import React from 'react';
import { Route } from 'react-router';
import RootContainer from 'app/react/containers/root';

const routes = (
  <div>
    <Route path="*" component={RootContainer} />
  </div>
);

export default routes;
