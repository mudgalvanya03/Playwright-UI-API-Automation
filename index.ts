import dotenv from "dotenv"
import { ConfigLoader } from "./config/loader"

const env = process.env.ENV || 'local';

dotenv.config({
    path: `./config/.env.${env}`
});

const config = ConfigLoader.load();
console.log(config);