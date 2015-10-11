import React from 'react';
import Router from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';

//import Translator from 'general/translator/translator-component';

let history = createHistory();

export default {
  create: function({store, routes}) {
    /*return (
      <Translator translator={translator}>
        {() =>
          <Provider store={store}>
            {() => <Router routes={routes} history={history} />}
          </Provider>
        }
      </Translator>
    );*/

    return (
      <Provider store={store}>
        {() => <Router routes={routes} history={history} />}
      </Provider>
    );
  }
};
