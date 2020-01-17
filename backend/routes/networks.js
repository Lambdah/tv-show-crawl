const router = require('express').Router();
const Network = require('../schema/networkSchema');

router.route('/').get(function(req, res){
   Network.find()
       .then(network => res.json(network))
       .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').get(function(req, res){
   Network.find({_id: req.params.id})
       .then(network => res.json(network))
       .catch(err => res.status(400).json('Error' + err));
});

router.route('/tv/:network').get(function(req, res){
   Network.find({network: req.params.network})
       .then(network => !network.length ? res.status(404).send("No Content") : res.json(network))
       .catch(err => res.status(400).json('Error' + err));
});

router.route('/categories/:tag').get(function(req, res){
    const metaTag = req.params.tag;
   Network.find({metaTags: {$in: metaTag.charAt(0).toUpperCase() + metaTag.slice(1)}})
       .then(network => !network.length ? res.status(404).send("No content") : res.json(network))
       .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;