import 'mapbox-gl/dist/mapbox-gl.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { bootstrap } from 'react-elemental';
import karlaBold from 'react-elemental-fonts/karla-bold';
import karlaRegular from 'react-elemental-fonts/karla-regular';
import sourceCodeProMedium from 'react-elemental-fonts/source-code-pro-medium';
import sourceCodeProRegular from 'react-elemental-fonts/source-code-pro-regular';
import Raven from 'raven-js';
import routes from 'app/react/routes';
import store from 'app/redux/store';
import sentry from 'resources/data/sentry';

export default class App extends Component {
  constructor(props) {
    super(props);

    bootstrap({
      primary: {
        regular: karlaRegular,
        bold: karlaBold,
      },
      secondary: {
        regular: sourceCodeProRegular,
        bold: sourceCodeProMedium,
      },
    });

    if (process.env.NODE_ENV === 'production') {
      Raven.config(sentry.dsn).install();
      global.luma.log.priority = 0;
      global.deck.log.priority = 0;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {routes}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
