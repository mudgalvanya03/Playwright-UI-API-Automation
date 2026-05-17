export interface EnvironmentConfig {
    baseURL: string,
    ApiURL : string,
    Environment : 'local' | 'staging' |'Prod',
    timeoutMs : number,
    headless: boolean,
    reqresApiKey: string
}

