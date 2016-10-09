var fs = require('fs');
var path = require('path');
var walk = require('./fast-walk');

module.exports = function(app, root) {
  app.get('/_/list', (req, res) => {

    var files = walk(root).map(cleanRootPath);

    if( /^win/.test(process.platform) ) {
      files.forEach((f) => {
        f.path = f.path.split(path.sep).join('/');
      });
    };

    res.send({
      files : files,
      root : root
    });
  });

  function cleanRootPath(f) {
    f.path = f.path.replace(root, '');
    return f;
  }
}