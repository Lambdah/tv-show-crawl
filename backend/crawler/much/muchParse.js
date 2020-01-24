const puppeteer = require('puppeteer');


async function muchParse(url){
    var browser;
    try{
        browser = await puppeteer.launch({head: true});
        var page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(url);
        try{
            await page.waitForSelector("#LatestEpisode > a");
            await page.waitForSelector('.episode-item > .tnail', {timeout: 100});
        }catch (err){
            await browser.close();
            return null;
        }
        const tvEpisodes = await page.evaluate(() => {
            const tvUrl = document.querySelectorAll('.episode-item > .tnail');
            const title = document.querySelectorAll('.episode-item > .title');
            // const tvShowName = document.querySelectorAll("#ShowNav > .noleftpadding > h3 > a > img")[0]
            //     .getAttribute("alt");
            const tvShowName = document.querySelectorAll('meta')[6].getAttribute("content");
            const tvShowTitle = tvShowName.replace(" on MUCH.com", "");
            const episode = document.querySelectorAll('.episode-item > .ep-num');
            const airdate = document.querySelectorAll('.episode-item > .airdate');
            const episodePoster = document.querySelectorAll('.episode-item > .tnail > img');
            const seasonEpisode = document.querySelectorAll('.episode-item > .ep-num');
            var tv = [];
            for (let i=0; i < tvUrl.length; i++){
                let epiSeason = seasonEpisode[i];
                let seasonArr = [epiSeason.match(/S\d{2}/g), epiSeason.match(/E\d{2}/g)].map(epi => parseInt(epi.slice(1)));
                tv[i] = {
                    epi_id: tvUrl[i].getAttribute("href"),
                    title: tvShowTitle,
                    episode: title[i].innerText.trim(),
                    description: airdate[0].innerText.trim(),
                    episode_poster: episodePoster[i].src,
                    season: seasonArr[0],
                    episode_num: seasonArr[1]
                }
            }
            return tv;
        });
        await browser.close();
        for (let i=0; i < tvEpisodes.length; i++){
            tvEpisodes[i].link = "http://www.much.com" + tvEpisodes[i].epi_id
        }
        // return JSON.stringify(tvEpisodes);
        return tvEpisodes;
    }catch (err){
        await browser.close();
        console.error(err);
    }
}

module.exports = muchParse;
