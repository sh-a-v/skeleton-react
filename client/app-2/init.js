import React from 'react';
import ReactDom from 'react-dom';

import { clientContainerCreator} from 'shared/tools/container-creator';
import translator from 'general/translator/translator-counterpart';
import store from 'shared/stores/app-2-store';
import routes from 'shared/routes/app-2-routes';


ReactDom.render(
  clientContainerCreator.create({store, routes, translator}),
  document.getElementById('app-container')
);
