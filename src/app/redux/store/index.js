/* eslint-disable no-underscore-dangle */

import { compose, createStore, applyMiddleware } from 'redux';
import reducers from 'app/redux/reducers';
import middleware from 'app/redux/middleware';

const isDev = process.env.NODE_ENV !== 'production';
const composeEnhancers = (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));
