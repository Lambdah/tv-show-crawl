const muchScraper = require('./much/muchScrape');
const muchParser = require('./much/muchParse');
const cityTv = require('./cityTV/cityTV');
const cityTvScraper = require('./cityTV/cityTVScraper');
const cityTvParser = require('./cityTV/cityTVParse');
const OMDbAPI = require('../api/OMDb_api');
const Episode = require('../schema/episodeSchema');
const Network = require('../schema/networkSchema');
let muchUrl = 'https://www.much.com/shows/';
let cityTvUrl = 'https://www.citytv.com/toronto/shows/';

process.setMaxListeners(0);
function episodeInputDatabase(episodes) {
    const epiSavePromises = [];
    for (let k = 0; k < episodes.length; k++) {
        let epi = new Episode({
            epi_id: episodes[k].epi_id,
            title: episodes[k].title,
            episode_name: episodes[k].episode,
            description: episodes[k].description,
            episode_url: episodes[k].link,
            episode_poster: episodes[k].episode_poster,
            season: episodes[k].season,
            episode_num: episodes[k].episode_num
        });
        epiSavePromises[k] = episodeDocumentSave(epi)
    }
    return Promise.all(epiSavePromises);
}

function episodeDocumentSave(epi){
    return OMDbAPI(epi)
        .then(epiObject =>{
            if (!(epiObject instanceof Episode)){
                return;
            }
            epiObject.save(function(err){
                if (err && err.name === 'ValidationError') {
                    epiObject.updateEpiNewReleaseToFalse(function (err) {
                        if (err) {
                            console.error(err);
                        }
                    });
                    epiObject.updateEpiToListed(function (err) {
                        if (err) {
                            console.error(err);
                        }
                    });
                } else if (err){
                    console.error(err);
                }
            });
        })
        .catch(function (err) {
            console.error(err);
        });
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

async function puppetCrawler(scraper, parser, url, network){
    try{
        tvShowCrawl(scraper, parser, url)
            .then(async function(tvShow){
                for(let i=0; i < tvShow.length; i++){
                    let episodes = tvShow[i];
                    if (Array.isArray(episodes)){
                        await episodeInputDatabase(episodes);
                        let tvTitle = episodes[0].title;
                        OMDbAPI(new Network({tvTitle: tvTitle, network: network}))
                            .then(networkObj => {
                                if (!(networkObj instanceof Network)){
                                    return;
                                }
                                networkObj.save(err => {
                                    if (!err || err.name === 'ValidationError'){
                                        // suppress the error
                                    }else{
                                        console.error(err);
                                    }
                                })
                            })
                            .catch(err => {
                                console.error(err);
                            })
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
    Episode.updateUnlistedToTrue();
    Promise.all([
        puppetCrawler(muchScraper, muchParser, muchUrl, "much"),
        puppetCrawler(cityTvScraper, cityTvParser, cityTvUrl, "cityTV")
    ]);
    Episode.updateUnlistedNewReleaseToFalse();
}


module.exports = {crawlManager, episodeInputDatabase};