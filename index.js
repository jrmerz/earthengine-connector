var express = require('express');
var fs = require('fs');
var path = require('path');


var app = express();
var root = process.cwd();

if( process.argv.length > 2 ) {
  root = process.argv[2];
}

if( root.toLowerCase() === '-h' || root.toLowerCase() === '--help' ) {
  console.log(` 
    Usage: js-ee [dir] 

     - dir: Optional directory path, otherwise current directory is served. 
  `);
  return;
} else if( root.toLowerCase() === '-v' || root.toLowerCase() === '--version' ) {
  console.log(JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')).version);
  return;
}

if( !root.match(/^\//) ) {
  root = path.join(process.cwd(), root);
}
if( !fs.existsSync(root) ) {
  console.error(`Path does not exist: ${root}`);
  process.exit(-1);
}

require('./lib/logo');

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send(`<h1>It Works!</h1>
    The EarthEngine Connector Server is up and running.
  `);
});

require('./lib/list')(app, root);
require('./lib/build')(app, root);

app.listen(9812);

console.log('Serving:  '+root);
console.log('URL:      http://127.0.0.1:9812\n');
