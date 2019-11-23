const router = require('express').Router();
var Episode = require('../schema/episodeSchema');

router.route('/').get(function(req, res){
    Episode.find()
        .then(episodes => res.json(episodes))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').get(function(req, res){
   Episode.find(req.params.id)
       .then(episode => res.json(episode))
       .catch(err => res.status(400).json('error' + err));
});

router.route('/:id').delete(function(req, res){
    Episode.find(req.params.id)
        .then(episode => res.json('Episode deleted!'))
        .catch(err => res.status(400).json('error' + err));
});

router.route('/update/:id').post(function(req, res){
   Episode.find(req.params.id)
       .then(episode => {
           episode.title = req.body.title;
           episode.episode_name = req.body.episode_name;
           episode.description = req.body.description;
           episode.episode_url = req.body.episode_url;

           episode.save()
               .then(() => res.json('Episode Updated'))
               .catch(err => res.status(400).json('error' + err));
       })
});

router.route('/add').post(function(req, res){
    const title = req.body.title;
    const episode = req.body.episode;
    const description = req.body.description;
    const episode_url = req.body.episode_url;
    const newEpisode = new Episode({
        title,
        episode,
        description,
        episode_url,
    });

    newEpisode.save()
        .then(() => res.json("Episode Added"))
        .catch((err) => res.json(400).json('error' + err));
});

router.route('/:tvTitle').get(function(req, res){
   Episode.find({title: req.params['tvTitle']})
       .then(tvShow => res.json(tvShow))
       .catch(err => res.status(400).join('Error' + err));
});

router.route('/:tvTitle/:tvEpisode').get(function(req, res){
    Episode.find({title: req.params['tvTitle'], episode_nam: req.params['tvEpisode']})
        .then(episode => res.json(episode))
        .catch(err => res.status(400).join('Error' + err));
});


module.exports = router;