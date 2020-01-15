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

router.route('/network/:network').get(function(req, res){
   Network.find({network: req.params.body})
       .then(network => res.json(network))
       .catch(err => res.status(400).json('Error' + err));
});

router.route('/categories/:tag').get(function(req, res){
   Network.find({metaTags: {$in: req.params.tag}})
       .then(network => res.json(network))
       .catch(network => res.status(400).json('Error' + err));
});

module.exports = router;