"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class CustomReporter {
    failures = [];
    startTime = 0;
    onBegin(_config, suite) {
        this.startTime = Date.now();
        logger_1.logger.info(`Starting test run: ${suite.allTests().length} tests`);
    }
    onTestBegin(test) {
        logger_1.logger.debug(`Starting: ${test.title}`);
    }
    onTestEnd(test, result) {
        logger_1.logger.info(`${test.title}: ${result.status}`);
        if (result.status === 'failed' || result.status === 'timedOut') {
            const record = {
                testName: test.title,
                file: test.location.file,
                status: result.status,
                duration: result.duration,
                error: result.error?.message,
                timestamp: new Date().toISOString()
            };
            this.failures.push(record);
            logger_1.logger.error(`Failed test: ${test.title}`);
        }
    }
    onEnd(result) {
        const duration = Date.now() - this.startTime;
        logger_1.logger.info(`Test run completed in ${duration / 1000}s`);
        if (this.failures.length > 0) {
            this.writeFailures();
        }
        logger_1.logger.info(`Final status: ${result.status}`);
        logger_1.logger.info(`Total failures: ${this.failures.length}`);
    }
    writeFailures() {
        const dir = 'test-results';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const filePath = path.join(dir, 'failures.json');
        fs.writeFileSync(filePath, JSON.stringify(this.failures, null, 2));
        logger_1.logger.info(`Failures written to ${filePath}`);
    }
}
exports.default = CustomReporter;
