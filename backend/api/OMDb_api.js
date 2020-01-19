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
            metaTags: response.data.Genre.split(",").map(meta => meta.trim())
        };

    } catch (err){
        console.error(err);
    }
}

/**
 * Returns back a promise
 */

module.exports = call_api;
