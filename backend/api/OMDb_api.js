const config = require('config');
const axios = require('axios');

/**
 *
 * @param name
 * @returns {string}
 */
function encodeShow(name){
    let fixedName = encodeURIComponent(name);
    return `${config.OMDb_key}${fixedName}&type=series`;
}

/**
 * callAPI on a mongoose model of Episode or Network
 * @param tvObject
 * @returns back a promise of the updated tvObject
 */
function callAPI(tvObject){
    switch(tvObject.collection.collectionName){
        case 'episodes':
            return callEpisodeAPI(tvObject, tvObject.show, tvObject.season, tvObject.episode);
        case 'networks':
            return callTvShowAPI(tvObject, tvObject.title);
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
        let uri = encodeShow(tvShowName);
        let response = await axios.get(uri);
        if (response.data.Response === 'False'){
            const replaceAnd = tvShowName.replace('&', 'and');
            uri = encodeShow(replaceAnd);
            response = await axios.get(uri);
            if(response.data.Response === 'False'){
                return { error: 'Does not exist.' };
            }
        }
        return Object.assign(tvObject,
            {
                title: response.data.Title,
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
    if (seasonNum === 0) return tvObject;
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
                poster_alt: response.data.Poster,
                release_date: response.data.Released
        });
    } catch (err){
        console.error(err);
    }
}

module.exports = callAPI;
