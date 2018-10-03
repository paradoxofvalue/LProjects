import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './components/common/layout/Layout';
import { rootReducer, watcherSaga } from './store/redusers';
import { Provider } from 'react-redux';

import { CookiesProvider } from 'react-cookie';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";

// import { BrowserRouter } from 'react-router-dom';

import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
// import { ConnectedRouter } from 'connected-react-router'

import { IntlProvider } from 'react-intl';

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();
let store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    )
  ),

);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <IntlProvider locale={store.getState().lang}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CookiesProvider>
          <Layout />
        </CookiesProvider>
      </ConnectedRouter>
    </Provider>
  </IntlProvider>
  , document.getElementById('root'));