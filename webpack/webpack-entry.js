import env from '../env';
import config from '../config';
import points, { commonVendor, serverPoint } from '../points';

import ip from 'ip';

let entry = {
  vendor: commonVendor
};

points.forEach(point => {
  entry[point.name] = [point.path];

  if (env.isDevelopment()) {
    entry[point.name].unshift(
      `webpack-dev-server/client?http://${ip.address()}:${config.webpackPort}`,
      `webpack/hot/dev-server`
    );
  }
});

export default entry;
export let webpackServerEntry = serverPoint;
