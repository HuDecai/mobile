import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducers';
import { routerMiddleware } from 'react-router-redux';
import { createHashHistory } from 'history';

// Sync dispatched route actions to the history
export const history = createHashHistory();
const reduxRouterMiddleware = routerMiddleware(history);


let createStoreWithMiddleware;
createStoreWithMiddleware = applyMiddleware(
  reduxRouterMiddleware,
  thunkMiddleware,
)(createStore);


const store = createStoreWithMiddleware(
  reducers,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

const handleSubscribe = () => {
  // amumu.redux.Global.setStore(store.getState());
};

export default store;

export const dispatch = store.dispatch;
