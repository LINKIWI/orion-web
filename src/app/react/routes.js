import React from 'react';
import { Route } from 'react-router';
import OrionContainer from 'app/react/containers/orion';

const routes = (
  <div>
    <Route path="*" component={OrionContainer} />
  </div>
);

export default routes;
