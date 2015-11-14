import env from '../env';
import config from '../config';

import colors from 'colors/safe';
import ip from 'ip';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack-config';

let ipAddress = ip.address();
let compiler  = webpack(webpackConfig);

console.log(colors.blue.bold(`Prepare hot reload..`));

let server = new WebpackDevServer(compiler, {
  contentBase: `http://${ipAddress}:${config.expressPort}`,
  publicPath : `http://${ipAddress}:${config.webpackPort}${config.assetsPath}`,

  historyApiFallback: true,
  hot: true,
  delay: 50,
  stats: {
    colors: true,
    chunkModules: false
  }
});

server.listen(config.webpackPort, ipAddress, function(err) {
  if (err) {
    console.log('error:', err);
  }
});
