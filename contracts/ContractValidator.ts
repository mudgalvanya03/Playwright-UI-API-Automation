import { ApiClient } from "../utils/ApiClient";
import { ContractResult, ContractSuiteResult, EndpointContract } from "./ContractTypes";

export class ContractValidator {
    constructor(private readonly apiClient: ApiClient) {}

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