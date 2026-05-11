import { Page } from "@playwright/test"

export abstract class BasePage{
    protected readonly page: Page

    constructor( page:Page){
        this.page = page;
    }

    abstract WaitForPageLoad(): Promise<void>

    async NavigateTo(url: string){
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