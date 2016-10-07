var fs = require('fs');
var walk = require('./fast-walk');

module.exports = function(app, root) {
  app.get('/_/list', (req, res) => {
    var files = walk(root).map((f) => {
                    f.path = f.path.replace(root, '');
                    return f;
                  });
    res.send({
      files : files,
      root : root
    });
  });
}