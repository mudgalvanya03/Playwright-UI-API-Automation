"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigLoader = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../utils/logger");
class ConfigLoader {
    static load() {
        dotenv_1.default.config({
            path: `./config/.env.${process.env.ENV ?? 'local'}`
        });
        const baseURL = process.env.BASE_URL;
        const ApiURL = process.env.API_URL;
        const Environment = process.env.ENVIRONMENT;
        const timeoutMs = process.env.TIMEOUT_MS;
        const headless = process.env.HEADLESS;
        const reqresApiKey = process.env.REQRES_API_KEY;
        const mockServerUrl = process.env.MOCK_SERVER_URL;
        if (!baseURL) {
            logger_1.logger.error("BASE_URL is missing");
            throw new Error("BASE_URL is missing");
        }
        if (!ApiURL) {
            logger_1.logger.error("API_URL is missing");
            throw new Error("API_URL is missing");
        }
        if (!Environment) {
            logger_1.logger.error("ENVIRONMENT is missing");
            throw new Error("ENVIRONMENT is missing");
        }
        if (!timeoutMs) {
            logger_1.logger.error("TIMEOUT_MS is missing");
            throw new Error("TIMEOUT_MS is missing");
        }
        if (!headless) {
            logger_1.logger.error("HEADLESS is missing");
            throw new Error("HEADLESS is missing");
        }
        if (!mockServerUrl) {
            logger_1.logger.error("MockServerURL is missing");
            throw new Error("MockServerURL is missing");
        }
        logger_1.logger.info("Configuration loaded successfully", {
            Environment,
            baseURL,
            ApiURL,
            mockServerUrl
        });
        if (!reqresApiKey) {
            logger_1.logger.error("REQRES_API_KEY is missing");
            throw new Error("REQRES_API_KEY is missing");
        }
        return {
            baseURL: baseURL,
            ApiURL: ApiURL,
            Environment: Environment,
            timeoutMs: Number(timeoutMs),
            headless: headless === "true",
            reqresApiKey: reqresApiKey,
            mockServerUrl: mockServerUrl
        };
    }
}
exports.ConfigLoader = ConfigLoader;
