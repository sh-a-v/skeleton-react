import env from '../env';

import webpack from 'webpack';

import webpackConfig from './webpack-config';


let compiler = webpack(webpackConfig);

let logError = function(err) {
  console.log('Error:', err);
};

let logStats = function(stats) {
  console.log(stats.toString({
    colors: true
  }));
};

compiler.run((err, stats) => {
  err ? logError(err) : logStats(stats);
});
