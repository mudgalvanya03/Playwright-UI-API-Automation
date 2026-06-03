import { IApiClient } from "../utils/IApiClient";
import { ContractResult, ContractSuiteResult, EndpointContract } from "./ContractTypes";

export class ContractValidator {
    constructor(private readonly apiClient: IApiClient) {}

    /**
     * Validates a single API endpoint contract by executing the appropriate HTTP
     * request and running the response through the contract's Zod schema.
     * Records duration and collects any schema violations as human-readable strings.
     *
     * Currently supports `GET` and `POST` methods. For `POST`, sends
     * `contract.requestBody` if provided, otherwise falls back to an empty object.
     *
     * @typeParam T - The expected shape of the response body, inferred from the contract's schema
     * @param contract - The endpoint contract describing the method, path, request body, and response schema
     * @returns Promise resolving to a {@link ContractResult} with pass/fail status,
     * any schema violations, and the request duration in milliseconds
     * @throws {Error} When the contract specifies an unsupported HTTP method
     *
     * @example
     * const result = await validator.validate({
     *   name: 'Get User',
     *   method: 'GET',
     *   path: '/users/1',
     *   responseSchema: userSchema
     * });
     * // { contractName: 'Get User', passed: true, violations: [], durationMs: 123 }
     *
     * @example
     * // A failing contract exposes each violation as 'field.path - message'
     * // { contractName: 'Get User', passed: false, violations: ['email - Invalid email'], durationMs: 98 }
     */
    async validate<T>(contract: EndpointContract<T>): Promise<ContractResult>{
        const startTime = Date.now();
        let response: unknown;
        switch(contract.method){
            case 'GET':
                response = await this.apiClient.get(contract.path);
                break;
            case 'POST':
                response = await this.apiClient.post(contract.path, contract.requestBody ?? {});
                break;
                default:
            throw new Error(`Unsupported method: ${contract.method}`);
        }
        const validationResult = contract.responseSchema.safeParse(response);
        if(validationResult.success){
            return {
                contractName: contract.name,
                passed: true,
                violations: [],
                responseStatus: 200,
                durationMs: Date.now() - startTime
            }
        }
        else{
            const violations = validationResult.error.issues.map(issue =>`${issue.path.join('.')} - ${issue.message}`);

                return {
                contractName: contract.name,
                passed: false,
                violations,
                responseStatus: 200,
                durationMs: Date.now() - startTime
            }
        }

    }

    /**
     * Runs {@link validate} sequentially over an array of contracts and aggregates
     * the results into a single suite report. Contracts are executed in order;
     * a failure in one contract does not halt the remaining ones.
     *
     * @param suiteName - A label identifying this suite in the returned report
     * @param contracts - Ordered list of contracts to validate
     * @returns Promise resolving to a {@link ContractSuiteResult} containing each
     * individual {@link ContractResult} alongside the aggregate pass/fail counts
     * and total duration in milliseconds
     *
     * @example
     * const suite = await validator.validateSuite('User API', [
     *   getUserContract,
     *   createUserContract
     * ]);
     * // { suiteName: 'User API', passCount: 2, failCount: 0, totalDurationMs: 220, results: [...] }
     *
     * @example
     * // Partial failure — suite still completes and reports both outcomes
     * // { suiteName: 'User API', passCount: 1, failCount: 1, totalDurationMs: 185, results: [...] }
     */
    async validateSuite(suiteName: string, contracts: EndpointContract<unknown>[]): Promise<ContractSuiteResult> {
        const suiteStart = Date.now();
        const results: ContractResult[] = [];

        for (const contract of contracts) {
            const result = await this.validate(contract);
            results.push(result);
        }

        const passCount = results.filter(r => r.passed).length;
        const failCount = results.length - passCount;

        return {
            suiteName,
            results,
            passCount,
            failCount,
            totalDurationMs: Date.now() - suiteStart
        }
    }
}