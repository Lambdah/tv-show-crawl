const cbcScraper = require('./cbcScraper');
const cbcParse = require('./cbcParse');

process.setMaxListeners(0);
const cbcCrawl =
    cbcScraper()
    .then(function(tvUrls){
        for (let i = 0; i < tvUrls.length; i++){
            // console.log(tvUrls[i]);
            cbcParse(tvUrls[i])
                .then(function(tv){
                    if (tv){
                        console.log(tv);
                        return tv;
                    }
                })
                .catch(function(err){
                    console.error(err);
                })
        }
    })
    .catch(function(err){
       console.error(err);
    });
