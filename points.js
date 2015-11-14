export default [
  {
    name: 'app-1',
    path: './client/app-1/init.js',
    url : '/'
  },
  {
    name: 'app-2',
    path: './client/app-2/init.js',
    url : '/app-2'
  }
];

export let commonVendor = [
  'react',
  'react-dom',
  'react-router',
  'react-redux',
  'redux',
  'redux-thunk'
];

export let serverPoint = './server/server.js';
