#! /usr/bin/env node

var options = {
  root : '',
  onServerReady : function() {
    require('./lib/checkForUpdates')();
  }
}

if( process.argv.length > 2 ) {
  options.root = process.argv[2];
}

/**
 * Quick check for options.  There are not many
 */
if( options.root.toLowerCase() === '-h' || options.root.toLowerCase() === '--help' ) {
  console.log(` 
    Usage: js-ee [dir] 

    - dir: Optional directory path, otherwise current directory is served. 
  `);
  return;
} else if( options.root.toLowerCase() === '-v' || options.root.toLowerCase() === '--version' ) {
  console.log(JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')).version);
  return;
}


require('../index.js')(options);