"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
class Logger {
    name;
    constructor(name) {
        this.name = name;
    }
    format(level, message) {
        const timestamp = new Date().toISOString();
        return (`[${timestamp}] [${level}] [${this.name}] [${message}]`);
    }
    info(message, context) {
        const formatted = this.format("INFO" /* LogLevel.INFO */, message);
        console.log(formatted);
        if (context) {
            console.log(context);
        }
    }
    debug(message, context) {
        const formatted = this.format("DEBUG" /* LogLevel.DEBUG */, message);
        console.log(formatted);
        if (context) {
            console.log(context);
        }
    }
    warn(message, context) {
        const formatted = this.format("WARN" /* LogLevel.WARN */, message);
        console.warn(formatted);
        if (context) {
            console.log(context);
        }
    }
    error(message, error) {
        const formatted = this.format("ERROR" /* LogLevel.ERROR */, message);
        console.error(formatted);
        if (error != undefined) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            else {
                console.error(String(error));
            }
        }
    }
}
exports.Logger = Logger;
exports.logger = new Logger('Framework');
