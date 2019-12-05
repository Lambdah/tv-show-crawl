const muchScrape = require('./muchScrape');
const muchParse = require('./muchParse');

async function much(){
    return muchScrape()
        .then(function(tv){
            var muchTv = [];
            for (let i = 0; i < tv.length; i++){

                muchTv[i] = muchParse(tv[i])
                    .then(function(tvShow){
                        if(tvShow){
                            console.log(tvShow);
                            return tvShow;
                        }
                    });
            }
            return Promise.all(muchTv);
        }).catch(function(err){
        console.error(err);
    });
}

module.exports = much;