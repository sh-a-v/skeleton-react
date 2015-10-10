var _    = require('lodash');
var fs   = require('fs');
var path = require('path');

require('babel/register')({
  stage: 0,
  resolveModuleSource: function(source, filename) {
    var isCssFile = source.slice(-4) === '.css';

    if (isCssFile) {
      return path.join(__dirname, './server-empty.js');
    }

    return source;
  }
});
