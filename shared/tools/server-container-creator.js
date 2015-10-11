import React from 'react';
import { RoutingContext } from 'react-router';
import { Provider } from 'react-redux';

//import Translator from 'general/translator/translator-component';

export default {
  create: function({store, translator, renderProps}) {
    /*return (
      <Translator translator={translator}>
        {() =>
          <Provider store={store}>
            {() => <RoutingContext {...renderProps} />}
          </Provider>
        }
      </Translator>
    );*/

    return (
      <Provider store={store}>
        {() => <RoutingContext {...renderProps} />}
      </Provider>
    );
  }
};
