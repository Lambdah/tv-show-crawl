var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var episodeSchema = new Schema({
    title: String,
    episode: String,
    description: String,
    episode_url: String,
    date: {type: Date, default: Date.now},
    new_release: {type: Boolean, default: true}
});

episodeSchema.methods.findTitleAndEpi = function(cb){
    return this.model('Episode').findOne({title: this.title, episode: this.episode}, cb);
};

episodeSchema.methods.updateNewRelease = function(cb){
  return this.model('Episode').findOneAndUpdate({title: this.title, episode: this.episode, description: this.description},
      {new_release: false},
      {
          new: true
      },
      cb);
};

episodeSchema.pre('findOneAndUpdate', function(next){
    var queryObj = this.getQuery();
    this.model.findOne(this.getQuery()).then(function(docs){
        console.log(docs);
        if(docs){
            return next();
        }
    }).catch(function(err){
        console.error(err);
    });
    this.model.create(queryObj, next);
});

var Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;