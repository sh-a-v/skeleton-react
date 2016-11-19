import path from 'path';
import webpack from 'webpack';

import config from '../src/shared/config';

export const clientConfig = {
  entry: {
    client: path.resolve('./src/client/client.js')
  },

  output: {
    filename: 'client.build.js',
    path: config.private.buildPath
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

export const serverConfig = {
  entry: './src/server/server.js'
};
