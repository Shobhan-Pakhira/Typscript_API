import express from 'express'; // importing express package to server.ts
import http from 'http'; // importing Http package to server.ts
import mongoose from 'mongoose'; // importing mongoose package to server.ts
import { config } from './config/config'; // importing config.ts to server.ts

const router = express();

//Connecting with mongoose
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' }) //Adding option of mongoose manually
    .then(() => {
        console.log('Database Connected');
    })
    .catch((error) => {
        console.log(error);
    });
