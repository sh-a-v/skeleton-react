export default {
  isClient() {
    return typeof window !== 'undefined';
  },

  isServer() {
    return !this.isClient();
  },

  isProd() {
    return (this.isClient() ? window.CLIENT_PARAMS.env : process.env.NODE_ENV) === 'production';
  },

  isDev() {
    return !this.isProd();
  }
}
