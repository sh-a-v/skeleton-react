import storeCreator from 'common/tools/store-creator';

import localesReducer from 'app/reducers/locales-reducer';
import userReducer from 'app/reducers/user-reducer';


let reducers = {
  locales: localesReducer,
  user   : userReducer
};

export default storeCreator.create(reducers);
