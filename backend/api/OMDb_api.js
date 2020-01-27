const config = require('config');
const axios = require('axios');

function fixString(name){
    name = name.toLowerCase();
    name = name.replace(" ", "+");
    name = name.replace("&", "and");
    return name;
}

/**
* callAPI on a mongoose model of Episode or Network
* @param tvObject
 * returns back a promise of the updated tvObject
 */
function callAPI(tvObject){
    console.log(tvObject.collection.collectionName);
    switch(tvObject.collection.collectionName){
        case 'episodes':
            return callEpisodeAPI(tvObject, tvObject.title, tvObject.season, tvObject.episode_num);
        case 'networks':
            return callTvShowAPI(tvObject, tvObject.tvTitle);
        default:
            throw new Error('No existing Schema');
    }
}

async function callTvShowAPI(tvObject, tvShowName){
    try{
        tvShowName = fixString(tvShowName);
        const response = await axios.get(config.OMDb_key + tvShowName);
        if (response.data.Response === 'False'){
            console.log("The error");
            return { error: 'Does not exist.' };
        }
        return Object.assign(tvObject,
            {
                tvTitle: response.data.Title,
                synopsis: response.data.Plot,
                metaTags: response.data.Genre.split(",").map(meta => meta.trim()),
                poster: response.data.Poster
            });

    } catch (err){
        console.error(err);
    }
}

async function callEpisodeAPI(tvObject, tvShowName, seasonNum, episodeNum){
    try{
        const response = await axios.get(config.OMDb_key + tvShowName + "&season=" + seasonNum +"&episode=" + episodeNum);
        if (response.data.Response === 'False'){
            return {error: 'Does not exist.'};
        }
        return Object.assign(tvObject,
            {
                description_alt: response.data.Plot,
                episode_poster_alt: response.data.Poster,
                release_date: response.data.Released
        });
    } catch (err){
        console.error(err);
    }
}

/**
 * Returns back a promise
 */

module.exports = callAPI;
