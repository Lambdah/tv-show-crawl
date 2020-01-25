const puppeteer = require('puppeteer');


async function cityTvShow(url){
    try{
        var browser = await puppeteer.launch({headless: true});
        var page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(url);
        try{
            await page.waitForSelector(".hero-image");
            await page.waitForSelector(".video-card__thumbnail > img", {timeout: 3000});
        }catch(e){
            await browser.close();
            return null;
        }
        var tvShow = await page.evaluate(() => {
            const titleNode = document.querySelectorAll(".video-card__title");
            const descriptNode = document.querySelectorAll(".video-card__description");
            const episodePoster = document.querySelectorAll(".video-card__thumbnail > img");
            const seasonNum = parseInt(document.querySelectorAll('.select-box > .dropdown-toggle')[0].getAttribute('data-value'));
            var titles = [];
            for (let i=0; i < titleNode.length; i++){
                let epiTitlesplit = titleNode[i].innerText.split(/\./g);
                titles[i] = {
                    epi_id: titleNode[i].getAttribute("data-video-id"),
                    title: titleNode[i].getAttribute("data-show-name"),
                    episode: epiTitlesplit[1],
                    description: descriptNode[i].innerText.trim(),
                    episode_poster: episodePoster[i].src,
                    season: seasonNum,
                    episode_num: parseInt(epiTitlesplit[0])
                    }
            }
            return titles;
        });
        await browser.close();
        for (let i=0; i < tvShow.length; i++){
            tvShow[i].link = url + "?video=" + tvShow[i].epi_id
        }
        return tvShow;
    } catch (err){
        console.error(err);
        await browser.close();
        throw new Error(err);
    }
}

module.exports = cityTvShow;
