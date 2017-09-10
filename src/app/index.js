import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from 'app/react/routes';
import store from 'app/redux/store';

export default class App extends Component {
  constructor(props) {
    super(props);

    // One-time stateful initialization procedures
    window.console.log('init');
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
