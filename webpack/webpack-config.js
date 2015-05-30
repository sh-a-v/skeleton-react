var path = require('path');

var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var cssnext = require('cssnext');

var serverConfig = require('../server-config');
var entryPoints  = require('./entry-points');

var getEntry = function(options) {
  var entry = entryPoints.getEntry();

  if (!options.production) {
    for (var key in entry) {
      if (entry.hasOwnProperty(key)) {
        entry[key].unshift(
          'webpack-dev-server/client?http://localhost:' + serverConfig.webpackPort,
          'webpack/hot/dev-server'
        );
      }
    }
  }

  return entry;
};

var getAssetName = function(ext, options) {
  var hash = ext === 'js' ? 'chunkhash' : 'contenthash';
  var name = options.production ? '[name].build.[' + hash + '].' : '[name].build.';
  return name + ext;
};

var getPlugins = function(options) {
  var plugins = [];
  var chunks  = entryPoints.getChunks();

  chunks.forEach(function(chunk) {
    var htmlWebpackPlugin = new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['commons', chunk],
      filename: chunk + '.index.html'
    });

    plugins.push(htmlWebpackPlugin);
  });

  var extractTextPlugin  = new ExtractTextPlugin(getAssetName('css', options));
  var dedupePlugin       = new webpack.optimize.DedupePlugin();
  var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    chunks: chunks
  });

  plugins.push(
    extractTextPlugin,
    dedupePlugin,
    commonsChunkPlugin
  );

  if (options.production) {
    var uglifyPlugin = new webpack.optimize.UglifyJsPlugin();

    plugins.push(uglifyPlugin);
  } else {
    var hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
    var noErrorsPlugin             = new webpack.NoErrorsPlugin();

    plugins.push(hotModuleReplacementPlugin, noErrorsPlugin);
  }

  return plugins;
};

var getJSLoader = function(options) {
  var loaders = ['babel-loader'];

  if (options.sync && !options.production) {
    loaders.unshift('react-hot-loader');
  }

  return loaders.join('!');
};

var getCSSLoader = function(options) {
  var loaders = ['css-loader', 'postcss-loader'];

  if (options.sync && !options.production) {
    loaders.unshift('style-loader');

    return loaders.join('!');
  } else {
    return ExtractTextPlugin.extract(loaders.join('!'));
  }
};

module.exports = {
  getConfig: function(options) {
    return {
      entry: getEntry(options),

      resolve: {
        modulesDirectories: ['node_modules', 'src']
      },

      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: getJSLoader(options)
          },
          {
            test: /\.css$/,
            loader: getCSSLoader(options)
          },
          {
            test: /\.(woff|jpe?g|png|gif|svg)$/,
            loader: "url-loader?limit=100000"
          },
          {
            test: /\.(woff|jpe?g|png|gif|svg)\?only-url$/,
            loader: "file-loader"
          }
        ]
      },

      postcss: [
        cssnext({
          import: {
            path: ['src']
          }
        })
      ],

      devtool: options.production ? '' : 'eval',

      output: {
        path: path.resolve('./build'),
        filename: getAssetName('js', options),
        publicPath: options.sync ? 'http://localhost:' + serverConfig.webpackPort + serverConfig.assetsPath : serverConfig.assetsPath
      },

      plugins: getPlugins(options)
    };
  }
};
