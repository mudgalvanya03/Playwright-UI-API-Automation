import { Page } from "@playwright/test"
import { logger } from '../utils/logger'

export abstract class BasePage{
    protected readonly page: Page
    protected readonly logger = logger

    constructor( page:Page){
        this.page = page;
    }

    abstract waitForPageLoad(): Promise<void>

    async NavigateTo(url: string){
        this.logger.info(`Navigating to: ${url}`)
        await this.page.goto(url);
    }

    async GetTitle(): Promise<string>{
        const title = await this.page.title();
        return title;
    }
    async WaitForUrl(url: string): Promise<void>{
        await this.page.waitForURL(url);
    }

}