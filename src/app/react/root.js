import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import routes from 'app/react/routes';
import withWindowDimensions from 'app/react/hoc/with-window-dimensions';

class Root extends Component {
  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
        </Helmet>

        {routes}
      </div>
    );
  }
}

export default withWindowDimensions(Root);
