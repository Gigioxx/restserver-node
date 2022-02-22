const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Connect to Database
        this.connectDB();

        // Middlewares
        this.middlewares();
        
        // Application routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Body reading and parsing
        this.app.use( express.json() );

        // Public folder
        this.app.use( express.static( 'public' ) );

    }

    routes() {
        
        this.app.use( this.usersPath, require('../routes/users'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Server running in port:', this.port );
        });
    }

}


module.exports = Server;