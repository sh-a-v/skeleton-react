import React, { Component, PropTypes } from 'react';

import { GLOBAL_PARAMS } from 'shared/global-params';

export default function prepareComponent(prepareFunction, options={}) {
  return DecoratedComponent =>
    class PrepareComponentDecorator extends Component {
      static prepareComponent = prepareFunction;
      static contextTypes = {
        store     : PropTypes.object.isRequired,
        translator: PropTypes.object
      };

      constructor(props, context) {
        super();

        this.setListeners(context.store);
      }

      setListeners(store) {
        this.currentListenValues = this.getListenValues(store);

        if (options.userListener) {
          store.subscribe(this.userListener.bind(this));
        }
      }

      getListenValues(store) {
        let state = store.getState();

        return {
          userAuth: state.user.auth
        }
      }

      componentDidMount() {
        if (GLOBAL_PARAMS.config.serverRendering) {
          return;  // don't re-download data
        }

        this.prepare();
      }

      componentDidUpdate() {
        if (!options.update) {
          return;
        }

        this.prepare();
      }

      userListener() {
        this.oldListentValues    = this.currentListenValues;
        this.currentListenValues = this.getListenValues(this.context.store);

        if (this.oldListentValues.userAuth !== this.currentListenValues.userAuth) {
          this.prepare();
        }
      }

      prepare() {
        const {
          context: { store, translator },
          props  : { params, location }
        } = this;

        prepareFunction({ store, params, location, translator });
      }

      render() {
        return (
          <DecoratedComponent {...this.props} />
        );
      }
    };
}
