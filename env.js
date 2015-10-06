export default {
  get value() {
    return process.env.NODE_ENV;
  },

  isDevelopment() {
    return this.value === 'development';
  },

  isPreProduction() {
    return this.value === 'pre-production';
  },

  isProduction() {
    return this.value === 'production';
  }
}
