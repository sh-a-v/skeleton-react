import _ from 'lodash';

let env = {
  availableValues: [
    'development',
    'pre-production',
    'production'
  ],

  set(value) {
    if (value && _.includes(this.availableValues, value)) {
      this.value = value;
    } else if (process.argv[2] && _.includes(this.availableValues, process.argv[2])) {
      this.value = process.argv[2];
    } else {
      this.value = 'development';
    }

    process.env.NODE_ENV = this.value;
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

if (!env.value) {
  env.set();
}

export default env;
