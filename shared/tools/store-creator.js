import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { GLOBAL_PARAMS } from 'shared/global-params';

export default function storeCreator(reducers) {
  let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  let combinedReducer = combineReducers(reducers);

  if (GLOBAL_PARAMS.initialState) {
    return createStoreWithMiddleware(combinedReducer, GLOBAL_PARAMS.initialState);
  } else {
    return createStoreWithMiddleware(combinedReducer);
  }
};
