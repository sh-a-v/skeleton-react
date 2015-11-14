import storeCreator from 'shared/tools/store-creator';

import localesReducer from 'client/shared/reducers/locales-reducer';
import userReducer from 'client/shared/reducers/user-reducer';

let reducers = {
  locales: localesReducer,
  user   : userReducer
};

export default storeCreator(reducers);
