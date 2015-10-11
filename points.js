export default [
  {
    name: 'app',
    path: './client/app/app.js',
    url : '/'
  },
  {
    name: 'landing',
    path: './client/landing/landing.js',
    url : '/landing'
  }
];

export let commonVendor = [
  'react',
  'react-dom',
  'react-router',
  'react-redux',
  'redux',
  'redux-thunk',
  'lodash'
];
