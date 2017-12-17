import 'mapbox-gl/dist/mapbox-gl.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { bootstrap } from 'react-elemental';
import karlaBold from 'react-elemental-fonts/karla-bold';
import karlaRegular from 'react-elemental-fonts/karla-regular';
import sourceCodeProMedium from 'react-elemental-fonts/source-code-pro-medium';
import sourceCodeProRegular from 'react-elemental-fonts/source-code-pro-regular';
import routes from 'app/react/routes';
import store from 'app/redux/store';

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
