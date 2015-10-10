import _ from 'lodash';
import ip from 'ip';

import env from './env';

let defaultConfig = {
  assetsPath : '/assets',
  localesPath: '/locales',
  apiPath    : '/api',

  clientBuildDir: 'client-build',

  get ipAddress() {
    return ip.address();
  },

  get localAddress() {
    return `http://${this.ipAddress}:${this.expressPort}`;
  }
};

let developmentConfig = {
  expressPort: 3000,
  webpackPort: 3001,
  serverRendering: false
};

let preProductionConfig = {
  expressPort: 3000,
  serverRendering: true
};

let productionConfig = {
  expressPort: 8080,
  serverRendering: true
};

let currentConfig = {};

if (env.isDevelopment()) {
  currentConfig = developmentConfig;
} else if (env.isPreProduction()) {
  currentConfig = preProductionConfig;
} else if (env.isProduction()) {
  currentConfig = productionConfig;
}

export default _.merge(defaultConfig, currentConfig);
