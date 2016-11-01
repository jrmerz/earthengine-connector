var express = require('express');
var fs = require('fs');
var path = require('path');

module.exports = function(options) {
  options = options || {};

  var app = express();
  var root = options.root || process.cwd();

  /**
   * Verify path
   */
  if( !path.isAbsolute(root) ) {
    root = path.join(process.cwd(), root);
  }
  if( !fs.existsSync(root) ) {
    console.error(`Path does not exist: ${root}`);
    process.exit(-1);
  }

  if( options.logo ) {
    options.logo();
  } else {
    require('./lib/logo');
  } 

  /**
   * Setup CORS
   */
  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  });

  /**
   * Setup Socket.IO
   */
  var socket = require('./lib/socket');
  var server = socket.init(app, root);

  /**
   * Allow 3rd party apps to bootstrap
   */
  if( options.bootstrap ) {
    options.bootstrap(app, express, socket);
  }

  /**
   * Debug screen at root.
   */
  app.get('/', (req, res) => {
    res.send(`<h1>It Works!</h1>
      The Earth Engine Connector File Server is up and running.
    `).end();
  });

  /**
   * Set endpoints
   */
  require('./lib/list')(app, root);
  require('./lib/build')(app, root);

  /**
   * Start
   */
  server.listen(9812);

  console.log('Serving:  '+root);
  console.log('URL:      http://127.0.0.1:9812\n');

  if( options.onServerReady ) {
    options.onServerReady();
  }
}