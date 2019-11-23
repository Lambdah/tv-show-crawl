const puppeteer = require('puppeteer');
const url = 'https://www.much.com/shows/';

async function muchScrape(){
    try{
        var browser = await puppeteer.launch({headless: true});
        var page = await browser.newPage();
        await page.goto(url);
        await page.waitForSelector(".show-item.top > a > img");
        const tvShows = await page.evaluate(() => {
            const tvLinks = [];
            const tv = document.querySelectorAll(".show-item.top > a");
            for (let i=0; i < tv.length; i++){
                tvLinks.push(tv[i].getAttribute("href"));
            }
            return tvLinks;
        });
        await browser.close();
        return tvShows;
    } catch(err){
        await browser.close();
        console.error(err);
    }

}

module.exports = muchScrape;

