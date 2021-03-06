const cbcScraper = require('./cbcScraper');
const cbcParse = require('./cbcParse');
const url = 'https://www.cbc.ca/tv/shows';

process.setMaxListeners(0);
// const cbcCrawl =
//     cbcScraper(url)
//     .then(function(tvUrls){
//         for (let i = 0; i < tvUrls.length; i++){
//             cbcParse(tvUrls[i])
//                 .then(function(tv){
//                     if (tv){
//                         console.log(tv);
//                         return tv;
//                     }
//                 })
//                 .catch(function(err){
//                     console.error(err);
//                 })
//         }
//     })
//     .catch(function(err){
//        console.error(err);
//     });

(async function(){
    cbcScraper(url)
        .then(res => {
            console.log(res);
        });
})();