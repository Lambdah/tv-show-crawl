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
    switch(tvObject.collection.collectionName){
        case 'episodes':
            return callEpisodeAPI(tvObject, tvObject.title, tvObject.season, tvObject.episode_num);
        case 'networks':
            return callTvShowAPI(tvObject, tvObject.tvTitle);
        default:
            throw new Error('No existing Schema');
    }
}

/**
 * Calls OMDb api with tv show name to get poster, and overall theme of tv show.
 * @param tvObject
 * @param tvShowName
 * @returns {Promise<{error: string}|any>}
 */
async function callTvShowAPI(tvObject, tvShowName){
    try{
        tvShowName = fixString(tvShowName);
        let uri = config.OMDb_key + tvShowName;
        const response = await axios.get(encodeURI(uri));
        if (response.data.Response === 'False'){
            // console.log("The error on " + tvShowName);
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

/**
 * Calls OMDb api with tv show name, season, and episode number to request plot information.
 * @param tvObject
 * @param tvShowName
 * @param seasonNum
 * @param episodeNum
 * @returns {Promise<any>}
 */
async function callEpisodeAPI(tvObject, tvShowName, seasonNum, episodeNum){
    try{
        let uri = config.OMDb_key + tvShowName + "&season=" + seasonNum +"&episode=" + episodeNum;
        const response = await axios.get(encodeURI(uri));
        if (response.data.Response === 'False'){
            // return {error: 'Does not exist.'};
            return tvObject;
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
