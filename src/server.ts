import express from 'express'; // importing express package to server.ts
import http from 'http'; // importing Http package to server.ts
import mongoose from 'mongoose'; // importing mongoose package to server.ts
import { config } from './config/config'; // importing config.ts to server.ts
import Logging from './library/logging';

const router = express();

//Connecting with mongoose
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' }) //Adding option of mongoose manually
    .then(() => {
        Logging.info('Database Connected');
        StartServer();
    })
    .catch((error) => {
        Logging.error(error);
    });

//Start Server only if MongoDB Connects
const StartServer = () => {
    router.use((req, res, next) => {
        // Log the request
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            //Log into response
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json);

    //Rules of API
    router.use((req, res, next) => {
        //Allows request from anywhere
        res.header('Access-Control-Allow-Origin', '*');

        //Type of headers allowed in project
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        //For returning the option list when an option request is passed
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    //Routes

    //HealthCheck - To Make sure that API is running properly
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'Pong' }));

    //Error Handling
    router.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
