export default {
  get name() {
    return process.env.NODE_ENV;
  },

  isDevelopment() {
    return this.name === 'development';
  },

  isPreProduction() {
    return this.name === 'pre-production';
  },

  isProduction() {
    return this.name === 'production';
  }
}
