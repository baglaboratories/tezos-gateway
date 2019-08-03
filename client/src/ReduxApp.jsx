import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

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
/* eslint-disable */
const store = createStoreWithMiddleware(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

require.ensure(['@babel/polyfill', 'whatwg-fetch'], (require) => {
  require('@babel/polyfill');
  require('whatwg-fetch');

  const elm = document.getElementById('app');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    elm,
  );
}, 'polyfills');
