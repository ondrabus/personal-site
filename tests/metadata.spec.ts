import { test, expect } from '@playwright/test'

test('Main page has correct meta tags', async({page}) => {
    await page.goto('/')
    await expect(page.locator(`//link[@rel='canonical']`)).toHaveAttribute('href', 'https://ondrabus.com/')
    await expect(page.locator(`//meta[@property='og:url']`)).toHaveAttribute('content', 'https://ondrabus.com/')
})
