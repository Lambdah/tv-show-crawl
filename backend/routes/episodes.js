const router = require('express').Router();
var Episodes = require('../schema/episodeSchema');

router.route('/').get(function(req, res){
    Episodes.find()
        .then(episodes => res.json(episodes))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/:tvTitle').get(function(req, res){
   Episodes.find({title: req.params['tvTitle']})
       .then(tvShow => res.json(tvShow))
       .catch(err => res.status(400).join('Error' + err));
});

router.route('/:tvTitle/:tvEpisode').get(function(req, res){
    Episodes.find({title: req.params['tvTitle'], episode_nam: req.params['tvEpisode']})
        .then(episode => res.json(episode))
        .catch(err => res.status(400).join('Error' + err));
});


module.exports = router;