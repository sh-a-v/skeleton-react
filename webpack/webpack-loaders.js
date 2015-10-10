import env from '../env';

import ExtractTextPlugin from 'extract-text-webpack-plugin';


let getJSLoader = function() {
  let loaders = ['babel-loader?optional[]=runtime&stage=0'];

  if (env.isDevelopment()) {
    //loaders.unshift('react-hot-loader');
  }

  return loaders.join('!');
};

let getCSSLoader = function() {
  let loaders = ['css-loader', 'postcss-loader'];

  if (env.isDevelopment()) {
    loaders.unshift('style-loader');

    return loaders.join('!');
  } else {
    return ExtractTextPlugin.extract(loaders.join('!'));
  }
};

export default [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: getJSLoader()
  },
  {
    test: /\.css$/,
    loader: getCSSLoader()
  },
  {
    test: /\.html$/,
    loader: 'raw'
  },
  {
    test: /\.(woff|jpe?g|png|gif|svg)$/,
    loader: "url-loader?limit=100000"
  },
  {
    test: /\.(woff|jpe?g|png|gif|svg)\?only-url$/,
    loader: "file-loader"
  }
];
