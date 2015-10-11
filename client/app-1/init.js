import React from 'react';
import ReactDom from 'react-dom';

import containerCreator from 'shared/tools/client-container-creator';
//import translator from 'general/translator/translator-counterpart';
import store from 'shared/stores/app-store';
import routes from 'shared/routes/app-routes';


ReactDom.render(
  containerCreator.create({store, routes/*, translator*/}),
  document.getElementById('app-container')
);
