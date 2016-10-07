var express = require('express');
var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var walk = require('./lib/fast-walk');

var app = express();
var root = process.cwd();

if( process.argv.length > 2 ) {
  root = process.argv[2];
}

require('./lib/logo.js');

console.log('Serving:  '+root);
console.log('URL:      http://127.0.0.1:9812\n');

app.get('/_/list', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  var files = walk(root).map((f) => {
                  f.path = f.path.replace(root, '');
                  return f;
                });
  res.send({
    files : files,
    root : root
  });
});

app.get('/*', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  
  var file = path.join(root, req.path);
  if( fs.existsSync(file) ) {
    var b = browserify({});
    b.add(file);
    b.bundle(function(err, resp){
      if( err ) {
          res.status(404).end();
          if( err.stack ) {
            return console.error(err.stack);
          } else {
            return console.error(err);
          }
      }
      res.send('var require;\n'+resp);
    });
  } else {
    res.status(404).end();
  }
});

app.listen(9812);
