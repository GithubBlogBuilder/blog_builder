import puppeteer from 'puppeteer';
async function getWebsiteScreenShot(url: string) {
    if (url.length === 0) {
        throw new Error('url is required');
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const screenShot = await page.screenshot({ encoding: 'base64' });

    await browser.close();

    // console.log(screenShot);

    return screenShot;
}

export default getWebsiteScreenShot;
