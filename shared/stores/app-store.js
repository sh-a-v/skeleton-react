import storeCreator from 'shared/tools/store-creator';

//import localesReducer from 'client/app-1/reducers/locales-reducer';
//import userReducer from 'client/app-1/reducers/user-reducer';


let reducers = {
  //locales: localesReducer,
  //user   : userReducer
};

export default storeCreator.create(reducers);
