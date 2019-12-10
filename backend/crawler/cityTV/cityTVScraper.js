const puppeteer = require('puppeteer');

async function cityTVScraper(url){
    try{
        var browser = await puppeteer.launch({headless: true});
        var page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle0'});
        let tvShows = await page.evaluate(() => {
            var tvShowUrl = [];
            const tvLinks = document.querySelectorAll('.boxes-list-picblock');
            for (let i = 0; i < tvLinks.length; i++){
                tvShowUrl.push(tvLinks[i].getAttribute("href"));
            }
            return tvShowUrl;
        });
        await browser.close();
        return tvShows;
    }catch(err){
        console.error(err);
        throw err;
    }


}


module.exports = cityTVScraper;