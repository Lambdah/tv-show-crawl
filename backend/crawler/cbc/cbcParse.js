const puppeteer = require('puppeteer');


async function cbcTvParse(url){
    try{
        // console.log(url);
        var browser = await puppeteer.launch({headless: true});
        let page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(url);
        try{
            await page.waitForSelector('.client-logo-nav > img');
            await page.waitForSelector('.media-thumbnail.media-image.loaded', {timeout: 10000});
        } catch(e){
            // console.log(url);
            await browser.close();
            return null;
        }
        let tvShow = await page.evaluate(() => {
            const tvShowUrl = document.querySelectorAll('a.media-card-link.episode-card-link');
            const epiTitle = document.querySelectorAll("h2.episode-title.detail-title");
            const description = document.querySelectorAll('.episode-info > .description');
            const tvShowName = document.documentElement.getElementsByClassName("series-title")[0].innerText.trim().toLowerCase();
            titles = [];
            for (let i = 0; i < tvShowUrl.length; i++){
                let epiName = epiTitle[i].innerText.trim();
                let epiDescription = description[i].innerText.trim();
                titles[i] = {
                    epi_id: description[i].getAttribute("id"),
                    title: tvShowName,
                    description: epiName + " : " + epiDescription,
                    link: tvShowUrl[i].getAttribute("href")
                }
            }
            return titles;
        });
        await browser.close();
        let baseUrlNum = url.search("/season");
        let baseUrl = url.slice(0, baseUrlNum);
        for (let i = 0; i < tvShow.length; i++){
            tvShow[i].episode = tvShow[i].epi_id.replace(/-about/g, "");
            tvShow[i].link = baseUrl + tvShow[i].link;
        }
        // console.log(tvShow);
        return tvShow;
    }catch(err){
        console.error(err);
        browser.close();
        throw new Error(err);
    }
}


module.exports = cbcTvParse;