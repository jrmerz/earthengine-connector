var express = require('express');
var fs = require('fs');
var path = require('path');
var browserify = require('browserify');

var app = express();
var root = process.cwd();

if( process.argv.length > 2 ) {
  root = process.argv[2];
}

console.log('Serving: '+root+' @ http://127.0.0.1:9812');

app.get('/*', function(req, res) {
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
