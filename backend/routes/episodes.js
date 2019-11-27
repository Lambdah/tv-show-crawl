const router = require('express').Router();
var Episode = require('../schema/episodeSchema');

router.route('/').get(function(req, res){
    Episode.find()
        .then(episodes => res.json(episodes))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').get(function(req, res){
   Episode.find({_id: req.params.id})
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
    const episode_name = req.body.episode_name;
    const description = req.body.description;
    const episode_url = req.body.episode_url;
    const newEpisode = new Episode({
        title,
        episode_name,
        description,
        episode_url,
    });
    newEpisode.save()
        .then(() => res.json("Episode Added"))
        .catch((err) => res.status(400).join('error' + err));
});

router.route('/tv/:tvTitle').get(function(req, res){
   Episode.find({title: {$regex: new RegExp(req.params['tvTitle'], "i")}})
       .then(tvShow => {
           if(tvShow){
               res.json(tvShow)
           }
            res.status(400).json({error: 'TV Show does not exist'});
       })
       .catch(err => res.status(400).json({error: err}));
});

router.route('/tv/:tvTitle/:tvEpisode').get(function(req, res){
    Episode.find({title: {$regex: new RegExp(req.params['tvTitle'], "i")}, episode_name: {$regex: new RegExp(req.params['tvEpisode'], "i")}})
        .then(episode => res.json(episode))
        .catch(err => res.status(400).join('Error' + err));
});


module.exports = router;