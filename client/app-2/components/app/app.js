import './app.css';

import React from 'react';
import { connect } from 'react-redux';

import headersHandler from 'shared/tools/headers-handler';
import prepareComponent from 'client/shared/decorators/prepare-component';
import * as localesActions from 'client/shared/actions/locales-actions';
//import * as userActions from 'client/shared/actions/user-actions';

@prepareComponent(async function({store, translator, params: {}}) {
  let locale = headersHandler.getLocale();

  translator.setLocale('');  // reset default counterpart value
  await store.dispatch(localesActions.set(translator, locale));
})
@connect(state => ({
  user   : state.user,
  locales: state.locales
}))
class App extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div>App 2</div>
    )
  }
}

export default App;
