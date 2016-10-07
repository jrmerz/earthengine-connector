var fs = require('fs');
var path = require('path');
var browserify = require('browserify');

module.exports = function(app, root) {
  app.get('/*', (req, res) => {
    var file = path.join(root, req.path);

    if( /^win/.test(process.platform) ) {
      var pathRe = /\//g;
      files.forEach((f) => {
        f.path = f.path.replace(pathRe, fs.sep);
      });
    };

    if( fs.existsSync(file) ) {
      var b = browserify({});
      b.add(file);
      b.bundle(function(err, resp){
        if( err ) {
            console.error('\n********** JS ERROR **********');

            if( err.stack ) {
              res.status(400).send(err.stack);
              return console.error(err.stack);
            } else {
              res.status(400).send(err.annotated);
              return console.error(err);
            }
        }
        res.send('var require;\n'+resp);
      });
    } else {
      res.status(404).end();
    }
  });
}