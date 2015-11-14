import env from '../env';
import config from '../config';

import path from 'path';
import webpack from 'webpack';
import postcssCssnext from 'postcss-cssnext';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';

import webpackEntry, { webpackServerEntry } from './webpack-entry';
import webpackLoaders, { webpackServerLoaders } from './webpack-loaders';
import webpackPlugins, { webpackServerPlugins } from './webpack-plugins';
import webpackAssets from './webpack-assets';


export default {
  entry: webpackEntry,

  resolve: {
    root: path.resolve('./'),
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: webpackLoaders
  },

  postcss: [
    postcssNested,
    postcssImport({
      path: ['./']
    }),
    postcssCssnext
  ],

  output: {
    path      : path.resolve(`./build`),
    filename  : webpackAssets.getAssetsName('js'),
    publicPath: `${webpackAssets.getAssetsPath()}/`
  },

  plugins: webpackPlugins
};

export let webpackServerConfig = {
  target: 'node',
  entry: webpackServerEntry,

  resolve: {
    root: path.resolve('./'),
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: webpackServerLoaders
  },

  output: {
    path    : path.resolve(`./build`),
    filename: 'server.build.js',
    publicPath: `${webpackAssets.getAssetsPath()}/`
  },

  plugins: webpackServerPlugins
};
