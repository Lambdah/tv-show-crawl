const router = require('express').Router();
var Episode = require('../schema/episodeSchema');

router.route('/').get(function(req, res){
    Episode.find()
        .then(episodes => res.json(episodes))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/new_releases').get(function(req, res){
    Episode.find({new_release: true})
        .then(episodes => {
            if (Array.isArray(episodes) && episodes.length === 0){
                return res.status(404).json({error: 'No new Content'});
            }
            return res.json(episodes);
        })
        .catch(err => res.status(400).json('error: ' + err));
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
    if(!req.body.title || !req.body.episode_name || !req.body.episode_url){
        return res.status(400).json({err: "TV show, Episode Name and Episode URL must not be empty"});
    }
    let episode = {
        title : req.body.title,
        episode_name : req.body.episode_name,
        description : req.body.description,
        episode_url : req.body.episode_url
    };
    Episode.findOneAndUpdate({_id: req.params.id}, episode,
        {new: true, useFindAndModify: false}).then(epi => {
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

router.route('/update/new/:id').post(function(req, res){
   if(!req.body.new_release){
       return res.status(400).json({err: "Requires new_release"});
   }
   let new_release = null;
   if(req.body.new_release === 'true'){
       new_release = {new_release: true};
   }else if (req.body.new_release === 'false'){
       new_release = {new_release: false}
   }else{
       return res.status(400).json({err: "Property of new_release is a boolean"});
   }
   Episode.findOneAndUpdate({_id: req.params.id}, new_release,
       {new: true, useFindAndModify: false}).then(epi =>{
           if(!epi){
               return res.status(404).json({err: "No associated id with " + req.params.id});
           }
           res.json(epi);
   }).catch(error =>{
       if(error.kind ==='ObjectId'){
           return res.status(404).json({err: "No associated id with " + req.params.id})
       }
      return res.status(500).json({err: error});
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
        .catch((error) => res.status(400).json({err: error}));
});

router.route('/tv/:tvTitle').get(function(req, res){
   Episode.find({title: {$regex: new RegExp(req.params['tvTitle'], "i")}, unlisted: false})
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