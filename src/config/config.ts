//Importing DotEnc Module
import dotenv from 'dotenv';
dotenv.config();

//Creating variable to store confidential information regarding environments | Database Related Information
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = 'mongodb://localhost:27017';

//Creating variable to store the port number
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 9090;

//Exporting the config.ts files
export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
