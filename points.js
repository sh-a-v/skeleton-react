export default [
  {
    name: 'app2',
    path: './client/app-2/init.js',
    url : '/app2'
  },
  {
    name: 'app1',
    path: './client/app-1/init.js',
    url : '/'
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
