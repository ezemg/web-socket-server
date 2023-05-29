const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/socketController.js');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Socket.io
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    // Paths
    this.paths = {};

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio public
    this.app.use(express.static('public'));
  }

  routes() {}

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }
}

module.exports = Server;
