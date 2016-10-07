var fs = require('fs');
var path = require('path');

var files = [];

function read(currentPath, file) {
  folder = path.join(currentPath, file);
  
  var tmp = fs.readdirSync(folder);
  var t = '', stat, folder;

  for( var i = 0; i < tmp.length; i++ ) {
    t = path.join(folder, tmp[i]);
  	stat = fs.statSync(t);
	  if( stat.isDirectory() ) {
      read(folder, tmp[i]);
    } else {
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