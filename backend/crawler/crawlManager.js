const muchScraper = require('./much/muchScrape');
const muchParser = require('./much/muchParse');
const cityTv = require('./cityTV/cityTV');
const Episode = require('../schema/episodeSchema');

let muchUrl = 'https://www.much.com/shows/';

process.setMaxListeners(0);
async function episodeInputDatabase(episodes) {
    for (let k = 0; k < episodes.length; k++) {
        let epi = new Episode({
            epi_id: episodes[k].epi_id,
            title: episodes[k].title,
            episode_name: episodes[k].episode,
            description: episodes[k].description,
            link: episodes[k].link
        });
        epi.save(function (err) {
            if (err !== null) {
                if(err.name === 'ValidationError'){
                    epi.updateEpiNewReleaseToFalse(function(err){
                        if(err){
                            console.error(err);
                        }
                    });
                }else{
                    console.error(err);
                }
            }
        });
    }
}

async function tvShowCrawl(scraper, parser, url){
    return scraper(url)
        .then(function(tv){
            var tvList = [];
            for (let i=0; i < tv.length; i++){
                tvList[i] = parser(tv[i])
                    .then(function(tvShow){
                        if(tvShow){
                            return tvShow;
                        }
                });
            }
            return Promise.all(tvList);
        });
}

async function puppetCrawler(scraper, parser, url){
    try{
        tvShowCrawl(scraper, parser, url)
            .then(async function(tvShow){
                for(let i=0; i < tvShow.length; i++){
                    let episodes = tvShow[i];
                    if (Array.isArray(episodes)){
                        await episodeInputDatabase(episodes);
                        }
                    }
                console.log("done crawling");
            })
            .catch(function(err){
                console.error(err);
            });
    }catch(err){
        console.error(err);
    }
}

function crawlManager(){
    Promise.all([puppetCrawler(muchScraper, muchParser, muchUrl)]);
}


module.exports = {crawlManager};