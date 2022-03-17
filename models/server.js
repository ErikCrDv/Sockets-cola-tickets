const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets-controllers/controller');

class Server {

    constructor(){
        this.port = process.env.PORT;
        this.paths = {}
        
        // Server app
        this.app = express();
        // Socket - Server
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );
        // Middlewares
        this.middlewares();
        // Rutas del servidos
        this.routes();
        // Sokects - Events
        this.sockets();
    }

    middlewares(){
        // Cors
        this.app.use( cors() );
        // Directorio Publico
        this.app.use( express.static('public') );
    }

    routes() {
        // User Routes
    }

    sockets(){
        this.io.on('connection', socketController );
    }

    listen(){
        this.server.listen( this.port , () => {
            console.log(`Running on Port ${ this.port }`);
        });
    }

}

module.exports = Server;