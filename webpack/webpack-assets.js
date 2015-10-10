import env from '../env';
import config from '../config';


export default {
  getAssetsPath() {
    return config.assetsPath;
  },

  getAssetsName(ext) {
    let hash = ext === 'js' ? 'chunkhash' : 'contenthash';
    let name = env.isDevelopment() ? `[name].build` : `[name].build.[${hash}]`;

    return `${name}.${ext}`;
  }
}
