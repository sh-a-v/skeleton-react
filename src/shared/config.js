import env from './env';

const defaultConfig = {
  private: {
    buildPath: './build',
    serverPort: 3000
  }
};

const devConfig = {
  ...defaultConfig
};

const prodConfig = {
  ...defaultConfig
};
