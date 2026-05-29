import type {
    Reporter,
    TestCase,
    TestResult,
    FullResult,
    Suite,
    FullConfig
} from '@playwright/test/reporter'
import { logger } from './logger'
import * as fs from 'fs'
import * as path from 'path'

interface FailureRecord {
    testName: string
    file: string
    status: string
    duration: number
    error?: string
    timestamp: string
}

export default class CustomReporter implements Reporter {
    private failures: FailureRecord[] = []
    private startTime: number = 0

    onBegin(_config: FullConfig, suite: Suite): void {
        this.startTime = Date.now()
        logger.info(`Starting test run: ${suite.allTests().length} tests`)
    }

    onTestBegin(test: TestCase): void {
        logger.debug(`Starting: ${test.title}`)
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        logger.info(`${test.title}: ${result.status}`)

        if( result.status === 'failed' || result.status === 'timedOut'){
            const record: FailureRecord = {
                testName: test.title,
                file: test.location.file,
                status: result.status,
                duration: result.duration,
                error: result.error?.message,
                timestamp: new Date().toISOString()
            }
            this.failures.push(record)
            logger.error(`Failed test: ${test.title}`)
        }
    }

    onEnd(result: FullResult): void {
        const duration= Date.now()-this.startTime
        logger.info(`Test run completed in ${duration/1000}s`)
        
        if(this.failures.length > 0){
            this.writeFailures()
        }
        logger.info(`Final status: ${result.status}`)
        logger.info(`Total failures: ${this.failures.length}`)
    }

    private writeFailures(): void {
        const dir = 'test-results'
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        const filePath = path.join(dir, 'failures.json')
        fs.writeFileSync(filePath, JSON.stringify(this.failures, null, 2))
        logger.info(`Failures written to ${filePath}`)
    }
}