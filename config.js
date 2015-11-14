import env from './env';

import ip from 'ip';

import { setGlobalParam } from './shared/global-params';

let ipAddress = ip.address();

let defaultConfig = {
  assetsPath : '/assets/',
  localesPath: '/locales/',
  proxyPath  : '/proxy/',

  serverRendering: true,

  locales: [
    'ru',
    'en'
  ],

  desktopSizeFrom: 1025,
  tabletSizeFrom : 640,
  mobileSizeFrom : 0
};

let developmentConfig = {
  ...defaultConfig,

  expressPort: 3000,
  webpackPort: 3001,
  clientAddress: `http://${ipAddress}:3000`,
  serverAddress: `http://localhost:3000`,
  proxyAddress : ``,

  devLogs: true,
  serverRendering: false
};

let preProductionConfig = {
  ...defaultConfig,

  expressPort: 3000,
  clientAddress: `http://${ipAddress}:3000`,
  serverAddress: `http://localhost:3000`,
  proxyAddress : ``,

  devLogs: true,
  serverRendering: true
};

let productionConfig = {
  ...defaultConfig,

  expressPort: 80,
  clientAddress: ``,  // address for client requests
  serverAddress: ``,  // address for server requests (express, server render)
  proxyAddress : ``,  // address for proxy requests (ruby, api)

  devLogs: false,
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

setGlobalParam('config', currentConfig);

export default currentConfig;
