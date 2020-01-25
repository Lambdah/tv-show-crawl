const config = require('config');
const axios = require('axios');

function fixString(name){
    name = name.toLowerCase();
    name = name.replace(" ", "+");
    name = name.replace("&", "and");
    return name;
}


async function call_api(tvShowName){
    try{
        tvShowName = fixString(tvShowName);
        const response = await axios.get(config.OMDb_key + tvShowName);
        if (response.data.Response === 'False'){
            return { error: 'Does not exist.' };
        }
        return {
            tvTitle: response.data.Title,
            synopsis: response.data.Plot,
            metaTags: response.data.Genre.split(",").map(meta => meta.trim()),
            poster: response.data.Poster
        };

    } catch (err){
        console.error(err);
    }
}

async function callEpisodeApi(tvShowName, seasonNum, episodeNum){
    try{
        const response = await axios.get(config.OMDb_key + tvShowName + "&season=" + seasonNum +"&episode=" + episodeNum);
        if (response.data.Response === 'False'){
            return {error: 'Does not exist.'};
        }
        return {
            plot: response.data.Plot,
            epi_poster: response.data.Poster,
            release: response.data.Released
        }
    } catch (err){
        console.error(err);
    }
}

/**
 * Returns back a promise
 */

module.exports = call_api;
