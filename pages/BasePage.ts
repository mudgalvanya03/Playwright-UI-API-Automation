import { Page } from "@playwright/test"
import { logger } from '../utils/logger'

export abstract class BasePage{
    protected readonly page: Page
    protected readonly logger = logger

    constructor( page:Page){
        this.page = page;
    }

    /**
     * Waits until the page is in a fully interactive and stable state.
     * Each subclass defines its own readiness condition — for example,
     * waiting for a key selector, a network response, or a URL change.
     * Should be called immediately after {@link navigateTo} or any action
     * that triggers a full page transition.
     *
     * @returns Promise that resolves once the page is ready for interaction
     */
    abstract waitForPageLoad(): Promise<void>

    /**
     * Navigates the browser to the given URL and logs the action.
     * Does not wait for the page to reach a ready state — call
     * {@link waitForPageLoad} afterwards if stability is required.
     *
     * @param url - The full URL to navigate to
     *
     * @example
     * await page.navigateTo('https://example.com/login');
     */
    async navigateTo(url: string){
        this.logger.info(`Navigating to: ${url}`)
        await this.page.goto(url);
    }

    /**
     * Returns the current document title as reported by the browser.
     *
     * @returns Promise resolving to the page's `<title>` string
     *
     * @example
     * const title = await page.getTitle();
     * expect(title).toBe('Dashboard');
     */
    async getTitle(): Promise<string>{
        const title = await this.page.title();
        return title;
    }

    /**
     * Waits until the browser's current URL matches the given URL or pattern.
     * Delegates directly to Playwright's `page.waitForURL()`, inheriting its
     * support for exact strings, globs, and regular expressions.
     *
     * @param url - The URL string, glob pattern, or regex to wait for
     *
     * @example
     * await page.waitForUrl('dashboard');
     *
     * @example
     * await page.waitForUrl(/\/users\/\d+/);
     */
    async waitForUrl(url: string): Promise<void>{
        await this.page.waitForURL(url);
    }

}