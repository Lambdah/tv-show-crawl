const cityTvShow = require('./cityTVParse');
const cityTVScraper = require('./cityTVScraper');
const EventEmitter = require('events');
const Process = require('process');


process.setMaxListeners(0);
const cityTv =
    cityTVScraper('https://www.citytv.com/toronto/shows/')
    .then(function(tvShowUrl){
        for (let i=0; i < tvShowUrl.length; i++){
            cityTvShow(tvShowUrl[i])
                .then(function(tv){
                    if (tv){
                        // console.log(i + "." + tv);
                        return tv;
                    }
                })
                .catch(function(err){
                    console.error(err);
                });
        }
    })
    .catch(function(err){
        console.error(err);
    });

