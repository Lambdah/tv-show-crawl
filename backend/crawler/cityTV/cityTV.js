const cityTvParse = require('./cityTVParse');
const cityTVScraper = require('./cityTVScraper');
const EventEmitter = require('events');
const Process = require('process');


process.setMaxListeners(0);
async function cityTv(){
    return cityTVScraper('https://www.citytv.com/toronto/shows/')
        .then(function(tv){
            var city = [];
            for (let i=0; i < tv.length; i++){
                city[i] = cityTvParse(tv[i])
                    .then(function(tvShow){
                        if (tvShow){
                            return tvShow;
                        }
                    })
            }
            return Promise.all(city);
        })
        .catch(function(err){
            console.error(err);
        });
}

module.exports = cityTv;