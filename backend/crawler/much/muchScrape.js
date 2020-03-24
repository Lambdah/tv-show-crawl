const puppeteer = require('puppeteer');
// const url = 'https://www.much.com/shows/';

async function muchScrape(url){
    try{
        var browser = await puppeteer.launch({headless: true});
        var page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({path: './crawler/much/buddy-screenshot.png'});
        await page.waitForSelector(".show-item.top > a > img");
        const tvShows = await page.evaluate(() => {
            const tvLinks = [];
            const tv = document.querySelectorAll(".show-item.top > a");
            for (let i=0; i < tv.length; i++){
                tvLinks.push(tv[i].getAttribute("href"));
            }
            return tvLinks;
        });
        console.log(tvShows);
        await browser.close();
        return tvShows;
    } catch(err){
        await browser.close();
        console.error(err);
    }

}

module.exports = muchScrape;

