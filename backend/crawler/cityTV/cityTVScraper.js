const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.citytv.com/toronto/shows/';

function cityTVScraper(){
    return rp(url)
        .then(function(html){
            tvShowUrl = [];
            const numOfTvShows = $('.boxes-list-item', html).length;
            console.log(numOfTvShows);
            for (let i=0; i < numOfTvShows; i++){
                tvShowUrl.push($('.boxes-list-picblock', html)[i].attribs.href)
            }
            return tvShowUrl;
        })
        .catch(function(err){
            console.log(err);
            throw err;
        });
}


module.exports = cityTVScraper;