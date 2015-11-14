import config from '../config';

import url from 'url';
import path from 'path';
import cookie from 'cookie';
import Proxy from 'express-http-proxy';

let apiProxy = Proxy(config.proxyAddress, {
  forwardPath(req, res) {
    return url.parse(req.url).path;
  },

  intercept(rsp, data, req, res, callback) {
    res['headers'] = res['headers'] || {};
    res['headers']['set-cookie'] = rsp['headers']['set-cookie']
    callback(null, data);
  },

  decorateRequest(req) {
    return req;
  }
});

export default {
  apiProxy
};
