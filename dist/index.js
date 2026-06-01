"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const loader_1 = require("./config/loader");
const env = process.env.ENV || 'local';
dotenv_1.default.config({
    path: `./config/.env.${env}`
});
const config = loader_1.ConfigLoader.load();
console.log(config);
