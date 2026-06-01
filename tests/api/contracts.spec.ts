import { test, expect, request } from '@playwright/test';
import { z } from 'zod';

import { ApiClient } from '../../utils/ApiClient';
import { ConfigLoader } from '../../config/loader';
import { ContractValidator } from '../../contracts/ContractValidator';

import { getUserContract, getUserListContract, getCreateUserContract } from '../../contracts/apiContracts';

test.describe('Contract Tests', () => {

    test('All API contracts are honoured', async () => {

        // Create Playwright API context
        const apiContext = await request.newContext();

        // Load framework config
        const config = ConfigLoader.load();

        // Create ApiClient
        const apiClient = new ApiClient(
            apiContext,
            config.ApiURL,
            undefined,        // no authManager
            undefined,        // no retryOptions
            { 'x-api-key': config.reqresApiKey }  // 
        );

        // Create validator
        const validator = new ContractValidator(apiClient);

        // Run all contracts
        const suiteResult = await validator.validateSuite(
            'Reqres Contract Suite',
            [
                getUserContract,
                getUserListContract,
                getCreateUserContract
            ]
        );

        // Print results so we can inspect failures easily
        console.log('\n=== CONTRACT SUITE RESULTS ===');

        suiteResult.results.forEach(result => {
            console.log({
                contract: result.contractName,
                passed: result.passed,
                violations: result.violations
            });
        });

        console.log(
            `Pass: ${suiteResult.passCount} | Fail: ${suiteResult.failCount}`
        );

        // Main assertion
        expect(suiteResult.failCount).toBe(0);

        await apiContext.dispose();
    });

    test('Contract validator catches schema violations', async () => {

        const apiContext = await request.newContext();

        const config = ConfigLoader.load();

        const apiClient = new ApiClient(
            apiContext,
            config.ApiURL,
            undefined,        // no authManager
            undefined,        // no retryOptions
            { 'x-api-key': config.reqresApiKey }  // 
        );

        const validator = new ContractValidator(apiClient);

        // Deliberately wrong schema
        const brokenContract = {
            name: 'Broken GET User Contract',
            method: 'GET',
            path: '/users/2',

            responseSchema: z.object({
                data: z.object({
                    nonExistentField: z.string()
                })
            })
        };

        const result = await validator.validate(
            brokenContract
        );

        console.log('\n=== CONTRACT VIOLATIONS ===');
        console.log(result.violations);

        expect(result.passed).toBeFalsy();

        expect(result.violations.length)
            .toBeGreaterThan(0);

        await apiContext.dispose();
    });

});