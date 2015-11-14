import config from '../config';
import points from '../points';

import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Router from 'react-router';
import createLocation from 'history/lib/createLocation'

import { GLOBAL_PARAMS, setGlobalParam } from 'shared/global-params';
import headersHandler from 'shared/tools/headers-handler';
import containerCreator from 'shared/tools/server-container-creator';
import * as stores from 'shared/stores';
import * as routes from 'shared/routes';
import translator from 'shared/translator/translator-counterpart';

export default {
  async _getAppProps(options) {
    let renderProps = options.renderProps;

    let store         = stores[options.point.name];
    let location      = renderProps.location;
    let params        = renderProps.params;
    let browserLocale = headersHandler.getLocale();

    let prepareComponentMethods  = renderProps.components.map(component => component.prepareComponent);

    for (let prepareComponent of prepareComponentMethods) {
      if (prepareComponent) {
        await prepareComponent({ store, location, params, browserLocale, translator });
      }
    }

    let appContainerHtml = ReactDOMServer.renderToString(
      containerCreator.create({store, translator, renderProps})
    );

    return {store, appContainerHtml};
  },

  async _render({options, state=null, appContainerHtml=''}) {
    setGlobalParam('initialState', state);

    let documentHtml = await this.getDocumentHtml(options);

    documentHtml = documentHtml.replace('{{ RENDERED_APP }}', appContainerHtml);
    documentHtml = documentHtml.replace('{{ GLOBAL_PARAMS }}', JSON.stringify(GLOBAL_PARAMS));

    return documentHtml;
  },

  async getDocumentHtml(url='/') {
    let html = '';
    let pointTemplatePath = path.resolve(`./build/${options.point.name}.index.html`);

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
