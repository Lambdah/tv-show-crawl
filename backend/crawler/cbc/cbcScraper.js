// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
let alt_url = 'https://gem.cbc.ca/category/shows/all/babb23ae-fe47-40a0-b3ed-cdc91e31f3d6';
async function cbcScraper(url){
    try{
        puppeteer.use(StealthPlugin());
        var browser = await puppeteer.launch({headless: false});
        var page = await browser.newPage();
        // await page.goto(alt_url, {waitUntil: 'networkidle2'});
        await page.goto(alt_url);
        // await page.waitForSelector('.loaded');
        // await page.waitForNavigation();
        let tvShows = await page.evaluate(() => {
            // const tvlink = document.querySelectorAll('ul.showcard_links > li > a.showcard_link.gem');
            // var tvShowlinks = [];
            // for (let i=0; i < tvlink.length; i++){
            //     tvShowlinks.push(tvlink[i].getAttribute("href"));
            // }
            // return tvShowlinks;
            let diffScroll;
            do{
                // let prevScroll = window.scrollY;
                window.scrollBy(0,3000);
                // diffScroll = window.scrollY - prevScroll;
            }while(window.scrollY < 10000)

        });
        await page.screenshot({path: 'secondresult.png', fullPage: true});
        await browser.close();
        // return tvShows;
    }catch(err){
        console.error(err);
        await browser.close();
    }
}


module.exports = cbcScraper;