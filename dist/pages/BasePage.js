"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const logger_1 = require("../utils/logger");
class BasePage {
    page;
    logger = logger_1.logger;
    constructor(page) {
        this.page = page;
    }
    async NavigateTo(url) {
        this.logger.info(`Navigating to: ${url}`);
        await this.page.goto(url);
    }
    async GetTitle() {
        const title = await this.page.title();
        return title;
    }
    async WaitForUrl(url) {
        await this.page.waitForURL(url);
    }
}
exports.BasePage = BasePage;
