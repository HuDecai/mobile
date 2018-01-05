import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from './routes';
import store from './store';
import { history } from './store';

const rootElement = document.getElementById('app');

export function AppRegistry() {
  render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>,
    rootElement
  );
}
