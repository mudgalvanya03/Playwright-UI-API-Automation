declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
    API_URL: string;
    ENVIRONMENT: string;
    TIMEOUT_MS: string;
    HEADLESS: string;
    REQRES_API_KEY: string;
    MOCK_SERVER_URL: string;
    // optional — only exists in CI environments
    CI?: string;
    // optional — controls which .env file loads, defaults handled in loader
    ENV?: string;
  }
}