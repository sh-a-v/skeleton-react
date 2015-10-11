import env from '../env';
import points from '../points';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import webpackAssets from './webpack-assets';


let plugins = [
  new ExtractTextPlugin(webpackAssets.getAssetsName('css')),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.build.js')
];

points.forEach(point => {
  let htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './shared/index.html',
    chunks  : ['vendor', point.name],
    filename: `${point.name}.index.html`
  });

  plugins.push(htmlWebpackPlugin);
});

if (env.isDevelopment()) {
  let noErrorsPlugin = new webpack.NoErrorsPlugin();

  plugins.push(noErrorsPlugin);
} else {
  let uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  });

  plugins.push(uglifyPlugin);
}

export default plugins;
