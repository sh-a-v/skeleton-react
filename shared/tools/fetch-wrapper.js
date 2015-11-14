import _ from 'lodash';
import fetch from 'isomorphic-fetch';

import { GLOBAL_PARAMS, env } from 'shared/global-params';

export default {
  getDefaultOptions() {
    return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'  // send cookies
    };
  },

  getDataAsParams(data) {
    return _.map(data, (value, key) => `${key}=${value}`).join('&');
  },

  getDataAsJson(data) {
    return JSON.stringify(data);
  },

  getCompleteUri(uri, options) {
    let address = env.isClient() ? GLOBAL_PARAMS.config.clientAddress : GLOBAL_PARAMS.config.serverAddress;
    let params  = '';
    let data    = options.data;
    let method  = options.method.toLowerCase();

    if (data && method === 'get') {
      params = `?${this.getDataAsParams(data)}`;
    }

    return `${address}${uri}${params}`;
  },

  getCompleteOptions(options) {
    let data   = options.data;
    let method = options.method.toLowerCase();

    if (data && method !== 'get') {
      options.body = this.getDataAsJson(data);
    }

    delete options.data;

    return _.merge(this.getDefaultOptions(), options);
  },

  checkResponse(res) {
    if (GLOBAL_PARAMS.config.devLogs && env.isServer()) {
      console.log(Date.now(), 'End fetch', res.url);
    }

    if (res.status >= 200 && res.status < 400) {
      if (res.error) {
        let error = new Error(res.error.message);
        error.response = res;
        throw error;
      } else {
        return res;
      }
    } else {
      let error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
  },

  fetch(uri, options) {
    uri     = this.getCompleteUri(uri, options);
    options = this.getCompleteOptions(options);

    if (GLOBAL_PARAMS.config.devLogs && env.isServer()) {
      console.log(Date.now(), 'Start fetch',  uri);
    }

    return fetch(uri, options).then(this.checkResponse);
  }
}
