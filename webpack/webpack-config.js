import env from '../env';
import config from '../config';

import path from 'path';
import webpack from 'webpack';
import postcssCssnext from 'postcss-cssnext';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';

import webpackEntry from './webpack-entry';
import webpackLoaders from './webpack-loaders';
import webpackPlugins from './webpack-plugins';
import webpackAssets from './webpack-assets';

export default {
  entry: webpackEntry,

  resolve: {
    modulesDirectories: ['node_modules', 'server', 'client', 'locales', path.resolve('./')]
  },

  module: {
    loaders: webpackLoaders
  },

  postcss: [
    postcssNested,
    postcssImport({
      path: ['client']
    }),
    postcssCssnext
  ],

  output: {
    path      : path.resolve(`./${config.clientBuildDir}`),
    filename  : webpackAssets.getAssetsName('js'),
    publicPath: `${webpackAssets.getAssetsPath()}/`
  },

  plugins: webpackPlugins
};
