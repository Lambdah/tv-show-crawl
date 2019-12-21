const much = require('./much/much');
const Episode = require('../schema/episodeSchema');

async function muchCrawl(){
    try{
        much()
            .then(function(tvShow){
                for(let i=0; i < tvShow.length; i++){
                    let episodes = tvShow[i];
                    if (Array.isArray(episodes)){
                        for(let k=0; k < episodes.length; k++){
                            let epi = new Episode({
                                epi_id: episodes[k].epi_id,
                                title: episodes[k].title,
                                episode_name: episodes[k].episode,
                                description: episodes[k].description,
                                link: episodes[k].link
                            });
                            epi.save(function(err){
                                if (err !== null){
                                    console.error(err);
                                }
                            });
                        }
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

module.exports = {muchCrawl};