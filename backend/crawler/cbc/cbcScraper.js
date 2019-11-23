const url = 'https://www.cbc.ca/tv/shows';
const puppeteer = require('puppeteer');

async function cbcScraper(){
    try{
        var browser = await puppeteer.launch({headless: true});
        var page = await browser.newPage();
        await page.goto(url);
        await page.waitForSelector('.promo_image > img');
        let tvShows = await page.evaluate(() => {
            const tvlink = document.querySelectorAll('ul.showcard_links > li > a.showcard_link.gem');
            var tvShowlinks = [];
            for (let i=0; i < tvlink.length; i++){
                tvShowlinks.push(tvlink[i].getAttribute("href"));
            }
            return tvShowlinks;
        });
        await browser.close();
        return tvShows;
    }catch(err){
        console.error(err);
        await browser.close();
    }
}


module.exports = cbcScraper;