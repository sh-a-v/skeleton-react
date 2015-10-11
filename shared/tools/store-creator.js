import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


export default {
  create: function(reducers) {
    let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    let combinedReducer = combineReducers(reducers);

    /*if (env.getInitialState()) {
      return createStoreWithMiddleware(combinedReducer, env.getInitialState());
    } else {
      return createStoreWithMiddleware(combinedReducer);
    }*/

    return createStoreWithMiddleware(combinedReducer);
  }
};
