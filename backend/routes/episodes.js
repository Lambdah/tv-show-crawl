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
        .then(episode => res.json({status: 'Episode deleted!'}))
        .catch(err => res.status(400).json('error' + err));
});

router.route('/update/:id').post(function(req, res){
    if(!req.body.title && !req.body.episode_name){
        return res.status(400).json({err: "TV show and Episode Name must not be empty"});
    }
    let episode = {
        title : req.body.title,
        episode_name : req.body.episode_name,
        description : req.body.description,
        episode_url : req.body.episode_url
    };
    Episode.findOneAndUpdate({_id: req.params.id}, {episode},
        {new: true}).then(epi => {
            if(!epi){
                return res.status(404).json({err: "No associated id with " + req.params.id})
            }
            res.json(episode);
    }).catch(error => {
        if(error.kind === 'ObjectId'){
            return res.status(404).json({err: "No associated id with " + req.params.id});
        }
        return res.status(500).json({err: "Error updating with " + req.params.id});
    });
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
        .then(() => res.json({status: "Episode Added"}))
        .catch((err) => res.status(400).join('error' + err));
});

router.route('/tv/:tvTitle').get(function(req, res){
   Episode.find({title: {$regex: new RegExp(req.params['tvTitle'], "i")}})
       .then(tvShow => {
           if(tvShow.length === 0){
               res.status(404).json([{err: "TV show does not exist"}]);
           }else{
               res.status(200).json(tvShow);
           }
       })
       .catch(err => res.status(400).json({error: err}));
});

router.route('/tv/:tvTitle/:tvEpisode').get(function(req, res){
    Episode.find({title: {$regex: new RegExp(req.params['tvTitle'], "i")}, episode_name: {$regex: new RegExp(req.params['tvEpisode'], "i")}})
        .then(episode => {
            if (episode.length === 0){
                res.status(404).json([{err: "TV Show or Episode does not exist"}]);
            }else{
                res.json(episode);
            }
        })
        .catch(err => res.status(400).join('Error' + err));
});


module.exports = router;