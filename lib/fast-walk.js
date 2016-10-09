var fs = require('fs');
var path = require('path');

var MAX_FILES = 100;
var files = [];

function read(currentPath, file) {
  folder = path.join(currentPath, file);
  
  var tmp = fs.readdirSync(folder);
  var t = '', stat, folder;

  for( var i = 0; i < tmp.length; i++ ) {
    if( files.length > MAX_FILES ) return;

    t = path.join(folder, tmp[i]);
    stat = fs.statSync(t);
    if( stat.isDirectory() ) {
      if( tmp[i].match(/^\./) || tmp[i] === 'node_modules' ) {
        continue;
      }
      read(folder, tmp[i]);
    } else if( tmp[i].match(/\.js$/i) ) {
      files.push({
        file : tmp[i],
        path : folder
      });
    }
  }
}

module.exports = function(startPath) {
  files = [];
  read('', startPath);

  return files;
}