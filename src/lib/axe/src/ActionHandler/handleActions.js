/**
 * Created by leiyouwho on 6/29/16.
 */

import Immutable from 'immutable';
import * as FetchState from '../FetchState';


const isChangeAction = (actionString: string): boolean => {
  if (actionString.substr(0, 9) === '@@CHANGE/') {
    return true;
  }
  return false;
};

const isDeleteAction = (actionString: string): boolean => {
  if (actionString.substr(0, 9) === '@@DELETE/') {
    return true;
  }
  return false;
}

const isPushAction = (actionString: string): boolen => {
  if (actionString.substr(0, 7) === '@@PUSH/') {
    return true;
  }
  return false;
}

const getPathArray = (actionString: string, reducerPathRE): [] => {
  const index: number = actionString.indexOf('/');
  if (index !== -1) {
    let reducerPathString = actionString.substring(index + 1);
    reducerPathString = reducerPathString.replace(reducerPathRE, '');
    return reducerPathString.split('/');
  }
};

export default (handlers, defaultState, reducerPathRE) => (state = defaultState, action) => {
  for (const handler of handlers) {
    if (handler.type === action.type) {
      return handler.successCallBack(state, action);
    } else if (FetchState.REQUEST(handler.type) === action.type) {
      return handler.requestCallBack(state, action);
    } else if (FetchState.SUCCESS(handler.type) === action.type) {
      return handler.successCallBack(state, action);
    } else if (FetchState.FAILURE(handler.type) === action.type) {
      return handler.failureCallBack(state, action);
    } else if (handler.type instanceof Error) {
      return handler.catchCallBack(state, action);
    } else if (reducerPathRE.test(action.type)) {
      const statePath = action.type.replace(reducerPathRE, '');
      console.log(statePath.split('/'));
      const result = state.setIn(statePath.split('/'), action.data);
      return result;
    } else if (isChangeAction(action.type)) {
      return state.setIn(getPathArray(action.type, reducerPathRE), action.data);
    } else if (isDeleteAction(action.type)) {
      console.log('delete: ', getPathArray(action.type, reducerPathRE));
      return state.deleteIn(getPathArray(action.type, reducerPathRE));
    } else if (isPushAction(action.type)) {
      return state.setIn(
        getPathArray(action.type, reducerPathRE),
        state.getIn(getPathArray(action.type, reducerPathRE)).push(action.data)
      );
    }
  }
  return state;
};
