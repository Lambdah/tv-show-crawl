const router = require('express').Router();
const Network = require('../schema/networkSchema');
const NetworkStats = require('../schema/networkStatsSchema');

router.route('/').get(function(req, res){
   Network.find()
       .then(network => res.json(network))
       .catch(err => {
           console.log(err);
           return res.status(400).json({error: 'Error'})});
});

router.route('/stats').get(function(req, res){
    NetworkStats.find({}).then((stats) => res.json(stats))
        .catch(err => {
            console.log(err);
            return res.status(400).json({error: 'Error'})
        });
});

router.route('/top5').get(function(req, res){
    Network.aggregate([{$unwind: "$metaTags"}, {$group: {_id: "$metaTags", epiCounter: {$sum: "$episodeCount"}}}])
        .sort({epiCounter: -1})
        .limit(3)
        .then((top) => {
            const query = Network.find({$or : top.map(obj => {return {metaTags: obj._id}})}).sort({episodeCount: -1});
            query.exec((err, show) => {
               if (err) {
                   return res.status(404).json({err: 'Error'});
               }
               const category = [new Set(), new Set(), new Set()];
                function top5(category, setCategory){
                    for(let i=0; i < show.length; i++){
                        if(show[i].metaTags.includes(category) && show[i].poster !== "N/A"){
                            setCategory.add(show[i]);
                        }
                        if (setCategory.size > 5){
                            break;
                        }
                    }
                    return [...setCategory];
                }

                top.map((obj, index) => {
                    category[index] = top5(obj._id, category[index]);
                })

               return res.json({top, category});
            });

        })

})

router.route('/:id').get(function(req, res){
   Network.find({_id: req.params.id})
       .then(network => res.json(network))
       .catch(err => {
           console.log(err);
           return res.status(400).json({error: 'Error'})});
});

router.route('/title/:tvTitle').get(function(req, res){
    const escapedString = req.params['tvTitle'].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let tvTitle = new RegExp(escapedString, "i");
   Network.findOne({title: {$regex: tvTitle}})
       .then(show => res.json(show))
       .catch(err => {
           console.log(err);
           return res.status(400).json({error: 'Error'})});
});

router.route('/tv/:network').get(function(req, res){
    let network = new RegExp(req.params.network, "i");
   Network.find({network: {$regex: req.params.network}})
       .then(network => !network.length ? res.status(404).send("No Content") : res.json(network))
       .catch(err => {
           console.log(err);
           return res.status(400).json({error: 'Error'})
       });
});

router.route('/tv/pagination/:network').get(function(req, res){
    try {
        let network = req.params.network;
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);
        Network.find({network: {$regex: network, $options: "i"}}).limit(size).skip(page*size)
            .then((network) => res.json(network))
    } catch (err) {
        console.log(err);
        res.status(400).json({error: 'Error'})
    }
});

router.route('/categories/:tag').get(function(req, res){
    const metaTag = req.params.tag;
   Network.find({metaTags: {$in: metaTag.charAt(0).toUpperCase() + metaTag.slice(1)}})
       .then(network => !network.length ? res.status(404).send("No content") : res.json(network))
       .catch(err => {
            console.log(err);
           return res.status(400).json({error: 'Error'})
       });
});

module.exports = router;