'use strict';

// is this installed in a node_modules dir?
// is this version not equal to npm latest?

var fs = require('fs');
var colors = require('colors/safe');
var exec = require('child_process').exec;

module.exports = function() {
  exec('npm info earthengine-connector', {},
    function (error, stdout, stderr) {
      if( error || stderr ) {
        console.log(colors.red('\n** Unable to verify package version **\n'));
        return;
      }

      var info = eval('('+stdout+')');
      var cInfo = require('../package.json');

      if( info['dist-tags'].latest !== cInfo.version ) {
        console.log(colors.yellow('\n****** Update Available ******'));
        console.log(colors.yellow('* Your version is '+cInfo.version));
        console.log(colors.yellow('* Current version is '+info['dist-tags'].latest));
        console.log(colors.yellow('* Run "npm install -g earthengine-connector" to update'));
        console.log(colors.yellow('******************************\n'));
      }
    }
  );
};