import 'mapbox-gl/dist/mapbox-gl.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { bootstrap } from 'react-elemental';
import karlaBold from 'react-elemental-fonts/karla-bold';
import karlaRegular from 'react-elemental-fonts/karla-regular';
import Raven from 'raven-js';
import PiwikReactRouter from 'piwik-react-router';
import { createBrowserHistory } from 'history';
import Root from 'app/react/root';
import store from 'app/redux/store';
import sentry from 'resources/data/sentry';

const {
  NODE_ENV,
  PIWIK_URL,
  PIWIK_SITE_ID,
  PIWIK_CLIENT_TRACKER_NAME = 'piwik.js',
  PIWIK_SERVER_TRACKER_NAME = 'piwik.php',
} = process.env;

const isProd = NODE_ENV === 'production';

export default class App extends Component {
  constructor(props) {
    super(props);

    // react-elemental initialization
    bootstrap({
      primary: {
        regular: karlaRegular,
        bold: karlaBold,
      },
    });

    // Silence luma.gl and deck.gl logging
    if (isProd) {
      global.luma.log.priority = 0;
      global.deck.log.priority = 0;
    }

    // Sentry initialization
    if (isProd) {
      Raven.config(sentry.dsn).install();
    }

    // Piwik and react-router initialization
    const piwik = PIWIK_URL && isProd && PiwikReactRouter({
      url: PIWIK_URL,
      siteId: PIWIK_SITE_ID,
      clientTrackerName: PIWIK_CLIENT_TRACKER_NAME,
      serverTrackerName: PIWIK_SERVER_TRACKER_NAME,
    });
    const browserHistory = createBrowserHistory();
    this.history = piwik ? piwik.connectToHistory(browserHistory) : browserHistory;
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </Provider>
    );
  }
}
