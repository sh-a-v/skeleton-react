import config from '../config';
import points from '../points';

import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import createLocation from 'history/lib/createLocation'
import React from 'react';
import Router from 'react-router';

import headersHandler from 'shared/tools/headers-handler';
import containerCreator from 'shared/tools/server-container-creator';
import * as stores from 'shared/stores';
import * as routes from 'shared/routes';
import translator from 'shared/translator/translator-counterpart';

export default {
  async _getAppProps(options) {
    let renderProps = options.renderProps;

    let store         = stores[options.chunk];
    let location      = renderProps.location;
    let params        = renderProps.params;
    let browserLocale = headersHandler.getLocale(options.headers);

    let prepareComponentMethods  = renderProps.components.map(component => component.prepareComponent);

    for (let prepareComponent of prepareComponentMethods) {
      if (prepareComponent) {
        await prepareComponent({ store, location, params, browserLocale, translator });
      }
    }

    let appContainerHtml = React.renderToString(
      containerCreator.create({store, translator, renderProps})
    );

    return {store, appContainerHtml};
  },

  async _render({options, state=null, appContainerHtml=''}) {
    let documentHtml = await this.getDocumentHtml(options.path);

    documentHtml = documentHtml.replace('{{ renderedApp }}', appContainerHtml);
    documentHtml = documentHtml.replace('{{ initialState }}', JSON.stringify(state));
    documentHtml = documentHtml.replace('{{ serverConfig }}', JSON.stringify(config));

    return documentHtml;
  },

  async getDocumentHtml(url='/') {
    let html = '';

    let point = _.findWhere({url: url});
    let pointTemplatePath = path.join(__dirname, `../${config.clientBuildDir}`, `${point.name}.index.html`);

    return new Promise(function(resolve, reject) {
      fs.readFile(pointTemplatePath, {encoding: 'utf8'}, function(err, data) {
        if (err) {
          console.log('==> Error read template file', err);
          return reject(err);
        }

        resolve(data);
      });
    });
  },

  async renderApp(options) {
    let appProps = await this._getAppProps(options);

    let state            = appProps.store.getState();
    let appContainerHtml = appProps.appContainerHtml;

    return await this._render({options, state, appContainerHtml});
  },

  async renderBlank(options) {
    return await this._render({options});
  },

  async getHtml(options) {
    return serverConfig.serverRendering ? await this.renderApp(options) : await this.renderBlank(options);
  }
};
