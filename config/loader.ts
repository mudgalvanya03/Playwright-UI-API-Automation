import dotenv from 'dotenv';
import { EnvironmentConfig } from "./types";
import { logger} from "../utils/logger";

export class ConfigLoader {
    static load (): EnvironmentConfig {
        dotenv.config({
            path: `./config/.env.${process.env.ENV ?? 'local'}`
            });
            
       const baseURL = process.env.BASE_URL;
       const ApiURL= process.env.API_URL;
       const Environment = process.env.ENVIRONMENT;
       const timeoutMs = process.env.TIMEOUT_MS;
       const headless = process.env.HEADLESS;
       const reqresApiKey = process.env.REQRES_API_KEY;
       const mockServerUrl= process.env.MOCK_SERVER_URL

    if (!baseURL) {
      logger.error("BASE_URL is missing");
      throw new Error("BASE_URL is missing");
    }

    if (!ApiURL) {
      logger.error("API_URL is missing");
      throw new Error("API_URL is missing");
    }

    if (!Environment) {
      logger.error("ENVIRONMENT is missing");
      throw new Error("ENVIRONMENT is missing");
    }

    if (!timeoutMs) {
      logger.error("TIMEOUT_MS is missing");
      throw new Error("TIMEOUT_MS is missing");
    }

    if (!headless) {
      logger.error("HEADLESS is missing");
      throw new Error("HEADLESS is missing");
    }
    if(!mockServerUrl){
      logger.error("MockServerURL is missing");
      throw new Error("MockServerURL is missing");        
    }

    logger.info("Configuration loaded successfully", {
      Environment,
      baseURL,
      ApiURL,
      mockServerUrl
    });
    if (!reqresApiKey) {
        logger.error("REQRES_API_KEY is missing");
        throw new Error("REQRES_API_KEY is missing");
    }

     return {
      baseURL: baseURL,
      ApiURL: ApiURL,
      Environment: Environment as 'local' | 'staging' | 'Prod',
      timeoutMs: Number(timeoutMs),
      headless: headless === "true",
      reqresApiKey: reqresApiKey,
      mockServerUrl: mockServerUrl
    };
    }
}
