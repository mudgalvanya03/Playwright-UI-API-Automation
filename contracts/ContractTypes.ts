import { ZodType } from "zod"

// The shape of a single contract
export interface EndpointContract<TResponse> {
    requestBody?: unknown
    name: string           // human readable — "GET /users/:id"
    method: string         // HTTP method
    path: string           // endpoint path
    responseSchema: ZodType<TResponse>   // the expected response shape
    // optional: requestSchema for POST/PUT contracts
}

// The result of running one contract
export interface ContractResult {
    contractName: string
    passed: boolean
    violations: string[]   // empty if passed
    responseStatus: number
    durationMs: number
}

// The result of running a full suite
export interface ContractSuiteResult {
    suiteName: string
    results: ContractResult[]
    passCount: number
    failCount: number
    totalDurationMs: number
}