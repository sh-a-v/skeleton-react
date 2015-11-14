import env from '../env';
import config from '../config';

import ip from 'ip';

export default {
  getAssetsPath() {
    let ipAddress = ip.address();
    let webpackAssetsPath = `http://${ipAddress}:${config.webpackPort}${config.assetsPath}`;

    return env.isDevelopment() ? webpackAssetsPath : config.assetsPath
  },

  getAssetsName(ext) {
    let hash = ext === 'js' ? 'chunkhash' : 'contenthash';
    let name = env.isDevelopment() ? `[name].build` : `[name].build.[${hash}]`;

    return `${name}.${ext}`;
  }
}
