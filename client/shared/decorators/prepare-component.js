import React, { Component, PropTypes } from 'react';

import { GLOBAL_PARAMS } from 'shared/global-params';

export default function prepareComponent(prepareFunction, options) {
  return DecoratedComponent =>
    class PrepareComponentDecorator extends Component {
      static prepareComponent = prepareFunction;
      static contextTypes = {
        store     : PropTypes.object.isRequired,
        translator: PropTypes.object
      };

      componentDidMount() {
        if (serverConfig.serverRendering) {
          return;  // don't re-download data
        }

        const {
          context: { store, translator },
          props  : { params, location }
        } = this;

        prepareFunction({ store, params, location, translator });
      }

      componentDidUpdate() {
        if (!(options && options.update)) {
          return;
        }

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
};
