import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

// Middleware
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import App from 'containers/app/App';

import mainReducer from './mainReducer';

const loggerMiddleware = createLogger({
  predicate: () => !!DEBUG,
});

const middleware = [
  thunkMiddleware,
  loggerMiddleware,
];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
);

const elm = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  elm,
);
