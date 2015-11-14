import { GLOBAL_PARAMS } from 'shared/global-params';

export default {
  get headers() {
    return GLOBAL_PARAMS.initialReq.headers;
  },

  getLocale() {
    let headerLocale  = this.headers['accept-language'];

    return headerLocale ? headerLocale.split(';')[0].split(',')[1] : '';
  },

  getUserAgent() {
    return this.headers['user-agent'] || '';
  }
}
