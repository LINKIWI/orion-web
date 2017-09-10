import { compose, createStore, applyMiddleware } from 'redux';
import reducers from 'app/redux/reducers';
import middleware from 'app/redux/middleware';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));
