import storeCreator from 'shared/tools/store-creator';

//import localesReducer from 'client/app/reducers/locales-reducer';
//import userReducer from 'client/app/reducers/user-reducer';


let reducers = {
  //locales: localesReducer,
  //user   : userReducer
};

export default storeCreator.create(reducers);
