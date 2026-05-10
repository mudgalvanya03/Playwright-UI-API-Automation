import dotenv from "dotenv"
import { configLoader } from "./config/loader"

const env = process.env.ENV || 'local';

dotenv.config({
    path: `./config/.env.${env}`
});

const config = configLoader.load();
console.log(config);