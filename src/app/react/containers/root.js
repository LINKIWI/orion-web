import React from 'react';
import { Helmet } from 'react-helmet';
import Root from 'app/react/components/root';

const RootContainer = () => (
  <div>
    <Helmet>
      <title>Root</title>
    </Helmet>

    <Root />
  </div>
);

export default RootContainer;
