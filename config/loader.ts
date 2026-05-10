
import { EnvironmentConfig } from "./types";

export class configLoader {
    static load (): EnvironmentConfig {
       const baseURL = process.env.BASE_URL;
       const ApiURL= process.env.API_URL;
       const Environment = process.env.ENVIRONMENT;
       const timeoutMs = process.env.TIMEOUT_MS;
       const headless = process.env.HEADLESS;

       if(!baseURL) throw new Error ("BASE URL is missing "); 
       if(!ApiURL) throw new Error ("API URL is missing "); 
       if(!Environment) throw new Error ("Environment is missing "); 
       if(!timeoutMs) throw new Error ("Time out is missing "); 
       if(!headless) throw new Error ("Headless is missing "); 
       
     return {
      baseURL: baseURL,
      ApiURL: ApiURL,
      Environment: Environment as 'local' | 'staging' | 'Prod',
      timeoutMs: Number(timeoutMs),
      headless: headless === "true"
    };
    }
}