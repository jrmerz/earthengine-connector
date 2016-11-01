var SocketIO = require('socket.io');
var watch = require('watch');
var http = require('http');
var io;

var sockets = {
  ee : 0,
  app : 0
}

module.exports = {
  init : function(app, root) {
    initWatch(root);
    var server = http.Server(app);
    io = SocketIO(server);

    /**
     * server-socket-* events are for metric app to be aware of open tabs that 
     */
    io.on('connect', function(socket){
      var socketType = '';
      socket.on('socket-type', function(type){
        socketType = type;
        if( type === 'ee' ) {
          sockets.ee++;
        } else {
          sockets.app++;
        }

        console.log('Sockets Connected: '+JSON.stringify(sockets));
        io.emit('server-socket-connect', sockets);
      });


      socket.on('disconnect', function(){
        if( socketType === 'ee' ) {
          sockets.ee--;
        } else {
          sockets.app--;
        }

        console.log('Sockets Connected: '+JSON.stringify(sockets));
        io.emit('server-socket-disconnect', sockets);
      });
    });


    return server;
  },
  send : function(event, data) {
    io.emit(event, data);
  }
}

function initWatch(path) {
   watch.watchTree(path, function (f, curr, prev) {
    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else if (prev === null) {
      io.emit('file-change');
    } else if (curr.nlink === 0) {
      io.emit('file-change');
    } else {
      io.emit('file-change');
    }
  });
}