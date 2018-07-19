
const express     = require('express'),
    port        = process.env.PORT || 5000,
    bodyParser  = require('body-parser'),
    router      = require('./router'),
    cors        = require('cors'),
    db          = require("./helpers/database"),
    app         = express();


class Server {

    constructor() {
        this.initMiddleware();
        this.initRoutes();
        this.initDatabase();

        this.startServer();
    }
    initRoutes() {
        router.load(app, 'routes');
        app.use(express.static(__dirname + "/dist"));
        app.use('/*', (req, res) => {
            res.sendFile(__dirname + '/dist/index.html');
        });

    }
    initMiddleware() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(cors());
    }
    startServer() {
        app.listen(port, (err) => {
            console.log('Listening on http://localhost:%d', port);
        });
    }
    initDatabase() {
        db.open();
    }

}

const server = new Server();

module.exports = app; //for tests