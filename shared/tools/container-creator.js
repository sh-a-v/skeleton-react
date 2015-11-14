import React from 'react';
import Router, { RoutingContext } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';

import Translator from 'general/translator/translator-component';

export function clientContainerCreator({store, translator, routes}) {
  let history = createBrowserHistory();

  return (
    <Translator translator={translator}>
      {() =>
        <Provider store={store}>
          <Router routes={routes} history={history} />
        </Provider>
      }
    </Translator>
  );
};

export function serverContainerCreator({store, translator, renderProps}) {
  return (
    <Translator translator={translator}>
      {() =>
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      }
    </Translator>
  );
}
